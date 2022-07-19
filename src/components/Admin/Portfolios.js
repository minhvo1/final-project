import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { numberWithCommas } from "../../helpers/portfolioMainHelper";


export default function Portfolios(props) {
  
  return (
    <div className="user-list">
    <h3>{props.portfoliosCounter}</h3>{" "}
    <h3 className="users-info">
      {" "}
      Name : {props.name} <br /> Total Value :{" "}
      {`$${numberWithCommas(
    Math.round(
      (props.total_value + Number.EPSILON) * 100
    ) / 100
  )}`}{" "}
    </h3>
  </div>
  );
}



