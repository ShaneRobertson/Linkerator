import React, { useState, useEffect } from "react";
import { getTags, getLinksByTag, getLinks } from "../api";
import Button from "react-bootstrap/Button";

const TagList = ({setLinks}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
      .then((response) => {
        setTags(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //need to pass in getlinksbytagname and then setLinks to the result
  return (
    <div  id='tagBar'>
        <Button id='tagButton' onClick={async () => {
            setLinks(await getLinks())
        }}>All</Button>
      {tags.map((tag) => {
          const {tag_id, name} = tag
          return (
        <Button
          key={tag_id}
          id='tagButton'
          onClick={async () => {           
            setLinks(await getLinksByTag(name))
          }}>
          {name}
        </Button>)
      })}
    </div>
  );
};

export default TagList;