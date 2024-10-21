import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import { useStateContext } from "../../../contexts/ContextProvider";

const ProfileCompletion = ({ setShow }) => {
  const { profileModal, setProfileModal, thisUser } = useStateContext();

  // Function to get the green check icon
  const greenCheck = () => {
    return (
      <div
        className="rounded-circle centerIt justify-content-center me-2"
        style={{
          width: "13px",
          height: "13px",
          backgroundColor: "#00c875",
        }}
      >
        <FaCheck style={{ fontSize: "8px", color: "white" }} />
      </div>
    );
  };

  // Function to get the unchecked icon
  const unChecked = () => {
    return (
      <div className="checkIcon rounded-circle centerIt justify-content-center me-2"></div>
    );
  };

  // Calculate the number of completed tasks
  const completedTasks = [
    thisUser?.emailAddress,
    thisUser?.picture,
    false, // Assuming the invite team member task is not completed
    thisUser?.jobTitle &&
      thisUser?.phone &&
      thisUser?.mPhone &&
      thisUser?.location &&
      thisUser?.birthday &&
      thisUser?.workAnniversary,
  ].filter(Boolean).length;

  // Determine progress bar fill color and width
  const progressBarStyles = [
    { width: "25%", background: "#f65f7c" },
    { width: "50%", background: "#f65f7c" },
    { width: "75%", background: "#f7b500" },
    { width: "100%", background: "#00c875" },
  ];

  const progressBarStyle = completedTasks
    ? progressBarStyles[completedTasks - 1]
    : { width: "0%", background: "transparent" };

  return (
    <div className="profileCompletion ms-4" style={{ marginTop: "16px" }}>
      <div
        className="position-relative mb-3"
        style={{ width: "300px", paddingTop: "15px", paddingLeft: "30px" }}
      >
        <p className="" style={{ fontSize: "18px", fontWeight: "500" }}>
          Complete Your Profile
        </p>
        <div
          className="rounded-2 bgHover centerIt justify-content-center"
          style={{
            width: "24px",
            height: "24px",
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShow(false)}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="" style={{ paddingLeft: "30px" }}>
        <div className="centerIt mb-2">
          {thisUser?.emailAddress ? greenCheck() : unChecked()}
          <p
            className="cProfile"
            style={{ color: thisUser?.emailAddress && "#00c875" }}
          >
            Setup account
          </p>
        </div>
        <div className="centerIt mb-2">
          {thisUser?.picture ? greenCheck() : unChecked()}
          <p
            className="cProfile"
            style={{ color: thisUser?.picture && "#00c875" }}
            onClick={() => setProfileModal(true)}
          >
            Upload Your Photo
          </p>
        </div>
        <div className="centerIt mb-2">
          <div className="checkIcon rounded-circle centerIt justify-content-center me-2"></div>
          {/* {greenCheck()} */}
          <p className="cProfile" sty>Invite Team Member (0/1)</p>
        </div>
        <div className="centerIt mb-2">
          {thisUser?.jobTitle &&
          thisUser?.phone &&
          thisUser?.mPhone &&
          thisUser?.location &&
          thisUser?.birthday &&
          thisUser?.workAnniversary
            ? greenCheck()
            : unChecked()}
          <p
            className="cProfile"
            style={{
              color:
                thisUser?.jobTitle &&
                thisUser?.phone &&
                thisUser?.mPhone &&
                thisUser?.location &&
                thisUser?.birthday &&
                thisUser?.workAnniversary &&
                "#00c875",
            }}
            onClick={() => setProfileModal(true)}
          >
            Complete Profile
          </p>
        </div>
      </div>
      <div
        className="borderTop centerIt justify-content-center"
        style={{ height: "50px", marginTop: "30px" }}
      >
        <div
          className="rounded-pill border-3 progressBar"
          style={{
            width: "250px",
            height: "21px",
            background: `linear-gradient(to right, ${progressBarStyle.background} ${progressBarStyle.width}, transparent ${progressBarStyle.width})`,
          }}
        ></div>
      </div>
      <ProfileModal />
    </div>
  );
};

export default ProfileCompletion;
