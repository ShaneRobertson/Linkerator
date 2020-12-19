const apiRouter = require('express').Router();
//import functions from database and use them based on routes and methods (get post patch)

const {
  getAllLinks,
  getAllTags,
  combineLinksAndTags,
  getLinksByTagName,
  getUpdatedLink,
  updateCount
} = require('../db')
//makes requests to the database
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});


// ---Gets all the links
apiRouter.get('/links', async (req, res, next) => {
  try {
    const links = await getAllLinks()
    res.send({links})
   
  } catch (error) {
    console.log('#####', error)
  }
})

//--Gets the links by tagName
apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
 
  const {tagName} = req.params
 // console.log('this should be a tagName', tagName)
  try {
    const links = await getLinksByTagName(tagName)
    //console.log('This should be the links that contain the tagname =->: ', links)
    res.send(links)
  } catch (error) {
    throw error
  }
})


//--Get all the tags
apiRouter.get('/tags', async (req, res, next) => {
  try {
    const tags = await getAllTags()
   // console.log('tags in the apiRouter.tags', tags)
    res.send(tags)
  } catch (error) {
    throw error
  }
})



//--Posts a new link to the database
apiRouter.post('/links', async (req, res, next) => {

  const {name, description, tags} = req.body //needs to be sent in from the front end---
  try {

    const dbEntry = await combineLinksAndTags(name, description, tags)
  console.log("this is the dbEntry in the routes api: ", dbEntry)
    res.send(dbEntry)
  } catch (error){
    throw error
  }
})


//need a route that takes a Link_id from the req.params
apiRouter.patch('/links/:link_id', async (req, res, next) => {
  const {link_id} = req.params
  const { description, name, tags, clicks} = req.body
  console.log('link_id in router: ', link_id)
  const updateFields = {}

  if(name) {
    updateFields.name = name
  }

  if(description) {
    updateFields.description = description
  }

  if(tags){
    updateFields.tags = tags
  }

  if(clicks){
    console.log('am I here?')
    await updateCount(link_id)
  }

  try {

// console.log('updatefields object: ', updateFields)
const updatedLinks = await getUpdatedLink(link_id, updateFields) 

console.log('here is the updated links: ', updatedLinks)
res.send(updatedLinks)

  } catch (error) {
    console.log(error)
  }

})


module.exports = apiRouter;
