import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [view, setView] = useState({
    menu: "Dashboard",
    portfolio: "YOLO Portfolio",
  });

  const setPortfolio = (portfolio) => setView({ ...view, portfolio });

  const setMenu = (menu) => setView({ ...view, menu });

  const portfolios = [
    {
      id: 1,
      name: "YOLO Portfolio",
    },

    {
      id: 2,
      name: "Savings Portfolio",
    },

    {
      id: 3,
      id : 1,
      name: "WSB Competition",
    },
  ];

  const competitions = [
    {
      id : 1,
      name: "WSB Competition",
      lobby: "1/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability : true
    },
    {
      id : 2,
      name: "WSB Competition",
      lobby: "2/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability : true
    },
    {
      id : 3,
      name: "WSB Competition",
      lobby: "3/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability : true
    },
    {
      id : 4,
      name: "WSB Competition",
      lobby: "5/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability : false
    },
    {
      id : 5,
      name: "WSB Competition",
      lobby: "5/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      avaliability : false
    },
  ];

  const user_competitions = [
    {
      id : 1,
      name: "WSB Competition",
      lobby: "1/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      profit : 1000
    },
    {
      id : 2,
      name: "WSB Competition",
      lobby: "2/5",
      capital: 1000,
      prizePool: 1000000,
      start_date: "2019-06-12T08:00:00.000Z",
      end_date: "2019-06-19T08:00:00.000Z",
      profit : 1000

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
