import React from "react";
import classNames from "classnames";

export default function MenuItem(props) {

  const menuListClass = classNames("sideListItem", {
    "sideListItem--selected": props.selected,
  });

  return (
    <div className={menuListClass}
    onClick = {props.onClick}>
      {props.name}
    </div>
  );
}
