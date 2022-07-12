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
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([axios.get("https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-07-10/2022-07-11?adjusted=true&sort=asc&limit=120&apiKey=KR_4M5C_Bx0OkMvz3ncgz2brEnmUmDPp")])
      .then((response) => {
        // console.log(response)
        // let resultData = [];
        // for (let i in response[0].data.chart.result[0].timestamp) {
        //   resultData.push({
        //     value: response[0].data.chart.result[0].indicators.quote[0].close[i],
        //     time: response[0].data.chart.result[0].timestamp[i] * 1000 ,
        //   });
        // }
        // setData(
        //   ...data,
        //   resultData);
      })
      .catch(function (error) {
        console.log(error);
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
            tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
        
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
