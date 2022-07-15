import React, { useState, useEffect } from "react";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";


export default function AssetTable(props) {
 
  const moreInfo = (ticker) => {
    let dataToRender = {
      ticker : ticker, 
      portfolio : props.selectedPortfolio
    }
    props.setNewPopup("Ticker", dataToRender)
  }

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
            <th>View</th>
          </tr>
          {props.data.map(ticker => {
            return (
              <tr>
                <td>{ticker.company_name}</td>
                <td>{ticker.ticker}</td>
                <td>{`$${numberWithCommas(Math.round((ticker.price + Number.EPSILON) * 100) / 100)}`}</td>
                <td>{ticker.quantity}</td>
                <td>{`$${numberWithCommas(Math.round((ticker.amount + Number.EPSILON) * 100) / 100)}`}</td>
                <td></td>
                <td><button className = "join-button" onClick={() => {moreInfo(ticker)}}>Info</button></td>
              </tr>
            )
          })}

        </table>
      </div>
    </div>
  );
}
