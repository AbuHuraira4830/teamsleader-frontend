import React, { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Button, Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const SuccessPopup = ({ text }) => {
  const { thisUser, errorModal, setErrorModal, successModal, setSuccessModal } =
    useStateContext();
  const handleClose = () => setSuccessModal(false);

  useEffect(() => {
    if (successModal) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successModal, handleClose]);
  return (
    <Modal
      show={successModal}
      onHide={handleClose}
      dialogClassName="pwsswordPopup successPopup"
    >
      <Modal.Body>
        <div className="centerIt justify-content-between">
          <FaCheck className="text-light me-1" />
          <p className="text-light fs_14">{text}</p>
          <Button
            className="bg-transparent p-0 centerIt justify-content-center border-0 bgHover"
            style={{ width: "30px", height: "30px" }}
            onClick={handleClose}
          >
            <RxCross2 className="text-light" />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessPopup;
