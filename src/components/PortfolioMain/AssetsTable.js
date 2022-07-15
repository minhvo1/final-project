import React, { useState, useEffect } from "react";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";
import { checkArray, findTickerIndex } from '../../helpers/sidebarHelper';


export default function AssetTable(props) {

  let index = checkArray(props.selectedPortfolio, props.assetData["portfolios"])

  const moreInfo = (ticker) => {
    let dataToRender = {
      ticker : ticker, 
      portfolio : props.selectedPortfolio
    }
    props.setNewPopup("Ticker", dataToRender)
  }

console.log(props);

let dataToShow = props.data.map(ticker => {
  let indexTicker = findTickerIndex(ticker.id, props.assetData["portfolios"][index]["tickers"])
  let totalBoughtPrice = (props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerAvgPrice"] * props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerQuantity"]);
  let returnAmount = ticker.amount - totalBoughtPrice;
  ticker.avgBoughtPrice = Number(props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerAvgPrice"]); 
  ticker.returnAmount = Number(returnAmount); 
  return (
    <tr>
      <td className="ticker-name">{ticker.company_name}</td>
      <td>{ticker.ticker}</td>
      <td>{`$${numberWithCommas(Math.round((ticker.price + Number.EPSILON) * 100) / 100)}`}</td>
      <td>{ticker.quantity}</td>
      <td>{`$${numberWithCommas(Math.round((ticker.amount + Number.EPSILON) * 100) / 100)}`}</td>
      <td>{`$${numberWithCommas(Math.round((returnAmount + Number.EPSILON) * 100) / 100)}`}</td>
      <td><button className = "join-button" onClick={() => {moreInfo(ticker)}}>Info</button></td>
    </tr>
  )
})

  return (
    <div className="asset-table">
      <div>
        <span>Assets</span>
      </div>

      <div className="main-asset-table">
        <table>
          <thead>
            <tr>
              <th className="ticker-name th-start">Name</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Amount</th>
              <th>Return</th>
              <th className="th-end">View</th>
            </tr>
          </thead>
          <tbody>

              {dataToShow}
          </tbody>
         

        </table>
      </div>
    </div>
  );
}
