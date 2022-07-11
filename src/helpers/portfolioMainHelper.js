import axios from 'axios'

export function getPortfolioTickers(selectedPortfolio, data) {
  for (const portfolio of data.portfolios) {
    if (portfolio.name === selectedPortfolio) {
      return portfolio.tickers;
    } 
  }
  return [];
};

export function getPromiseArrayTickers (tickers) {
  let promiseArray = [];
  for (const ticker of tickers) {
    const URL = `http://localhost:3001/ticker/${ticker.tickerId}`
    promiseArray.push(axios.get(URL));
  }
  return promiseArray;
}