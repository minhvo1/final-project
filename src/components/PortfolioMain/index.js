import { React, useEffect, useState } from "react";
import axios from "axios";
import "./PortfolioMain.scss";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
} from "../../helpers/portfolioMainHelper";
import PortfolioInfo from "./PortfolioInfo";
import PerformanceGraph from "./PerformanceGraph";
import AssetTable from "./AssetsTable";

export default function PortfolioMain(props) {
  const [tickersData, setTickersData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState([]);
  const tickers = getPortfolioTickers(props.selectedPortfolio, props.data);
  const promiseArray = getPromiseArrayTickers(tickers);
  
useEffect(() => {
  async function render () {
    Promise.all(promiseArray)
      .then((result) => {
        let resultArray = [];
        for (const item of result) {
          resultArray.push(item.data[0]);
        }

        const newResultArray = resultArray.map((item, index) => {
          item.quantity = tickers[index].tickerQuantity;
          return item;
        });

        return newResultArray;
      })
      .then((result) => {

        let url = "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers="
        for (const item of result) {
          url = url + item.ticker + ','
        }
        url += '&apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPp';
  
        Promise.all([axios.get(url)])
          .then((response) => {

            let responseDataTicker = response[0].data.tickers
            for (const i in result) {
              for (const j in responseDataTicker) {
                if (result[i].ticker === responseDataTicker[j].ticker) {
                  result[i].price = responseDataTicker[j].day.c;
                }
              }
              if (!result[i].price) result[i].price = null;
              result[i].amount =  result[i].price * result[i].quantity
            }
        
            return result;
          }) . then((result) => {
            setTickersData(result)
          })
          .then(() => {
            Promise.all([axios.get(`http://localhost:3001/value/${props.selectedPortfolioId}`)])
              .then((response) => {
                setPortfolioValue(response[0].data)
              })
          })
      })

}
  await render()
}, [props.selectedPortfolio]);


  return (
    <div className="portfolio-main">
      <PortfolioInfo data={tickersData}
      assetData = {props.data}
      portfolio = {props.selectedPortfolio}
      />
      <PerformanceGraph data={portfolioValue} />
      <AssetTable
        selectedPortfolio={props.selectedPortfolio}
        data={tickersData}
        assetData = {props.data}
        setNewPopup={props.setNewPopup}
      />
    </div>
  );
}
