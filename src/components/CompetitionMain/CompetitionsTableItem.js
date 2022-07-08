import React from 'react';


export default function CompetitionsTableItem (props) {

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
      {props.avaliability && <td><button className = "join-button">Join</button></td> }

    </tr>
    
    )

}
