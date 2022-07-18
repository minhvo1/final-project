import React from "react";
import classNames from "classnames";
export default function(props) {
  const userClass = "user-info";
  const userImageClass = "user-image";
  return (
    <div className={userClass}>
      <img className={userImageClass} src="https://icons-for-free.com/download-icon-avatar+circle+male+profile+user+icon-1320196703471638282_512.png" onClick={props.logout}/>
    </div>
  );
}