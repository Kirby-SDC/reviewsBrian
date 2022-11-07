const express = require('express');
const connectionClient = require('../connect.js');
const {getReviews, getMetaData, addReview, updateHelpful, reportReview} = require('../database/index.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to database`)
})

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//routes

// get all reviews for a product id

app.get('/reviews', (req, res) => {
  getReviews(req)
  .then ((data) => {
    res.json({results : data.rows})
  })
  .catch((err) => {
    console.log(err)
  })
});

// get meta data for a product id

app.get('/reviews/meta', (req, res) => {
  getMetaData(req)
  .then ((data) => {
    res.json(data.rows[0].t)
  })
  .catch((err) => {
    console.log(err)
  })
});

// post review
app.post('/reviews', (req, res) => {
  addReview(req.body)
  res.send()
});

//update helpfullness
app.put('/reviews', (req, res) => {
  updateHelpful(req.body.id)
  res.send()
});


// app.put('reviews/:review_id/report/', reportReview);

// json_agg, Json_build_object, coalesce, row_to_json


app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});