import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

const UpdateCardInfoForm = ({
  handleClose,
  selectedCard,
  handleUpdateCard,
}) => {
  const [cardInfo, setCardInfo] = useState(selectedCard);

  useEffect(() => {
    setCardInfo(selectedCard);
  }, [selectedCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateCard(cardInfo);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex info_container">
        <Container className="align-self-center">
          <div className="flex pb-4">
            <span className="title_border me-2"></span>
            <p className="mb-0" style={{ fontSize: "18px", fontWeight: 600 }}>
              Card Details
            </p>
          </div>
          <Row className="grayText add_password_wrapper">
            <Col lg={4} className="mt-4">
              First Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="firstName"
                value={cardInfo?.firstName || ""}
                onChange={handleChange}
                placeholder="Enter full name as on card"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={4} className="mt-4">
              Last Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="lastName"
                value={cardInfo?.lastName || ""}
                onChange={handleChange}
                placeholder="Enter full name as on card"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={4} className="mt-4">
              Card Number
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="cardNumber"
                value={cardInfo?.cardNumber || ""}
                onChange={handleChange}
                placeholder="1111-2222-3333-4444"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={4} className="mt-4">
              Expiry Date
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="expiryDate"
                value={cardInfo?.expiryDate || ""}
                onChange={handleChange}
                placeholder="MM/YY"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={4} className="mt-4">
              CVV
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="cvv"
                value={cardInfo?.cvv || ""}
                onChange={handleChange}
                placeholder="Enter CVV"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={4} className="mt-4">
              Company Name
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Control
                type="text"
                name="companyName"
                value={cardInfo?.companyName || ""}
                onChange={handleChange}
                placeholder="Enter company name"
                className="shadow-none"
                style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                required
              />
            </Col>
            <Col lg={12} className="mt-5 password_button_wrapper">
              <div className="flex justify-content-end mb-4">
                <Button
                  className="workspace-dropdown-button fw-normal rounded-1 py-1 me-3 px-3"
                  style={{ height: "34px" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="py-1 px-3 workspace_addBtn rounded-1 border-0"
                  style={{ height: "34px" }}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Form>
  );
};

export default UpdateCardInfoForm;
