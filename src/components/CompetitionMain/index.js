import React from "react";
import "./CompetitionMain.scss";

import CompetitionsTable from "./CompetitionsTable";
import UserCompetitions from "./UserCompetitions";

export default function PortfolioMain(props) {
  return (
    <div className="competition-main">
      <div className="competition-list">
        Competitions
        <CompetitionsTable />
      </div>
      <div className="competition-user-list">
       Users Competitions
        <UserCompetitions />
      </div>
    </div>
  );
}
