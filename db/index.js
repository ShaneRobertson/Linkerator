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

   console.log("All the links from getAllLinks:  ", links);

    const { rows: tags } = await client.query(`
    SELECT * FROM link_tags
    NATURAL JOIN tags;
    `);
   // console.log("This is the tags from the Join table", tags);

   //checks to see if the link_id in the returned links matches the link_id on the tags (joined tags on link_tags table)
    // links.forEach((link) => {
    //   let tagsX = [];
    //   for (let i = 0; i < tags.length; i++) {
    //     if (link.link_id === tags[i].link_id) {
    //       tagsX.push(tags[i].name);
    //     }
    //     link.tags = tagsX;
    //   }
    // });

    links.map((link) => {
      let tagsX = [];
      for (let tag of tags) {
        if (link.link_id === tag.link_id) {
          tagsX.push(tag.name);
        }
        link.tags = tagsX;
      }
    });

    links.sort((a, b) => a.link_id - b.link_id)
    return links;
  } catch (error) {
    throw error;
  }
}


async function getAllTags() {
  try {
    const {rows} = await client.query(`
      SELECT * FROM 
      tags;
    `)
   // console.log('this is the tags in the database: ', rows)
    return rows
  } catch (error) {
    throw error
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
  console.log('whats the tagList in createTagsAndLink_TagsRecords? ', tagList, 'and the link_id? ', linkId)
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

    console.log("finished creating links/tags/LinkTags Record. ")
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
   // console.log('getLinksByTagName links - should have array of tags', links)

    let filteredLinks = links.filter((link) => {
      return link.tags.includes(tagName)
    })

    //console.log('this is the filteredLinks from getLinksByTagName: ', filteredLinks)
    return filteredLinks
  } catch (error) {
    throw error
  }
}



//passed from the front end : comment, tags, and/or count
//
// create a functin that updates the number of times a link has been clicked
// takes a link_id, query involves an UPDATE WHERE link_id=${link_id} needs a fields object and a join method(look at juicebox)

async function getUpdatedLink(id, fields = {}){
const {tags} = fields
delete fields.tags
//console.log('do I still have an array of tags?', tags)
  const setString = Object.keys(fields).map((key, index) => 
  `${key}=$${index + 1}`
).join(', ')
//console.log('heres the setstring : ', setString)

  try {
    if(setString.length > 0) {
      await client.query(`
      UPDATE links
      SET ${setString}
      WHERE link_id=${id};
    `, Object.values(fields))
    // console.log('updated Link after the Update query', rows) 
    // return rows
    }

  } catch (error) {
    console.log('getUpdatedLink error: ', error)
  }

  // create the tags entry and the link_tags entry
  if(tags) {
    await createTagsAndLink_tagsRecord(tags, id)
  }
  const allUpdatedLinks = await getAllLinks()
  return allUpdatedLinks
}


async function updateCount(link_id) {
  console.log('link_id in updateCount: ', link_id)
  try {
    await client.query(`
      UPDATE links
      SET clicks=clicks + 1
      WHERE link_id=$1
    `, [link_id])
  } catch (error) {
    console.log('updateCount error is: ', error)
  }
}


module.exports = {
  client,
  getAllLinks,
  getAllTags,
  combineLinksAndTags,
  getLinksByTagName,
  getUpdatedLink,
  updateCount
};
