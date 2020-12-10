// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
   
    // drop tables in correct order
    console.log('Dropping tables...')
    await client.query(`
      DROP TABLE IF EXISTS links;
    `)
    console.log('Finished dropping the tables!')
    // build tables in correct order
    console.log("Creating tables...")
    await client.query(`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        tags VARCHAR(255) UNIQUE NOT NULL,
        clicks INTEGER DEFAULT 0
      );
    `)
    console.log('Done creating tables!')
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());