import React, {useState}from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import EditForm from './EditForm'


const EditModal = ({links, setLinks, link_id}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm handleClose={handleClose} link_id={link_id} setLinks={setLinks} />
        </Modal.Body>

      </Modal>
    </>
  );
  }
export default EditModal;