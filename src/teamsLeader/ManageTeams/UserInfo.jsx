import React, { useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Avatar from "@mui/material/Avatar";
import { LuPencil } from "react-icons/lu";
import { MdDownloadDone } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
const UserInfo = () => {
  const { updateTeamUserInformation } = useStateContext();

  const [activeSpan, setActiveSpan] = useState("Personal info");
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditable, setIsEditable] = useState(false); // New state to control editability
  const [editableUserData, setEditableUserData] = useState(null); // To keep track of data being edited

  const user = location.state?.user;
  const avatarProps = location.state?.avatarProps;

  // if (!user || !avatarProps) {
  //   navigate("/manage-teams");
  //   return null;
  // }

  const handleSpanClick = (spanText) => {
    setActiveSpan(spanText);
  };
  const handleEditClick = () => {
    // Triggered when the "Edit" button is clicked

    setIsEditable(true);
    // Make sure this includes all properties of the user

    // Optionally set editableUserData here if needed
  };

  // UserInfo.js
  const handleFinishClick = () => {
    if (editableUserData) {
      updateTeamUserInformation(editableUserData);
      setIsEditable(false);
    }
  };

  const navs = ["Personal info"];

  return (
    <div>
      <div className="text-center greenBg">
        <div
          className="d-flex justify-content-start text-white align-items-center fs_15 ps-2 pt-2 cursor_pointer"
          onClick={() => navigate("/manage-teams")}
        >
          {" "}
          <CgArrowLeft className="fs-4 me-2" />{" "}
          <span className="" style={{ fontWeight: 600 }}>
            Go back
          </span>
        </div>
        <div
          className="flex justify-center items-center my-4"
          onClick={() => setIsEditable(!isEditable)}
        >
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2 rounded-full shadow-lg flex items-center cursor-pointer transition-colors duration-300">
            {isEditable ? (
              <div className="flex items-center" onClick={handleFinishClick}>
                <MdDownloadDone className="text-lg mr-2" />
                Finish
              </div>
            ) : (
              <div className="flex items-center" onClick={handleEditClick}>
                <LuPencil className="text-lg mr-2" />
                Edit {user.email}'s profile
              </div>
            )}
            {/* {isEditable ? "Finish" : `Edit ${user.email}'s profile`} */}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Avatar
            sx={{
              bgcolor: avatarProps.backgroundColor,
              color: avatarProps.textColor,
              width: 150,
              height: 150,
            }}
          >
            {avatarProps.initials}
          </Avatar>
        </div>
        <h3 className="text-white mt-3">{user.name}</h3>
        <span className="tag_span px-2 rounded-2 capitalize">{user.role}</span>
        <div className="text-white fs_14 fw-bold d-flex justify-content-center mt-4">
          {navs.map((nav, index) => (
            <span
              key={index}
              className={`me-2 px-2 pb-1 cursor_pointer text-base ${
                activeSpan === nav ? "border-b-2 border-white" : ""
              }`}
              onClick={() => handleSpanClick(nav)}
            >
              {nav}
            </span>
          ))}
        </div>
      </div>
      <div>
        {activeSpan === "Personal info" ? (
          <PersonalInfo
            user={user}
            isEditable={isEditable}
            setEditableUserData={setEditableUserData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default UserInfo;
