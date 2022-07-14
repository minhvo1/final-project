import React, { Fragment, useState } from "react";
import { checkArray } from "../../helpers/sidebarHelper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Ticker(props) {
  const [error, setError] = useState("");
  const [shares, setShares] = useState({
    share: null,
    action: null,
  });

  const portfolio =
    props.portfolios[checkArray(props.info.portfolio, props.portfolios)];
  console.log(portfolio);
  const maxAmount = Math.floor(portfolio.funds / props.info.ticker.price);

  let disabled = true;
  if (props.info.ticker.quantity === 0) {
    disabled = true;
  } else {
    disabled = false;
  }

  function validate() {
    setError("");
    let action;
    let Msg = "";
    if (shares.action === "buy") {
      Msg = `Confirmation to buy ${shares.share} shares of ${props.info.ticker.ticker}?`;
      action = props.buyTicker;
    } else {
      Msg = `Confirmation to sell ${shares.share} shares of ${props.info.ticker.ticker}?`;
      action = props.sellTicker;
    }

    if (shares.share === null) {
      setError("Pick Shares to buy or sell");
      return;
    }

    confirmAlert({
      title: "Confirm to submit",
      message: Msg,
      buttons: [
        {
          label: "Yes",
          onClick: () => action(),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  return (
    <div className="Ticker">
      <div className="ticker-info">
        <h2>Company Name</h2>
        <p>{props.info.ticker.company_name}</p>
      </div>
      <div className="ticker-info">
        <h2>Ticker</h2>
        <p>{props.info.ticker.ticker}</p>
      </div>
      <div className="ticker-info">
        <h2>Current Price</h2>
        <p>{props.info.ticker.price}</p>
      </div>
      <div className="ticker-info">
        <h2>User</h2>
        {props.info.ticker.quantity > 0 && (
          <p>
            🟢{props.info.ticker.quantity} Share(s), Total Price :{" "}
            {props.info.ticker.quantity * props.info.ticker.price}🟢
          </p>
        )}
        {!props.info.ticker.quantity && <p>🔴No Shares🔴</p>}
      </div>

      <div className="buy-sell">
        <div className="buy-ticker">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <h2>
              You can buy up to <b>{maxAmount}</b> share(s){" "}
            </h2>
            <input
              type="number"
              placeholder={maxAmount}
              name="share-buy"
              min="1"
              max={maxAmount}
              onChange={(e) => {
                setShares({ ...shares, share: e.target.value, action: "buy" });
              }}
            ></input>
            <button className="join-button" onClick={validate}>
              Buy
            </button>
          </form>
        </div>

        <div className="sell-ticker">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <h2>
              You can sell <b>{props.info.ticker.quantity}</b> share(s) at{" "}
              {props.info.ticker.price} ${" "}
            </h2>
            <input
              name="share-sell"
              type="number"
              placeholder={props.info.ticker.quantity}
              min="1"
              max={props.info.ticker.quantity}
              disabled={disabled}
              onChange={(e) => {
                setShares({ ...shares, share: e.target.value, action: "sell" });
              }}
            ></input>
            <button
              className="join-button"
              onClick={validate}
              disabled={disabled}
            >
              Sell
            </button>
          </form>
        </div>
      </div>
      <section className="error-message">{error}</section>
    </div>
  );
}
