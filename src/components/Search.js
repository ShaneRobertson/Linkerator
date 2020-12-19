import React from "react";

const Search = ({ setSearchLinks, links }) => {
  console.log("links inside of Search", links);

  const filterDisplayLinks = () => {
    //setSearchString(event.target.value);
    if (document.getElementById('searchInput').value) {
        setSearchLinks(links.filter((link) => {
           return link.name.toLowerCase().match(document.getElementById('searchInput').value.toLowerCase());
         }))
       } else {
           setSearchLinks([])
       }
  }
 
  return (
    <div id='search'>
      <label>Looking for something in particular? </label>
      <input
      id='searchInput'
        type="text"
        placeholder="start your search..."
        autoComplete='off'
        //value={searchString}
        onChange={filterDisplayLinks}
      ></input>
    </div>
  );
};

export default Search;
