import './App.scss';
import Sidebar from './components/Sidebar';
import PortfolioMain from './components/PortfolioMain/index';
import Header from './components/Header/index'
import Competitions from './components/CompetitionMain/index'
import { useState } from "react";
import { getPortfolios } from "./helpers/sidebarHelper"
import useApplicationData from "./hooks/useApplicationData";

/*
const { Pool } = require("pg");
const dbParams = require("./db.js");
const db = new Pool(dbParams);
db.connect();
*/

function App() {
  const { view, setMenu, setPortfolio, portfolios, competitions, user_competitions, info  } =
  useApplicationData();

console.log(info);

  return (
    <div className="App">
      <Sidebar
      portfolio = {view.portfolio}
      setPortfolio = {setPortfolio} 
      portfolios = {portfolios}
      menu = {view.menu}
      setMenu = {setMenu}
      />
      <div className="main-container">
        <Header />
        { view.menu === "Dashboard"  && <PortfolioMain/>}
        { view.menu === "Competitions" &&<Competitions
        competitions = {competitions}
        user_competitions = {user_competitions}
        />}
      </div>
    </div>
  );
}

export default App;
