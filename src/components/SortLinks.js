import React from "react";
import Button from "react-bootstrap/Button";

const SortLinks = ({ links, setLinks }) => {
  return (
    <Button
      onClick={() => {
        let sortedLinks = [...links];

        sortedLinks = sortedLinks.sort((a, b) => b.clicks - a.clicks);
        setLinks(sortedLinks);
        //  console.log('the links in the OnClick: ', links)
      }}
      id="leftAside"
    >
      Sort by shares &#x21C5;
    </Button>
  );
};

export default SortLinks;
