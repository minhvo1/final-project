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

      </div>
      <div className="available-funds">
        
      </div>
    </div>
  );
}