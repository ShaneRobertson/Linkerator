import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {updateLink} from "../api";

const AddTagForm = ({ handleClose, link_id, setLinks }) => {
console.log('link_id in AddTagForm: ', link_id)
  const [editTagList, setEditTagList] = useState([]);
//get the data back from res.send(data) then setLinks to the data. It should be all the links with the updated tags
  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        //console.log('link_id maybe: ', link_id)
        try {
        const updatedLinks =  await updateLink('', '', editTagList.split(' '), link_id)
        setLinks(updatedLinks)
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

      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default AddTagForm