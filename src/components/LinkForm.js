import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createNewLink, getTags } from "../api";

const LinkForm = ({ handleClose, links, setLinks, setTags }) => {
  const [linkName, setLinkName] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [tagList, setTagList] = useState([]);

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          if (tagList.length) {
            const data = await createNewLink(
              linkName,
              linkDescription,
              tagList.split(" ")
            );
            let newLinks = [...links];
            newLinks.unshift(data);
            setLinks(newLinks);
            setTags(await getTags());
            handleClose();
          } else {
            const data = await createNewLink(linkName, linkDescription);
            let newLinks = [...links];
            newLinks.unshift(data);
            setLinks(newLinks);
            setTags(await getTags());
            handleClose();
          }
        } catch (error) {
          console.log("From the Link submission Form", error);
        }
      }}
    >
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter URL..."
          value={linkName}
          onChange={(event) => {
            setLinkName(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Describe away.."
          value={linkDescription}
          onChange={(event) => {
            setLinkDescription(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="ex. learn listen vibe"
          value={tagList}
          onChange={(event) => {        
              setTagList(event.target.value);     
          }}
        />
      </Form.Group>

      <Button id='closeBtn' variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default LinkForm;
