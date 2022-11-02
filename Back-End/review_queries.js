const Client = require('pg').Client;
const client = new Client({
  user: 'brianstern',
  host: 'localhost',
  database: 'sdc_reviews',
  password: 'Hdkfa122!',
  port: 5432,
});

client.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to '${client.database}' on port ${client.port}`)
});
