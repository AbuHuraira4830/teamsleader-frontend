import React, { useState } from "react";
import "../../../assets/css/Login.css";

import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { HiMiniArrowRight } from "react-icons/hi2";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import { toast } from "react-toastify";
import Header from "../Login/registrationHeader";
import { CircularProgress } from "@mui/material";

const Signup0 = ({ setActiveView, userEmail, setUserEmail }) => {
  const navigate = useNavigate();
  // const {  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const verifyEmail = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!userEmail) {
      setErrorMessage("*Please enter your email address");
      return;
    }
    let data = {
      emailAddress: e.target.emailAddress.value,
    };
    let response = await postAPI("/api/user/signup/verify-email", data);
    if (response.status === 200) {
      setIsLoading(false);

      setErrorMessage(null);
      setActiveView("view1");
    } else {
      setIsLoading(false);
      setErrorMessage(response.data.message);
    }
  };
  const handleChange = (value) => {
    setUserEmail(value);
    setErrorMessage(null);
  };
  return (
    <div className="signup_form w-100 ">
      <Header />

      <div className="mx-auto text-center pt-5" style={{ width: "420px" }}>
        <div>
          <p className="mb-2" style={{ fontSize: "30px", marginTop: "24px" }}>
            Welcome to Teamsleader
          </p>
          <p className="email_label mb-2">
            Get started - it's free. No credit card needed.
          </p>
        </div>
        <form
          onSubmit={verifyEmail}
          className="mt-5"
          style={{ width: "420px" }}
        >
          <input
            type="email"
            className="login_input"
            name="emailAddress"
            value={userEmail}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Example@company.com"
          />
          {errorMessage && (
            <p className="m-0 text-start fs_14 text-danger">{errorMessage}</p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-1 w-100 mt-4 align-items-center green_btn border-0"
          >
            {isLoading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              <>Continue</>
            )}
          </Button>
        </form>
        <div className="fs_16 login_suggest mt-4 ">
          <div className="mb-1">
            <span>By proceeding, you agree to the </span>
          </div>
          <div>
            <a className="login_link" href="#">
              Terms of Service
            </a>
            <span> and </span>
            <a className="login_link" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 pt-5" style={{}}>
        <span>
          Already have an account?{" "}
          <a
            className="login_link cursor_pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup0;
