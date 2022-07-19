import React, { useEffect, useState } from "react";
import "./Admin.scss";


export default function Users(props) {
  
  return (
    <div className="user-list">
    <h3>{props.userCounter}</h3>{" "}
    <h3 className="users-info">
      {" "}
      Name : {props.name} <br /> Email : {props.email}{" "}
    </h3>
  </div>
  );
}

