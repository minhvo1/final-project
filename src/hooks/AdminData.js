import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

export default function AdminData () {
    const userId = 1;
    let userArray = [];
    let competitionArray = [];
    let portfolioArray = [];
  useEffect(() => {

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
    });
    // eslint-disable-next-line
  }, []);

  let returnValue = {
    userArray : userArray, 
    competitionArray : competitionArray,
    portfolioArray : portfolioArray,
  }

  return returnValue
}
