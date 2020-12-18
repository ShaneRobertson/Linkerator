import React from "react";
//import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";
import LinkModal from "./LinkModal";
import EditModal from "./EditModal";
import AddTagModal from "./AddTagModal";

//import {getLinkById} from '../../db'

const DisplayLinks = ({ links, setLinks }) => {
  console.log("links inside of DisplayLink", links);
  return (
    <div className="cardContainer">
      <LinkModal links={links} setLinks={setLinks} />
      
      {links.map((link) => {
        const { name, description, clicks, link_id, date, tags } = link;
        console.log('link_id in DisplayLinks: ', link_id)
        return (
          <Card key={link_id} className="text-center">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <span className="text-muted">
                {" "}
                {clicks} shares since {moment(date).format("MMMM Do YYYY")}
              </span>
              <Card.Text>
                {description} -{" "}
                {tags.map((tag, index) => {
                  return <span key={`tagKey-${index}`}> #{tag}</span>;
                })}{" "}
                <AddTagModal link_id={link_id} setLinks={setLinks}/>
              </Card.Text>

              <EditModal link_id={link_id} setLinks={setLinks}/>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default DisplayLinks;
