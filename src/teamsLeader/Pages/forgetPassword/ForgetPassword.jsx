import { useState } from "react";
import React from "react";
import Header from "../Login/registrationHeader";
import { HiMiniArrowRight } from "react-icons/hi2";
import { CircularProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../../helpers/api";
const ForgetPassword = () => {
  const { loginEmail, setLoginEmail } = useStateContext();
  const [nextClicked, setNextClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendmail = async () => {
    setLoading(true);
    if (!loginEmail) return;
    try {
      const res = postAPI("/api/user/forgot-password", {
        emailAddress: loginEmail,
      });
      console.log(res.data);
      setNextClicked(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      {nextClicked ? (
        <div className="text-center p-5 ">
          <h1 className="text-[38px] font-light mt-2 ">
            {" "}
            <strong className="font-bold ">Password</strong> Recovery
          </h1>

          <div className="w-[540px] text-left font-light mx-auto mt-2.5">
            <p className="px-7 ">
              If we found a user with email address{" "}
              <strong className="font-bold p-0">{loginEmail}</strong> in the
              account, you will receive an email from us shortly.
            </p>
            <p className="px-7 my-8">
              If you do not receive the email within a few minutes, please check
              your junk/spam email folder
            </p>
            {/* <p className="px-7">
              Unsure which email you used for your monday.com account, or not
              sure what account you are associated with?{" "}
              <a
                className="no-underline hover:underline text-[#1f76c2]"
                href="#"
              >
                {" "}
                Contact us
              </a>
            </p> */}
            <p className="text-center border-t-1 border-[var(--border-color)] mt-10 pt-3">
              Remember the password? -{" "}
              <a
                className="no-underline hover:underline text-[#1f76c2] cursor_pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Go Back to Login
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="login_body text-center p-5">
          <h1 className="text-[38px] font-light mt-2">
            {" "}
            <strong className="font-bold">Forgot</strong> your password?
          </h1>
          <p className="text-[17px] font-medium mt-3 mb-8">
            We'll email you instructions on how to reset your password
          </p>
          <div className="flex justify-center">
            <div className=" pb-2 max-w-[360px]">
              <p className="email_label me-3 text-start fs_14 font-light">
                Your email address
              </p>
              <span className="width360">
                <input
                  name="emailAddress"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="login_input"
                  placeholder="example@company.com"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-1 w-100 mt-4 centerIt justify-content-center green_btn border-0 text-[18px]"
                  style={{ padding: "11px 10px" }}
                  onClick={sendmail}
                >
                  {loading ? (
                    <CircularProgress size={24} className="text-white" />
                  ) : (
                    <>
                      Reset Password <HiMiniArrowRight className="ms-2 fs-5" />
                    </>
                  )}
                </Button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
