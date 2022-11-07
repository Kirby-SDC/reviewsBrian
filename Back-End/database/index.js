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
  return pool.query(`SELECT
  a.review_id
, a.rating
, a.summary
, a.recommend
, a.response
, a.body
, a.date
, a.reviewer_name
, a.helpfulness
, (
    SELECT
      json_agg(ph)
    FROM
      (
        SELECT
          url
        FROM
          photos
        WHERE
          review_id = a.review_id
      ) ph
  ) photos
FROM
  reviews a
WHERE
  product_id = ${req.query.product_id};`);
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
  .catch (err => {
    console.log(err)
  })
  // .then (data => {
  //   for (characteristic in req.characteristics) {
  //     pool.query(`INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES(${characteristic}, ${data.rows[0].review_id}, ${req.characteristics[characteristic]})`)
  //   }
  // })
}

// increase helpfulness

module.exports.updateHelpful = (req) => {
  pool.query(`UPDATE
  reviews
SET
  helpfulness = helpfulness + 1
WHERE
  review_id = {req};`)
}

// get metadata

module.exports.getMetaData = (req) => {
  return pool.query(`SELECT
  json_build_object(
    'product_id'
  , ${req.query.product_id}
  , 'ratings'
  , (
      SELECT
        jsonb_object_agg(rating, count) details
      FROM
        (
          SELECT
            rating
          , count(rating)
          FROM
            reviews
          WHERE
            product_id = ${req.query.product_id}
          GROUP BY
            rating
        ) t
    )
  , 'recommended'
  , (
      SELECT
        jsonb_object_agg(recommend, count) details
      FROM
        (
          SELECT
            recommend
          , count(recommend) count
          FROM
            reviews
          WHERE
            product_id = ${req.query.product_id}
          GROUP BY
            recommend
        ) t
    )
  , 'characteristics'
  , (
      SELECT
        json_object_agg(
          name
        , jsonb_build_object(
            'id'
          , id
          , 'value'
          , avg
          )
        )
      FROM
        (
          SELECT
            c.name
          , c.id
          , avg(cr.value)
          FROM
            characteristics c
          LEFT JOIN
            characteristic_reviews cr
              ON c.id = cr.characteristic_id
          WHERE
            c.product_id = ${req.query.product_id}
          GROUP BY
            c.id
        ) t
    )
  ) t; `);
}

// SELECT pr.*, c.sha AS merge_commit_sha
// FROM pull_requests pr
//   LEFT JOIN commits c ON     pr.merge_commit_id = c.id
//                          AND pr.repository_id = c.repository_id
// WHERE pr.repository_id IN (...)