import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";
import Header from "../Login/registrationHeader";
import { useStateContext } from "../../../contexts/ContextProvider";

const Signup3 = ({setActiveView}) => {
  const { setSignupData } = useStateContext();
  const [teamMembers, setTeamMembers] = useState(null);
  const [employee, setEmployee] = useState(null);
  const teamMember = [
    "only me",
    "2-5",
    "6-10",
    "11-15",
    "16-25",
    "25-50",
    "51-100",
    "101-500",
  ];
  const employees = [
    "1-19",
    "20-49",
    "50-99",
    "100-250",
    "251-500",
    "501-1500",
    "1500+",
  ];

  const handleRoleClick = (item) => {
    setTeamMembers(item);
    const radio = document.getElementById(item);
    if (radio) {
      setSignupData((prevData) => ({
        ...prevData,
        teamMembers: item,
      }));
      radio.click();
    }
  };

  const handleDescriptionClick = (description) => {
    setEmployee(description);

    const radio = document.getElementById(description);
    if (radio) {
      setSignupData((prevData) => ({
        ...prevData,
        companyEmployees: description,
      }));
      radio.click();
    }
  };
  return (
    <div className="signup_form w-100">
             <Header />

      <div className="mx-auto " style={{ width: "530px" }}>
        <div>
          <p
            className="mb-0 text-center"
            style={{ fontSize: "30px", marginTop: "24px" }}
          >
            How many people are on your team?
          </p>
        </div>

        <div className="flex justify-content-center mt-2 gray_text flex-wrap">
          {teamMember.map((item, index) => (
            <span
              key={index}
              className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer select_check"
              onClick={() => handleRoleClick(item)}
            >
              <Form.Check
                className="cursor_pointer text-nowrap"
                type="radio"
                aria-label="radio 1"
                label={item}
                name="role"
                id={item}
                style={{ padding: "8px 20px 8px 44px" }}
              />
            </span>
          ))}
        </div>
        <>
          <div className="pt-4">
            <p
              className="mb-0 text-center "
              style={{ fontSize: "30px", marginTop: "24px" }}
            >
              How many people work at your company?
            </p>
          </div>

          <div className="flex justify-content-center mt-2 flex-wrap gray_text">
            {employees.map((item, index) => (
              <span
                key={index}
                className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer text-nowrap"
                onClick={() => handleDescriptionClick(item)}
              >
                <Form.Check
                  className="cursor_pointer"
                  type="radio"
                  aria-label="radio 1"
                  label={item}
                  name="Description"
                  id={item}
                  style={{ padding: "8px 20px 8px 44px" }}
                />
              </span>
            ))}
          </div>
        </>
        <div className="flex justify-content-evenly mt-4">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => setActiveView("view2")}
          >
            <MdChevronLeft className="me-2 fs-5" />
            Back
          </Button>
          <Button
            onClick={() => setActiveView("view4")}
            type="submit"
            disabled={!teamMembers || !employee}
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

export default Signup3;
