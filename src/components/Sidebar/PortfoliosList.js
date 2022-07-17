import {React, useEffect } from "react";
import PortfoliosItem from "./PortfoliosItem.js";
import CompetitionPortfoliosItem from "./CompetitionPortfoliosItem.js";

export default function PortfoliosList(props) {

  const portfolioslists = props.portfolios.map((portfolio) => {
    if (!portfolio.portfolio_competition) {
      return (
        <PortfoliosItem
          key={portfolio.id}
          portfolioId={portfolio.id}
          name={portfolio.name}
          selected={portfolio.name === props.selected}
          setPortfolio={props.setPortfolio}
          setMenu={props.setMenu}
        />
      );
    }
  });

  const competitionportfolioslists = props.portfolios.map((portfolio) => {
    if (portfolio.portfolio_competition) {
      return (
        <CompetitionPortfoliosItem
          key={portfolio.id}
          portfolioId={portfolio.id}
          name={portfolio.name}
          selected={portfolio.name === props.selected}
          setPortfolio={props.setPortfolio}
          setMenu={props.setMenu}
        />
      );
    }
  });

  return (
    <section className="portfolios-lists">
      <div>
        <h5 className="sideBar-titles">Portfolios</h5>
        {portfolioslists}
      </div>
      <div className="portfolios-section">
        <h5 className="sideBar-titles">Competition Portfolios</h5>
        {competitionportfolioslists}
      </div>
    </section>
  );
}
