import "./App.scss";
import Sidebar from "./components/Sidebar";
import PortfolioMain from "./components/PortfolioMain/index";
import Header from "./components/Header/index";
import Competitions from "./components/CompetitionMain/index";
import Login from "./components/Login/Login";
import { React, useEffect, useState, Fragment } from "react";
import useApplicationData from "./hooks/useApplicationData";
import Popup from "./components/Popup/Popup";
import schedule from "node-schedule";
import Admin from "./components/Admin/Admin";
import { AdminData } from ".//helpers/sidebarHelper";
import Cookies from 'js-cookie'

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
    sellTicker,
    deleteTicker,
    deletePortfolio,
    setInfo,
    login,
    logout,
 
  } = useApplicationData();
  let adminData = AdminData();;
  // useEffect(() => {

  //   schedule.scheduleJob('*/5 * * * * *', () => {

  //     console.log('test')

  //   })
  // }, [])



  const userId = Number(Cookies.get('userId'))

  return (
    <div className="App">
      {userId > 0 ? (
        loading ? (
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
              userId={userId}
            />
            <div className="main-container">
              <Header
                portfolios={info.portfolios}
                selectedPortfolio={view.portfolio}
                userId={userId}
                userName={info.user.name}
                logout = {logout}
              />
              {view.menu === "Dashboard" &&
                popup.popupStatus === false &&
                userId !== 1 && (
                  <PortfolioMain
                    data={info}
                    selectedPortfolio={view.portfolio}
                    selectedPortfolioId={view.portfolio_id}
                    setNewPopup={setNewPopup}
                    userId={userId}
                    view={view}
                    setPortfolio={setPortfolio}
                  />
                )}
              {view.menu === "Competitions" &&
                popup.popupStatus === false &&
                userId !== 1 && (
                  <Competitions
                    competitions={info.competitions}
                    user_competitions={info.user_competitions}
                    setNewPopup={setNewPopup}
                    data={info}
                    userId={userId}
                  />
                )}
              {userId === 1 && <Admin adminData = {adminData}/>}
              {popup.popupStatus === true && (
                <Popup
                  type={popup.page}
                  info={popup.info}
                  competitions={info.competitions}
                  portfolios={info.portfolios}
                  setMenu={setMenu}
                  savePortfolio={savePortfolio}
                  userId={info.user.id}
                  buyTicker={buyTicker}
                  sellTicker={sellTicker}
                  deleteTicker={deleteTicker}
                  deletePortfolio={deletePortfolio}
                 
                />
              )}
            </div>
          </Fragment>
        )
      ) : (
        <Fragment>
                  {
          popup.popupStatus === false  && (
            <Popup type="Login" login={login}/>
          )
        }
        </Fragment>
        //<Login></Login>
      )}
    </div>
  );
}
export default App;
