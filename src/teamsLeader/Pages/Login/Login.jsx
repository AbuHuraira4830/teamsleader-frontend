import React, { useState } from "react";
import "../../../assets/css/Login.css";
import IMAGES from "../../../assets/images/Images";
import { Button } from "react-bootstrap";
import { HiMiniArrowRight } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { postAPI } from "../../../helpers/apis";
import Header from "./registrationHeader";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [nextClicked, setNextClicked] = useState(true);
  const [showError, setShowError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // const [userEmail,setUserEmail]=useState()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {};

    // Convert FormData to a plain object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await postAPI("/api/user/login", data);

      if (response.status === 200) {
        setIsLoading(false);
        // Perform any additional actions on successful login
        localStorage.setItem("token", response.data.token.token);
        // navigate("/");
        window.location.replace("/");
      } else {
        setIsLoading(false);
        // toast.error(response.data.message);
        setShowError(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
      // Handle error as needed
      setShowError(true);
      setErrorMessage(error.response?.data?.message);
      console.log(errorMessage);
    }
  };
  const handleChange = () => {
    setErrorMessage(null);
  };
  return (
    <div className="Login_Page">
      <Header />

      <div className="login_body text-center p-5 ">
        <div className="login_section email_section ">
          <p style={{ fontSize: "40px", marginTop: "17px" }}>
            <strong>Log</strong> In
          </p>
          <form className="login_form2 pt-3 " onSubmit={handleEmailSubmit}>
            {errorMessage === "*Incorrect Email" && (
              <div
                className="error-message mb-3 rounded rounded-1 py-1"
                style={{ width: "358px", backgroundColor: "#D6EDFF" }}
              >
                <p className="m-0" style={{ fontWeight: 100 }}>
                  We couldn't find this email. Would you like to{" "}
                </p>
                <Link className="default-textClr ">
                  sign up with this address?
                </Link>
              </div>
            )}

            <div className="text-center" style={{ padding: "0px 63px" }}>
              <p className="email_label mb-2 ">Enter your work email address</p>
            </div>
            <div>
              <span className="flex align-items-center pb-2">
                <span className="email_label me-3">Email</span>
                <span className="width360">
                  <input
                    name="emailAddress"
                    type="email"
                    onChange={handleChange}
                    className="login_input"
                    placeholder="Enter your email"
                  />
                </span>
              </span>

              {(errorMessage === "*Email Is Empty" ||
                errorMessage === "*Incorrect Email") && (
                <p
                  className="m-0 text-start fs_14 text-danger"
                  style={{ padding: "0px 58px" }}
                >
                  {errorMessage}
                </p>
              )}
            </div>
            <div>
              <span className="flex align-items-center mt-3 pt-1">
                <span className="email_label me-3">Password</span>
                <span className="width360 position-relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    className="login_input"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  <span
                    className="position-absolute"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </span>
              </span>
              {(errorMessage === "*Password Is Empty" ||
                errorMessage === "*Incorrect Password") && (
                <p className="m-0 text-start fs_14 text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
            <a
              className="login_link pb-1"
              href="#"
              style={{ alignSelf: "baseline", margin: "18px 0 4px 112px" }}
            >
              Forgot your password?
            </a>
            <div className="width360">
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-1 w-100 mt-4 centerIt justify-content-center green_btn border-0 "
                style={{ padding: "11px 10px" }}
              >
                {isLoading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  <>
                    Log in <HiMiniArrowRight className="ms-2 fs-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="fs_14 login_suggest mt-3 ">
          {nextClicked ? (
            <div className="">
              <span>Don't have an account yet? </span>
              <a
                className="login_link cursor_pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </a>
            </div>
          ) : (
            <a className="login_link" href="#">
              Login to another account
            </a>
          )}
          {/* <div>
            <span>Can't log in? </span>
            <a className="login_link" href="#">
              Visit our help center
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
