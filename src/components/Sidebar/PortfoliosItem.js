import React from "react";
import classNames from "classnames";

export default function PortfoliosItem(props) {
  const portfolioListClass = classNames("sideListItem", {
    "sideListItem--selected": props.selected,
  });

  const setToPortfolio = () => {
    props.setMenu("Dashboard");
    props.setPortfolio(props.name);
  }

  return (
    <div className={portfolioListClass}  onClick={setToPortfolio}>
      <button className="sidebar-button" onClick={setToPortfolio}>
        {props.name}
      </button>
    </div>
  );
}
