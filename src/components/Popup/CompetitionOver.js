import React, { Fragment, useState } from "react";
import "./Popup.scss";
import {highestPortfolio} from "../../helpers/sidebarHelper";

export default function CompetitionOver(props) {
    const winner = highestPortfolio(props.info[0].portfolios);
    const result = props.info[0].userCompPortfolio.name === winner ;

    const confirm = () => {
        props.deletePortfolio(props.info[0].userCompPortfolio.id);
        props.setMenu("Dashboard");
    }
    
    return (
      <div className="competition-over">
        {result && 
        (
        <div className = "you-win">
        <h1>You Win!</h1>
        <h2>You ranked First among {props.info[0].users} users!</h2>
        <br/>
        <h2>Total Value of your portfolio was : {winner.value}</h2>
        <br/>
        <h2>Your profit was : {winner.value - props.info[0].capital}</h2>
        <br/>
        <h2>Your prize is : {props.info[0].prizePool}</h2>
        </div>
        )}
       {!result && 
        (
        <div className = "you-lose">
        <h1>You Lost!</h1>
        <h2>There were {props.info[0].users} users!</h2>
        <br/>
        <h2>Total Value of your portfolio was : {props.info[0].userCompPortfolio.total_value}</h2>
        <br/>
        <h2>Your profit was : {props.info[0].userCompPortfolio.total_value - props.info[0].capital}</h2>
        <br/>
        <h2>Better luck next time!</h2>
        <br/>
        <h2>Click confirm to delete your loser profile</h2>

        <button className="confirm-delete-button" onClick ={confirm}>
           Confirm
          </button>

        </div>
        )}
      </div>
    );
  }
