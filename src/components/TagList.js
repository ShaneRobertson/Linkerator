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

  return (
    <div id="tagBar">
      <Button
        className="text-nowrap"
        id="tagButton"
        variant="danger"
        onClick={async () => {
          setLinks(await getLinks());
        }}
      >
        All Links
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
