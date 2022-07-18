import React, { Fragment, useState } from "react";
import "./Popup.scss";
import Competition from "./Competition.js";
import Ticker from "./Ticker.js";
import NewPortfolio from "./NewPortfolio.js";
import CompetitionOver from "./CompetitionOver.js";
import Login from "./Login.js";


export default function Popup(props) {
  const exit = () => {
    props.setMenu("Dashboard") 
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className = "popup-title">
      <h1>{props.type}</h1> 
       <div className = "exit-button"><button onClick={exit}><img src="https://icons-for-free.com/download-icon-close+exit+out+thiago+pontes+x+icon-1320086033086568320_512.png" ></img></button></div>
       </div>
        {props.type === "New Portfolio" && <NewPortfolio
        competitions = {props.competitions}
        setMenu = {props.setMenu}
        savePortfolio = {props.savePortfolio}
        userId = {props.userId}
        />}
        {props.type === "Ticker" &&  <Ticker
        setMenu = {props.setMenu}
        info = {props.info}
        buyTicker = {props.buyTicker}
        sellTicker = {props.sellTicker}
        portfolios = {props.portfolios}
        deleteTicker = {props.deleteTicker}
        userId = {props.userId}
        />}
        {props.type === "Competitions" && <Competition
         competitions = {props.competitions}
         setMenu = {props.setMenu}
         savePortfolio = {props.savePortfolio}
         userId = {props.userId}
         info = {props.info}
        />}
         {props.type === "CompetitionOver" && <CompetitionOver
         setMenu = {props.setMenu}
         info = {props.info}
         deletePortfolio = {props.deletePortfolio}
        />}
        {props.type === "login" && <Login login={props.login}  />}
  </div>
    </div>
  );
}
