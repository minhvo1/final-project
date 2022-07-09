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

//console.log(db);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.get("/portfolio/", (req, res) => {
  db.query(`SELECT * FROM portfolio_datas WHERE portfolio_id = 1`)
    .then((data) => {
      res.json(data.rows)
    })
})

app.get("/ticker/:id", (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM tickers 
    WHERE id = $1`
  db.query(query, [id])
  .then((data) => {
    res.json(data.rows)
  })
})

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


/* app.get("/get_tickers", (req, res) => {
  const results = [];

  fs.createReadStream('./datas/listing_status.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
      let string = "";
      for (const row of results) {
        string += `INSERT INTO tickers (portfolio_id, ticker, company_name) VALUES (1, '${row['symbol']}', '${row['name']}');`
        string += "<br />";
    
      }
      console.log(string);
      return res.send(string);
    });
}); */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});