-- Drop and recreate users, competitions, portfolios, tickers, portfolio_datas, transactions, compeition_users table

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS tickers CASCADE;
DROP TABLE IF EXISTS portfolio_datas CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS compeition_users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  type BOOLEAN NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE competitions (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    start_datetime TIMESTAMP NOT NULL DEFAULT NOW(),
    end_datetime TIMESTAMP NOT NULL,
    start_amount INTEGER NOT NULL,
    avaliability BOOLEAN NOT NULL DEFAULT TRUE 
);

CREATE TABLE competition_users (
    id SERIAL PRIMARY KEY NOT NULL,
    competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE
);

CREATE TABLE tickers (
    id SERIAL PRIMARY KEY NOT NULL,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    ticker VARCHAR(255) NOT NULL,
    company_name TEXT
);

CREATE TABLE portfolio_datas (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity INTEGER NOT NULL,
  portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
  ticker_id INTEGER REFERENCES tickers(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY NOT NULL,
    type BOOLEAN NOT NULL,
    amount INTEGER NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT NOW(),
    ticker_id INTEGER REFERENCES tickers(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


