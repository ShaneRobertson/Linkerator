// Connect to DB
const { Client } = require("pg");
const DB_NAME = "postgres:ganon3422@localhost:5432/linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);


//getting all the links and returning them with the appropriate tags
async function getAllLinks() {
  // get all the links
  try {
    const { rows: links } = await client.query(`
      SELECT * FROM links;
    `);

   // console.log("All the links from getAllLinks:  ", links);

    const { rows: tags } = await client.query(`
    SELECT * FROM link_tags
    NATURAL JOIN tags;
    `);
   // console.log("This is the tags from the Join table", tags);

    links.forEach((link) => {
      let tagsX = [];
      for (let i = 0; i < tags.length; i++) {
        if (link.link_id === tags[i].link_id) {
          tagsX.push(tags[i].name);
        }
        link.tags = tagsX;
      }
    });

    return links;
  } catch (error) {
    throw error;
  }
}

//----CREATEING THE LINK-----
async function createLink(name, description) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(name, description)
      VALUES($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [name, description]
    );
    //console.log("This is the link object: ", link)

    return link;
  } catch (error) {
    throw error;
  }
}

//----CREATEING THE TAGS----

async function createTagsAndLink_tagsRecord(tagList, linkId) {
  if (!tagList.length) {
    return;
  }
  //create the paramaterized query string for inserting tags into the tags table
  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  try {
    const { rows: tagArray } = await client.query(
      `
      INSERT INTO tags(name)
      VALUES (${insertValues})
      ON CONFLICT (name) 
      DO UPDATE SET name=tags.name
      RETURNING *;
    `,
      tagList
    );
    // build the PQ with the first paramater always being the linkId ($1)
    const insertTagLinks = tagArray
      .map((_, index) => `$1,$${index + 2}`)
      .join("), (");
    // get the tag id's out of the tagArray
    const tagIds = tagArray.map((tag) => tag.tag_id);

    await client.query(
      `
    INSERT INTO link_tags(link_id, tag_id)
    VALUES (${insertTagLinks})
    ON CONFLICT DO NOTHING;   
  `,
      [linkId, ...tagIds]
    );
  } catch (error) {
    throw error;
  }
}

async function combineLinksAndTags(linkName, linkDescription, tags) {
  try {
    const link = await createLink(linkName, linkDescription);

    if (!link.link_id) {
      return { message: "This link already exists" };
    }
    await createTagsAndLink_tagsRecord(tags, link.link_id);

    link.tags = tags;

    console.log("finished creating links/tags/LinkTags Record. ");
    return link;
  } catch (error) {
    throw error;
  }
}


//create a function that accepts a tagName as a parameter(string)
// get all the links and their tags
async function getLinksByTagName(tagName) {
  try {
    const links = await getAllLinks()
    console.log('getLinksByTagName links - should have array of tags', links)

    let filteredLinks = links.filter((link) => {
      return link.tags.includes(tagName)
    })

    console.log('this is the filteredLinks from getLinksByTagName - should include pandora and google: ', filteredLinks)
    return filteredLinks
  } catch (error) {
    throw error
  }
}


module.exports = {
  client,
  getAllLinks,
  combineLinksAndTags,
  getLinksByTagName
};
