import React, { useState } from "react";
import { Button, Form, Offcanvas, Row, Col } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";

const OfCanvasCard = ({ show, handleClose, handleAddCard }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSaveCard = () => {
    handleAddCard({
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvv,
      companyName,
    });
    // Clear form fields after saving
    setFirstName("");
    setLastName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCompanyName("");
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="custom_cardCanvas_width newTeam_ofcanvas"
    >
      <Offcanvas.Header>
        <button className="custom_closeCanvasBtn" onClick={handleClose}>
          <IoMdClose className="text-2xl" />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-4">
          <h5 className="mt-1 me-2">Cards</h5>
          <span className="align-items-center flex">
            <RxAvatar className="fs-5" />
            <div className="vr ms-2 me-1 nav_splitter align-self-center pb-1"></div>
            <Button className=" px-1 fs-4 workspace_menuBtn bgHover align-middle">
              <BsThreeDots className=" fs-5 " />
            </Button>
          </span>
        </div>

        <div className=" main_tableBtnDiv mb-3 flex justify-content-between mb-4">
          <span>
            <span>
              <Button className="workspace-dropdown-button d-flex items-center align-self-center  text-start py-1  px-2">
                <FiPlus className="me-2 " />
                Add New Card
              </Button>
            </span>
          </span>
        </div>
        <Form>
          <Row className=" grayText add_password_wrapper">
            <Col lg={4} className="mt-4">
              First Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                className=" shadow-none"
                placeholder="Enter first name as on card"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
            </Col>
            <Col lg={4} className="mt-4">
              Last Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                className=" shadow-none"
                placeholder="Enter last name as on card"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
            </Col>
            <Col lg={4} className="mt-4">
              Card Number
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="number"
                className=" shadow-none"
                placeholder="1111-2222-3333-4444"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
            </Col>
            <Col lg={4} className="mt-4">
              Expiry Date
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                className=" shadow-none"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
            </Col>
            <Col lg={4} className="mt-4">
              CVV
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="number"
                className=" shadow-none"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
            </Col>
            <Col lg={4} className="mt-4">
              Company Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                className=" shadow-none"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
              />
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
                <Button
                  type="button"
                  className="py-1 px-3  workspace_addBtn rounded-1 border-0"
                  style={{ height: "34px" }}
                  onClick={handleSaveCard}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OfCanvasCard;
