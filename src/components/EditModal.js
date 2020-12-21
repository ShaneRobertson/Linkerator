import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditForm from "./EditForm";
import { PencilSquare } from "react-bootstrap-icons";

const EditModal = ({ setLinks, link_id, handleClose, handleShow, show }) => {

  return (
    <>
      <Button
        className="text-right"
        id="editBtn"
        variant="secondary"
        onClick={handleShow}
      >
        <PencilSquare />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            handleClose={handleClose}
            link_id={link_id}
            setLinks={setLinks}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditModal;
