import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IMAGES from "../assets/images/Images";

const EmailVerificationModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="text-center">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} className="verification-modal ">
        <Modal.Body>
          <div className="text-center fs_14" style={{ color: "#42464d" }}>
            <div className="justify-content-center d-flex">
              <img
                src={IMAGES.VERIFICATION}
                className=""
                style={{ width: "180px" }}
                alt=""
              />
            </div>
            <p
              className="text-center mb-0"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                paddingBottom: "12px",
              }}
            >
              Please confirm your email
            </p>
            <p className="text-center">
            You haven't verified your email from last 3 days. To proceed further please verify your email.
            </p>
            <Button
              className="workspace_addBtn border-0 fs_14 mb-3"
              style={{ borderRadius: "4px" }}
            >
              Resend email
            </Button>
            <p>to:usman123@gmail.com</p>
            <p className="mt-5">Didn't receive an email? </p>
            <p>
              Check your{" "}
              <a href="#" style={{ textDecoration: "none", color: "#1f76c2" }}>
                spam folder
              </a>
              , or contact our Customer Support{" "}
              <a href="#" style={{ textDecoration: "none", color: "#1f76c2" }}>
                support@teamsleader.com
              </a>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default EmailVerificationModal;
