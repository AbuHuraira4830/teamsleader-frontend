import React, { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Button, Modal } from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const ErrorPopup = ({ error }) => {
  const { errorModal, setErrorModal, setSuccessModal } = useStateContext();
  const handleClose = () => setErrorModal(false);
  useEffect(() => {
    if (errorModal) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorModal, handleClose]);
  return (
    <Modal
      show={errorModal}
      onHide={handleClose}
      dialogClassName="pwsswordPopup errorPopup"
    >
      <Modal.Body>
        <div className="centerIt justify-content-between">
          <IoWarningOutline className="text-light me-1 mb-1" />
          <p className="text-light fs_14">{`${
            error || "Unknown error in the server"
          }`}</p>
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
export default ErrorPopup;
