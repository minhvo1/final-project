import React from "react";
import MenuItem from "./MenuItem.js";

export default function MenuList(props) {
  let selection = props.selected;
  if (props.selected === null) {
    selection = "Competitions";
  }
  const menuLists = props.menus.map((menu) => {
    return (
      <MenuItem
      key={menu.id}
      name={menu.name}
      selected={menu.name === selection}
      onClick={props.setMenu}
      />
    );
  });
  return (
    <section className = "menus-lists">
    <h5 className = "sideBar-titles">
    Menu
    </h5>
    {menuLists}
    </section>
  )
}
