import axios from 'axios';

//---Get all the links
export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    return data.links;
  } catch (error) {
    throw error;
  }
}


//--Get all the tags

export async function getTags() {
  try {
    const {data} = await axios.get('/api/tags')
   // console.log('tags from the getTags(): ', data)
    return data
  } catch (error) {
    console.log('error from getTags(): ', error)
  }
}


export async function createNewLink(linkName, linkDescription, tagList = []) {
//console.log('heres the tagList: ', tagList)
  try {
    const { data } = await axios.post('/api/links', {
      name: linkName,
      description: linkDescription,
      tags: tagList
    })
    //console.log('if I am here then a post has been made to the links database')
    //console.log('this is the data in the db: ', data)
    return data
  } catch (error) {
    throw error;
  }
}



//need to build out the api portion for  get links by tag name - db function and route are set up

export async function getLinksByTag(tagName){
  try {
    const {data} = await axios.get(`/api/tags/${tagName}/links`)
   // console.log(`here are the links associated with ${tagName}: `, data)
    return data
  } catch (error) {
    throw error
  }
}

export async function updateLink(linkName, linkDescription, linkTags, link_id, clickCount){
//console.log('linkName: ', linkName, ' linkDescription: ', linkDescription, ' linkTags:  ', linkTags, ' link_id: ', link_id, 'clickCount: ', clickCount)

  try {
    const {data} = await axios.patch(`/api/links/${link_id}`, {
      name: linkName,
      description: linkDescription,
      tags: linkTags,
      clicks: clickCount 
    })
  //  console.log('result from update Link: ', data)
    return data
  } catch (error) {
    console.log('updateLink error', error)
  }
}



