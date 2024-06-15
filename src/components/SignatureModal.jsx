import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import "../style/table.css"


const SignatureModal = ({ show, handleClose, handleSave }) => {
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    handleSave(dataUrl);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" onClick={clear}>Effacer</Button>
        <Button className="btn-secondary" onClick={handleClose}>Annuler</Button>
        <Button className="btn-primary" onClick={save}>Sauvegarder</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignatureModal;
