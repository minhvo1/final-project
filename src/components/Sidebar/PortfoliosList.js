import {React, useEffect, useState } from "react";
import PortfoliosItem from "./PortfoliosItem.js";
import CompetitionPortfoliosItem from "./CompetitionPortfoliosItem.js";

export default function PortfoliosList(props) {
 
  const [portfolioslist,setportfolioslist] = useState ('')
  const [competitionlists,setcompetitionlists] = useState ('')
  




     let portfolioList = props.portfolios.map((portfolio) => {
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
  
    let competitionList = props.portfolios.map((portfolio) => {
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
        {portfolioList}
      </div>
      <div className="portfolios-section">
        <h5 className="sideBar-titles">Competition Portfolios</h5>
        {competitionList}
      </div>
    </section>
  );
}
