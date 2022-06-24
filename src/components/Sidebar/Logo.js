import React from "react";
import logo from './logo.png';

export default function Logo(props) {
  
  return (
    <div className="Logo">
      <img
        className="logo-image"
        src={logo}
        alt="Add"
      />
    </div>
  );
}
