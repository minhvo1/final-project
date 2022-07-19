import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { numberWithCommas } from "../../helpers/portfolioMainHelper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { addNewComp } from "../../helpers/sidebarHelper";

export default function Admin(props) {
const [error, setError] = useState("");
const [info, setInfo] = useState({
    name : null,
    startAmount : null,
    date : null
})

//const [users, setUsers] = useState('');
//const [portfolios, setPortfolios] = useState('');
//const [competitions, setCompetitions] = useState('');
const [loading, setLoading] = useState(2);
const [empty, setEmpty] = useState('');

  let userCounter = 0;
  let portfoliosCounter = 0;
  let date = Date.now();

  const validate = () => {

    if(!info.name) {
        setError("You must have a competition name")
        return
    }
    if(!info.startAmount) {
        setError("You must have a starting amount")
        return
    }

    if(!info.date) {
        setError("You must have a finishing date")
        return
    }

    setError('')

    confirmAlert({
        title: "Confirm to submit",
        message: "Create new Competition?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
                addNewComp(info.name, info.startAmount, info.date)
                setInfo({...info, name: null, date: null, startAmount: null})
                window.location.reload(true);
            },
          },
          {
            label: "No",
            onClick: () => {
              return;
            },
          },
        ],
      });
    }


  let users =(props.adminData.userArray.map((users) => {
    userCounter++;
    return (
      <div className="user-list">
        <h3>{userCounter}</h3>{" "}
        <h3 className="users-info">
          {" "}
          Name : {users.name} <br /> Email : {users.email}{" "}
        </h3>
      </div>
    );
  }));

  let portfolios = (props.adminData.portfolioArray.map((portfolio) => {
    portfoliosCounter++;

   
    return (
      <div className="user-list">
        <h3>{portfoliosCounter}</h3>{" "}
        <h3 className="users-info">
          {" "}
          Name : {portfolio.name} <br /> Total Value : <text className = "green">{portfolio.total_value}{" "}</text>
        </h3>
      </div>
    );
  }));

 

  let competitions = (props.adminData.competitionArray.map((competitions) => {
    const compPortfolios = competitions.compPortfolios.map((portfolios) => {

    
      return (
        <div className="portfolio-comp-list">
          <text>{portfolios.name} : </text>
          <text className="green">{portfolios.total_value}</text>
        </div>
      );
    });
    let dateStart = new Date(competitions.compInfo.start_datetime);
    dateStart = `${dateStart.getMonth()}/${dateStart.getDate()}/${dateStart.getFullYear()}`;

    let dateEnd = new Date(competitions.compInfo.end_datetime);
    dateEnd = `${dateEnd.getMonth()}/${dateEnd.getDate()}/${dateEnd.getFullYear()}`;

    return (
      <div className="competitions-list">
        <h1 className="competition-title">{competitions.compInfo.name}</h1>
        <h2>
          Start Amount :{" "}
          {`$${numberWithCommas(
            Math.round(
              (competitions.compInfo.start_amount + Number.EPSILON) * 100
            ) / 100
          )}`}
        </h2>
        <br />

        <h2>Start Date : {dateStart}</h2>
        <br />

        <h2>End Date :{dateEnd}</h2>
        <br />

        <h2>{competitions.compInfo.avaliability}</h2>

        <h2 className="portfolio-title">Portfolios</h2>
        {compPortfolios}
      </div>
    );
  }))


  return (
    <div className="popup">
      {loading === 1 && (<div>Loading...</div>)}
      {loading === 2 && 
           <div className="admin-dashboard">
           <h2 className="title-admin">
             <b>Users</b> : {users.length} users
           </h2>
           <div className="user-container">{users}</div>
           <h2 className="title-admin title-admin-portfolios">
             <b>Portfolios</b> : {portfolios.length} portfolios
           </h2>
           <div className="portfolios-container">{portfolios}</div>
           <h2 className="title-admin">
             <b> Competitions</b>: {competitions.length} competitions
           </h2>
           <div className="competitions-container">{competitions}</div>
           <h2 className="title-admin title-admin-new">
             <b> New Competition</b>
           </h2>
           <div className="new-container">
             <form  onSubmit={(event) => {
                 event.preventDefault();
               }}>
               <div>
                 {" "}
                 <h2>Name :</h2>
                 <input className="newCompForms" name="name" type="text"
                 placeholder="Name"
                 onChange={(e) => {
                   setInfo({...info, name : e.target.value })
                 }}
                 ></input>
               </div>
               <div>
                 {" "}
                 <h2>Start Amount :</h2>
                 <input
                   className="newCompForms"
                   name="start-amount"
                   type="number"
                   placeholder="10000"
                   onChange={(e) => {
                       setInfo({...info, startAmount : e.target.value })
                     }}
                 ></input>
               </div>
   
               <div>
                 <h2>End Date :</h2>
                 <input
                   className="newCompForms"
                   name="date-end"
                   type="date"
                   onChange={(e) => {
                       setInfo({...info, date : e.target.value })
                     }}
                   placeholder={date}
                 ></input>
               </div>
   
   
               <button
                 className="join-button join-button-comp"
                 onClick={validate}
               >
                Create   </button>
             </form>
   
             <section className="error-message">{error}</section>
   
           </div>
         </div>
      
      
      }
 
    </div>
  );
}