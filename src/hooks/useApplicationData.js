import { useState, useEffect } from "react";
import axios from "axios";
import { getCompetitions } from "../helpers/sidebarHelper";

export default function useApplicationData() {
  const [view, setView] = useState({
    menu: "Dashboard",
    portfolio: "YOLO Portfolio",
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
    const profileURL = "http://localhost:3001/users";
    const competitionsURL = "http://localhost:3001/competitions";

    Promise.all([axios.get(profileURL), axios.get(competitionsURL)])
      .then((ans) => {
        setInfo({
          ...info,
          user: ans[0]["data"][1],
          competitions: ans[1]["data"],
        });
      })
    Promise.all ([axios.get(`http://localhost:3001/portfolios/${info.user.id}`), axios.get(`http://localhost:3001/competitions/user/${info.user.id}`)])
        .then ((ans) => {
          console.log(ans);
        })

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
  };
}
