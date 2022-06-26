import React from 'react';
import UserCompetitionsItem from './UserCompetitionsItem'

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
  <UserCompetitionsItem/>
  </table>
    )
}