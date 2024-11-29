import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";
import { postAPI } from "../../../helpers/apis";

const EmailUpdateModal = ({ closeModal, emailModal }) => {
  const {
    thisUser,
    setThisUser,
    errorModal,
    setErrorModal,
    successModal,
    setSuccessModal,
  } = useStateContext();
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const updateEmail = async () => {
    try {
      const response = await postAPI("/api/user/change-email", {
        emailAddress: thisUser.emailAddress, // Replace with actual email
        currentPassword: password,
        newEmailAddress: newEmail,
      });
      console.log(response.data.user);
      if (response.status === 200) {
        setThisUser(response.data.user);
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
        }, 5000);
      } else if (response.status === 400) {
        setpasswordError(true);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 5000);
    }
  };
  const handleClose = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  return (
    <Modal
      show={true}
      onHide={closeModal}
      centered
      dialogClassName="emailPopup border-0"
    >
      <Modal.Body>
        <p className="mb-2" style={{ fontSize: "32px", fontWeight: "500" }}>
          Change email address
        </p>
        <div className="centerIt mb-3">
          <p className="text-nowrap pe-3  me-3" style={{ width: "150px" }}>
            Current email
          </p>{" "}
          <p>{thisUser.emailAddress}</p>
        </div>
        <div className="centerIt justify-content-between mb-3">
          <p className="text-nowrap pe-3  me-3" style={{ width: "168px" }}>
            New Email
          </p>{" "}
          <Form.Control
            type="email"
            required
            placeholder="Enter new email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="shadow-none workspace_searchInput rounded-1"
            style={{ width: "340px", height: "32px" }}
          />
        </div>
        <div className="centerIt justify-content-between">
          <p className="text-nowrap pe-3  me-3" style={{ width: "150px" }}>
            Current password
          </p>{" "}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-none workspace_searchInput rounded-1"
            style={{ width: "340px", height: "32px" }}
          />
        </div>
        {passwordError && (
          <p className="" style={{ color: "#d83a52", marginLeft: "167px" }}>
            Incorrect password
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className="workspace-dropdown-button rounded-1 position-relative fw-normal align-self-center  text-start py-1  px-3 "
          style={{
            height: "40px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="p-2 px-3 rounded-1 workspace_addBtn border-0"
          style={{ backgroundColor: "#025231" }}
          onClick={updateEmail}
          disabled={newEmail === "" || password === ""}
        >
          Confirm
        </Button>
        <ErrorPopup handleClose={handleClose} />
        <SuccessPopup
          handleClose={handleClose}
          text="Email is awaiting conformation"
        />
      </Modal.Footer>
    </Modal>
  );
};

