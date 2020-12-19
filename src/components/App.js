import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header'
import DisplayLinks from './DisplayLinks'
import TagList from './TagList'
import Search from './Search'
import {
  getLinks,
} from '../api';

const App = () => {
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchString, setSearchString] = useState('')
  const [searchLinks, setSearchLinks] = useState([])


  useEffect(() => {
    getLinks()
      .then(response => {      
        setLinks(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Search searchString={searchString} setSearchString={setSearchString} setSearchLinks={setSearchLinks} links={links}/>
      <TagList setLinks={setLinks} setTags={setTags} tags={tags}/>
     {searchLinks.length ? <DisplayLinks links={searchLinks} setLinks={setLinks} setTags={setTags} searchString={searchString} /> : <DisplayLinks links={links} setLinks={setLinks} setTags={setTags} searchString={searchString}/>}
    </div>
  );
}

export default App;