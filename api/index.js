require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { json } = require("express");
const db = new Pool(dbParams);
db.connect();

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tickers`)
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/competitions", (req, res) => {
  db.query(`SELECT * FROM competitions`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/competitions/user/:id", (req, res) => {
  db.query(`SELECT * FROM competition_users WHERE user_id = $1`, [
    req.params["id"],
  ])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/userdata/:id", (req, res) => {
  db.query(
    `SELECT users.id as id, users.name as userName, users.type as type, users.email as email, portfolios.name as portfolio_name, portfolios.id as portfolio_id, 
    portfolios.date_created as portfolioDateCreated, portfolios.competition_id as portfolioCompetition, competition_users.competition_id as competitionsIds, 
    portfolio_datas.quantity as tickerQuantity, portfolio_datas.ticker_id as portfolioDatasTickerId
    FROM users FULL OUTER JOIN portfolios ON users.id = portfolios.user_id FULL OUTER JOIN competition_users ON portfolios.user_id = competition_users.user_id LEFT JOIN portfolio_datas ON portfolios.id = portfolio_datas.portfolio_id
    WHERE users.id = $1`,
    [req.params.id]
  )
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/compUsers", (req, res) => {
  const query = `SELECT competitions.id as competition_id, competitions.name as competition_Name, competitions.start_datetime as startTime, competitions.end_datetime as endTime, competitions.start_amount as startAmount, competitions.avaliability as avaliabilty, portfolios.name as portfolio_name FROM portfolios FULL OUTER JOIN competitions ON portfolios.competition_id = competitions.id`;
  db.query(query)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users`)
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolios/:id", (req, res) => {
  db.query(`SELECT * FROM portfolios WHERE user_id = $1`, [req.params["id"]])
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolio/", (req, res) => {
  db.query(`SELECT * FROM portfolio_datas WHERE portfolio_id = 1`).then(
    (data) => {
      res.json(data.rows);
    }
  );
});

app.get("/ticker/:id", (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM tickers 
    WHERE id = $1`;
  db.query(query, [id]).then((data) => {
    res.json(data.rows);
  });
});

app.get("/search", (reg, res) => {
  const searchTerm = reg.query.query;
  if (searchTerm === "") {
    return res.json({});
  }
  const query = `SELECT * FROM tickers WHERE ticker LIKE '%${searchTerm.toUpperCase()}%' LIMIT 10;`;
  db.query(query)
    .then((data) => {
      //console.log(data);
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

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
