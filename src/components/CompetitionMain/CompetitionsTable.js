import React from 'react';
import CompetitionsTableItem from './CompetitionsTableItem'

export default function CompetitionsTable (props) {
    return (
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Lobby</th>
      <th>Capital</th>
      <th>Prize Pool</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Avaliability</th>
    </tr>
  </thead>
  <CompetitionsTableItem/>
  </table>
    )
}