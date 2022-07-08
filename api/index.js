require("dotenv").config();


const express = require("express");
const bodyparser = require("body-parser");
const request = require('request');

const PORT = process.env.PORT || 3001;

const app = express();

// PG database client/connection setup
//const {StringStream} = require("scramjet");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { json } = require("express");
const db = new Pool(dbParams);
db.connect();

console.log(db);

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tickers`)
    .then(data => {
      console.log(data);
      res.json(data.rows);
    })
    .catch(err => res.json({message: err}));
});

/* app.get("/get_tickers", (req, res) => {
  return request.get("https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=2DHC1EFVR3EOQ33Z")
    .pipe(new StringStream())
    .CSVParse()                                   // parse CSV output into row objects
    .consume(object => console.log("Row:", object))
    .then(() => console.log("success"));
}); */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});