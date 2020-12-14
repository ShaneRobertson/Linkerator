const apiRouter = require('express').Router();
//import functions from database and use them based on routes and methods (get post patch)

const {
  getAllLinks,
  combineLinksAndTags,
  getLinksByTagName
} = require('../db')
//makes requests to the database
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get('/links', async (req, res, next) => {
  try {
    const links = await getAllLinks()
    res.send({links})
   
  } catch (error) {
    console.log('#####', error)
  }
})


apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
  const tagName = req.params.tagName
  console.log('this should be a tagName', tagName)
  try {
    const links = await getLinksByTagName(tagName)
    console.log('This should be the links that contain the tagname =->: ', links)
    res.send(links)
  } catch (error) {
    throw error
  }
})




apiRouter.post('/links', async (req, res, next) => {

  const {name, description, tags} = req.body //needs to be sent in from the front end---
  try {
    const dbEntry = await combineLinksAndTags(name, description, tags)
  //  console.log("this is the dbEntry: ", dbEntry)
    res.send(dbEntry)
  } catch (error){
    throw error
  }
})


module.exports = apiRouter;
