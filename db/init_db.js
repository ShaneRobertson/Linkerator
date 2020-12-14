// code to build and initialize DB goes here
const {
  client,
  getAllLinks,
  combineLinksAndTags,
  getLinksByTagName
 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
   
    // drop tables in correct order
    console.log('Dropping tables...')
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
      
    `)
    console.log('Finished dropping the tables!')
    // build tables in correct order
    console.log("Creating tables...")
    await client.query(`
      CREATE TABLE links (
        link_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        clicks INTEGER DEFAULT 0,
        date DATE DEFAULT CURRENT_DATE
      );

      CREATE TABLE tags (
        tag_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE link_tags (
        link_id INTEGER NOT NULL REFERENCES links(link_id),
        tag_id INTEGER NOT NULL REFERENCES tags(tag_id),
        UNIQUE (link_id, tag_id)
      );

    `)
    console.log('Finished creating tables!')
  } catch (error) {
    throw error;
  }
}


async function populateInitialData() {
  try {
    console.log('Starting to create initial data')
    await combineLinksAndTags('https://www.pandora.com/', 'Favorite channels', ['listen', 'relax', 'search'])
    await combineLinksAndTags('https://www.google.com/', 'Great search Engine', ['search', 'research', 'learn'])
    await combineLinksAndTags('https://10fastfingers.com/', 'Practice your typing skills', ['learn', 'typing', 'practice'])
    console.log('Finished createing initial data!')

    await getAllLinks()

    await getLinksByTagName('relax')
  } catch (error) {
    throw error;
  }
}



buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());