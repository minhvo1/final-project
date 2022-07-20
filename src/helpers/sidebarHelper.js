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

export function highestPortfolio(portfolios) {
  let highestPortfolio = {
    name : null,
    value : 0
  }
  for (let port of portfolios) {
    if (port.totalValue >= highestPortfolio.value){
      highestPortfolio.name = port.name; 
      highestPortfolio.value = port.totsalValue;
    }
  }

  return highestPortfolio
}


export function findTickerIndex(id, ticker) {
  for (let i = 0; i < ticker.length; i++) {
    if (ticker[i].tickerId == id) {
      return i;
    }
  }
}

export function finduserCompname(portfolios, comp) {
    for (let port of portfolios) {
      for (let comps of comp["portfolios"]) {
          if (port.name === comps.name) {
            return port;
          }
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

export function addNewComp (name, start_amount, date) {
  Promise.all([
    axios.post(`http://localhost:3001/newComp`, {name : name, startAmount : start_amount, date: date}),
  ]).then((ans) => {
   console.log(ans);
  });
}



export function AdminData () {
  let userArray = [];
  let competitionArray = [];
  let portfolioArray = [];

   Promise.all([
    axios.get(`http://localhost:3001/users`),
    axios.get(`http://localhost:3001/competitions`),
    axios.get(`http://localhost:3001/allPortfolio`),
    axios.get(`http://localhost:3001/allCompetitionPortfolios`),
  ]).then((ans) => {
    for (let user of ans[0]["data"]) {
      userArray.push(user);
    }
    for (let portfolio of ans[2]["data"]) {
      portfolioArray.push(portfolio);
    }
    for (let competition of ans[1]["data"]) {
      let eachComp = {
          compInfo : competition,
          compPortfolios : []
      };
      for (let compPort of ans[3]["data"]) {
          if (competition.id === compPort.competition_id) {
              eachComp.compPortfolios.push(compPort);
          }
      }
      competitionArray.push(eachComp);
    }
  })
  // eslint-disable-next-line

  let returnValue = {
    userArray : userArray, 
    competitionArray : competitionArray,
    portfolioArray : portfolioArray,
  }

  return returnValue
}
