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

module.exports.getReviews = (req) => {
  return pool.query(`select * from (
    select a.review_id, a.rating, a.summary, a.recommend, a.response,
      a.body, a.date, a.reviewer_name, a.helpfulness, (select json_agg(ph) from
      (select url from photos where review_id = a.review_id )ph ) as photos
    from reviews as a where product_id = ${req.query.product_id}) r;`);
}



module.exports.getMetaData = (req) => {
  console.log('REVIEW ID')
  return pool.query(`SELECT * FROM characteristics LIMIT 100 `);
}

module.exports.addReview = (req) => {
  console.log('in post', req)
  pool.query(`INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES(${req.product_id}, ${req.rating}, ${req.summary}, ${req.body}, ${req.recommend}, ${req.name}, ${req.email}) RETURNING review_id`);

  // pool.query(`SELECT review_id from reviews WHERE )

}


//{
//   product_id: 37311,
//   rating: 4,
//   summary: 'testing to ',
//   body: 'get the data to see what it looks like when posted',
//   recommend: false,
//   name: 'asdfads',
//   email: 'adsf@233.email.com',
//   photos: [
//     'http://res.cloudinary.com/dmmzqckuu/image/upload/v1667518986/kp5uoks5msecojvql9v1.jpg'
//   ],
//   characteristics: { '125031': 5, '125032': 3, '125033': 2, '125034': 1 }
// }
