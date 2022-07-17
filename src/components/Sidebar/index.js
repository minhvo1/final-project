import React, { Fragment, useState } from "react";
import "./SideBarMain.scss";
import Logo from "./Logo";
import MenuList from "./MenuList";
import PortfoliosList from "./PortfoliosList";

export default function Sidebar(props) {
  console.log(props.portfolio)
  let menu = [
    {
      id: 1,
      name: "Dashboard",
    },
    {
      id: 2,
      name: "Competitions",
    },
    {
      id: 3,
      name: "New Portfolio",
    },
  ];

 

  return (
    <div className="sidebar">
      <Logo />
      {props.userId !== 1 &&(
      <MenuList
        menus={menu}
        selected={props.menu}
        setMenu={props.setMenu}
        setNewPopup={props.setNewPopup}
      />   )}
      {props.userId !== 1 &&(
      <PortfoliosList
        portfolios={props.portfolios}
        selected={props.portfolio}
        setPortfolio={props.setPortfolio}
        setMenu={props.setMenu}
      /> )}
   
   {props.userId === 1 && (<h2>Hello Admin</h2>)}
    </div>
  );
}
