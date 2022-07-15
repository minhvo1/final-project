import React from 'react';
import { numberWithCommas } from "../../helpers/portfolioMainHelper"

export default function PortfolioInfo(props) {
  let value = 0;
  console.log(props.data)
  for (let ticker of props.data) {
    value += (ticker.price * ticker.quantity);
  }
  const portfolioValue = `$${numberWithCommas(Math.round((value + Number.EPSILON) * 100) / 100)}`
  return (
    <div className="portfolio-info">
      <div className="portfolio-value-return">
        <div className="portfolio-value">
          <header>Portfolio Value</header>
          <span>{portfolioValue}</span>
        </div>
        <div className="portfolio-return">
          <header>Total Return</header>
          <span>+ $5,000</span>
        </div>
      </div>
      <div className="daily-return">
        <header>Daily Return</header>
        <span>+ 10%</span>
      </div>
      <div className="available-funds">
        <header>Available Funds</header>
        <span>$50,000</span>
      </div>

    </div>
  );
}