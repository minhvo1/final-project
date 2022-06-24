import React from 'react';
import './SideBarMain.scss';
import Logo from './Logo';
import MenuList from './MenuList';
import PortfoliosList from './PortfoliosList';

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

const portfolios =
[
  {
    "id" : 1,
    "name" : "YOLO Portfolio"
  },

  {
    "id" : 2,
    "name" : "Savings Portfolio"
  },

  {
    "id" : 3,
    "name" : "WSB Competition"
  }
]

  return (
    <div className="sidebar">
      <Logo/>
      <MenuList
      menus = {menu}
      selected = "Dashboard"
      setMenu = {console.log("youve selected this menu")}
      transfer = {console.log("transfer")}
      />
      <PortfoliosList
      portfolios = {portfolios}
      selected = "YOLO Portfolio"
      setPortfolio = {console.log("youve selected this portfolio")}
      transfer = {console.log("transfer")}

      />
    </div>
  )
}