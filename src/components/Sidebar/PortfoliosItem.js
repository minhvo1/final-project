import React from "react";
import classNames from "classnames";

export default function PortfoliosItem(props) {
  const portfolioListClass = classNames("sideListItem", {
    "sideListItem--selected": props.selected,
  });

  const setToPortfolio = () => {
    props.setPortfolio(props.name);
    props.setMenu("Dashboard");
  }

  return (
    <div className={portfolioListClass}>
      <button className="sidebar-button" onClick={setToPortfolio}>
        {props.name}
      </button>
    </div>
  );
}
