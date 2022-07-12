import axios from 'axios';

export function getPortfolioTickersFromName(selectedPortfolio, portfolios) {
  for (const portfolio of portfolios) {
    if (portfolio.name === selectedPortfolio) {
      return portfolio.tickers;
    } 
  }
  return [];
};

export function getPortfolioIdFromName(selectedPortfolio, portfolios) {
  for (const portfolio of portfolios) {
    if (portfolio.name === selectedPortfolio) {
      return portfolio.id;
    } 
  }
  return null;
};

export function checkTickerBelongToPortfolio(tickers, ticker_id) {
  for (const ticker of tickers) {
    if (ticker.tickerId === ticker_id) {
      return true;
    }
  }
  return false;
}