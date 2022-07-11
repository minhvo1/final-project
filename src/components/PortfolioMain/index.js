import React from 'react';
import './PortfolioMain.scss';

import PortfolioInfo from './PortfolioInfo';
import PerformanceGraph from './PerformanceGraph';
import AssetTable from './AssetsTable';

export default function PortfolioMain(props) {

  return (
    <div className="portfolio-main">
      <PortfolioInfo />
      <PerformanceGraph />
      <AssetTable selectedPortfolio={props.selectedPortfolio} data={props.data}/>
    </div>
  )
}