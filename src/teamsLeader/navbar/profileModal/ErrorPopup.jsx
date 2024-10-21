import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Button, Modal } from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const ErrorPopup = ({ handleClose }) => {
  const { errorModal, setErrorModal, setSuccessModal } = useStateContext();

  return (
    <Modal
      show={errorModal}
      onHide={handleClose}
      dialogClassName="pwsswordPopup errorPopup"
    >
      <Modal.Body>
        <div className="centerIt justify-content-between">
          <IoWarningOutline className="text-light" />
          <p className="text-light fs_14">Unknown error in the server</p>
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
