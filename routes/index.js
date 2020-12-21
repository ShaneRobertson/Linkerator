const apiRouter = require("express").Router();

const {
  getAllLinks,
  getAllTags,
  combineLinksAndTags,
  getLinksByTagName,
  getUpdatedLink,
  updateCount,
} = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

// ---GETS ALL THE LINKS
apiRouter.get("/links", async (req, res, next) => {
  try {
    const links = await getAllLinks();
    res.send({ links });
  } catch (error) {
    console.log("error from GET /links: ", error);
  }
});

//---GETS THE LINKS BY TAGNAME
apiRouter.get("/tags/:tagName/links", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const links = await getLinksByTagName(tagName);
    res.send(links);
  } catch (error) {
    throw error;
  }
});

//---GET ALL THE TAGS
apiRouter.get("/tags", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send(tags);
  } catch (error) {
    throw error;
  }
});

//---POSTS A NEW LINK TO THE DATABASE
apiRouter.post("/links", async (req, res, next) => {
  const { name, description, tags } = req.body;
  try {
    const dbEntry = await combineLinksAndTags(name, description, tags);
    res.send(dbEntry);
  } catch (error) {
    throw error;
  }
});

apiRouter.patch("/links/:link_id", async (req, res, next) => {
  const { link_id } = req.params;
  const { description, name, tags, clicks } = req.body;
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  if (tags) {
    updateFields.tags = tags;
  }

  if (clicks) {
    await updateCount(link_id);
  }

  try {
    const updatedLinks = await getUpdatedLink(link_id, updateFields);
    res.send(updatedLinks);
  } catch (error) {
    console.log(error);
  }
});

module.exports = apiRouter;
