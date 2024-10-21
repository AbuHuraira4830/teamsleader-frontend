import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MdChevronRight } from "react-icons/md";
import IMAGES from "../../../assets/images/Images";
import Header from "../Login/registrationHeader";
import { useStateContext } from "../../../contexts/ContextProvider";

const Signup2 = ({ setActiveView }) => {
  const { setSignupData } = useStateContext();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const role = ["Work", "Personal", "School", "Nonprofits"];
  const roleDescription = [
    { description: "Business owner", role: "Work" },
    { description: "Team leader", role: "Work" },
    { description: "Team member", role: "Work" },
    { description: "Freelancer", role: "Work" },
    { description: "Directer", role: "Work" },
    { description: "C-Level", role: "Work" },
    { description: "VP", role: "Work" },
    { description: "Undergraduate student", role: "School" },
    { description: "Graduate member", role: "School" },
    { description: "Faculty member", role: "School" },
    { description: "Other", role: "School" },
    { description: "Board member", role: "Nonprofits" },
    { description: "Exeutive", role: "Nonprofits" },
    { description: "Employee", role: "Nonprofits" },
    { description: "Volunteer", role: "Nonprofits" },
    { description: "It staff", role: "Nonprofits" },
    { description: "Other", role: "Nonprofits" },
  ];

  const handleRoleClick = (item) => {
    setSelectedRole(item);
    setSignupData((prevData) => ({
      ...prevData,
      purpose: item,
    }));
    if (item === "Personal") {
      setSelectedDescription(item);
    } else {
      setSelectedDescription(null);
    }
    const radio = document.getElementById(item);
    if (radio) {
      radio.click();
    }
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setSignupData((prevData) => ({
      ...prevData,
      role: description,
    }));
    const radio = document.getElementById(description);
    if (radio) {
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
            Hey there, what brings you here?
          </p>
        </div>

        <div className="flex justify-content-center mt-2 gray_text flex-wrap">
          {role.map((item, index) => (
            <span
              key={index}
              className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer select_check"
              onClick={() => handleRoleClick(item)}
            >
              <Form.Check
                className="cursor_pointer"
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
        {selectedRole && selectedRole !== "Personal" && (
          <>
            <div className="pt-4">
              <p
                className="mb-0 text-center "
                style={{ fontSize: "30px", marginTop: "24px" }}
              >
                What best describes your current role?
              </p>
            </div>

            <div className="flex justify-content-center mt-2 flex-wrap gray_text">
              {roleDescription
                .filter((item) => item.role === selectedRole)
                .map((descItem, index) => (
                  <span
                    key={index}
                    className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer text-nowrap"
                    onClick={() => handleDescriptionClick(descItem.description)}
                  >
                    <Form.Check
                      className="cursor_pointer"
                      type="radio"
                      aria-label="radio 1"
                      label={descItem.description}
                      name="Description"
                      id={descItem.description}
                      style={{ padding: "8px 20px 8px 44px" }}
                    />
                  </span>
                ))}
            </div>
          </>
        )}
        <div className="flex justify-content-center">
          <Button
            onClick={() => setActiveView("view3")}
            type="submit"
            disabled={!selectedRole || !selectedDescription}
            className="rounded-1 d-flex mt-4 justify-content-end  align-items-center green_btn border-0"
            style={{ width: "126px" }}
          >
            Continue <MdChevronRight className="ms-2 fs-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup2;
