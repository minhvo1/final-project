require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Handle schedule jobs
const scheduledFunctions = require("./scheduled_jobs/cron");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST"],
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

scheduledFunctions.initScheduledJobs(db);

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
    portfolios.date_created as portfolioDateCreated, portfolios.competition_id as portfolioCompetition, portfolios.funds as portfolioFunds, portfolios.total_value as portfolioTotalValue, competition_users.competition_id as competitionsIds, 
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

app.get("/portfolio_datas", (req, res) => {
  const query = `SELECT * from portfolio_datas`;
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

app.get("/portfolioLatest/", (req, res) => {
  db.query(`SELECT id FROM portfolios ORDER BY id DESC LIMIT 1`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/ticker/:id", (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM tickers 
    WHERE id = $1`;
  db.query(query, [id]).then((data) => {
    console.log(data.rows);
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

app.post("/newPortfolio", (req, res) => {
  if (process.env.TEST_ERROR) {
    setTimeout((response) => response.status(500).json({}), 1000);
    return;
  }

  const { portfolioName, user_id, competition_id, funds, total_value } = req.body;
  db.query(
    `INSERT INTO portfolios (name, user_id, competition_id, funds, total_value) VALUES ($1, $2, $3, $4, $5)`,
    [portfolioName, user_id, competition_id, funds, total_value]
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

app.post("/newPortfolioValue", (req, res) => {
  if (process.env.TEST_ERROR) {
    setTimeout((response) => response.status(500).json({}), 1000);
    return;
  }
  const { portfolio_id, value } = req.body;
  db.query(
    `INSERT INTO portfolio_values (portfolio_id, value) VALUES ($1, $2)`,
    [portfolio_id, value]
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

app.get("/portfolio_values", (reg, res) => {
  const searchTerm = reg.query.query;
  if (searchTerm === "") {
    return res.json({});
  }
  const query = `SELECT * FROM portfolio_values;`;
  db.query(query)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => res.json({ message: err }));
});

app.post("/value", (req, res) => {
  const { portfolio_id, datetime, value } = req.body;
});

app.get("/value/:id", (req, res) => {
  const { id } = req.params;
  if (id === "null") return res.json([]);
  let query = `SELECT * FROM portfolio_values 
  WHERE portfolio_id = $1`;
  db.query(query, [id]).then((data) => {
    res.json(data.rows);
  });

  app.put("/portfolios/:id/add", (req, res) => {
    /* console.log(req.body.ticker_id);
    console.log(req.params.id);
     (1, 1, 1);
   */
    db.query(
      `INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES($1, $2, $3)`,
      [0, req.params.id, req.body.ticker_id]
    )
      .then((data) => {
        res.json("success");
      })
      .catch((err) => res.json({ message: err }));
  });
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
