import React from "react";
import "./CompetitionMain.scss";
import CompetitionsTable from "./CompetitionsTable";
import UserCompetitionsTable from "./UserCompetitions";

export default function PortfolioMain(props) {
  return (
    <div className="competition-main">
      <CompetitionsTable 
      competitions={props.competitions}
      setNewPopup = {props.setNewPopup}
       />
      <UserCompetitionsTable 
      user_competitions={props.user_competitions} 
      setNewPopup = {props.setNewPopup}
      competitions = {props.competitions}
      data = {props.data}
      />
    </div>
  );
}
