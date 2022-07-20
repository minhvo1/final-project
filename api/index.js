require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcryptjs");
var cookieSession = require('cookie-session')

// Handle schedule jobs
const scheduledFunctions = require("./scheduled_jobs/cron");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST"],
  })
);

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { json } = require("express");
const db = new Pool(dbParams);
db.connect();


// Call schedule jobs
scheduledFunctions.initScheduledJobs(db);

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tickers`)
    .then((data) => {
      //console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((data) => {
      const user = data.rows[0];

      res.json({userId : user.id});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

app.get("/competitions", (req, res) => {
  db.query(`SELECT * FROM competitions`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/allPortfolio", (req, res) => {
  db.query(`SELECT * FROM portfolios`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/allCompetitionPortfolios", (req, res) => {
  db.query(`SELECT * FROM portfolios WHERE competition_id IS NOT NULL `)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/competitions/user/:id", (req, res) => {
  db.query(`SELECT * FROM competition_users WHERE user_id = $1`, [
    req.params["id"],
  ])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/userdata/:id", (req, res) => {
  db.query(
    `SELECT users.id as id, users.name as userName, users.type as type, users.email as email, portfolios.name as portfolio_name, portfolios.id as portfolio_id, 
    portfolios.date_created as portfolioDateCreated, portfolios.competition_id as portfolioCompetition, portfolios.funds as portfolioFunds, portfolios.total_value as portfolioTotalValue, competition_users.competition_id as competitionsIds, 
    portfolio_datas.quantity as tickerQuantity, portfolio_datas.ticker_id as portfolioDatasTickerId, portfolio_datas.avgPrice as tickerAveragePrice
    FROM users FULL OUTER JOIN portfolios ON users.id = portfolios.user_id FULL OUTER JOIN competition_users ON portfolios.user_id = competition_users.user_id LEFT JOIN portfolio_datas ON portfolios.id = portfolio_datas.portfolio_id
    WHERE users.id = $1`,
    [req.params.id]
  )
    .then((data) => {
      //console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolio_values", (reg, res) => {
  const searchTerm = reg.query.query;
  if (searchTerm === "") {
    return res.json({});
  }
  const query = `SELECT * FROM portfolio_values;`;
  db.query(query)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/compUsers", (req, res) => {
  const query = `SELECT competitions.id as competition_id, 
  competitions.name as competition_Name, competitions.start_datetime as startTime, competitions.end_datetime as endTime, 
  competitions.start_amount as startAmount, competitions.avaliability as avaliabilty, 
  portfolios.name as portfolio_name, portfolios.total_value as portfoliototalvalue FROM portfolios FULL OUTER JOIN competitions ON portfolios.competition_id = competitions.id`;
  db.query(query)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => {res.json({ message: err })
  console.log(err);
  });
});

app.get("/portfolio_datas", (req, res) => {
  const query = `SELECT * from portfolio_datas`;
  db.query(query)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users`)
    .then((data) => {
      //console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolios/:id", (req, res) => {
  db.query(`SELECT * FROM portfolios WHERE user_id = $1`, [req.params["id"]])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfoliosID/:id", (req, res) => {
  db.query(`SELECT * FROM portfolios WHERE id = $1`, [req.params["id"]])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolio/", (req, res) => {
  db.query(`SELECT * FROM portfolio_datas WHERE portfolio_id = 1`).then(
    (data) => {
      res.json(data.rows);
    }
  );
});

