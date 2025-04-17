import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/images/Images";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Header from "../Login/registrationHeader";

const Signup4 = ({setActiveView}) => {
  const { setManagingOption,setSignupData } = useStateContext();
  const [option, setOption] = useState(null);
  const options = [
    "Legal",
    "Finance",
    "Software development",
    "Design and Creative",
    "Product management",
    "HR and Recruiting",
    "Construction",
    "Sales and CRM",
    "IT",
    "PMO",
    "Nonprofits",
    "Marketing",
    "Education",
    "Operations",
    "Other",
  ];

  const handleRoleClick = (item) => {
    setOption(item);
    const radio = document.getElementById(item); // Use the item name directly as ID
    if (radio) {
      setSignupData((prevData) => ({
        ...prevData,
        firstFocus: item,
      }));
      radio.click();
    }
  };
  
  

  return (
    <div className="signup_form w-100">
           <Header />


      <div className="mx-auto " style={{ width: "610px" }}>
        <div>
          <p
            className="mb-0 text-center"
            style={{ fontSize: "30px", marginTop: "24px" }}
          >
            Select you would like to manage first.
          </p>
          <p className="email_label mb-4 text-center">
            You can add more in the future.
          </p>
        </div>

        <div className="flex justify-content-center pt-3 gray_text flex-wrap">
  {options.map((item, index) => (
    <span
      key={index}
      className="mb-3 me-3 border rounded-pill fs_14 cursor_pointer select_check"
      onClick={() => handleRoleClick(item)}
    >
      <Form.Check
        className="cursor_pointer text-nowrap"
        type="radio"
        aria-label="radio 1"
        label={item}
        name="role"
        id={item} // Use the item directly as ID
        style={{ padding: "8px 20px 8px 44px" }}
      />
    </span>
  ))}
</div>

        <div className="flex justify-content-evenly mt-4">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => setActiveView("view3")}
          >
            <MdChevronLeft className="me-2 fs-5" />
            Back
          </Button>
          <Button
            onClick={() => setActiveView("view5")}
            type="submit"
            className="rounded-1 d-flex  justify-content-end  align-items-center green_btn border-0"
            style={{ width: "126px" }}
          >
            Continue <MdChevronRight className="ms-2 fs-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup4;
