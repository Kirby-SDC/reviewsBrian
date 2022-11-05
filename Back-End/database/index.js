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

// get all reviews

module.exports.getReviews = (req) => {
  return pool.query(`select * from (
    select a.review_id, a.rating, a.summary, a.recommend, a.response,
      a.body, a.date, a.reviewer_name, a.helpfulness, (select json_agg(ph) from
      (select url from photos where review_id = a.review_id )ph ) as photos
    from reviews as a where product_id = ${req.query.product_id}) r;`);
}

// add a review

module.exports.addReview = (req) => {
  pool.query(`INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES(${req.product_id}, ${req.rating}, '${req.summary}', '${req.body}', ${req.recommend}, '${req.name}', '${req.email}') RETURNING review_id`)
  .then (data => {
    let reviewIdArray = Array(req.photos.length).fill(data.rows[0].review_id, 0)
    pool.query(`INSERT INTO photos (review_id, url) SELECT UNNEST('{${reviewIdArray}}' :: INTEGER []), UNNEST('{${req.photos}}' :: TEXT [])`)
    for (characteristic in req.characteristics) {
      pool.query(`INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES(${characteristic}, ${data.rows[0].review_id}, ${req.characteristics[characteristic]})`)
    }

  })
}

// increase helpfulness

module.exports.updateHelpful = (req) => {
  pool.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id=${req}`)
}

// get metadata

module.exports.getMetaData = (req) => {
  console.log('REVIEW ID')
  return pool.query(`SELECT * FROM characteristics LIMIT 100 `);
}

/*
{
  "product_id": "37314",
  "ratings": {
      "1": "16",
      "2": "19",
      "3": "58",
      "4": "46",
      "5": "58"
  },
  "recommended": {
      "false": "60",
      "true": "137"
  },
  "characteristics": {
      "Fit": {
          "id": 125040,
          "value": "3.0185185185185185"
      },
      "Length": {
          "id": 125041,
          "value": "2.6190476190476190"
      },
      "Comfort": {
          "id": 125042,
          "value": "2.6410256410256410"
      },
      "Quality": {
          "id": 125043,
          "value": "2.7894736842105263"
      }
  }
}*/
