import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceGraph(props) {
  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "All"];
  const options = {
    method: "GET",
    url: "https://yfapi.net/v8/finance/chart/AAPL?comparisons=MSFT%2C%20GME&range=6mo&region=US&interval=1wk&lang=en&events=div%2Csplit",
    params: { modules: "defaultKeyStatistics,assetProfile" },
    headers: {
      "x-api-key": "4srRVAEAot50NQgO71T2s82w94GyqbIp23UpxDtf",
    },
  };
  // const [state, setState] = useState({});

  // console.log('state',state)
  useEffect(() => {
    Promise.all([
      axios
        .request(options)
        .then(function (response) {
          console.log('data',response.data);
        })
        .catch(function (error) {
          console.error(error);
        }),
    ]);
  });

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
      <ResponsiveContainer width="100%" height="100%" className="main-graph">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
