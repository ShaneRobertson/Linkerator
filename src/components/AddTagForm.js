import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getTags, updateLink } from "../api";

const AddTagForm = ({ handleClose, link_id, setLinks, setTags }) => {
  const [editTagList, setEditTagList] = useState([]);

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          const updatedLinks = await updateLink(
            "",
            "",
            editTagList.split(" "),
            link_id
          );
          setLinks(updatedLinks);
          setTags(await getTags());
          handleClose();
        } catch (error) {
          console.log("From the Link submission Form", error);
        }
      }}
    >
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="Edit tags ex. learn listen vibe"
          value={editTagList}
          onChange={(event) => {
            if (event.target.value.length > 0)
              setEditTagList(event.target.value);
          }}
        />
      </Form.Group>

      <Button id='closeBtn' variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Add New Tag
      </Button>
    </Form>
  );
};

export default AddTagForm;
