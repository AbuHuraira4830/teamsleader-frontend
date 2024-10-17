import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useStateContext } from "../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";
import { postAPI } from "../helpers/apis";
const AddCardInfoForm = ({
  handleBackButtonClick,
  handleSaveCardInfo: onSaveCard,
  handleClose,
}) => {
  const {
    handleSaveNewCard,
    setSelectedPasswordRow,
    selectedPasswordRow,
    passwordTableID,
    setPasswordTables,
    thisUser,
  } = useStateContext();

  const [templateName, setTemplateName] = useState("");
  const [fullName, setFullName] = useState(selectedPasswordRow?.name);
  const [cardNumber, setCardNumber] = useState(selectedPasswordRow?.card);
  const [expiryDate, setExpiryDate] = useState(selectedPasswordRow?.date);
  const [cvv, setCvv] = useState(selectedPasswordRow?.cvv);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCvvError] = useState("");

  // Effect to enable/disable the button based on input values
  useEffect(() => {
    const isButtonEnabled =
      fullName?.trim() !== "" &&
      cardNumber?.trim() !== "" &&
      expiryDate?.trim() !== "" &&
      cvv?.trim() !== "";

    setIsSaveButtonEnabled(isButtonEnabled);
  }, [fullName, cardNumber, expiryDate, cvv]);

  const handleSaveCardInfo = () => {
    // Example validation for card number: Check if it's a valid credit card number
    const cardNumberRegex = /^\d{16}$/; // Assuming a 16-digit card number
    if (!cardNumberRegex.test(cardNumber)) {
      // Invalid card number
      setCardNumberError("*Invalid card number");
      setExpiryDateError("");
      setCvvError("");
      return;
    } else {
      setCardNumberError("");
    }

    // Example validation for expiry date: Check if it's in the MM/YYYY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!expiryDateRegex.test(expiryDate)) {
      // Invalid expiry date format
      setCardNumberError("");
      setExpiryDateError(
        "*Invalid expiry date format. Please use MM/YY format (e.g., 04/29)."
      );
      setCvvError("");
      return;
    } else {
      setExpiryDateError("");
    }

    // Additional expiry date validation, e.g., check if it's not expired
    const currentDate = new Date();
    const [expiryMonth, expiryYear] = expiryDate
      .split("/")
      .map((part) => parseInt(part, 10));
    const expiryDateObj = new Date(2000 + expiryYear, expiryMonth - 1);

    if (isNaN(expiryDateObj.getTime()) || expiryDateObj < currentDate) {
      // Invalid expiry date
      setCardNumberError("");
      setExpiryDateError("*Your card is expired");
      setCvvError("");
      return;
    } else {
      setExpiryDateError("");
    }

    // Example validation for CVV: Check if it's a 3-digit number
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      // Invalid CVV
      setCardNumberError("");
      setExpiryDateError("");
      setCvvError("*Invalid CVV (3 digits cvv only)");
      return;
    } else {
      setCvvError("");
    }

    // Handle form submission logic here
    // onSaveCard({
    //   templateName,
    //   cardNumber,

    // });
    const data = {
      tableID: passwordTableID,
      name: fullName,
      card: cardNumber,
      date: expiryDate,
      cvv: cvv,
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
    // handleSaveNewCard({
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   fullName: fullName,
    //   cardNumber: cardNumber,
    //   cvvCode: cvv,
    //   expDate: expiryDate,
    // });
    handleClose();
  };
  const handleUpdatePassword = () => {
    const data = {
      tableID: passwordTableID,
      name: fullName,
      card: cardNumber,
      date: expiryDate,
      cvv: cvv,
    };
    postAPI(`/api/password-row/update/${selectedPasswordRow._id}`, data)
      .then((res) => {
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
      {/* ===================================================== */}
      <div className="text-color">
        <div className="flex justify-content-start  align-items-center fs_15 ps-2 pt-2 cursor_pointer">
          {/* <div className="password_backBtn">
            <AntButton type="text">
              <BiArrowBack onClick={handleBackButtonClick} />
            </AntButton>

            <span className="backbtn_text" style={{ fontWeight: 600 }}>
              Go back
            </span>
          </div> */}
        </div>
        <div className="flex info_container">
          <Container className="align-self-center">
            <div className="flex  pb-4 ">
              <span className="title_border me-2"></span>
              <p
                className="mb-0  "
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Card Details
              </p>
            </div>
            <Row className=" grayText add_password_wrapper">
              <Col lg={4} className="mt-4">
                Full Name
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none text-color dropdown_color "
                  placeholder="Enter full name as on card"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
              </Col>
              <Col lg={4} className="mt-4">
                Card Number
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="number"
                  className=" shadow-none text-color dropdown_color"
                  placeholder="1111-2222-3333-4444"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
                <span className="text-danger fs_1">{cardNumberError}</span>
              </Col>
              <Col lg={4} className="mt-4">
                Expiry Date
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none text-color dropdown_color"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
                <span className="text-danger fs_1">{expiryDateError}</span>
              </Col>
              <Col lg={4} className="mt-4">
                CVV
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="number"
                  className=" shadow-none text-color dropdown_color"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
                <span className="text-danger fs_1">{cvvError}</span>
              </Col>

              <Col lg={12} className="mt-5 password_button_wrapper">
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
                      onClick={handleSaveCardInfo}
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

export default AddCardInfoForm;
