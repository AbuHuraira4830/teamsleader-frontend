import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "react-bootstrap";

const EnterpriseForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companySize: "",
    consulting: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
    setFormValues({ ...formValues, phone: value });

    if (formErrors.phone) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors.phone;
      setFormErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = "Please enter your first name";
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = "Please enter your last name";
    }

    if (!formValues.email.trim()) {
      errors.email = "Please enter your email";
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formValues.email)) {
        errors.email = "*Invalid email format";
      }
    }

    if (!formValues.phone.trim()) {
      errors.phone = "Please enter your phone number";
    } else {
      const phoneRegex = /^\d{10,15}$/; // Assuming a valid phone number contains 10-15 digits
      if (!phoneRegex.test(formValues.phone)) {
        errors.phone = "*Invalid phone number";
      }
    }

    if (!formValues.companySize.trim()) {
      errors.companySize = "Please select your company size";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully:", formValues);
      setFormSubmitted(true);
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plansCustomer_infoForm mb-5">
      {!formSubmitted ? (
        <>
          <div className="plansCustomer_infoForm_row">
            <div className="plansHosted_field">
              <label htmlFor="firstName" className="plansHosted_field_label">
                First Name <span className="text-[#df2f4a] ml-2">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                className="plansHosted_fieldInputWrap person_searchInput"
              />
              {formErrors.firstName && (
                <div className="invalidInputMessage">
                  {formErrors.firstName}
                </div>
              )}
            </div>
            <div className="plansHosted_field ml-4">
              <label htmlFor="lastName" className="plansHosted_field_label">
                Last Name <span className="text-[#df2f4a] ml-2">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                className="plansHosted_fieldInputWrap person_searchInput"
              />
              {formErrors.lastName && (
                <div className="invalidInputMessage">{formErrors.lastName}</div>
              )}
            </div>
          </div>
          <div className="plansCustomer_infoForm_row">
            <div className="plansHosted_field">
              <label htmlFor="email" className="plansHosted_field_label">
                Email <span className="text-[#df2f4a] ml-2">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="plansHosted_fieldInputWrap person_searchInput"
              />
              {formErrors.email && (
                <div className="invalidInputMessage">{formErrors.email}</div>
              )}
            </div>
          </div>
          <div className="plansCustomer_infoForm_row">
            <div className="plansHosted_field">
              <label htmlFor="phone" className="plansHosted_field_label">
                Phone <span className="text-[#df2f4a] ml-2">*</span>
              </label>
              <PhoneInput
                specialLabel={""}
                country={"be"}
                value={phoneNumber}
                onChange={handlePhoneInputChange}
                className=" person_searchInput"
              />
              {formErrors.phone && (
                <div className="invalidInputMessage">{formErrors.phone}</div>
              )}
            </div>
          </div>
          <div className="plansCustomer_infoForm_row">
            <div className="plansHosted_field">
              <label htmlFor="companySize" className="plansHosted_field_label">
                Company Size <span className="text-[#df2f4a] ml-2">*</span>
              </label>
              <Select
                name="companySize"
                value={formValues.companySize}
                onChange={handleInputChange}
                className="h-[41px] w-full "
              >
                <MenuItem value="1-19">1-19</MenuItem>
                <MenuItem value="20-49">20-49</MenuItem>
                <MenuItem value="50-99">50-99</MenuItem>
                <MenuItem value="100-250">100-250</MenuItem>
                <MenuItem value="251-1500">251-1500</MenuItem>
                <MenuItem value="1500+">1500+</MenuItem>
              </Select>
              {formErrors.companySize && (
                <div className="invalidInputMessage">
                  {formErrors.companySize}
                </div>
              )}
            </div>
          </div>
          <div className="plansCustomer_infoForm_row mb-5">
            <div className="plansHosted_field">
              <label htmlFor="consulting" className="plansHosted_field_label">
                How can our team help you?
              </label>
              <textarea
                name="consulting"
                value={formValues.consulting}
                onChange={handleInputChange}
                id="consulting"
                className="consulting_textarea"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              className="px-4 py-2 workspace_addBtn border-0 rounded-1 capitalize"
              style={{ backgroundColor: "#025231", fontSize: "14px" }}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center  text-[.85rem]">
          <p>
            Thanks for submitting the form! One of our experts will contact you
            shortly.
          </p>
        </div>
      )}
    </form>
  );
};

export default EnterpriseForm;
