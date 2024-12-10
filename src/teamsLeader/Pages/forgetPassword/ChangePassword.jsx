import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "../Login/registrationHeader";
import { Button } from "react-bootstrap";
import { postAPI } from "../../../helpers/api";
import { useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [errors, setErrors] = useState({});
  const { resetToken } = useParams();
  const Navigate = useNavigate();
  const validatePasswords = () => {
    const errors = {};
    if (!password) {
      errors.password = "New password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validatePasswords()) {
      try {
        const res = await postAPI("/api/user/reset-password", {
          newPassword: password,
          token: resetToken,
        });
        Navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="text-center p-5">
        <h1 className="text-[38px] font-light mt-2">
          <strong className="font-bold">Change</strong> Password
        </h1>
        <div className="max-w-[360px] mx-auto mt-6">
          <div className="position-relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className={`login_input max-w-[360px] ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-start">
              *{errors.password}
            </p>
          )}
          <div className="my-6 position-relative">
            <input
              name="confirmPassword"
              type={showPassword1 ? "text" : "password"}
              className={`login_input max-w-[360px] ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 text-start">
              *{errors.confirmPassword}
            </p>
          )}
          <Button
            type="submit"
            className="rounded-1 w-100 mt-4 green_btn border-0 text-[18px]"
            style={{ padding: "11px 10px" }}
            onClick={handleSubmit}
          >
            Change my password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
