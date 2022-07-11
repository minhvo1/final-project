import React, { useState, useEffect } from 'react';
import { getPortfolioTickers, getPromiseArrayTickers } from "../../helpers/portfolioMainHelper"


export default function AssetTable(props) {
  const [tickersData, setTickersData] = useState([])

  const tickers = getPortfolioTickers(props.selectedPortfolio, props.data);
  const promiseArray = getPromiseArrayTickers(tickers)

  useEffect(() => {
    Promise.all(promiseArray)
      .then((result) => {

        let resultArray = [];
        for (const item of result) {
          resultArray.push(item.data[0])
        }
        
        setTickersData(resultArray)
      })
  }, [props.selectedPortfolio])

  //console.log(tickersData)
  //console.log(tickers)
  return (
    <div className="asset-table">
      <div>
        <span>Assets</span>
      </div>

      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Quanity</th>
            <th>Amount</th>
            <th>Return</th>
          </tr>
          <tr>
            <td>GameStop</td>
            <td>GME</td>
            <td>$100,000</td>
            <td>$10,000</td>
            <td>5,000,000</td>
            <td>+ $5,000</td>
          </tr>
        </table>
      </div>
    </div>
  )
}