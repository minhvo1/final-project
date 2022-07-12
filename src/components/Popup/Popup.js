import React, { Fragment, useState } from "react";
import "./Popup.scss";
import Competition from "./Competition.js";
import Ticker from "./Ticker.js";
import NewPortfolio from "./NewPortfolio.js";

export default function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>{props.type}</h1>
        {props.type === "New Portfolio" && <NewPortfolio
        competitions = {props.competitions}
        />}
        {props.type === "Ticker" &&  <Ticker/>}
        {props.type === "Competitions" && <Competition/>}
      </div>
    </div>
  );
}
