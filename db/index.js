const { Client } = require("pg");
const DB_NAME = "postgres:ganon3422@localhost:5432/linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

//---GETS ALL THE LINKS
async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
      SELECT * FROM links
      WHERE is_active=true;
    `);

    const { rows: tags } = await client.query(`
    SELECT * FROM link_tags
    NATURAL JOIN tags;
    `);

    //checks to see if the link_id in the returned links
    //matches the link_id on the tags (joined tags on link_tags table)

    links.map((link) => {
      let tagsX = [];
      for (let tag of tags) {
        if (link.link_id === tag.link_id) {
          tagsX.push(tag.name);
        }
        link.tags = tagsX;
      }
    });

    links.sort((a, b) => a.link_id - b.link_id);
    return links;
  } catch (error) {
    throw error;
  }
}

//--GETS ALL THE TAGS--
async function getAllTags() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM 
      tags;
    `);

    return rows;
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

    return link;
  } catch (error) {
    throw error;
  }
}

//----CREATEING THE TAGS AND AN ENTRY IN THE link_tags TABLE----
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

//---COMBINES THE LINKS AND THE TAGS
async function combineLinksAndTags(linkName, linkDescription, tags) {
  try {
    const link = await createLink(linkName, linkDescription);

    if (!link.link_id) {
      return { message: "This link already exists" };
    }
    await createTagsAndLink_tagsRecord(tags, link.link_id);

    link.tags = tags;

    return link;
  } catch (error) {
    throw error;
  }
}

//---GETS ALL THE LINKS BY THEIR TAGNAME
async function getLinksByTagName(tagName) {
  try {
    const links = await getAllLinks();

    let filteredLinks = links.filter((link) => {
      return link.tags.includes(tagName);
    });
    if (filteredLinks.length) {
      return filteredLinks
    } else {
      return {message: "Doesn't seem to be any links associated with that tag."}
    }

  } catch (error) {
    throw error;
  }
}

//---GETS THE UPDATEDLINKS
async function getUpdatedLink(id, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
      UPDATE links
      SET ${setString}
      WHERE link_id=${id};
    `,
        Object.values(fields)
      );
    }
  } catch (error) {
    console.log("getUpdatedLink error: ", error);
  }

  // create the tags entry and the link_tags entry
  if (tags) {
    await createTagsAndLink_tagsRecord(tags, id);
  }
  const allUpdatedLinks = await getAllLinks();
  return allUpdatedLinks;
}

async function updateCount(link_id) {
  try {
    await client.query(
      `
      UPDATE links
      SET clicks=clicks + 1
      WHERE link_id=$1
    `,
      [link_id]
    );
  } catch (error) {
    console.log("updateCount error is: ", error);
  }
}

async function deleteLink(link_id) {
  try {
    const {rows} = await client.query(`
      UPDATE links
      SET is_active=false
      WHERE link_id=$1
      RETURNING*;
  `, [link_id])

  return rows
  } catch(error) {
    throw error
  }
}

module.exports = {
  client,
  getAllLinks,
  getAllTags,
  combineLinksAndTags,
  getLinksByTagName,
  getUpdatedLink,
  updateCount,
  deleteLink
};
