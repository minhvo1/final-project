import "./App.scss";
import Sidebar from "./components/Sidebar";
import PortfolioMain from "./components/PortfolioMain/index";
import Header from "./components/Header/index";
import Competitions from "./components/CompetitionMain/index";
import { React, useEffect, useState, Fragment } from "react";
import { getPortfolios } from "./helpers/sidebarHelper";
import useApplicationData from "./hooks/useApplicationData";

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
    portfolios,
    competitions,
    user_competitions,
    info,
    loading,
  } = useApplicationData();

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
          />
          <div className="main-container">
          <Header portfolios={info.portfolios} selectedPortfolio={view.portfolio} />
            {view.menu === "Dashboard" && <PortfolioMain data={info} selectedPortfolio={view.portfolio}/>}
            {view.menu === "Competitions" && (
              <Competitions
                competitions={info.competitions}
                user_competitions={info.user_competitions}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
export default App;
