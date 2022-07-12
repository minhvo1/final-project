import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { getCompetitions, checkArray, checkObject, findCompetitionById, findIndex } from "../helpers/sidebarHelper";

export default function useApplicationData() {
  const [view, setView] = useState({
    menu: "Dashboard",
    portfolio: null,
  });
  

  const [info, setInfo] = useState({
    user: {},
    portfolios: {},
    competitions: {},
    user_competitions: {},
  });

  const [loading, setLoading] = useState(true);

  const setPortfolio = (portfolio) => {
    setView({ menu: "Dashboard", portfolio });
  };

  const setMenu = (menu) => setView({ ...view, menu });

  useEffect(() => {
    const userId = 2;
    const profileURL = `http://localhost:3001/userdata/${userId}`;
    const competitionURL = `http://localhost:3001/compUsers`;

    Promise.all([axios.get(profileURL), axios.get(competitionURL)])
      .then((ans) => {
        setLoading(true)
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
            usersCompetitionArray.push(ans[0]["data"][x]["portfoliocompetition"]);
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
              tickers: [{
                tickerId: ans[0].data[x]["portfoliodatastickerid"],
                tickerQuantity: ans[0].data[x]["tickerquantity"],
              }],
            });
          } else {
            portfolio[index].tickers.push({
              tickerId: ans[0].data[x]["portfoliodatastickerid"],
              tickerQuantity: ans[0].data[x]["tickerquantity"],
              
            })
          }
        }

        for(let i = 0; i < ans[1].data.length; i++) {
          let index = checkObject(ans[1].data[i]["competition_id"],competitions)
            if(ans[1].data[i].competition_id) {

              if (index === null) {
                competitions.push ({ 
                  id : ans[1].data[i]["competition_id"],
                  name: ans[1].data[i]["competition_name"],
                  capital : ans[1].data[i]["startamount"],
                  start_date : ans[1].data[i]["starttime"],
                  end_date :ans[1].data[i]["endtime"], 
                  avaliability : ans[1].data[i]["avaliabilty"], 
                  portfolios : [ {
                    name : ans[1].data[i]["portfolio_name"]
                  }],
                  userComp : false
                })
              } else { 
                competitions[index].portfolios.push({
                  name : ans[1].data[i]["portfolio_name"]
                })
              }
            }
        }

        for (let j = 0; j < competitions.length; j++) {
          let theLength = competitions[j]["portfolios"].length;
          competitions[j]["users"] = theLength; 
          competitions[j]["prizePool"] = (competitions[j]["capital"] * theLength)/2
        }

        let usersCompetition = [];

        for (let i = 0; i < usersCompetitionArray.length; i++) {
          usersCompetition.push(findCompetitionById(usersCompetitionArray[i],competitions))
          
          let index = findIndex(usersCompetitionArray[i], competitions);
          competitions[index]["userComp"] = true;

        }
        
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
  console.log(info.portfolios)
  const portfolios = [
    {
      id: 4,
      name: "YOLO Portfolio",
    },

    {
      id: 5,
      name: "Savings Portfolio",
    },

    {
      id: 6,
      name: "WSB Competition",
    },
  ];

  const competitions = [
    {
      id: 1,
      name: "WSB Competition",
      lobby: "1/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability: true,
    },
    {
      id: 2,
      name: "WSB Competition",
      lobby: "2/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability: true,
    },
    {
      id: 3,
      name: "WSB Competition",
      lobby: "3/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability: true,
    },
    {
      id: 4,
      name: "WSB Competition",
      lobby: "5/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability: false,
    },
    {
      id: 5,
      name: "WSB Competition",
      lobby: "5/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability: false,
    },
  ];

  const user_competitions = [
    {
      id: 1,
      name: "WSB Competition",
      lobby: "1/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      profit: 1000,
    },
    {
      id: 2,
      name: "WSB Competition",
      lobby: "2/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      profit: 1000,
    },
  ];

  return {
    view,
    setMenu,
    setPortfolio,
    portfolios,
    competitions,
    user_competitions,
    info,
    loading
  };
}
