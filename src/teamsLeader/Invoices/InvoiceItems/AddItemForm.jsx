import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddItemForm = ({ handleClose, handleSaveItemDetails }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0.00");

  const [itemCategory, setItemCategory] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [vatRate, setVatRate] = useState("0");
  const [itemDiscount, setItemDiscount] = useState("");
  const [totalInclVAT, setTotalInclVAT] = useState(0);

  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemDescription, setItemDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedAdvanced, setIsCheckedAdvance] = useState(false);
  const currencySymbol = "€";
  const percentageSymbol = "%";

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleToggleAdvance = () => {
    setIsCheckedAdvance(!isCheckedAdvanced);
  };

  const calculateTotal = () => {
    let priceNumeric = parseFloat(itemPrice.replace("€", "").trim()) || 0;
    let quantityNumeric = parseInt(itemQuantity, 10) || 0;
    let vatRateNumeric = isChecked ? 0 : parseFloat(vatRate) / 100 || 0; // VAT is 0 if isChecked is true
    let discountPercentage =
      parseFloat(itemDiscount.replace("%", "").trim()) / 100 || 0;

    let totalBeforeDiscount = priceNumeric * quantityNumeric;
    let discountAmount = totalBeforeDiscount * discountPercentage;
    let totalExclVAT = totalBeforeDiscount - discountAmount;

    // VAT is only added if isChecked is false
    let vatAmount = totalExclVAT * vatRateNumeric;

    let totalInclVAT = totalExclVAT + vatAmount;

    setTotalInclVAT(Number(totalInclVAT.toFixed(2)));
  };

  useEffect(() => {
    const isButtonEnabled =
      itemName && itemPrice && itemCategory && itemQuantity;
    setIsSaveButtonEnabled(isButtonEnabled);
    calculateTotal();
  }, [
    itemName,
    itemPrice,
    itemCategory,
    itemQuantity,
    itemUnit,
    itemPrice,
    vatRate,
    itemDiscount,
    isChecked,
    isCheckedAdvanced,
  ]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "itemName":
        setItemName(value);
        break;
      case "itemDescription":
        setItemDescription(value);
        break;
      case "itemCategory":
        setItemCategory(value);
        break;
      case "itemQuantity":
        // Ensure the value is a number for quantity
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity)) {
          setItemQuantity(quantity);
        }
        break;
      case "itemUnit":
        setItemUnit(value);
        break;
      case "vatRate":
        // Assuming vatRate is a string value like "21%"
        setVatRate(value);
        break;
      case "itemPrice":
        // Extract the numerical part of the value, removing the "€" symbol and any non-numeric characters
        const numericPart = value.replace(/[^0-9.,]/g, "");

        // Convert the string to a number, ensuring it handles both dot and comma as decimal separators
        // This step is necessary to handle locales where a comma is used as a decimal separator
        const numberValue = parseFloat(numericPart.replace(",", "."));

        // Check if the conversion results in a valid number
        if (!isNaN(numberValue)) {
          // Fix the number to two decimal places and prepend with "€" symbol
          setItemPrice(`${numberValue.toFixed(2)}`);
        } else {
          // If the input doesn't result in a valid number, revert to default value
          setItemPrice("€ 0.00");
        }
        break;

      case "itemDiscount":
        const numericDiscount = value.replace(/[^0-9.,]/g, "");
        const numberDiscount = parseInt(numericDiscount.replace(",", "."));
        if (!isNaN(numberDiscount)) {
          setItemDiscount(`${numberDiscount}`);
        } else {
          setItemDiscount("");
        }
        break;

      default:
        break;
    }
  };

  const saveItemDetails = () => {
    // Assuming you have an API endpoint to save the client details
    const itemDetails = {
      name: itemName,
      itemPrice,
      itemDescription,
      itemCategory,
      itemUnit,
      vatRate,
      itemDiscount,
      itemQuantity,
    };

    console.log("Saving item details:", itemDetails);

    // After saving, you may want to close the form or clear the inputs
    handleSaveItemDetails(itemDetails); // Assuming this function closes the form
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
                New Item
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
                  placeholder="Enter item name"
                  name="itemName"
                  value={itemName}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>

              <Col lg={4} className="mt-4">
                Description (optional)
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  placeholder="Enter item description"
                  name="itemDescription"
                  value={itemDescription}
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  onChange={handleInputChange}
                />
              </Col>

              <Col lg={4} className="mt-4">
                Category
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
                    name="itemCategory"
                    value={itemCategory}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="goods">Sales of Goods</MenuItem>
                    <MenuItem value="services">Sales of Services</MenuItem>
                    <MenuItem value="donation">Donation</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col lg={4} className="mt-4">
                Quantity
              </Col>
              <Col lg={6} className="mt-4">
                <InputGroup
                  style={{
                    width: "370px",
                    height: "34px",
                    fontSize: "0.8rem",
                  }}
                >
                  <Button
                    variant="outline-secondary quantityButton"
                    onClick={() =>
                      setItemQuantity(Math.max(0, itemQuantity - 1))
                    }
                  >
                    -
                  </Button>
                  <Form.Control
                    type="text"
                    color="success"
                    className=" shadow-none person_searchInput "
                    value={itemQuantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        // Check if the value is a number or empty string
                        setItemQuantity(val === "" ? "" : parseInt(val, 10));
                      }
                    }}
                    style={{
                      width: "100px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  />
                  <Button
                    variant="outline-secondary quantityButton"
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                  >
                    +
                  </Button>
                </InputGroup>
              </Col>

              <Col lg={4} className="mt-4">
                Price
              </Col>
              <Col lg={6} className="mt-4">
                <Form.Control
                  type="text"
                  className=" shadow-none person_searchInput"
                  name="itemPrice"
                  style={{ width: "370px", height: "34px", fontSize: "0.8rem" }}
                  // value={itemPrice}
                  value={`${currencySymbol} ${itemPrice}`}
                  onChange={handleInputChange}
                />
              </Col>

              <Col lg={4} className="mt-4">
                VAT rate
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
                    name="vatRate"
                    value={vatRate}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="0">0%</MenuItem>
                    <MenuItem value="6">6%</MenuItem>
                    <MenuItem value="12">12%</MenuItem>
                    <MenuItem value="21">21%</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col lg={4} className="mt-4">
                Unit price with VAT
              </Col>
              <Col lg={6} className="mt-4 clientInfo_select">
                <Form.Check
                  type="switch"
                  id="custom_switchInvoice"
                  className="custom_switchInvoice"
                  label=""
                  checked={isChecked}
                  onChange={handleToggle}
                />
              </Col>
              {isCheckedAdvanced && (
                <>
                  <Col lg={4} className="mt-4">
                    Unit
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
                        name="itemUnit"
                        value={itemUnit}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="items">items</MenuItem>
                        <MenuItem value="hours">hours</MenuItem>
                        <MenuItem value="days">days</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>

                  <Col lg={4} className="mt-4">
                    Discount
                  </Col>
                  <Col lg={6} className="mt-4">
                    <Form.Control
                      type="text"
                      className=" shadow-none person_searchInput"
                      defaultValue="€ 0.00"
                      name="itemDiscount"
                      // value={itemDiscount}
                      value={itemDiscount ? `${itemDiscount}%` : ""}
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

              <Col lg={4} className="mt-4">
                Advanced Settings
              </Col>
              <Col lg={6} className="mt-4 clientInfo_select">
                <Form.Check
                  type="switch"
                  id="custom_switchInvoice"
                  className="custom_switchInvoice"
                  label=""
                  checked={isCheckedAdvanced}
                  onChange={handleToggleAdvance}
                />
              </Col>
              <Row
                className="align-items-center px-3 py-2 rounded mt-4"
                style={{ backgroundColor: "#EEEEEE" }}
              >
                <Col className="text-start">
                  <span className="font-weight-bold text-dark">
                    Total incl. VAT
                  </span>
                </Col>
                <Col className="text-end">
                  <span className="font-weight-bold text-dark">
                    € {totalInclVAT.toFixed(2)}
                  </span>
                </Col>
              </Row>

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
                    onClick={saveItemDetails}
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

export default AddItemForm;
