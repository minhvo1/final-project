import React from 'react';
import classNames from "classnames";

export default function UserCompetitionsItem (props) {
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
      <td>{props.capital}</td>
      <td>{props.prizePool}</td>
      <td>{dateStart}</td>
      <td>{dateEnd}</td>
      <td className = {menuListClass}>{props.profit}</td>

    </tr>
  
    )

}