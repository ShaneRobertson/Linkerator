import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import DisplayLinks from "./DisplayLinks";
import TagList from "./TagList";
import Search from "./Search";
import SortLinks from "./SortLinks";
import LinkModal from "./LinkModal";
import { getLinks } from "../api";

const App = () => {
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchLinks, setSearchLinks] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="App">
      <Header />
      <TagList setLinks={setLinks} setTags={setTags} tags={tags} />
      <div id="utility">
        <Search setSearchLinks={setSearchLinks} links={links} />
        <SortLinks
          setLinks={setLinks}
          links={links}
          sorted={sorted}
          setSorted={setSorted}
          searchLinks={searchLinks}
          setSearchLinks={setSearchLinks}
        />
        <LinkModal links={links} setLinks={setLinks} setTags={setTags} />
      </div>
      {searchLinks.length ? (
        <DisplayLinks
          links={searchLinks}
          setLinks={setLinks}
          setTags={setTags}
        />
      ) : (
        <DisplayLinks links={links} setLinks={setLinks} setTags={setTags} />
      )}
    </div>
  );
};

export default App;
