import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header'
import DisplayLinks from './DisplayLinks'
import TagList from './TagList'
import {
  getLinks,
} from '../api';

const App = () => {
  const [links, setLinks] = useState([]);

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
      <TagList setLinks={setLinks}/>
      <DisplayLinks links={links} setLinks={setLinks} />
    </div>
  );
}

export default App;