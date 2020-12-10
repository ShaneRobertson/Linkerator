const apiRouter = require('express').Router();
//import functions from database and use them based on routes and methods (get post patch)
const {
  getEverything
} = require('../db')

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get('/links', async (req, res, next) => {
  try {
    const getStuff = await getEverything()
    res.send(getStuff)
    console.log("this is getStuff: ", getStuff)
  }catch (error) {
    console.log('a#####', error)
  }
  
})

module.exports = apiRouter;
