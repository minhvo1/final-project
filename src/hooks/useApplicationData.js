import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { getCompetitions, checkArray } from "../helpers/sidebarHelper";

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

  const setPortfolio = (portfolio) => {
    setView({ menu: "Dashboard", portfolio });
  };

  const setMenu = (menu) => setView({ ...view, menu });

  useEffect(() => {
    const userId = 2;
    const profileURL = `http://localhost:3001/userdata/${userId}`;
    const competitionURL = `http://localhost:3001/competitions`;

    Promise.all([axios.get(profileURL), axios.get(competitionURL)])
      .then((ans) => {
        let usersCompetition = [];
        let portfolio = [];
        let user = {
          id: ans[0]["data"][0]["id"],
          name: ans[0]["data"][0]["username"],
          email: ans[0]["data"][0]["email"],
          type: ans[0]["data"][0]["type"],
        };
        let tickerAmount = 1;
        for (let x = 0; x < ans[0].data.length; x++) {
          if (
            ans[0]["data"][x]["portfoliocompetition"] &&
            !usersCompetition.includes(
              ans[0]["data"][x]["portfoliocompetition"]
            )
          ) {
            usersCompetition.push(ans[0]["data"][x]["portfoliocompetition"]);
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
              ticker0: {
                tickerId: ans[0].data[x]["portfoliodatastickerid"],
                tickerQuantity: ans[0].data[x]["tickerquantity"],
              },
            });
          } else {
            portfolio[index][`ticker${tickerAmount}`] = {
              tickerId: ans[0].data[x]["portfoliodatastickerid"],
              tickerQuantity: ans[0].data[x]["tickerquantity"],
            };
            tickerAmount++;
          }
        }
        return [user, usersCompetition, portfolio, ans[1]["data"]];
      })
      .then((ans) => {
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

  /* .then((id) => {
    const userPortURL = `http://localhost:3001/portfolios/${id}`;
    const userCompURL = `http://localhost:3001/competitions/user/${id}`;
    Promise.all([axios.get(userPortURL), axios.get(userCompURL)]).then(
      (ans) => {
        let users_comp = getCompetitions(ans[1]["data"], info.competitions);
        setInfo({
          ...info,
          portfolios: ans[0]["data"],
          user_competitions: users_comp,
        });
      }
    );
  })*/
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
  };
}
