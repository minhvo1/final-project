const CronJob = require("node-cron");
const axios = require("axios");

exports.initScheduledJobs = (db) => {
  const scheduledJobFunction = CronJob.schedule("*/5 * * * *", () => {

    const query = `SELECT *
                FROM portfolios;`;
    db.query(query)
      .then((data) => {
        // 2. Loop through each portfolio
        if (data.rows.length > 0) {
          for (const portfolio of data.rows) {
            //console.log("Line 203", portfolio);
            let portfolio_id = portfolio.id;
            const pQuery = `select DISTINCT portfolios.id as portfolio_id, tickers.ticker, portfolio_datas.quantity as quantity, portfolios.funds as funds   
                          from portfolios 
                          left join portfolio_datas ON portfolios.id = portfolio_datas.portfolio_id 
                          left join tickers ON portfolio_datas.ticker_id = tickers.id 
                          where portfolios.id = $1;`;
            db.query(pQuery, [portfolio_id])
              .then(portfolioDatas => {
                //console.log("Line 208", portfolioDatas.rows);
                // 3. Create list of portfolio's tickers
                let url = "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=";
                let listTickers = "";
                let totalValue = 0;
                for (const pData of portfolioDatas.rows) {
                  listTickers += pData.ticker + ',';
                }

                url += listTickers + '&apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPp';
                //console.log("Line 211", url);
                // 4. Call API to get lastest price of all tickers
                Promise.all([axios.get(url)])
                  .then((response) => {
                    // 5. Calculate portfolio's value by sum up the value of every ticker(quantity*lastest price)
                    let responseDataTicker = response[0].data.tickers;
                    //console.log("Line 216", responseDataTicker);
                    for (const i in portfolioDatas.rows) {
                      for (const j in responseDataTicker) {
                        if (portfolioDatas.rows[i].ticker === responseDataTicker[j].ticker) {
                          //result[i].price = responseDataTicker[j].day.c;
                          if (portfolioDatas.rows[i].quantity > 0) {
                            console.log("Ticker: ", portfolioDatas.rows[i].ticker);
                            console.log("Quantity: ", portfolioDatas.rows[i].quantity);
                            console.log("Price: ", (responseDataTicker[j].day.c || responseDataTicker[j].prevDay.c));

                            totalValue += portfolioDatas.rows[i].quantity * (responseDataTicker[j].day.c || responseDataTicker[j].prevDay.c);
                            console.log("Total Value: ", totalValue);
                          }
                        }
                      }
                    }
                    totalValue += Number(portfolioDatas.rows[0]["funds"]); 
                    //console.log("Line 228", totalValue);
                    // 6. Update the value into Database
                    let datetime = new Date();
                    let insertQuery = "INSERT INTO portfolio_values (portfolio_id, datetime, value) VALUES ($1, $2, $3);";
                    console.log("Line 232, insert query: ", insertQuery);
                    db.query(insertQuery, [portfolio_id, datetime, totalValue])
                      .then((data) => {
                        console.log(`Create snapshot successfull. PortfolioID: ${portfolio_id}. New value: ${totalValue}`);
                        return;
                      })
                      .catch((error) => {
                        console.log(error);
                        return;
                      })
                  })
                  .catch((error) => {
                    console.log(error);
                        return;
                  });
              })
              .catch(error => { 
                console.log(error);
                return;
              })
          }
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  });

  scheduledJobFunction.start();
}