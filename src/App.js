import "./App.scss";
import Sidebar from "./components/Sidebar";
import PortfolioMain from "./components/PortfolioMain/index";
import Header from "./components/Header/index";
import Competitions from "./components/CompetitionMain/index";
import { React, useEffect, useState, Fragment } from "react";
import { getPortfolios } from "./helpers/sidebarHelper";
import useApplicationData from "./hooks/useApplicationData";
import Popup from "./components/Popup/Popup";
import schedule from 'node-schedule'
/*
const { Pool } = require("pg");
const dbParams = require("./db.js");
const db = new Pool(dbParams);
db.connect();
*/

function App() {
  const {
    view,
    setMenu,
    setPortfolio,
    info,
    loading,
    popup,
    setNewPopup,
    savePortfolio,
    buyTicker,
    sellTicker
  } = useApplicationData();

  // useEffect(() => {
    
  //   schedule.scheduleJob('*/5 * * * * *', () => {

  //     console.log('test')
    
  //   })
  // }, [])
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <Sidebar
            portfolio={view.portfolio}
            setPortfolio={setPortfolio}
            portfolios={info.portfolios}
            menu={view.menu}
            setMenu={setMenu}
            setNewPopup={setNewPopup}
          />
          <div className="main-container">
            <Header
              portfolios={info.portfolios}
              selectedPortfolio={view.portfolio}
            />
            {view.menu === "Dashboard"  && popup.popupStatus === false && (
              <PortfolioMain data={info} selectedPortfolio={view.portfolio} selectedPortfolioId={view.portfolio_id} setNewPopup={setNewPopup} />
            )}
            {view.menu === "Competitions" && popup.popupStatus === false &&(
              <Competitions
                competitions={info.competitions}
                user_competitions={info.user_competitions}
                setNewPopup={setNewPopup}
              />
            )}
            {popup.popupStatus === true && (
              <Popup
                type={popup.page}
                info = {popup.info}
                competitions={info.competitions}
                portfolios = {info.portfolios}
                setMenu={setMenu}
                savePortfolio={savePortfolio}
                userId={info.user.id}
                buyTicker = {buyTicker}
                sellTicker = {sellTicker}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
export default App;
