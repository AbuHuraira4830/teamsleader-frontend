import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { postAPI } from "../../../helpers/apis";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { useStateContext } from "../../../contexts/ContextProvider";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";

const Password = () => {
  const { thisUser, errorModal, setErrorModal, successModal, setSuccessModal } =
    useStateContext();
  console.log(thisUser);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    try {
      const response = await postAPI("/api/user/change-password", {
        emailAddress: thisUser?.emailAddress, // Replace with actual email
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
        }, 50000);
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
    <div className="w-100 fs_14" style={{ padding: "24px" }}>
      <p className="" style={{ fontSize: "32px", fontWeight: "500" }}>
        Password
      </p>
      <p className="mt-5">Current password</p>
      <Form.Control
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="shadow-none workspace_searchInput rounded-1 profileDatePicker"
        style={{ width: "340px", height: "40px" }}
      />
      <p className="mt-1">Forgot your password?</p>
      <p className="" style={{ color: "#1f76c2" }}>
        Reset password via email
      </p>
      <p className="mb-0" style={{ marginTop: "35px" }}>
        New password
      </p>
      <Form.Control
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="shadow-none workspace_searchInput rounded-1 profileDatePicker"
        style={{ width: "340px", height: "40px" }}
      />
      <p className="mb-0" style={{ marginTop: "35px" }}>
        Confirm new password
      </p>
      <Form.Control
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="shadow-none workspace_searchInput rounded-1 profileDatePicker"
        style={{ width: "340px", height: "40px" }}
      />
      {!newPassword.length === 0 ||
        !confirmPassword.length === 0 ||
        (confirmPassword != newPassword && (
          <p className="mt-2">
            Password confirmation doesn't match new password
          </p>
        ))}
      <Button
        disabled={
          newPassword.length === 0 ||
          confirmPassword.length === 0 ||
          confirmPassword != newPassword
        }
        onClick={handlePasswordChange}
        className="workspace_addBtn border-0 rounded-1 mt-4"
        style={{ width: "340px", height: "40px" }}
      >
        Save
      </Button>
      <ErrorPopup handleClose={handleClose} />
      <SuccessPopup
        handleClose={handleClose}
        text="Password successfully changed"
      />
    </div>
  );
};

export default Password;
