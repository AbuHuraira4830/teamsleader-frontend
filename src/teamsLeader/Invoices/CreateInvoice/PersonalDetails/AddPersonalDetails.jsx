import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddPersonalDetails = ({ handleClose, handleSavePersonalDetails }) => {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [vatType, setVatType] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  useEffect(() => {
    // Check if all mandatory fields are filled
    const isButtonEnabled =
      fullName &&
      city &&
      postalCode &&
      companyName &&
      address &&
      vatType &&
      vatNumber;
    setIsSaveButtonEnabled(isButtonEnabled);
  }, [
    fullName,
    city,
    postalCode,
    address,
    email,
    vatType,
    companyName,
    vatNumber,
  ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "vatType":
        setVatType(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "vatNumber":
        setVatNumber(value);
        break;

      default:
        break;
    }
  };

  const savePersonalDetails = () => {
    // Assuming you have an API endpoint to save the client details
    const personalDetails = {
      name: fullName,
      city,
      postalCode,
      address,
      email,
      companyName,
      type: vatType,
      country: "Belgium", // Add country state if needed
      vatNumber,
    };

    handleSavePersonalDetails(personalDetails);
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
                Personal Details
              </p>
            </div>
            <Row className="grayText  add_password_wrapper">
              <Col lg={4} className="mt-4">
                Full Name
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={fullName}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>

              <Col lg={4} className="mt-4">
                Email
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="email"
                  name="email"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter email"
                  value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  onChange={handleInputChange}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                />
              </Col>
              <Col lg={4} className="mt-4">
                Company
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your company name"
                  name="companyName"
                  value={companyName}
                  //   onChange={(e) => setCity(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>
              <Col lg={4} className="mt-4">
                VAT Type
              </Col>
              <Col lg={6} className="mt-4 clientInfo_select">
                <FormControl
                  color="success"
                  style={{
                    width: "370px",
                    height: "34px",
                    fontSize: "0.8rem",
                  }}
                >
                  <Select
                    label="Type"
                    name="vatType"
                    value={vatType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="vat1">Subject to VAT</MenuItem>
                    <MenuItem value="vat2">VAT Franchisee</MenuItem>
                    <MenuItem value="vat3">Exempt of VAT</MenuItem>
                  </Select>
                </FormControl>
              </Col>

              <Col lg={4} className="mt-4">
                VAT Number
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  name="vatNumber"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your VAT number"
                  value={vatNumber}
                  //   onChange={(e) => setPostalCode(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>
              <Col lg={4} className="mt-4">
                City
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your city"
                  name="city"
                  value={city}
                  //   onChange={(e) => setCity(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>
              <Col lg={4} className="mt-4">
                Postal Code
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="email"
                  name="postalCode"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  //   onChange={(e) => setPostalCode(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>

              <Col lg={4} className="mt-4">
                Address
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="email"
                  name="address"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter street name & number"
                  value={address}
                  //   onChange={(e) => setAddress(e.target.value)}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
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
                  <Button
                    type="submit"
                    className="py-1 px-3  workspace_addBtn rounded-1 border-0"
                    style={{ height: "34px" }}
                    disabled={!isSaveButtonEnabled}
                    onClick={savePersonalDetails}
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddPersonalDetails;
