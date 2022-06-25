
export function getPortfolios (db, id) {
    let query = `select * from portfolios WHERE user_id = $1`
    return db.query (query, [id])
    .then((result) => {
        if (result.rows[0] === undefined) {
          return null;
        }
        return result.rows;
      })
      .catch((err) => {
        return err;
      });
}