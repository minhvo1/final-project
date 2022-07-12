import React, { Fragment, useState } from "react";
import "./Popup.scss";

export default function NewPortfolio(props) {

    const competitions = props.competitions.map((competition) => {
        return (
          <option value = {competition.name}>{competition.name}</option>
        );
      });



  return (
    <div className="new-portfolio">
      <form>
        <div className="input-info">
          <h2>Portfolio Name</h2>
          <br/>
          <input className="input" type="text" placeholder="Portfolio Name"></input>
        </div>
        <div className="input-info">

        <h2>Which Competition? (Select Portfolio for no competition)</h2>
            <br />
            <select id="competitionChoose">
                <option value = "Null">Portfolio</option>
               {competitions}
            </select>
            </div>


<button type="submit">Submit</button>
      </form>
    </div>
  );
}
