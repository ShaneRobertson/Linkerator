import React, {useState}from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import LinkForm from './LinkForm'


const LinkModal = ({links, setLinks}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      &#43; Link
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new link!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LinkForm handleClose={handleClose} links={links} setLinks={setLinks} />
        </Modal.Body>

      </Modal>
    </>
  );
  }
export default LinkModal;