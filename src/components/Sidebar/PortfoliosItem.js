import React from 'react';
import classNames from "classnames";


export default function PortfoliosItem(props) {

const portfolioListClass = classNames("sideListItem", {
        "sideListItem--selected": props.selected,
      });

  return (
    <div className={portfolioListClass}
    onClick = {props.onClick}>
        {props.name}
    </div>
  )
}