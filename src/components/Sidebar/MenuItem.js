import React from "react";
import classNames from "classnames";

export default function MenuItem(props) {
  const menuListClass = classNames("sideListItem", {
    "sideListItem--selected": props.selected,
  });

  const setToMenu = () => {
    props.onClick(props.name);
  }


  return (
    <div className={menuListClass}>
      <button className="sidebar-button" onClick={setToMenu}>
        {props.name}
      </button>
    </div>
  );
}
