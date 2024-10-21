import { FaTimes } from "react-icons/fa";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { IoBriefcaseOutline, IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { PiGlobeHemisphereWestLight } from "react-icons/pi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import PersonalInfo from "./PersonalInfo";
import WorkingStatus from "./WorkingStatus";
import { set } from "date-fns";
import LanguageAndRegion from "./LanguageAndRegion";
import Password from "./Password";
import { RxCross2 } from "react-icons/rx";

const ProfileModal = () => {
  const [selectedOption, setSelectedOption] = React.useState("Personal info");
  const { fullscreen, profileModal, setProfileModal } = useStateContext();
  const sidebarOptions = [
    {
      name: "Personal info",
      icon: <IoPersonOutline className="me-2" style={{ fontSize: "17px" }} />,
    },
    {
      name: "Working status",
      icon: (
        <IoBriefcaseOutline className="me-2" style={{ fontSize: "17px" }} />
      ),
    },
    {
      name: "Notifications",
      icon: <GoBell className="me-2" style={{ fontSize: "17px" }} />,
    },
    {
      name: "Language & region",
      icon: (
        <PiGlobeHemisphereWestLight
          className="me-2"
          style={{ fontSize: "18px" }}
        />
      ),
    },
    {
      name: "Password",
      icon: (
        <HiOutlineLockClosed className="me-2" style={{ fontSize: "17px" }} />
      ),
    },
    {
      name: "Session history",
      icon: <HiOutlineMenuAlt2 className="me-2" style={{ fontSize: "17px" }} />,
    },
  ];
  const closeModal = () => {
    setProfileModal(false);
  };
  return (
    <Modal
      show={profileModal}
      onHide={closeModal}
      centered
      fullscreen={fullscreen}
      dialogClassName="profileModal"
      backdropClassName="profileModalBackdrop"
    >
      <Modal.Header style={{ padding: " 20px 24px" }}>
        <span style={{ fontSize: "32px", fontWeight: "500" }}>Profile</span>
        <button
          type="button"
          class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 "
          aria-label="Close"
          onClick={closeModal}
          style={{
            width: "35px",
            height: "35px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <RxCross2 className="fs-5 text-color" />
        </button>
      </Modal.Header>
      <Modal.Body className="p-0 h-100 mh-100 rounded-0">
        <div className=" d-flex">
          <div className="ProfileSidebar " style={{ width: "280px" }}>
            <div className="" style={{ padding: "24px", width: "280px" }}>
              {sidebarOptions.map((option) => (
                <Button
                  className={`workspace-dropdown-button workspace-dropdownBtn centerIt justify-content-start fw-normal fs_14 w-100   me-2 px-2 ${
                    selectedOption === option.name && "Selected"
                  }`}
                  onClick={() => setSelectedOption(option.name)}
                  style={{ padding: "5px" }}
                >
                  {option.icon}
                  {option.name}
                </Button>
              ))}
            </div>
          </div>
          <div style={{ marginLeft: "280px" }}>
            {selectedOption === "Personal info" ? (
              <PersonalInfo />
            ) : selectedOption === "Working status" ? (
              <WorkingStatus />
            ) : selectedOption === "Language & region" ? (
              <LanguageAndRegion />
            ) : selectedOption === "Password" ? (
              <Password />
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
