import React from "react";
import classNames from "classnames";

export default function NewPortfolio(props) {


  const setToPortfolio = () => {
    props.onClick(props.name);
    props.setMenu("Dashboard");
  }

  return (
    <div className="sideListItem" >
     <form>
        <input className = "inputForm" type ="text" placeholder = "New Portfolio.."></input>
        <input type="submit" hidden />
     </form>
    </div>
  );
}
