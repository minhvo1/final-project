import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { numberWithCommas } from "../../helpers/portfolioMainHelper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { addNewComp } from "../../helpers/sidebarHelper";
import { AdminData } from "../../helpers/sidebarHelper";
import Competitions from "./Competitions";
import Portfolios from "./Portfolios";
import Users from "./Users";

export default function Admin(props) {
  const [error, setError] = useState("");
  const [info, setInfo] = useState({
    name: null,
    startAmount: null,
    date: null,
  });

  const [users, setUsers] = useState("");
  const [portfolios, setPortfolios] = useState("");
  const [competitions, setCompetitions] = useState("");
  const [loading, setLoading] = useState("");
  const [reload, setreLoading] = useState("");
  let userCounter = 0;
  let portfoliosCounter = 0;
  let date = Date.now();

 
    const usersList = props.adminData1.userArray.map((users) => {
      userCounter++;
      return (
        <Users
          key={users.id}
          counter={userCounter}
          name={users.name}
          email={users.email}
        />
      );
    });

    const portfoliosList = props.adminData1.portfolioArray.map((portfolio) => {
      portfoliosCounter++;
      return (
        <Portfolios
          key={portfolio.id}
          counter={portfoliosCounter}
          name={portfolio.name}
          total_value={portfolio.total_value}
        />
      );
    });

    const competitionlist = props.adminData1.competitionArray.map(
      (competitions) => {
        return (
          <Competitions
            key={competitions.id}
            name = {competitions.compInfo.name}
            compPortfolios={competitions.compPortfolios}
            startDate={competitions.compInfo.start_datetime}
            endDate={competitions.compInfo.end_datetime}
            startAmount={competitions.compInfo.start_amount}
            avaliability={competitions.compInfo.avaliability}
          />
        );
      }
    );



  const validate = () => {
    if (!info.name) {
      setError("You must have a competition name");
      return;
    }
    if (!info.startAmount) {
      setError("You must have a starting amount");
      return;
    }

    if (!info.date) {
      setError("You must have a finishing date");
      return;
    }

    setError("");

    confirmAlert({
      title: "Confirm to submit",
      message: "Create new Competition?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addNewComp(info.name, info.startAmount, info.date);
            setInfo({ ...info, name: null, date: null, startAmount: null });
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
  };

  return (
    <div className="popup">
     
        <div className="admin-dashboard">
          <h2 className="title-admin">
            <b>Users</b> : {users.length} users
          </h2>
          <div className="user-container">{usersList}</div>
          <h2 className="title-admin title-admin-portfolios">
            <b>Portfolios</b> : {portfolios.length} portfolios
          </h2>
          <div className="portfolios-container">{portfoliosList}</div>
          <h2 className="title-admin">
            <b> Competitions</b>: {competitions.length} competitions
          </h2>
          <div className="competitions-container">{competitionlist}</div>
          <h2 className="title-admin title-admin-new">
            <b> New Competition</b>
          </h2>
          <div className="new-container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div>
                {" "}
                <h2>Name :</h2>
                <input
                  className="newCompForms"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setInfo({ ...info, name: e.target.value });
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
                    setInfo({ ...info, startAmount: e.target.value });
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
                    setInfo({ ...info, date: e.target.value });
                  }}
                  placeholder={date}
                ></input>
              </div>

              <button
                className="join-button join-button-comp"
                onClick={validate}
              >
                Create{" "}
              </button>
            </form>

            <section className="error-message">{error}</section>
          </div>
        </div>
    </div>
  );
}
