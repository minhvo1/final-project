import React, { useState, useEffect } from "react";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
} from "../../helpers/portfolioMainHelper";

export default function AssetTable(props) {
  const [tickersData, setTickersData] = useState([]);

  const tickers = getPortfolioTickers(props.selectedPortfolio, props.data);
  const promiseArray = getPromiseArrayTickers(tickers);

  useEffect(() => {
    Promise.all(promiseArray).then((result) => {
      let resultArray = [];
      for (const item of result) {
        resultArray.push(item.data[0]);
      }

      const newResultArray = resultArray.map((item, index) => {
        item.quantity = tickers[index].tickerQuantity;
        return item;
      });
      setTickersData(newResultArray);
    });
  }, [props.selectedPortfolio]);

  console.log(tickersData);

  return (
    <div className="asset-table">
      <div>
        <span>Assets</span>
      </div>

      <div className="main-asset-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Quanity</th>
            <th>Amount</th>
            <th>Return</th>
          </tr>
          {tickersData.map(ticker => {
            return (
              <tr>
                <td>{ticker.company_name}</td>
                <td>{ticker.ticker}</td>
                <td></td>
                <td>{ticker.quantity}</td>
                <td></td>
                <td></td>
              </tr>
            )
          })}

        </table>
      </div>
    </div>
  );
}
