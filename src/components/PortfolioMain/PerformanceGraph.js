import React from 'react';
import { Chart } from 'chart.js'

export default function PerformanceGraph(props) {
  const timeframes = ['1D','1W','1M','3M','1Y','All'];
  return (
    <div className="performance-graph">
      <div>
        <span>Performance Graph</span>
        <div className="timeframe-buttons">
          {timeframes.map((time) => {
            return (
              <button>{time}</button>
            );
          })}
        </div>
      </div>
      <div className="main-graph">

      </div>
    </div>
  )
}