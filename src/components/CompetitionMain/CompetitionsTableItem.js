import React from "react";

export default function CompetitionsTableItem(props) {
  let dateStart = new Date(props.startDate);
  dateStart = `${dateStart.getMonth()}/${dateStart.getDate()}/${dateStart.getFullYear()}`;

  let dateEnd = new Date(props.endDate);
  dateEnd = `${dateEnd.getMonth()}/${dateEnd.getDate()}/${dateEnd.getFullYear()}`;

  const moreInfo = () => {
    props.setNewPopup("Competitions", props.id);
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.lobby}</td>
      <td>{props.capital}</td>
      <td>{props.prizePool}</td>
      <td>{dateStart}</td>
      <td>{dateEnd}</td>
      {props.avaliability === true && (
        <td>
          <button className="join-button" onClick={moreInfo}>
            Info
          </button>
        </td>
      )}
      {props.avaliability === false && (
        <td>
          <button className="finish-button" onClick={moreInfo} disabled= {true}>
           Fin
          </button>
        </td>
      )}
      
    </tr>
  );
}
