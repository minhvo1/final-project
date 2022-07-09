import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";

const dummyResults = {
  "ResultSet": {
    "Query": "apple",
    "Result": [
      {
        "exch": "NMS",
        "exchDisp": "NASDAQ",
        "name": "Apple Inc.",
        "symbol": "AAPL",
        "type": "S",
        "typeDisp": "Equity"
      },
      {
        "exch": "NYQ",
        "exchDisp": "NYSE",
        "name": "Apple Hospitality REIT, Inc.",
        "symbol": "APLE",
        "type": "S",
        "typeDisp": "Equity"
      },
      {
        "exch": "PNK",
        "exchDisp": "OTC Markets",
        "name": "Apple Rush Company, Inc.",
        "symbol": "APRU",
        "type": "S",
        "typeDisp": "Equity"
      },
      {
        "exch": "NAS",
        "exchDisp": "NASDAQ",
        "name": "Appleseed Fund Investor Share",
        "symbol": "APPLX",
        "type": "M",
        "typeDisp": "Fund"
      },
      {
        "exch": "NAS",
        "exchDisp": "NASDAQ",
        "name": "Appleseed Fund Institutional Share",
        "symbol": "APPIX",
        "type": "M",
        "typeDisp": "Fund"
      },
      {
        "exch": "PNK",
        "exchDisp": "OTC Markets",
        "name": "Golden Apple Oil & Gas Inc.",
        "symbol": "GAPJ",
        "type": "S",
        "typeDisp": "Equity"
      },
      {
        "exch": "WCB",
        "exchDisp": "Chicago Board Options Exchange",
        "name": "CBOE EQUITY VIXON APPLE",
        "symbol": "^VXAPL",
        "type": "I",
        "typeDisp": "Index"
      },
      {
        "exch": "PNK",
        "exchDisp": "OTC Markets",
        "name": "Apple Green Holding, Inc.",
        "symbol": "AGPL",
        "type": "S",
        "typeDisp": "Equity"
      },
      {
        "exch": "BUE",
        "exchDisp": "Buenos Aires",
        "name": "Apple Inc.",
        "symbol": "AAPL.BA",
        "type": "S",
        "typeDisp": "Equity"
      }
    ]
  }
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [symbol, setSymbol] = useState("");

  const searcClass = "txt-search-bar";
  const searchFormClass = "frm-search";
  const searchResult = "search-result";


  const search = function(event) {
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
  const selectsymbol = function(symb) {
    //setSymbol(symb)
    console.log("You selected:", symb);
  }
  const lists = Object.values(results).map((result) => {

    return (
      <li className="search-result-li" key={result.id} onClick={() => selectsymbol(result.id)}>
        <div className="search-result-symbol">{result.ticker}</div> 
        <div className="search-result-name">{result.company_name}</div> 
      </li>
    );      
  });        
  return (
    <div className="search"> 
      <form className={searchFormClass} onSubmit={event => event.preventDefault()}>
        <input type="text" placeholder="Search" /* value={query}  */className={searcClass} onChange={search} /> 
      </form>
      <ul className={searchResult}>
        {lists}
      </ul>
    </div>
  );
};