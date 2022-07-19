import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { numberWithCommas } from "../../helpers/portfolioMainHelper";


export default function Competitions(props) {
  
const compPortfolios = props.compPortfolios.map ((portfolios) => {
  console.log(portfolios.name);
  console.log(portfolios.total_value);
    <div className="portfolio-comp-list">
        <text>{portfolios.name} : </text>
        <text className="green">{portfolios.total_value}</text>
      </div>
})

let dateStart = new Date(props.startDate);
  dateStart = `${dateStart.getMonth()+ 1}/${dateStart.getDate()}/${dateStart.getFullYear()}`;

let dateEnd = new Date(props.endDate);
  dateEnd = `${dateEnd.getMonth()+ 1}/${dateEnd.getDate()}/${dateEnd.getFullYear()}`;



  return (
    <div className="competitions-list">
    <h1 className="competition-title">{props.name}</h1>
    <h2>
      Start Amount :{" "}
      {`$${numberWithCommas(
        Math.round(
          (props.startAmount + Number.EPSILON) * 100
        ) / 100
      )}`}
    </h2>
    <br />
    <h2>Start Date : {dateStart}</h2>
    <br />

    <h2>End Date :{dateEnd}</h2>
    <br />

    <h2>{props.avaliability}</h2>

    <h2 className="portfolio-title">Portfolios</h2>
    {compPortfolios}
  </div>
  );
}

