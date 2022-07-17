import React, { Fragment, useState } from "react";
import "./Popup.scss";
import { highestPortfolio } from "../../helpers/sidebarHelper";

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
        <div className="you-win">
          <h1>You Win!</h1>
          <h2>
            You ranked First among <b>{props.info[0].users}</b> users in the
            competition
          </h2>
          <br />
          <h2>
            Total Value of your portfolio was : <b>{winner.value}</b>
          </h2>
          <br />
          <h2>
            Your profit was : <b>{winner.value - props.info[0].capital}</b>
          </h2>
          <br />
          <h2>
            Your prize is : <b>{props.info[0].prizePool}</b>
          </h2>

          <h2>Click confirm to exit and grab your profit</h2>

          <button className="confirm-profit-button" onClick={confirmWon}>
            Confirm
          </button>
        </div>
      )}
      {!result && (
        <div className="you-lose">
          <h1>You Lost!</h1>
          <h2>
            There were <b>{props.info[0].users}</b> users in the competition
          </h2>
          <br />
          <h2>
            Total Value of your portfolio was :{" "}
            <b>{props.info[0].userCompPortfolio.total_value}</b>
          </h2>
          <br />
          <h2>
            Your profit was :{" "}
            <b>
              {props.info[0].userCompPortfolio.total_value -
                props.info[0].capital}
            </b>
          </h2>
          <br />
          <h2>Better luck next time!</h2>
          <br />
          <h2>Click confirm to delete your loser profile</h2>

          <button className="confirm-delete-button" onClick={confirm}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
