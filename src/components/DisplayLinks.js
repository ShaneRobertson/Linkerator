import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

import EditModal from "./EditModal";
import AddTagModal from "./AddTagModal";
import { updateLink, getLinksByTag } from "../api";
import validator from "validator";

const DisplayLinks = ({ links, setLinks, setTags }) => {
  return (
    <div id="cardContainer">
      {links.map((link) => {
        const { description, clicks, link_id, date, tags } = link;
        let { name } = link;

        if (!validator.isURL(name, { require_protocol: true })) {
          name = `http://${name}`;
        }
        return (
          <Card key={link_id} className="text-center linkCards" border="info">
            <Card.Body>
              <Card.Title>
                <a rel="noopener noreferrer" href={name} target="_blank">
                  <Button
                    onClick={async () => {
                      const updatedLinks = await updateLink(
                        "",
                        "",
                        "",
                        link_id,
                        true
                      );
                      setLinks(updatedLinks);
                    }}
                  >
                    {name}
                  </Button>
                </a>
                <EditModal link_id={link_id} setLinks={setLinks} />
              </Card.Title>

              <span className="text-muted">
                {" "}
                {clicks} shares since {moment(date).format("MMMM Do YYYY")}
              </span>
              <Card.Text>
                {description} -{" "}
                <AddTagModal
                  link_id={link_id}
                  setLinks={setLinks}
                  setTags={setTags}
                />
                {tags.map((tag) => {
                  return (
                    <Button
                      size="sm"
                      key={tag}
                      id="tagButton"
                      onClick={async () => {
                        setLinks(await getLinksByTag(tag));
                      }}
                    >
                      {tag}
                    </Button>
                  );
                })}{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default DisplayLinks;
