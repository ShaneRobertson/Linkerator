import React, { useEffect } from "react";
import { getTags, getLinksByTag, getLinks } from "../api";
import Button from "react-bootstrap/Button";

const TagList = ({ setLinks, setTags, tags }) => {
  

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
    <div id="tagBar">
      <Button
      className='text-nowrap'
        id="tagButton"
        variant="danger"
        onClick={async () => {
          setLinks(await getLinks());
        }}
      >
        All
      </Button>
      {"   "}
      {tags.map((tag) => {
        const { tag_id, name } = tag;
        return (
          <Button
            key={tag_id}
            id="tagButton"
            onClick={async () => {
              setLinks(await getLinksByTag(name));
            }}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export default TagList;
