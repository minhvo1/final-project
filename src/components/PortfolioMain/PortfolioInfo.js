import React from 'react';

export default function PortfolioInfo(props) {
  return (
    <div className="portfolio-info">
      <div className="portfolio-value-return">
        <div className="portfolio-value">
          <header>Portfolio Value</header>
          <span>$100,000</span>
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