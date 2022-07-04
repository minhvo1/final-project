import React from 'react';

export default function AssetTable(props) {
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