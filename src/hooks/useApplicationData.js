import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import {
  getCompetitions,
  checkArray,
  checkObject,
  findCompetitionById,
  findIndex,
} from "../helpers/sidebarHelper";

export default function useApplicationData() {
  const [view, setView] = useState({
    menu: "Dashboard",
    portfolio: null,
    portfolio_id: null,
  });

  const [popup, setPopup] = useState({
    popup: false,
    page: null,
    info: null,
  });

  const [info, setInfo] = useState({
    user: {},
    portfolios: {},
    competitions: {},
    user_competitions: {},
  });

  const [loading, setLoading] = useState(true);

  const setPortfolio = (portfolio, portfolio_id = null) => {
    if (portfolio_id !== null)
      setView({ menu: "Dashboard", portfolio, portfolio_id });
    else setView({ menu: "Dashboard", portfolio });
  };

  const setMenu = (menu) => {
    setView({ ...view, menu });
    if (menu === "New Portfolio") {
      setNewPopup("New Portfolio");
    } else {
      setPopup(false);
    }
  };

  const setNewPopup = (page, infos = null) => {
    setPopup({ ...popup, popup: true, page: page, info: infos });
  };

  useEffect(() => {
    const userId = 2;
    const profileURL = `http://localhost:3001/userdata/${userId}`;
    const competitionURL = `http://localhost:3001/compUsers`;

    Promise.all([axios.get(profileURL), axios.get(competitionURL)])
      .then((ans) => {
        setLoading(true);
        let usersCompetitionArray = [];
        let portfolio = [];
        let competitions = [];
        let user = {
          id: ans[0]["data"][0]["id"],
          name: ans[0]["data"][0]["username"],
          email: ans[0]["data"][0]["email"],
          type: ans[0]["data"][0]["type"],
        };

        for (let x = 0; x < ans[0].data.length; x++) {
          if (
            ans[0]["data"][x]["portfoliocompetition"] &&
            !usersCompetitionArray.includes(
              ans[0]["data"][x]["portfoliocompetition"]
            )
          ) {
            usersCompetitionArray.push(
              ans[0]["data"][x]["portfoliocompetition"]
            );
          }

          let index = checkArray(
            ans[0]["data"][x]["portfolio_name"],
            portfolio
          );

          if (index === null) {
            portfolio.push({
              name: ans[0].data[x]["portfolio_name"],
              id: ans[0].data[x]["portfolio_id"],
              created_date: ans[0].data[x]["portfoliodatecreated"],
              portfolio_competition: ans[0].data[x]["portfoliocompetition"],
              tickers: [
                {
                  tickerId: ans[0].data[x]["portfoliodatastickerid"],
                  tickerQuantity: ans[0].data[x]["tickerquantity"],
                },
              ],
            });
          } else {
            portfolio[index].tickers.push({
              tickerId: ans[0].data[x]["portfoliodatastickerid"],
              tickerQuantity: ans[0].data[x]["tickerquantity"],
            });
          }
        }

        for (let i = 0; i < ans[1].data.length; i++) {
          let index = checkObject(
            ans[1].data[i]["competition_id"],
            competitions
          );
          if (ans[1].data[i].competition_id) {
            if (index === null) {
              competitions.push({
                id: ans[1].data[i]["competition_id"],
                name: ans[1].data[i]["competition_name"],
                capital: ans[1].data[i]["startamount"],
                start_date: ans[1].data[i]["starttime"],
                end_date: ans[1].data[i]["endtime"],
                avaliability: ans[1].data[i]["avaliabilty"],
                portfolios: [
                  {
                    name: ans[1].data[i]["portfolio_name"],
                  },
                ],
                userComp: false,
              });
            } else {
              competitions[index].portfolios.push({
                name: ans[1].data[i]["portfolio_name"],
              });
            }
          }
        }

        for (let j = 0; j < competitions.length; j++) {
          let theLength = competitions[j]["portfolios"].length;
          competitions[j]["users"] = theLength;
          competitions[j]["prizePool"] =
            (competitions[j]["capital"] * theLength) / 2;
        }

        let usersCompetition = [];

        for (let i = 0; i < usersCompetitionArray.length; i++) {
          usersCompetition.push(
            findCompetitionById(usersCompetitionArray[i], competitions)
          );

          let index = findIndex(usersCompetitionArray[i], competitions);
          competitions[index]["userComp"] = true;
        }
        setPortfolio(portfolio[0]["name"], portfolio[0]["id"]);
        return [user, usersCompetition, portfolio, competitions];
      })
      .then((ans) => {
        setLoading(false);
        setInfo({
          ...info,
          user: ans[0],
          portfolios: ans[2],
          competitions: ans[3],
          user_competitions: ans[1],
        });
      });
    // eslint-disable-next-line
  }, []);

  const savePortfolio = (
    portfolio_name,
    user_id,
    competition_id,
    startValue
  ) => {
    Promise.all([
      axios.post(`http://localhost:3001/newPortfolio`, {
        portfolioName: portfolio_name,
        user_id: user_id,
        competition_id: competition_id,
      }),
      axios.get(`http://localhost:3001/portfolioLatest`),
    ]).then((ans) => {
      let newportfolio_id = ans[1]["data"][0]["id"] + 1 ;
      Promise.all([axios
        .post(`http://localhost:3001/newPortfolioValue`, {
          portfolio_id: newportfolio_id,
          value: startValue,
        })]).then((ans) => {
          console.log(ans);
        }).catch(function (error) {
          console.log(error);
        });
    }).catch(function (error) {
      console.log(error);
    });
  }
/*
      .then(() => {
        axios.get(`http://localhost:3001/portfolioLatest`);
      })
      .then((ans) => {
        console.log(ans);
        axios
          .post(`http://localhost:3001/newPortfolioValue`, {
            portfolio_id: ans[0]["id"],
            value: startValue,
          })
          .then((ans) => {
            console.log(ans);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
*/
  return {
    view,
    setMenu,
    setPortfolio,
    info,
    loading,
    popup,
    setNewPopup,
    savePortfolio,
  };
}
