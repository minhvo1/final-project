import React from 'react';
import './SideBarMain.scss';
import Logo from './Logo';
import MenuList from './MenuList';
import PortfoliosList from './PortfoliosList';
import NewPortfolio from './newPortfolio'
export default function Sidebar(props) {
const menu =
[
  {
    "id" : 1,
    "name" : "Dashboard"
  },
  {
    "id" : 2,
    "name" : "Competitions"
  },
  {
    "id" : 3,
    "name" : "New Portfolio"
  }
]



  return (
    <div className="sidebar">
      <Logo/>
      <MenuList
      menus = {menu}
      selected = {props.menu}
      setMenu = {props.setMenu}
      />
      <PortfoliosList
      portfolios = {props.portfolios}
      selected = {props.portfolio}
      setPortfolio = {props.setPortfolio}
      setMenu = {props.setMenu}
      />
      {props.menu === "New Portfolio" &&
      <NewPortfolio/>
      }
    </div>
  )
}