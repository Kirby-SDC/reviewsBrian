const express = require('express');
const connectionClient = require('../connect.js');
const {getReviews, getReviewsMeta, addReview, markReviewHelpful, reportReview} = require('../database/index.js');
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

app.get('/reviews/', getReviews);
// app.get('/reviews/meta', getReviewsMeta);
// app.post('/reviews', addReview);
// app.put('/reviews', markReviewHelpful);
// app.put('reviews/:review_id/report/', reportReview);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});