app.get("/portfolioLatest/", (req, res) => {
  db.query(`SELECT id FROM portfolios ORDER BY id DESC LIMIT 1`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/ticker/:id", (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM tickers 
    WHERE id = $1`;
  db.query(query, [id]).then((data) => {
    //console.log(data.rows);
    res.json(data.rows);
  });
});

app.get("/search", (reg, res) => {
  const searchTerm = reg.query.query;
  if (searchTerm === "") {
    return res.json({});
  }
  const query = `SELECT * FROM tickers WHERE ticker LIKE '%${searchTerm.toUpperCase()}%' LIMIT 10;`;
  db.query(query)
    .then((data) => {
      //console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.post("/newPortfolio", (req, res) => {
  if (process.env.TEST_ERROR) {
    setTimeout((response) => response.status(500).json({}), 1000);
    return;
  }
  const { portfolioName, user_id, competition_id, funds, total_value } = req.body;
  db.query(
    `INSERT INTO portfolios (name, user_id, competition_id, funds, total_value) VALUES ($1, $2, $3, $4, $5)`,
    [portfolioName, user_id, competition_id, funds, total_value]
  )
    .then((data) => {
      console.log(data["rows"])
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

app.post("/newPortfolioValue", (req, res) => {
  if (process.env.TEST_ERROR) {
    setTimeout((response) => response.status(500).json({}), 1000);
    return;
  }
  const { portfolio_id, value } = req.body;
  db.query(
    `INSERT INTO portfolio_values (portfolio_id, value) VALUES ($1, $2)`,
    [portfolio_id, value]
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});


app.post("/value", (req, res) => {
  const { portfolio_id, datetime, value } = req.body;
});

app.get("/value/:id", (req, res) => {
  const { id } = req.params;
  if (id === "null") return res.json([]);
  let query = `SELECT * FROM portfolio_values 
  WHERE portfolio_id = $1`;
  db.query(query, [id]).then((data) => {
    res.json(data.rows);
  })
});

  app.put("/portfolios/:id/add", (req, res) => {
    /* console.log(req.body.ticker_id);
    console.log(req.params.id);
     (1, 1, 1);
   */
    db.query(
      `INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id, avgPrice) VALUES($1, $2, $3, 0)`,
      [0, req.params.id, req.body.ticker_id]
    )
      .then((data) => {
        res.json("success");
      })
      .catch((err) => res.json({ message: err }));
  });

  app.get("/resetCOMP", (req, res) => {
    db.query(
      `UPDATE competitions SET avaliability = true where avaliability = false`)
      .then((data) => {
        res.json("success");
      })
      .catch((err) => res.json({ message: err }));
  });

  app.put("/editPortfolios", (req, res) => {
    let funds = Number(req.body.funds);
    let id = Number(req.body.portfolioId);

    db.query(
      `UPDATE portfolios SET funds = $1 WHERE id = $2;`,
      [funds, id]
    )
      .then((data) => {
         res.json("success");
      })
      .catch((err) => {
        res.json({ message: err })
    
    });
  });

  app.get("/competition_end", (req,res) => {
    db.query(
      `SELECT competitions.name as competition_Name, competitions.start_amount as startAmount, competitions.end_datetime as endTime, 
      portfolios.name as portfolio_Name, portfolios.total_value as portfolio_totalValue FROM competitions FULL OUTER JOIN portfolios ON competitions.id = portfolios.competition_id 
      `
    )
      .then((data) => {
        res.json(data["rows"]);
      })
      .catch((err) => {
        res.json({ message: err })
        console.log(err);
    })
  })


  app.get("/portfolio_datas", (reg, res) => {
    const searchTerm = reg.query.query;
    if (searchTerm === "") {
      return res.json({});
    }
    const query = `SELECT * FROM portfolio_datas;`;
    db.query(query)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => res.json({ message: err }));
  });
 
  app.put("/editPortfolio_datas", (req, res) => {
    console.log(req.body.originalPrice)
    if (req.body.existing) {
      db.query(
        `UPDATE portfolio_datas SET quantity = $1, avgPrice = $2 WHERE portfolio_id = $3 AND ticker_id = $4`,
        [req.body.quantity ,req.body.originalPrice, req.body.portfolioId, req.body.tickerId, ]
      )
        .then((data) => {
          res.json("success");
        })
        .catch((err) => {
          res.json({ message: err })
          console.log("THAT ONE ", err);
      })}else {
      db.query(
        `INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id, avgPrice) VALUES ($1, $2, $3, $4)`,
        [req.body.quantity ,req.body.portfolioId, req.body.tickerId, req.body.originalPrice]
      )
        .then((data) => {
          res.json("success");
        })
        .catch((err) => {
          res.json({ message: err })
          console.log("THIS ONE",err);

      })}
    
  });

  app.post("/newTransactions", (req, res) => {
    db.query(
      `INSERT INTO transactions (type, amount, ticker_id, user_id, price) VALUES ($1, $2, $3, $4, $5)`,
      [req.body.type ,req.body.amount, req.body.ticker_id, req.body.userId, req.body.tickerPrice]
    )
      .then((data) => {
        res.json("success");
      })
      .catch((err) => res.json({ message: err }));
  });

app.post("/deleteTicker", (req, res) => {
  db.query(
    `DELETE from portfolio_datas WHERE portfolio_id = $1 AND ticker_id = $2`,
    [req.body.portfolioId, req.body.tickerId]
  )
    .then((data) => {
      res.json("success");
    })
    .catch((err) => res.json({ message: err }));
  })

app.get("/latestPortfolioValue/:id", (req, res) => {
  db.query(
    `SELECT * FROM portfolio_values WHERE portfolio_id = $1 ORDER BY datetime DESC LIMIT 1 `,
    [req.params.id]
  )
  .then((data) => {
    res.json(data.rows);
  })
  .catch((err) => res.json({ message: err }));
});

app.put("/updatePortfolioTotal", (req, res) => {
  db.query(
    `UPDATE portfolios SET total_value = $1 WHERE id = $2;`,
    [req.body.value, req.body.id]
  )
    .then((data) => {
      res.json("success");
    })
    .catch((err) => {
      res.json({ message: err })
  
  });
});
app.post('/newComp', (req,res) => {
  db.query(`INSERT INTO competitions (name, end_datetime, start_amount) VALUES ($1, $2, $3)`, [req.body.name, req.body.date, req.body.startAmount])
.then((data) => {
  res.json("success")
})    .catch((err) => {
  res.json({ message: err })})
})

app.put('/deactivateComp', (req,res) => {
  db.query(`UPDATE competitions SET avaliability = false WHERE id = $1`, [req.body.competition])
.then((data) => {
  res.json("success")
})    .catch((err) => {
  res.json({ message: err })})
})


app.post('/deletePortfolios', (req,res) => {
  console.log(req.body.id);
  db.query(`DELETE from portfolios WHERE id = $1 `, [req.body.id])
.then((data) => {
  res.json("success")
})    .catch((err) => {
  console.log(err);
  res.json({ message: err })})
})



 /*app.get("/get_tickers", (req, res) => {
  const results = [];

  fs.createReadStream('./datas/listing_status.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
      let string = "";
      for (const row of results) {
        string += `INSERT INTO tickers (portfolio_id, ticker, company_name) VALUES (1, '${row['symbol']}', '${row['name']}');`
        string += "<br />";
    
      }
      console.log(string);
      return res.send(string);
    });
});*/

app.get("/lol", (req, res) => {
  db.query(
    `SELECT DISTINCT portfolios.id as portfolio_id, tickers.ticker, portfolio_datas.quantity as quantity, portfolios.funds as funds   
                  from portfolios 
                  LEFT JOIN portfolio_datas ON portfolios.id = portfolio_datas.portfolio_id 
                  LEFT JOIN tickers ON portfolio_datas.ticker_id = tickers.id 
                  WHERE portfolios.id = 1;`
  )
  .then((data) => {
    res.json(data.rows);
  })
  .catch((err) => res.json({ message: err }));
});

app.get("/portfolio/:id/updateValue", (req, res) => {
  if (!req.params.id) {
    return res.json({"error":"Must provide portfolio_id"})
  }
  const portfolio_id = req.params.id;

  const pQuery = `SELECT DISTINCT portfolios.id as portfolio_id, tickers.ticker, portfolio_datas.quantity as quantity, portfolios.funds as funds   
                  from portfolios 
                  LEFT JOIN portfolio_datas ON portfolios.id = portfolio_datas.portfolio_id 
                  LEFT JOIN tickers ON portfolio_datas.ticker_id = tickers.id 
                  WHERE portfolios.id = $1;`;
  db.query(pQuery, [portfolio_id])
    .then(portfolioDatas => {
      console.log("Line 208", portfolioDatas.rows);
      if (portfolioDatas.rows.length === 0) {
        return res.json({"error" : "Portfolio ID is invalid"});
      }
      // 3. Create list of portfolio's tickers
      let url = "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=";
      let listTickers = "";
      let totalValue = 0;
      for (const pData of portfolioDatas.rows) {
        listTickers += pData.ticker + ',';
      }

      url += listTickers + '&apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPp';
      console.log("Line 211", url);
      // 4. Call API to get lastest price of all tickers
      Promise.all([axios.get(url)])
        .then((response) => {
          // 5. Calculate portfolio's value by sum up the value of every ticker(quantity*lastest price)
          let responseDataTicker = response[0].data.tickers;
          console.log("Line 216", responseDataTicker);
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
          console.log(totalValue);
          totalValue += Number(portfolioDatas.rows[0]["funds"]); 
          console.log("Line 228", totalValue);
          // 6. Update the value into Database
          let datetime = new Date();
          let insertQuery = "INSERT INTO portfolio_values (portfolio_id, datetime, value) VALUES ($1, $2, $3);";
          console.log("Line 232, insert query: ", insertQuery);
          db.query(insertQuery, [portfolio_id, datetime, totalValue])
            .then((data) => {
              console.log("Sucess");
              res.json({message: "Sucesss"});
            })
            .catch((error) => {
              console.log(error);
              res.json({ message: error });
              //.catch((err) => res.json({ message: err }));
            })
        })
        .catch((error) => {res.json({ message: error }) });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: error })
    });

    
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
