import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import {
  getPortfolioTickersFromName,
  checkTickerBelongToPortfolio,
  getPortfolioIdFromName
} from "../../helpers/headerHelper";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [symbol, setSymbol] = useState("");

  const searcClass = "txt-search-bar";
  const searchFormClass = "frm-search";
  const searchResult = "search-result";


  const search = function (event) {
    setQuery(event.target.value)
    const query = event.target.value
    const url = `http://localhost:3001/search?query=${query}`;
    Promise.all([
      axios
        .get(url)
        .then(function (response) {
          console.log('data', response);
          setResults(response.data);
          //response.data = dummyResults;

        })
        .catch(function (error) {
          console.error(error);
        }),
    ]);
  };

  /* useEffect(() => {
    
  
  }, [query]); */
  const selectsymbol = function (ticker_id) {
    //setSymbol(symb)
    console.log("You selected ticker ID:", ticker_id);
    // Add symbol to portfolio
    console.log("Ticker ID: ", ticker_id);
    const portfolio_id = getPortfolioIdFromName(props.selectedPortfolio, props.portfolios);
    console.log(portfolio_id);
    // Call api to add new
    if (portfolio_id) {
      const url = `http://localhost:3001/portfolios/${portfolio_id}/add`;

      return axios.put(url, { ticker_id })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  }

  const lists = Object.values(results).map((result) => {
    // Check symbol was in portfolio
    const tickers = getPortfolioTickersFromName(props.selectedPortfolio, props.portfolios);
    //console.log(tickers);
    const check = checkTickerBelongToPortfolio(tickers, result.id);
    //console.log(result.id);
    //console.log(check);
    if (check === false) {
      return (
        <li className="search-result-li" key={result.id} onClick={() => selectsymbol(result.id)}>
          <div className="search-result-symbol">{result.ticker}</div>
          <div className="search-result-name">{result.company_name}</div>
        </li>
      );
    } else {
      return (
        <li className="search-result-li" key={result.id}>
          <div className="search-result-symbol">
            <div class="search-result-added"><i class="fa-solid fa-star"></i></div>
            {result.ticker}</div>
          <div className="search-result-name">{result.company_name}</div>
        </li>
      );
    }

  });
  return (
    <div className="search">
      <form className={searchFormClass} onSubmit={event => event.preventDefault()}>
        <input type="text" placeholder="Search" /* value={query}  */ className={searcClass} onChange={search} />
      </form>
      <ul className={searchResult}>
        {lists}
      </ul>
    </div>
  );
};