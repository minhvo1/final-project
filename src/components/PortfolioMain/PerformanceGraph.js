import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import moment from "moment";

export default function PerformanceGraph(props) {
  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "All"];

  // const options = {
  //   method: "GET",
  //   url: "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPpo&region=US&interval=1d&lang=en&events=div%2Csplit"
  // };
  console.log(props.data)
  return (
    <div className="performance-graph">
      <div>
        <span>Performance Graph</span>
        <div className="timeframe-buttons">
          {timeframes.map((time) => {
            return <button key={time}>{time}</button>;
          })}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <XAxis
            dataKey="datetime"
            domain={["auto", "auto"]}
            name="time"
            tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
        
          />
          <YAxis dataKey="value" name="Value" />

          <Scatter
            data={props.data}
            line={{ stroke: "#eee" }}
            lineJointType="monotoneX"
            lineType="joint"
            name="Values"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
