import React from "react";
import Button from "react-bootstrap/Button";

const SortLinks = ({
  links,
  setLinks,
  sorted,
  setSorted,
  searchLinks,
  setSearchLinks,
}) => {
  return (
    <Button
      onClick={() => {
        if (searchLinks.length) {
          let sortedLinks = [...searchLinks];
          sorted
            ? sortedLinks.sort((a, b) => b.clicks - a.clicks)
            : sortedLinks.sort((a, b) => a.clicks - b.clicks);
          setSearchLinks(sortedLinks);

          setSorted(!sorted);
        } else {
          let sortedLinks = [...links];
          sorted
            ? sortedLinks.sort((a, b) => b.clicks - a.clicks)
            : sortedLinks.sort((a, b) => a.clicks - b.clicks);
          setLinks(sortedLinks);
          setSorted(!sorted);
        }
      }}
    >
      Sort by shares &#x21C5;
    </Button>
  );
};

export default SortLinks;
