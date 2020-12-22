import axios from "axios";

//---GET ALL THE LINKS
export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data.links;
  } catch (error) {
    throw error;
  }
}

//--GET ALL THE TAGS
export async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");
    return data;
  } catch (error) {
    console.log("error from getTags(): ", error);
  }
}

//---CREATEING A NEW LINK
export async function createNewLink(linkName, linkDescription, tagList = []) {
  try {
    const { data } = await axios.post("/api/links", {
      name: linkName,
      description: linkDescription,
      tags: tagList,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//----GET THE LINKS BY THERE TAG NAME
export async function getLinksByTag(tagName) {
  try {
    const { data } = await axios.get(`/api/tags/${tagName}/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

//----UPDATE A LINK
export async function updateLink(
  linkName,
  linkDescription,
  linkTags,
  link_id,
  clickCount
) {
  try {
    const { data } = await axios.patch(`/api/links/${link_id}`, {
      name: linkName,
      description: linkDescription,
      tags: linkTags,
      clicks: clickCount,
    });
    return data;
  } catch (error) {
    console.log("updateLink error", error);
  }
}


export async function deleteLink(link_id){
  try {

await axios.delete(`/api/links/${link_id}`)
 
  
  } catch (error) {
    console.log('deleteLink error in the api: ', error)
  }
}
