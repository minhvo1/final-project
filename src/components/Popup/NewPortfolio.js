import React, { Fragment, useState } from "react";
import "./Popup.scss";
import { findCapital } from "../../helpers/sidebarHelper";

export default function NewPortfolio(props) {
  const [portfolio_name, setPortfolio_name] = useState("");
  const [competition, setCompetition] = useState("");
  const [funding, setFunding] = useState(0);

  const competitions = props.competitions.map((competition) => {
    return <option value={competition.id}>{competition.name}</option>;
  });

  const [error, setError] = useState("");

  function validate() {
    if (portfolio_name === "") {
      setError("You cant have a blank portfolio name!");
      return;
    }
    if(funding < 0) {
      setError("You cant start off with debt!")
      return;
    }
    setError("");
    let startValue = 0;
    let competition_ID ;
    if (competition === "Portfolio") {
      competition_ID = null; 
      startValue = funding;
    } else {
      startValue = findCapital(competition, props.competitions);
      competition_ID = competition; 
    }
    props.savePortfolio(portfolio_name, props.userId, competition_ID, startValue);
    props.setMenu("Dashboard");
    setPortfolio_name("");
  }

  function cancel() {
    props.setMenu("Dashboard");
  }

  return (
    <div className="new-portfolio">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="input-info">
          <h2>Portfolio Name</h2>
          <br />
          <input
            value={portfolio_name}
            className="input"
            type="text"
            placeholder="Portfolio Name"
            onChange={(e) => {
              setPortfolio_name(e.target.value);
            }}
          ></input>
        </div>
        
        <div className="input-info">
          <h2>Which Competition? (Select Portfolio for no competition)</h2>
          <br />
          <select
            id="competitionChoose"
            defaultValue={"default"}
            onChange={(e) => {
              setCompetition(e.target.value);
            }}
          >
            <option value="default" disabled hidden>
              Choose your type
            </option>
            <option value={null}>Portfolio</option>
            {competitions}
          </select>
        </div>
        {competition === "Portfolio" && (
          <div className="input-info">
            <h2>How much funding?</h2>
            <br />
            <input
              defaultValue="0"
              className="input"
              type="number"
              placeholder="amount"
              onChange={(e) => {
                setFunding(e.target.value);
              }}
            ></input>
          </div>
        )}
        <section className="error-message">{error}</section>

        <button confirm onClick={validate}>
          Save
        </button>

        <button danger onClick={cancel}>
          Cancel
        </button>

      </form>
    </div>
  );
}
