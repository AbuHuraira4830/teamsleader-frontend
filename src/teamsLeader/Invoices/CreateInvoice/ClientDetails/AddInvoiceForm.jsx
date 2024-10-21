import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import countriesAndTimezones from "countries-and-timezones";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AddInvoiceForm = ({ handleClose, handleSaveClientDetails }) => {
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [clientType, setClientType] = useState(""); // Assuming this represents the 'Type'
  const [vatNo, setVatNo] = useState(""); // Assuming this represents the 'Type'
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  // Get all countries
  const allCountries = countriesAndTimezones.getAllCountries();
  const countryList = Object.values(allCountries).map((country) => ({
    name: country.name,
    id: country.id,
  }));

  useEffect(() => {
    // Check if all mandatory fields are filled
    const isButtonEnabled =
      clientName &&
      city &&
      postalCode &&
      address &&
      selectedCountry &&
      clientType;
    setIsSaveButtonEnabled(isButtonEnabled);
  }, [
    clientName,
    city,
    postalCode,
    address,
    email,
    selectedCountry,
    clientType,
    vatNo,
  ]);

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "clientName":
        setClientName(value);
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
      case "clientType":
        setClientType(value);
        break;
      case "vatNo":
        setVatNo(value);
        break;

      default:
        break;
    }
  };

  const saveClientDetails = () => {
    // Assuming you have an API endpoint to save the client details
    const clientDetails = {
      name: clientName,
      city,
      postalCode,
      address,
      email,
      type: clientType,
      country: selectedCountry ? selectedCountry.name : "",
      vatNo,
    };

    console.log("Saving client details:", clientDetails);

    handleSaveClientDetails(clientDetails);
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
                Add New Client
              </p>
            </div>
            <Row className="grayText  add_password_wrapper">
              <Col lg={4} className="mt-4">
                Name
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter your name"
                  name="clientName"
                  value={clientName}
                  //   onChange={(e) => setClientName(e.target.value)}
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

              <Col lg={4} className="mt-4">
                Type
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
                    name="clientType"
                    value={clientType}
                    // onChange={(e) => setClientType(e.target.value)}

                    onChange={handleInputChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="vat1">Person</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              {clientType === "company" && (
                <>
                  <Col lg={4} className="mt-4">
                    VAT Number
                  </Col>
                  <Col lg={6} className="mt-4">
                    <Form.Control
                      type="text"
                      name="vatNo"
                      className=" shadow-none person_searchInput"
                      placeholder="Enter your VAT number"
                      value={vatNo}
                      style={{
                        width: "370px",
                        height: "34px",
                        fontSize: "0.8rem",
                      }}
                      onChange={handleInputChange}
                    />
                  </Col>
                </>
              )}
              <Col lg={4} className="mt-4 ">
                Country
              </Col>

              <Col
                lg={6}
                className="mt-4 clientInfo_select"
                style={{ width: 370, fontSize: "0.8rem", height: "30px" }}
              >
                <Autocomplete
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  //   onChange={handleInputChange}
                  options={countryList}
                  getOptionLabel={(option) => option.name || "Unites States"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      name="country"
                      color="success"
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          height: "34px",
                          // Adjust these as needed to achieve the exact look you want
                          paddingTop: "0px", // Reducing padding might help achieve 30px height
                          paddingBottom: "0px",
                          paddingLeft: "2px",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  )}
                  style={{ width: 370 }} // Adjust width as needed
                />
              </Col>

              <Col lg={4} className="mt-4">
                Email (optional)
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
                    onClick={saveClientDetails}
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

export default AddInvoiceForm;
