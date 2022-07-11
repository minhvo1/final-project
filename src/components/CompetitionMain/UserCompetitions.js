import React from 'react';
import UserCompetitionsItem from './UserCompetitionsItem'

export default function UserCompetitionsTable (props) {


  const user_competition = props.user_competitions.map((competition) => {
    return (
      <UserCompetitionsItem
      key={competition.id}
      name={competition.name}
      lobby = {competition.users}
      capital = {competition.capital}
      prizePool = {competition.prizePool}
      startDate = {competition.start_date}
      endDate = {competition.end_date}
      profit = {"100"}
      />
    );
  });


    return (
      <div className="competition-user-list">
      <h1 className = "competition-titles">Users Competitions</h1>

      <div className = "Table-Div">
<table>
  <thead>
  <tr>
      <th className = "start-th" >Name</th>
      <th>Lobby</th>
      <th>Capital</th>
      <th>Prize Pool</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th className = "end-th">Profit Status</th>
    </tr>
  </thead>
  <tbody>
 {user_competition}
 </tbody>
  </table>
  </div>
       </div>
    )
}