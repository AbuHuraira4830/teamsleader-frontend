import React, { useState, useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { Button as AntButton } from "antd";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import ExtraNotePassword from "./ExtraNotePassword";
import { useStateContext } from "../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";
import { postAPI } from "../helpers/apis";

const AddPasswordForm = ({
  handleBackButtonClick,
  handleSavePassword: onSavePassword,
  handleClose,
  setPageView,
  addPasswordRow,
}) => {
  const {
    handleSaveNewPassword,
    setSelectedPasswordRow,
    selectedPasswordRow,
    setRowsPassword,
    passwordTableID,
    setPasswordTables,
    thisUser
  } = useStateContext();
  const [templateName, setTemplateName] = useState(selectedPasswordRow?.name);
  const [email, setEmail] = useState(selectedPasswordRow?.email);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [password, setPassword] = useState(selectedPasswordRow?.password);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [extraNote, setExtraNote] = useState(selectedPasswordRow?.note);
  const [url, setUrl] = useState(selectedPasswordRow?.url);
  const [urlError, setUrlError] = useState("");

  // Effect to enable/disable the button based on input values
  useEffect(() => {
    const isButtonEnabled =
      templateName?.trim() !== "" &&
      email?.trim() !== "" &&
      confirmedPassword?.trim() !== "" &&
      url?.trim() !== "";
    setIsSaveButtonEnabled(isButtonEnabled);
  }, [templateName, email, confirmedPassword, url]);
  const handleSavePassword = () => {
    // Password validation logic
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const isPasswordValid = passwordRegex.test(password);

    if (password.length <= 5) {
      setLengthError("*Password length should be greater than five.");
      setPasswordError("");
      return; // Prevent further execution if the password length is less than or equal to 5
    } else {
      setLengthError("");
    }

    if (!isPasswordValid) {
      setPasswordError(
        "*Your Password must contain at least one uppercase, one lowercase letter, and a number."
      );
      return; // Prevent further execution if the password is invalid
    }
    if (password !== confirmedPassword) {
      setMatchError("*Passwords do not match.");
      return; // Prevent further execution if passwords do not match
    } else {
      setMatchError("");
    }
    if (url.trim() === "") {
      setUrlError("*URL is required");
      return;
    } else {
      setUrlError("");
    }

    // Handle form submission logic here
    // onSavePassword({
    //   templateName,
    //   email,
    // });
    // handleSaveNewPassword({
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: templateName,
    //   password: password,
    //   url: { text: templateName, link: url },
    //   // ... other properties
    // });
    const data = {
      tableID: passwordTableID,
      name: templateName,
      email: email,
      password: password,
      url: url,
      note: extraNote,
      ownerColor: thisUser.profileColor,
      ownerPicture: thisUser.picture,
    };
    postAPI("/api/password-row/store", data)
      .then((res) => {
        console.log(res);
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
    // setPageView(0);
    handleClose();
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Reset password error on input change
    setLengthError(""); // Reset length error on input change
  };
  const handleConfirmedPasswordChange = (e) => {
    const confirmedPasswordValue = e.target.value;
    setConfirmedPassword(confirmedPasswordValue);

    if (password !== confirmedPasswordValue) {
      setMatchError("*Passwords do not match.");
    } else {
      setMatchError("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };
  const handleExtraNoteChange = (e) => {
    setExtraNote(e.target.value);
  };
  const handleCopyText = () => {
    // Copy the text inside the textarea to the clipboard
    navigator.clipboard.writeText(extraNote).then(() => {
      console.log("Text copied to clipboard");
    });
  };
  const handleUpdatePassword = () => {
    console.log(selectedPasswordRow);
    const data = {
      tableID: passwordTableID,
      name: templateName,
      email: email,
      password: password,
      url: url,
      note: extraNote,
    };
    postAPI(`/api/password-row/update/${selectedPasswordRow._id}`, data)
      .then((res) => {
        console.log("res.data.tables");
        setPasswordTables(res.data.tables);
        setSelectedPasswordRow(null);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };
  return (
    <>
      <div>
        <div className="flex justify-content-start  align-items-center fs_15 ps-2 pt-2 cursor_pointer"></div>
        <div className="flex info_container">
          <Container className="align-self-center">
            <div className="flex  pb-2 ">
              <span className="title_border me-2"></span>
              <p
                className="mb-0  "
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Password Details
              </p>
            </div>
            <Row className="grayText  add_password_wrapper">
              <Col lg={4} className="mt-4">
                Template Name
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none text-color dropdown_color "
                  placeholder="Enter template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
              </Col>

              <Col lg={4} className="mt-4">
                Email
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="email"
                  className=" shadow-none text-color dropdown_color"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
              </Col>
              <Col lg={4} className="mt-4 ">
                Password
              </Col>
              <Col lg={6} className="mt-4">
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className=" shadow-none text-color dropdown_color"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                      width: "370px",
                      height: "34px",
                      fontSize: "0.8rem",
                    }}
                  />
                  <div className="eye_icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </div>
                </div>
                {lengthError && (
                  <span className="text-danger " style={{ fontSize: "11px" }}>
                    {lengthError}
                  </span>
                )}
                {passwordError && (
                  <span className="text-danger " style={{ fontSize: "11px" }}>
                    {passwordError}
                  </span>
                )}
              </Col>
              <Col lg={4} className="mt-4 ">
                Confirm Password
              </Col>
              <Col lg={6} className="mt-4">
                <div className="position-relative">
                  <Form.Control
                    type={showConfirmedPassword ? "text" : "password"}
                    className=" shadow-none text-color dropdown_color "
                    placeholder="Confirm Password"
                    style={{
                      width: "370px",
                      height: "34px",
                      fontSize: "0.8rem",
                    }}
                    value={confirmedPassword}
                    onChange={handleConfirmedPasswordChange}
                  />
                  <div
                    className="eye_icon"
                    onClick={toggleConfirmedPasswordVisibility}
                  >
                    {showConfirmedPassword ? <HiEyeOff /> : <HiEye />}
                  </div>
                </div>
                {matchError && (
                  <span className="text-danger" style={{ fontSize: "11px" }}>
                    {matchError}
                  </span>
                )}
              </Col>
              <Col lg={4} className="mt-4 ">
                URL
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none text-color dropdown_color"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
                {urlError && (
                  <span className="text-danger " style={{ fontSize: "11px" }}>
                    {urlError}
                  </span>
                )}
              </Col>
              <Col lg={4} className="mt-4 ">
                Extra Notes
              </Col>

              <Col lg={6} className="mt-4 text-sm">
                <ExtraNotePassword />
              </Col>

              <Col lg={12} className="mt-4 password_button_wrapper">
                <div className="flex justify-content-end mb-4">
                  <Button
                    className="workspace-dropdown-button fw-normal rounded-1 py-1 me-3 px-3 "
                    style={{
                      height: "34px",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  {selectedPasswordRow ? (
                    <Button
                      type="submit"
                      className="py-1 px-3  workspace_addBtn rounded-1 border-0"
                      style={{ height: "34px" }}
                      onClick={handleUpdatePassword}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="py-1 px-3  workspace_addBtn rounded-1 border-0"
                      style={{ height: "34px" }}
                      onClick={handleSavePassword}
                      disabled={!isSaveButtonEnabled}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddPasswordForm;
