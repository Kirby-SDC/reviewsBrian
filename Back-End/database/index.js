const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

pool.connect();

const getReviews = () => {
  return pool.query('SELECT * FROM reviews LIMIT 10')
}

module.exports.getReviews = getReviews;