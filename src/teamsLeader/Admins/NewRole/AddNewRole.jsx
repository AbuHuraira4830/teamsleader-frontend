import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PermissionList from "./PermissionList";
import { Button } from "antd";

import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";

const AddNewRole = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [functionalDescription, setFunctionalDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInputChange = () => {
    if (fullName && email && phoneNumber && functionalDescription) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  const handlePhoneInputChange = (value) => {
    // Set the phone number value
    setPhoneNumber(value);
  };
  return (
    <>
      <div
        className="newRole_container 
      	"
      >
        <div className="w-[55%]">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "80%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="mt-4 ">
              <Typography
                gutterBottom
                style={{ marginLeft: "0.5rem", fontSize: ".85rem" }}
              >
                Full Name
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Full Name"
                color="success"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  handleInputChange();
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "0.75rem",
                  },
                }}
              />
              <Typography
                gutterBottom
                style={{
                  marginLeft: "0.5rem",
                  marginTop: "2.5rem",
                  fontSize: ".85rem",
                }}
              >
                Email Address
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Email Address"
                color="success"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange();
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "0.75rem",
                  },
                }}
              />
              <Typography
                gutterBottom
                style={{
                  marginLeft: "0.5rem",
                  marginTop: "2.5rem",
                  fontSize: ".85rem",
                }}
              >
                Phone
              </Typography>
              {/* ===========Contact============ */}
              <PhoneInput
                country={"pk"}
                value={phoneNumber}
                onChange={handlePhoneInputChange}
              />

              {/* <div className="flex items-center"></div> */}
              <Typography
                gutterBottom
                style={{
                  marginLeft: "0.5rem",
                  marginTop: "2.5rem",
                  fontSize: ".85rem",
                }}
              >
                Functional Description
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Functional Description"
                color="success"
                value={functionalDescription}
                onChange={(e) => {
                  setFunctionalDescription(e.target.value);
                  handleInputChange();
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "0.75rem",
                  },
                }}
              />
            </div>
          </Box>
        </div>

        {/* <hr
          className="role_divider"
          style={{ borderBottom: "1px solid #e6e9ef" }}
        /> */}

        <div className="w-[20%]">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <div className="mt-3">
            <Typography
              gutterBottom
              style={{ marginLeft: "0.5rem", fontSize: ".85rem" }}
            >
              Allow Access to:
            </Typography>
            <div className="flex flex-col mt-2 text-sm">
              <div className="flex items center justify-around py-2">
                <span>Teams</span>
                <Switch color="success" />
              </div>
              <div className="flex items center justify-around py-2">
                <span>Invoices</span>
                <Switch color="success" />
              </div>
              <div className="flex items center justify-around py-2">
                <span>Proposals</span>
                <Switch color="success" />
              </div>
            </div>
          </div> */}
            <PermissionList />
          </Box>
        </div>
      </div>
      <div className="flex justify-end mt-2 ">
        <Button
          className=" mr-2 workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
          style={{
            height: "40px",
            fontSize: ".8rem",
          }}
        >
          Cancel
        </Button>
        <Button
          type="text"
          className={`px-2  workspace_addBtn border-0 bg-[#025231] ${
            isButtonDisabled ? "opacity-50" : "opacity-100	"
          }`}
          style={{
            height: "40px",
            fontSize: ".8rem",
          }}
          disabled={isButtonDisabled}
        >
          Add New Role
        </Button>
      </div>
    </>
  );
};

export default AddNewRole;
