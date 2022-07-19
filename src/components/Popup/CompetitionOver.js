import React, { Fragment, useState } from "react";
import "./Popup.scss";
import { highestPortfolio } from "../../helpers/sidebarHelper";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";

export default function CompetitionOver(props) {
  const winner = highestPortfolio(props.info[0].portfolios);
  const result = props.info[0].userCompPortfolio.name === winner;

  const confirm = () => {
    props.deletePortfolio(props.info[0].userCompPortfolio.id);
    props.setMenu("Dashboard");
  };

  const confirmWon = () => {
    props.setMenu("Dashboard");
  };

  return (
    <div className="competition-over">
      {result && (
        <div className="results you-win">
          <h1>You Win!</h1>
          <h2>
            You ranked First among <b>{props.info[0].users}</b> users in the
            competition
          </h2>
          <br />
          <h2>
            Total Value of your portfolio was : <b>{`$${numberWithCommas(Math.round((winner.value + Number.EPSILON) * 100) / 100)}`}</b>
          </h2>
          <br />
          <h2>
            Your profit was : <b>{`$${numberWithCommas(Math.round((winner.value - props.info[0].capital + Number.EPSILON) * 100) / 100)}`}</b>
          </h2>
          <br />
          <h2>
            Your prize is : <b>{props.info[0].prizePool}</b>
          </h2>



          <button className="confirm-profit-button" onClick={confirmWon}>
            Confirm
          </button>
        </div>
      )}
      {!result && (
        <div className="results you-lose">
          <h1>You Lost!</h1>
          <h2>
            There were <b>{props.info[0].users}</b> users in the competition
          </h2>
          <br />
          <h2>
            Total Value of your portfolio was :{" "}
            <b>{`$${numberWithCommas(Math.round((props.info[0].userCompPortfolio.total_value + Number.EPSILON) * 100) / 100)}`}</b>
            
          </h2>
          <br />
          <h2>
            Your profit was :{" "}
            <b>{`$${numberWithCommas(Math.round((props.info[0].userCompPortfolio.total_value -
                props.info[0].capital + Number.EPSILON) * 100) / 100)}`}</b>
 
          </h2>
          <br />
          <h2>Better luck next time!</h2>
          <br />

          <button className="confirm-delete-button" onClick={confirm}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
