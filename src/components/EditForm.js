import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateLink } from "../api";


const EditForm = ({ handleClose, link_id, setLinks }) => {
  
  const [editLinkName, setEditLinkName] = useState("");
  const [editLinkDescription, setEditLinkDescription] = useState("");

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          console.log("what is the link_id", link_id)
          const updatedLinks = await updateLink(
            editLinkName,
            editLinkDescription,
            "",
            link_id
          );
          setLinks(updatedLinks);
          handleClose();
        } catch (error) {
          console.log("From the Link submission Form", error);
        }
      }}
    >
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Fix the URL..."
          value={editLinkName}
          onChange={(event) => {
            setEditLinkName(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Fix the Description..."
          value={editLinkDescription}
          onChange={(event) => {
            setEditLinkDescription(event.target.value);
          }}
        />
      </Form.Group>

      <Button id='closeBtn' variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default EditForm;
