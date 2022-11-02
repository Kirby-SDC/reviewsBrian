const Client = require('pg').Client;
const client = new Client({
  user: 'brianstern',
  host: 'localhost',
  database: 'sdc_reviews',
  password: 'Hdkfa122',
  port: 5432,
});

const populate = fs.readFileSync('db.sql').toString();

client.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query(populate, function(err, result) {
    if(err){
      console.log('ERROR', err);
      process.exit(0);
    }
    process.exit(0);
  })
  console.log(`connected to '${client.database}' on port ${client.port}`)
});



