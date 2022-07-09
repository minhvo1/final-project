import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function AssetTable(props) {

  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const [tickerInfo, setTickerInfo] = useState([]);
  useEffect(() => {
    Promise.all([axios.get('http://localhost:3001/portfolio')])
      .then((response) => {
        setPortfolioInfo(
          ...portfolioInfo,
          response[0].data
        )
    
        for (const i in response[0].data) {
          Promise.all([axios.get(`http://localhost:3001/ticker/${response[0].data[i].ticker_id}`)])
            .then((response) => {
              console.log('res',response)
              setTickerInfo(prev => ({
                tickerInfo: [...prev, response[0].data]
              })
 
              )
            })
        }
      })
  }, [])
  console.log(portfolioInfo)
  console.log(tickerInfo)
  return (
    <div className="asset-table">
      <div>
        <span>Assets</span>
      </div>

      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Quanity</th>
            <th>Amount</th>
            <th>Return</th>
          </tr>
          <tr>
            <td>GameStop</td>
            <td>GME</td>
            <td>$100,000</td>
            <td>$10,000</td>
            <td>5,000,000</td>
            <td>+ $5,000</td>
          </tr>
        </table>
      </div>
    </div>
  )
}