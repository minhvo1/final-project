import React from 'react';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon';
import './Header.scss'

export default function Header(props) {
  return (
    <div className="header">
      <div className="header_portfolio-info">{props.portfolio || "YOLO Portfolio"}</div>
      <SearchBar />
      <UserIcon />
    </div>
  )
}