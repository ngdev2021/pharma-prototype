import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({
  show,
  onHide,
  title,
  children,
  onSave,
  saveButtonText = 'Save',
  closeButtonText = 'Close',
  ...props
}) => {
  return (
    <Modal show={show} onHide={onHide} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButtonText}
        </Button>
        <Button variant="primary" onClick={onSave}>
          {saveButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
