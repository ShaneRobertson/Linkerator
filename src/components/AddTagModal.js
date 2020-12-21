import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddTagForm from "./AddTagForm";

const AddTagModal = ({ setLinks, link_id, setTags }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        &#x2B;
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More Tag Please!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTagForm
            handleClose={handleClose}
            link_id={link_id}
            setLinks={setLinks}
            setTags={setTags}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddTagModal;
