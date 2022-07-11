import React from 'react';
import CompetitionsTableItem from './CompetitionsTableItem'
import { seeUserInComp } from '../../helpers/sidebarHelper';

export default function CompetitionsTable (props) {

  const competitionsList = props.competitions.map((competition) => {

    return (
      <CompetitionsTableItem
      key={competition.id}
      name={competition.name}
      lobby = {competition.users}
      capital = {competition.capital}
      prizePool = {competition.prizePool}
      startDate = {competition.start_date}
      endDate = {competition.end_date}
      avaliability = {competition.avaliability}
      />
    );
  });


    return (
      <div className="competition-list">
            <h1 className = "competition-titles">Competitions</h1>
            <div className="Table-Div">
      <table>
  <thead>
    <tr>
      <th className = "start-th">Name</th>
      <th>Lobby</th>
      <th>Capital</th>
      <th>Prize Pool</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th className = "end-th">Avaliability</th>
    </tr>
  </thead>
  <tbody>
 {competitionsList}
 </tbody>
  </table>
  </div>
    </div>
    )
}