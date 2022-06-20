-- Users table seeds here (Example)

INSERT INTO users (type, name, email, password) VALUES (true, 'Keith Gills', 'roaringkitty@gmail.com','1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Stephanie Wolff', 'darius.homenick@to.com', '1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Stan Miller', 'mcdermott.maxie@schoen', '1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Elliot Dickinson','derrick_pollich@gmail.com','1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Lloyd Boehm', 'ebba.deckow@yahoo.com', '1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Erna Cassin', 'miguel.barrows@yahoo.com', '1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Edison Brown', 'alysha.daniel@boye','1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Lionel Morar', 'bradtke.mallie@yahoo.com','1234');

INSERT INTO users (type, name, email, password) VALUES (false, 'Donnie Lueilwitz', 'kattie_dibbert@winnifred.nom','1234');

INSERT INTO users (type, name, email, password) VALUES (false,  'Obie Howell', 'elisha_wisoky@gmail.com', '1234');

-- competitions table seeds here (Example)

INSERT INTO competitions (name, start_datetime, end_datetime, start_amount) VALUES ('WSB Competition', '2022-06-12T08:00:00.000Z', '2022-06-19T08:00:00.000Z', 10000);

INSERT INTO competitions (name, start_datetime, end_datetime, start_amount) VALUES ('Crypto Competition', '2022-06-12T08:00:00.000Z', '2022-06-19T08:00:00.000Z', 30000);

INSERT INTO competitions (name, start_datetime, end_datetime, start_amount) VALUES ('FAANG Competition', '2022-06-12T08:00:00.000Z', '2022-06-19T08:00:00.000Z', 50000);

-- competition_users table seeds here (Example)

INSERT INTO competition_users (competition_id, user_id) VALUES (1, 2);

INSERT INTO competition_users (competition_id, user_id) VALUES (1, 3);

INSERT INTO competition_users (competition_id, user_id) VALUES (1, 4);

INSERT INTO competition_users (competition_id, user_id) VALUES (2, 5);

INSERT INTO competition_users (competition_id, user_id) VALUES (2, 6);

INSERT INTO competition_users (competition_id, user_id) VALUES (3, 7);

INSERT INTO competition_users (competition_id, user_id) VALUES (3, 8);

INSERT INTO competition_users (competition_id, user_id) VALUES (3, 9);

INSERT INTO competition_users (competition_id, user_id) VALUES (3, 10);

-- portfolios table seeds here (Example)

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Stephanies savings', '2019-06-12T08:00:00.000Z', 2, NULL);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Stephanies playing money', '2019-06-12T08:00:00.000Z', 2, 1);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('STAN TO THE MOON', '2019-06-12T08:00:00.000Z', 3, 1);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('GME IS THE ONLY PLAY - ELLIOT', '2019-06-12T08:00:00.000Z', 4, 1);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Lloyds cryptocurrency play money', '2019-06-12T08:00:00.000Z', 5, 2);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Ernas btc bank', '2019-06-12T08:00:00.000Z', 6, 2);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Edisons FAANG money', '2019-06-12T08:00:00.000Z', 7, 3);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Lionels savings/playing on FAANG ', '2019-06-12T08:00:00.000Z', 8, 3);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Donnie and Meta', '2019-06-12T08:00:00.000Z', 9, 3);

INSERT INTO portfolios (name, date_created, user_id, competition_id) VALUES ('Obie with Amazon', '2019-06-12T08:00:00.000Z', 10, 3);


-- tickers table seeds here (Example)

INSERT INTO tickers (portfolio_id, ticker) VALUES (1, 'AAPL');

INSERT INTO tickers (portfolio_id, ticker) VALUES (1, 'MSFT');

INSERT INTO tickers (portfolio_id, ticker) VALUES (1, 'AMZN');

INSERT INTO tickers (portfolio_id, ticker) VALUES (1, 'GOOG');

INSERT INTO tickers (portfolio_id, ticker) VALUES (1, 'GME');

INSERT INTO tickers (portfolio_id, ticker) VALUES (2, 'AMC');

INSERT INTO tickers (portfolio_id, ticker) VALUES (2, 'BBBY');

INSERT INTO tickers (portfolio_id, ticker) VALUES (2, 'BRK.A');

INSERT INTO tickers (portfolio_id, ticker) VALUES (3, 'GME');

INSERT INTO tickers (portfolio_id, ticker) VALUES (3, 'AMC');

INSERT INTO tickers (portfolio_id, ticker) VALUES (4, 'GME');

INSERT INTO tickers (portfolio_id, ticker) VALUES (5, 'BTC');

INSERT INTO tickers (portfolio_id, ticker) VALUES (5, 'ETH');

INSERT INTO tickers (portfolio_id, ticker) VALUES (5, 'DOGE');

INSERT INTO tickers (portfolio_id, ticker) VALUES (6, 'BTC');

INSERT INTO tickers (portfolio_id, ticker) VALUES (7, 'GOOG');

INSERT INTO tickers (portfolio_id, ticker) VALUES (7, 'AAPL');

INSERT INTO tickers (portfolio_id, ticker) VALUES (7, 'MSFT');

INSERT INTO tickers (portfolio_id, ticker) VALUES (8, 'AAPL');

INSERT INTO tickers (portfolio_id, ticker) VALUES (8, 'META');

INSERT INTO tickers (portfolio_id, ticker) VALUES (8, 'MSFT');

INSERT INTO tickers (portfolio_id, ticker) VALUES (9, 'META');

INSERT INTO tickers (portfolio_id, ticker) VALUES (10, 'AMZN');


-- portfolio_datas table seeds here (Example)

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 1, 1);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (2, 1, 2);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 1, 3);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 1, 4);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 1, 5);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (10, 2, 6);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (5, 2, 7);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 2, 8);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (10, 3, 9);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (10, 3, 10);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (20, 4, 11);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 5, 12);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (2, 5, 13);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (100, 5, 14);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (2, 6, 15);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 16);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 17);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 18);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 19);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 20);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (1, 7, 21);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (3, 8, 22);

INSERT INTO portfolio_datas (quantity, portfolio_id, ticker_id) VALUES (3, 9, 23);

-- transactions table seeds here (Example)

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 1, 2);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 2, '2020-06-12T08:00:00.000Z', 2, 2);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 3, 2);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 4, 2);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 5, 2);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 10, '2020-06-12T08:00:00.000Z', 6, 3);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 5, '2020-06-12T08:00:00.000Z', 7, 3);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 8, 3);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 10, '2020-06-12T08:00:00.000Z', 9, 4);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 10, '2020-06-12T08:00:00.000Z', 10, 4);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 20, '2020-06-12T08:00:00.000Z', 11, 5);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 12, 6);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 2, '2020-06-12T08:00:00.000Z', 13, 6);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 100, '2020-06-12T08:00:00.000Z', 14, 6);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 2, '2020-06-12T08:00:00.000Z', 15, 7);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 16, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 17, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 18, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 19, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 20, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 1, '2020-06-12T08:00:00.000Z', 21, 8);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 3, '2020-06-12T08:00:00.000Z', 22, 9);

INSERT INTO transactions (type, amount, datetime, ticker_id, user_id) VALUES (true, 3, '2020-06-12T08:00:00.000Z', 23, 10);

