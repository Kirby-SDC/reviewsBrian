const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./review_queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

//routes

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});