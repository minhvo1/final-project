import React, { Fragment, useState } from "react";
import "./Popup.scss";
import { findCapital } from "../../helpers/sidebarHelper";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (email.length === 0) {
      setError("Email can't be blank!");
      return;
    }
    if(password.length === 0) {
      setError("Pasword can't be blank!")
      return;
    }
    setError("");
    props.login(email, password);
  }

  return (
    <div className="frm-login">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="input-info">
          <h3>Enter email</h3>
          <input
            value={email}
            className="input"
            type="text"
            placeholder=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>    
        <div className="input-info">
          <h3>Enter password</h3>
          <input
            value={password}
            className="input"
            type="password"
            placeholder=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>    
        <section className="error-message">{error}</section>
        <div className="buttons">
          <button className="save-button" type="button"  onClick={validate}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}