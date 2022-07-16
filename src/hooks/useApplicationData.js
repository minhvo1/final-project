import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import {
  getCompetitions,
  checkArray,
  checkObject,
  findCompetitionById,
  findIndex,
  updateTotalValues
} from "../helpers/sidebarHelper";

export default function useApplicationData() {
  const userId = 1;

  const [view, setView] = useState({
    menu: "Dashboard",
    portfolio: null,
    portfolio_id: null,
  });

  const [popup, setPopup] = useState({
    popupStatus: false,
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
    if (portfolio_id !== null) {
      setView({ ...view, menu: "Dashboard", portfolio, portfolio_id });
    } else setView({ ...view, menu: "Dashboard", portfolio });
  };

  const setNewPopup = (page, infos = null) => {
    setPopup({ ...popup, popupStatus: true, page: page, info: infos });
  };

  const setMenu = (menu) => {
    setView({ ...view, menu });
    if (menu === "New Portfolio") {
      setNewPopup("New Portfolio");
    } else {
      setPopup({ ...popup, popupStatus: false });
    }
  };

  useEffect(() => {
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
          //updateTotalValues(ans[0].data[x]["portfolio_id"]);
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
              funds: ans[0].data[x]["portfoliofunds"],
              total_value: ans[0].data[x]["portfoliototalvalue"],
              tickers: [
                {
                  tickerId: ans[0].data[x]["portfoliodatastickerid"],
                  tickerQuantity: ans[0].data[x]["tickerquantity"],
                  tickerAvgPrice : ans[0].data[x]["tickeraverageprice"]
                },
              ],
            });
          } else {
            portfolio[index].tickers.push({
              tickerId: ans[0].data[x]["portfoliodatastickerid"],
              tickerQuantity: ans[0].data[x]["tickerquantity"],
              tickerAvgPrice : ans[0].data[x]["tickeraverageprice"]
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
        funds: startValue,
        total_value: startValue,
      }),
      axios.get(`http://localhost:3001/portfolioLatest`),
    ])
      .then((ans) => {
        let newportfolio_id = ans[1]["data"][0]["id"] + 1;
        Promise.all([
          axios.post(`http://localhost:3001/newPortfolioValue`, {
            portfolio_id: newportfolio_id,
            value: startValue,
          }),
        ])
          .then((ans) => {
            console.log(ans);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buyTicker = (data) => {
    Promise.all([
      axios.put(`http://localhost:3001/editPortfolios`, {
      portfolioId : data["portfolioId"], 
      funds : data["funds"]
      }),
      axios.put(`http://localhost:3001/editPortfolio_datas`,{ 
        quantity : data["quantity"]["amount"],
        existing: data["quantity"]["existing"],
        portfolioId : data["portfolioId"],
        tickerId : data["transaction"]["ticker_id"],
        originalPrice : data["originalPrice"]
      }),
      axios.post(`http://localhost:3001/newTransactions`, {
        type : data["transaction"]["type"],
        amount : data["transaction"]["amount"],
        ticker_id : data["transaction"]["ticker_id"],
        userId : data["transaction"]["userId"],
        tickerPrice : data["tickerPrice"]
      }),
    ]).then((ans) => {
      console.log(ans[2])
      axios.get(`http://localhost:3001/portfolio/${data["portfolioId"]}/updateValue`). then (() => {
        updateTotalValues( data["portfolioId"]);
      })
    }).catch((err) => {
      console.log(err);
    })
  };

  const sellTicker = (data) => { Promise.all([
    axios.put(`http://localhost:3001/editPortfolios`, {
    portfolioId : data["portfolioId"], 
    funds : data["funds"]
    }),
    axios.put(`http://localhost:3001/editPortfolio_datas`,{ 
      quantity : data["quantity"]["amount"],
      existing: data["quantity"]["existing"],
      portfolioId : data["portfolioId"],
      tickerId : data["transaction"]["ticker_id"],
      originalPrice : data["originalPrice"]
    }),
    axios.post(`http://localhost:3001/newTransactions`, {
      type : data["transaction"]["type"],
      amount : data["transaction"]["amount"],
      ticker_id : data["transaction"]["ticker_id"],
      userId : data["transaction"]["userId"],
      tickerPrice : data["tickerPrice"]
    }),
  ]).then((ans) => {
    axios.get(`http://localhost:3001/portfolio/${data["portfolioId"]}/updateValue`).then(() => {
      updateTotalValues(data["portfolioId"]);
    })
    console.log(ans);
  }).catch((err) => {
    console.log(err);
  })
};

  const deleteTicker = (portfolio_id, ticker_id) => {
    Promise.all([axios.post(`http://localhost:3001/deleteTicker`,{
      portfolioId : portfolio_id, 
      tickerId : ticker_id
    })]).then((ans) => {
      console.log(ans);
    }).catch((err) => {
      console.log(err);
    })

  };





  return {
    view,
    setMenu,
    setPortfolio,
    info,
    loading,
    setLoading,
    popup,
    setNewPopup,
    savePortfolio,
    buyTicker,
    sellTicker,
    deleteTicker,
    userId,
  };
}
