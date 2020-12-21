import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

import EditModal from "./EditModal";
import AddTagModal from "./AddTagModal";
import { updateLink, getLinksByTag, getLinks, deleteLink } from "../api";
import { Trash } from "react-bootstrap-icons";
import validator from "validator";

const DisplayLinks = ({ links, setLinks, setTags }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
                <EditModal link_id={link_id} setLinks={setLinks} handleClose={handleClose} handleShow={handleShow} show={show}/>
                <Button
                  id="deleteBtn"
                  variant="danger"
                  onClick={async () => {
                    console.log("step1: link_id in front end: ", link_id);
                    await deleteLink(link_id);
                    console.log("MADE IT PAST DELETELINK");
                    const activeLinks = await getLinks();
                    console.log(activeLinks);
                    setLinks(activeLinks)
                    handleClose();
                  }}
                >
                  <Trash />
                </Button>
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
