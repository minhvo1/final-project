import axios from "axios";

export function getCompetitions(userComp, allComp) {
  let listComp = [];

  if ((userComp.length = 0)) {
    return null;
  }
  for (let indivComp of userComp) {
    listComp.push(indivComp.competition_id);
  }
  let res = allComp.filter((item) => listComp.includes(item.id));

  return res;
}

export function checkArray(name, allArray) {
  for (let x = 0; x < allArray.length; x++) {
    if (allArray[x].name === name) {
      return x;
    }
  }
  return null;
}

export function checkObject(id, array) {
  for (let x = 0; x < array.length; x++) {
    if (array[x].id === id) {
      return x;
    }
  }
  return null;
}

export function seeUserInComp(id) {
  Promise.all([axios.get(`http://localhost:3001/compUsers/${id}`)]).then(
    (ans) => {
      return ans[0]["data"].length;
    }
  );
}

export function findCompetitionById(id, comps) {
  for (let comp of comps) {
    if (comp.id == id) {
      return comp;
    }
  }
}

export function findIndex(id, comps) {
  for (let i = 0; i < comps.length; i++) {
    if (comps[i].id == id) {
      return i;
    }
  }
}

export function findCapital(id, comps) {
  let intID = Number(id);
  for (let comp of comps) {
    if (comp.id === intID) {
      return comp.capital;
    }
  }
}

export function sharesExist(id, portfolio) {
  for (let ticker of portfolio.tickers) {
    if (ticker.tickerId === id) {
      return true;
    }
  }
  return false;
}

export function findUserCompPortfolio(portfolios, competition) {
  for (let portfolio of portfolios) {
    if (portfolio.portfolio_competition === competition.id) {
      return portfolio;
    }
  }
}

export function findCompetition(id, competitions) {
  for (let competition of competitions) {
    if (competition.id === id) {
      return competition;
    }
  }
}

export function findTickerIndex(id, ticker) {
  for (let i = 0; i < ticker.length; i++) {
    if (ticker[i].tickerId == id) {
      return i;
    }
  }
}


export function updateTotalValues(portfolio_id) {
  Promise.all([
    axios.get(`http://localhost:3001/latestPortfolioValue/${portfolio_id}`),
    axios.get(`http://localhost:3001/portfoliosID/${portfolio_id}`),
  ]).then((ans) => {
    let funds = Number(ans[1]["data"]["0"]["funds"]);
    let stockValue = Number(ans[0]["data"]["0"]["value"]);
    const totalValue = funds + stockValue;
    Promise.all([axios.put(`http://localhost:3001/updatePortfolioTotal`,{id: portfolio_id, value : totalValue })]).then((ans) => {
    })
  });
}
