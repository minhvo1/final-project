import React from 'react';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon';
import axios from 'axios';
import './Header.scss'

export default function Header(props) {
  console.log("Header line 7", props);

  return (
    <div className="header">
      <div className="header_portfolio-info">{props.selectedPortfolio || "YOLO Portfolio"}</div>
      <SearchBar 
          portfolios={props.portfolios} 
          selectedPortfolio={props.selectedPortfolio} 
      />
      <UserIcon />
    </div>
  )
}