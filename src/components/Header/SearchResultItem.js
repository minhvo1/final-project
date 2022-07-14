import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  getPortfolioIdFromName
} from "../../helpers/headerHelper";

const EMPTY = "EMPTY";
const SELECTED = "SELECTED";

export default function SearchResultItem(props) {
  console.log(props);
  const [mode, setMode] = useState(
    props.selected ? SELECTED : EMPTY
  );

  const selectsymbol = function (ticker_id) {
    //setSymbol(symb)
    console.log("You selected ticker ID:", ticker_id);
    // Add symbol to portfolio
    console.log("Ticker ID: ", ticker_id);
    const portfolio_id = getPortfolioIdFromName(props.selectedPortfolio, props.portfolios);
    console.log("Portfolio ID: ",portfolio_id);
    // Call api to add new
    if (portfolio_id) {
      const url = `http://localhost:3001/portfolios/${portfolio_id}/add`;

      return axios.put(url, { ticker_id })
        .then(res => {
          console.log(res);
          setMode(SELECTED);
        });
    }
  }

  return (
    <div>
    {mode === EMPTY && 
    (
      <li className="search-result-li" key={props.ticker.id} onClick={() => selectsymbol(props.ticker.id)}>
        <div className="search-result-symbol">{props.ticker.ticker}</div>
        <div className="search-result-name">{props.ticker.company_name}</div>
      </li>
    )
    }
    {mode === SELECTED && 
    (
      <li className="search-result-li" key={props.ticker.id}>
        <div className="search-result-symbol">
          <div class="search-result-added"><i className="fa-solid fa-star"></i></div>
          {props.ticker.ticker}</div>
        <div className="search-result-name">{props.ticker.company_name}</div>
      </li>
    )
    }
    </div>
    );
};