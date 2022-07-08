import React from "react";
import PortfoliosItem from "./PortfoliosItem.js";

export default function PortfoliosList(props) {
  const portfolioslists = props.portfolios.map((portfolio) => {
    return (
      <PortfoliosItem
        key={portfolio.id}
        name={portfolio.name}
        selected={portfolio.name === props.selected}
        setPortfolio={props.setPortfolio}
        setMenu = {props.setMenu}
      />
    );
  });
  return (
    <section className = "portfolios-lists">
    <h5 className = "sideBar-titles">
    Portfolios
    </h5>
    {portfolioslists}
    </section>
  )
}
