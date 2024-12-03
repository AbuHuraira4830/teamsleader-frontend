import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { Button, Form } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";
import Header from "../Login/registrationHeader";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import { CircularProgress } from "@mui/material";

const Signup6 = ({ setActiveView }) => {
  const [data, setData] = useState();
  const [option, setOption] = useState(null);
  const navigate = useNavigate();
  const { signupData, setSignupData } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    "Friend / Colleague",
    "YouTube ad",
    "Social media (Facebook, Instagram, Reddit, etc.)",
    "Search engine (Google, Bing, etc.)",
    "LinkedIn",
    "Audio ad (Podcast, Spotify)",
    "Billboard / Public transit ad",
    "Software review sites",
    "TV / Streaming service",
    "Consultant",
    "Other",
  ];

  const handleRoleClick = (item) => {
    const radio = document.getElementById(item);

    if (radio) {
      setSignupData((prevData) => ({
        ...prevData,
        hearFrom: item,
        package: "trial", // Set package as 'trial' during signup
        packageStartDate: new Date(),
      }));
      radio.click();
    }
  };
  const handleSignup = async () => {
    setIsLoading(true);

    // Ensure package is set to 'trial' if not already
    const updatedSignupData = {
      ...signupData,
      package: signupData.package || "trial", // fallback to 'trial' if not set
      packageStartDate: new Date(),
    };

    console.log(updatedSignupData); // Log to confirm the data structure

    postAPI("/api/user/signup", updatedSignupData)
      .then((response) => {
        setIsLoading(false);
        navigate("/invite-team");
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
            One last question, how did you hear about us?
          </p>
        </div>

        <div className="flex justify-content-center pt-3 gray_text flex-wrap">
          {options.map((item, index) => (
            <span
              key={index}
              className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer select_check"
              onClick={() => handleRoleClick(item)}
            >
              <Form.Check
                onClick={() => handleRoleClick(item)}
                className="cursor_pointer text-nowrap "
                type="checkbox"
                aria-label="radio 1"
                label={item}
                id={item}
                style={{ padding: "8px 20px 8px 44px" }}
              />
            </span>
          ))}
        </div>
        <div className="flex justify-content-evenly mt-4 mb-5">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => setActiveView("view5")}
          >
            <MdChevronLeft className="me-2 fs-5" />
            Back
          </Button>
          <Button
            onClick={handleSignup}
            type="submit"
            disabled={isLoading}
            className="rounded-1 d-flex  justify-content-center  align-items-center green_btn border-0"
            style={{ width: "126px" }}
          >
            {isLoading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              <>
                Continue <MdChevronRight className="ms-2 fs-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup6;
