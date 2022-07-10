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

  const options = {
    method: "GET",
    url: "https://yfapi.net/v8/finance/chart/AMC?comparisons=MSFT%2CAAPL%2CGME%2CAMZN%2C&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
    params: { modules: "defaultKeyStatistics,assetProfile" },
    headers: {
      "x-api-key": "tBiKYaLo777hpz2ksuxSL7ERqNDrdIn27eqCExlQ",
    },
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([axios.request(options)])
      .then((response) => {
   
        let resultData = [];
        for (let i in response[0].data.chart.result[0].timestamp) {
          resultData.push({
            value: response[0].data.chart.result[0].indicators.quote[0].close[i],
            time: response[0].data.chart.result[0].timestamp[i] * 1000 ,
          });
        }
        setData(
          ...data,
          resultData);
      })
      .catch(function (error) {
        console.error(error);
      });
  },[]);

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
            dataKey="time"
            domain={["auto", "auto"]}
            name="time"
            tickFormatter={timeStr => moment(timeStr).format('DD MMM YYYY')}
        
          />
          <YAxis dataKey="value" name="Value" />

          <Scatter
            data={data}
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
