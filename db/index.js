// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'postgres:ganon3422@localhost:5432/juicebox-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

//this is where the api makes calls to

async function getEverything() {
  try {

    const {rows} = await client.query(`
      SELECT * FROM links;
    `)
    console.log("THis is the rows; ", rows)
  } catch (error) {
    console.log('error is$$: ', error)
  }
}
//this is where all my functions to make requests to the database will go- all queries "select"
//"insert etc"
// export
module.exports = {
  client,
  getEverything
  // db methods
}