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
  console.log("links: ", links);
  console.log("searchLinks: ", searchLinks);
  return (
    <Button
      //*note - when there is input in the search then searchLinks is showing NOT links. so we are sorting a state that is not being displayed@@

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
