import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { IoIosBusiness } from "react-icons/io";
import { useStateContext } from "../../../contexts/ContextProvider";
import { IoLocationOutline, IoPerson } from "react-icons/io5";
import { RiFolderZipLine } from "react-icons/ri";
import { BsPhone } from "react-icons/bs";
import { GrDocumentText, GrGlobe } from "react-icons/gr";
import { postAPI } from "../../../helpers/apis";

const BusinessInfo = () => {
  const { thisUser, setThisUser } = useStateContext();
  const [businessName, setBusinessName] = useState(thisUser.businessName);
  const [businessAddress, setBusinessAddress] = useState(
    thisUser.businessAddress
  );
  const [zipCode, setZipCode] = useState(thisUser.zipCode);
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState(
    thisUser.businessPhoneNumber
  );
  const [vatNumber, setVatNumber] = useState(thisUser.vatNumber);
  const [contactPerson, setContactPerson] = useState(thisUser.contactPerson);
  const [country, setCountry] = useState(thisUser.country);
  const businessOptions = [
    {
      icon: (
        <IoIosBusiness
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Business name",
      data: businessName,
      placeholder: "Add a business name",
    },
    {
      icon: (
        <IoLocationOutline
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Business address",
      data: businessAddress,
      placeholder: "Add a business address",
    },
    {
      icon: (
        <RiFolderZipLine
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Zip code",
      data: zipCode,
      placeholder: "Add a zip code",
    },
    {
      icon: (
        <BsPhone
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Business phone number",
      data: businessPhoneNumber,
      placeholder: "Add a business phone number",
    },
    {
      icon: (
        <IoPerson
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Contact person",
      data: contactPerson,
      placeholder: "Add a contact person",
    },
    {
      icon: (
        <GrDocumentText
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "VAT number",
      data: vatNumber,
      placeholder: "Add a VAT number",
    },
    {
      icon: (
        <GrGlobe
          className="me-2 fs-4"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Country",
      data: country,
      placeholder: "Add a country",
    },
  ];
  const updateUser = () => {
    postAPI("/api/user/update", {
      businessName,
      businessAddress,
      zipCode,
      businessPhoneNumber,
      vatNumber,
      contactPerson,
      country,
    })
      .then((response) => {
        setThisUser(response.data.updatedUser);
        console.log("User updated successfully:", response.data.updatedUser);
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };
  return (
    <div className="w-100" style={{ padding: "24px" }}>
      <p className="mb-4" style={{ fontSize: "32px", fontWeight: "500" }}>
        Business info
      </p>
      <div className="ps-3">
        {businessOptions.map((option, index) => (
          <div key={index} className="centerIt mb-3">
            <div>{option.icon}</div>
            <p className="text-nowrap" style={{ minWidth: "250px" }}>
              {option.name}
            </p>
            <Form.Control
              className="workspace_searchInput shadow-none bg-transparent rounded-1 hoverBorder border-0 py-1 px-2 "
              type="text"
              style={{ fontSize: "16px" }}
              placeholder={option.placeholder}
              value={option.data}
              onBlur={updateUser}
              onChange={(e) => {
                if (option.name === "Business name")
                  setBusinessName(e.target.value);
                else if (option.name === "Business address")
                  setBusinessAddress(e.target.value);
                else if (option.name === "Zip code") setZipCode(e.target.value);
                else if (option.name === "Business phone number")
                  setBusinessPhoneNumber(e.target.value);
                else if (option.name === "VAT number")
                  setVatNumber(e.target.value);
                else if (option.name === "Contact person")
                  setContactPerson(e.target.value);
                else if (option.name === "Country") setCountry(e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessInfo;
