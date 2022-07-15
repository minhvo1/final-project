import React from 'react';
import { numberWithCommas } from "../../helpers/portfolioMainHelper"
import { checkArray,findCompetition } from '../../helpers/sidebarHelper';

export default function PortfolioInfo(props) {
  let index = checkArray(props.portfolio, props.assetData["portfolios"])
  let funds = Number(props.assetData["portfolios"][index]["funds"]);
  let totalValue = Number(props.assetData["portfolios"][index]["total_value"]);
  let competition = findCompetition(props.assetData["portfolios"][index]["id"], props.assetData["competitions"]);

  let value = 0;
  for (let ticker of props.data) {
    value += (ticker.price * ticker.quantity);
  }
  
let tickers = (props.assetData["portfolios"][index]["tickers"]);
let initalValue = 0; 

for (let ticker of tickers) {
  initalValue += (Number(ticker.tickerQuantity) * Number(ticker.tickerAvgPrice)) 
}

  let totalReturn = 0;
  if(props.assetData["portfolios"][index]["portfolio_competition"]) {
    totalReturn = Number(props.assetData["portfolios"][index]["total_value"]) - Number(competition["capital"])
  } else {
    totalReturn = Number(value)-initalValue;
  }
  const totalFunds = `$${numberWithCommas(Math.round((funds + Number.EPSILON) * 100) / 100)}`
  const totalReturnValue = `$${numberWithCommas(Math.round((totalReturn + Number.EPSILON) * 100) / 100)}`
  const stockValue = `$${numberWithCommas(Math.round((value + Number.EPSILON) * 100) / 100)}`
  const portfolioValue = `$${numberWithCommas(Math.round((totalValue + Number.EPSILON) * 100) / 100)}`
  return (
    <div className="portfolio-info">
      <div className="portfolio-value-return">
        <div className="portfolio-value">
          <header>Portfolio Value</header>
          <span>{portfolioValue}</span>
        </div>
        <div className="portfolio-return">
          <header>Total Return</header>
          <span>{totalReturnValue}</span>
        </div>
      </div>
      <div className="daily-return">
        <header>Investment Value</header>
        <span>{stockValue}</span>
      </div>
      <div className="available-funds">
        <header>Available Funds</header>
        <span>{totalFunds}</span>
      </div>

    </div>
  );
}