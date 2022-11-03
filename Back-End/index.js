const express = require('express');
const connectionClient = require('./connect.js')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// const db = require('./queries')

connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to database`)
})

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
  console.log(`App listening on port ${port}.`);
});