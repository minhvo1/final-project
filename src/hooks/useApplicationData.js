import { useState, useEffect } from "react";

export default function useApplicationData() {


const [view, setView] = useState(
    {
      menu : "Dashboard",
      portfolio : "YOLO Portfolio"
    }
  );

  const setPortfolio = (portfolio) =>  setView({ ...view, portfolio });

  const setMenu = (menu) =>  setView({ ...view, menu });



  

  const portfolios =
  [
    {
      "id" : 1,
      "name" : "YOLO Portfolio"
    },
  
    {
      "id" : 2,
      "name" : "Savings Portfolio"
    },
  
    {
      "id" : 3,
      "name" : "WSB Competition"
    }
  ]

  
  return { view, setMenu, setPortfolio, portfolios };

}