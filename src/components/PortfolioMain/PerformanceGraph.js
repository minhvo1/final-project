import React, { useState, useEffect } from "react";
import axios from "axios";
import { numberWithCommas } from '../../helpers/portfolioMainHelper'
import {
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import moment from "moment";

export default function PerformanceGraph(props) {
  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "All"];
  // const test = new Date(props.data[0].datetime).getTime()
  // console.log(test)
  for (const item of props.data) {
    const timestamp = new Date(item.datetime).getTime();
    item.new_date = timestamp;
  }

  // const options = {
  //   method: "GET",
  //   url: "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPpo&region=US&interval=1d&lang=en&events=div%2Csplit"
  // };

  return (
    <div className="performance-graph">
      <div>
        <span>Performance Graph</span>
        <div className="timeframe-buttons">
     
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart>
          <XAxis
            dataKey="new_date"
            domain={["dataMin", "dataMax"]}
            name="Time"
            tickFormatter={(timeStr) => moment(timeStr).format("DD-MMM-YY")}
            type="number"
            dy={10}
          />
          <YAxis 
            dataKey="value" 
            name="Value" 
            domain={["auto", "auto"]} 
            width={80}
            dx={-5}
            type="number"
            tickFormatter={value => {
              return (`$${numberWithCommas(value)}`)
            }}
          />

          <Line
            data={props.data}
            dataKey="value"
            stroke="#A374D2"
            dot={false}
            type="monotone"
            name="Values"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
