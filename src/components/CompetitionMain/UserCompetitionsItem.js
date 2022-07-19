import React from 'react';
import classNames from "classnames";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";

export default function UserCompetitionsItem (props) {

  const moreInfo = () => {
    props.setNewPopup("Competitions", props.id);
  };

  const winner = () => {
    props.setNewPopup("CompetitionOver", props.dataForPop);
  };

  const menuListClass = classNames("competition-profit", {
    "competition-profit-gain" : props.profit > 0 ,
  });

  let dateStart = new Date(props.startDate);
  dateStart = `${dateStart.getMonth()}/${dateStart.getDate()}/${dateStart.getFullYear()}` 

  let dateEnd = new Date(props.endDate);
  dateEnd = `${dateEnd.getMonth()}/${dateEnd.getDate()}/${dateEnd.getFullYear()}` 


    return (
      <tr>
      <td>{props.name}</td>
      <td>{props.lobby}</td>
      <td>{`$${numberWithCommas(Math.round((props.capital + Number.EPSILON) * 100) / 100)}`}</td>
      <td>{`$${numberWithCommas(Math.round((props.prizePool + Number.EPSILON) * 100) / 100)}`}</td>
      <td>{dateStart}</td>
      <td>{dateEnd}</td>
      <td className = {menuListClass}>{props.profit}</td>
      {!props.avaliability && <td> 
          <button className="finish-button" disabled= {false} onClick ={winner}>
           Result
          </button>
      </td>}
      {props.avaliability && <td> 
          <button className="active-button" disabled= {false} onClick = {moreInfo}>
           Active
          </button>
      </td>}
    </tr>
  
    )

}