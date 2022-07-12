import React, { Fragment, useState } from "react";
import "./Popup.scss";
import { confirm } from "react-confirm-box";

export default function NewPortfolio(props) {
  const [portfolio_name, setPortfolio_name] = useState("");
  const [competition, setCompetition] = useState("");

  const competitions = props.competitions.map((competition) => {
    return <option value={competition.id}>{competition.name}</option>;
  });

  const [error, setError] = useState("");

  function validate() {
    if (portfolio_name === "") {
      setError("You cant have a blank portfolio name!");
      return;
    }
    setError("");
    setPortfolio_name("");
    props.savePortfolio(portfolio_name, props.userId, competition)
    props.setMenu("Dashboard")
  }

  function cancel() {
    props.setMenu("Dashboard")
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
        <section className="error-message">{error}</section>

        <div className="input-info">
          <h2>Which Competition? (Select Portfolio for no competition)</h2>
          <br />
          <select id="competitionChoose"
            onChange={(e) => {
                setCompetition(e.target.value);
              }}
          >
            <option value={null}>Portfolio</option>
            {competitions}
          </select>
        </div>

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
