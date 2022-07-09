require("dotenv").config();

const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
  origin: '*',
}));

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { json } = require("express");
const db = new Pool(dbParams);
db.connect();

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tickers`)
    .then(data => {
      console.log(data);
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users`)
    .then(data => {
      console.log(data);
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/search", (reg, res) => {
  const searchTerm = reg.query.query;
  if (searchTerm === ""){
    return res.json({});
  }
  const query = `SELECT * FROM tickers WHERE ticker LIKE '%${searchTerm.toUpperCase()}%' LIMIT 10;`;
  db.query(query)
  .then(data => {
    //console.log(data);
    res.json(data.rows);
  })
  .catch(err => res.json({ message: err }));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});