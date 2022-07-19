import React, { Fragment, useState } from "react";
import { checkArray, sharesExist } from "../../helpers/sidebarHelper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { info } from "autoprefixer";

export default function Ticker(props) {
  const [error, setError] = useState("");

  const [buyShares, setBuyShares] = useState("");
  const [sellShares, setSellShares] = useState("");
  const [action, setAction] = useState("");

  const portfolio =
    props.portfolios[checkArray(props.info.portfolio, props.portfolios)];
  const maxAmount = Math.floor(portfolio.funds / props.info.ticker.price);

  let disabled = true;
  if (props.info.ticker.quantity === 0) {
    disabled = true;
  } else {
    disabled = false;
  }

  let disabled_buy = true;
  if (maxAmount < 1) {
    disabled_buy = true;
  } else {
    disabled_buy = false;
  }

  function validate() {
    setError("");
    let Msg = "";
    let actionToDo;
    let dataToRender = {};

    if (action === "buy") {
      Msg = `Confirmation to buy ${buyShares} shares of ${props.info.ticker.ticker}?`;
      actionToDo = props.buyTicker;
      if (buyShares === null) {
        setError("Pick Shares to buy");
        return;
      }

      dataToRender = {
        portfolioId: portfolio.id,
        funds: portfolio.funds - buyShares * props.info.ticker.price,
        tickerPrice: props.info.ticker.price,
        quantity: {
          amount: buyShares + props.info.ticker.quantity,
          existing: sharesExist(props.info.ticker.id, portfolio),
        },
        originalPrice : ((props.info.ticker.avgBoughtPrice * props.info.ticker.quantity) + (props.info.ticker.price * Number(buyShares)))/ (props.info.ticker.quantity + Number(buyShares)),
        transaction: {
          type: true,
          amount: buyShares,
          ticker_id: props.info.ticker.id,
          userId: props.userId,
        },
      };
    } else {
      Msg = `Confirmation to sell ${sellShares} shares of ${props.info.ticker.ticker}?`;
      actionToDo = props.sellTicker;
      if (sellShares === null) {
        setError("Pick Shares to sell");
        return;
      }
      dataToRender = {
        portfolioId: portfolio.id,
        funds: portfolio.funds + buyShares * props.info.ticker.price,
        tickerPrice: props.info.ticker.price,
        quantity: {
          amount: props.info.ticker.quantity - sellShares,
          existing: true,
        },
        originalPrice : ((props.info.ticker.avgBoughtPrice * props.info.ticker.quantity) - (props.info.ticker.price * Number(buyShares)))/ (props.info.ticker.quantity - Number(buyShares)),
        transaction: {
          type: false,
          amount: sellShares,
          ticker_id: props.info.ticker.id,
          userId: props.userId,
        },
      };
    }
    confirmAlert({
      title: "Confirm to submit",
      message: Msg,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            actionToDo(dataToRender);
            props.setMenu("Dashboard");
            window.location.reload(true);
          },
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

  function validateDelete() {
    let Msg = `Are you sure you want to delete this ticker from your portfolio?`;

    confirmAlert({
      title: "Confirm to Delete from Portfolio",
      message: Msg,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            props.deleteTicker(portfolio.id, props.info.ticker.id);
            props.setMenu("Dashboard");
          },
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
        <p>${props.info.ticker.price}</p>
      </div>
      <div className="ticker-info">
        <h2>User</h2>
        {props.info.ticker.quantity > 0 && (
          <p>
            <span>{props.info.ticker.quantity} share(s), bought at an average price of</span>{" "}
        
              ${""}
              {(Math.round(props.info.ticker.avgBoughtPrice + Number.EPSILON) *
                100) /
                100}
      
            <br />
            
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
              You can <strong>BUY</strong> up to <b>{maxAmount}</b> share(s){" "}
            </h2>
            <input
              type="number"
              placeholder={maxAmount}
              name="share-buy"
              min="1"
              max={maxAmount}
              disabled={disabled_buy}
              onChange={(e) => {
                setBuyShares(Number(e.target.value));
                setAction("buy");
              }}
            ></input>
            <button
              className="join-button"
              onClick={() => {
                setAction("buy");
                validate();
              }}
              disabled={disabled_buy}
            >
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
              You can <strong>SELL</strong>  <b>{props.info.ticker.quantity}</b> share(s) at{" "}
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
                setAction("sell");
                setSellShares(Number(e.target.value));
              }}
            ></input>
            <button
              className="join-button"
              onClick={() => {
                setAction("sell");
                validate();
              }}
              disabled={disabled}
            >
              Sell
            </button>
          </form>
        </div>
      </div>
      <div className="error-delete">
        <section className="error-message">{error}</section>
        {props.info.ticker.quantity === 0 && (
          <button className="delete-button" onClick={validateDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
