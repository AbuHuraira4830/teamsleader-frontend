import { FaTimes } from "react-icons/fa";
import React, { useEffect } from "react";
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
import { TiBusinessCard } from "react-icons/ti";
import BusinessInfo from "./BusinessInfo";
import { LuCalendarDays } from "react-icons/lu";
import WorkAndHoliday from "./WorkAndHoliday";
import HolidayRequests from "./HolidayRequests";
import { VscRequestChanges } from "react-icons/vsc";
import "react-multi-date-picker/styles/colors/green.css";
import { Breadcrumb } from "antd";
import AccountScheduleModal from "./AccountScheduleModal";
import TimeSheetModal from "./TimeSheetModal";
import { postAPI } from "../../../helpers/apis";

const ProfileModal = () => {
  const {
    fullscreen,
    profileModal,
    setProfileModal,
    selectedOption,
    setSelectedOption,
    setHolidayRequestsData,
    thisUser,
    members,
    users,
  } = useStateContext();
  const sidebarOptions = [
    {
      name: "Personal info",
      icon: <IoPersonOutline className="me-2" style={{ fontSize: "17px" }} />,
    },
    {
      name: "Business info",
      icon: <TiBusinessCard className="me-2" style={{ fontSize: "17px" }} />,
    },
    {
      name: "Work & holidays",
      icon: <LuCalendarDays className="me-2" style={{ fontSize: "17px" }} />,
    },
    // ...(thisUser?.role === "Admin" ? [] : []),
    {
      name: "Working status",
      icon: (
        <IoBriefcaseOutline className="me-2" style={{ fontSize: "17px" }} />
      ),
    },
    // {
    //   name: "Notifications",
    //   icon: <GoBell className="me-2" style={{ fontSize: "17px" }} />,
    // },
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
    // {
    //   name: "Session history",
    //   icon: <HiOutlineMenuAlt2 className="me-2" style={{ fontSize: "17px" }} />,
    // },
  ];
  const closeModal = () => {
    setProfileModal(false);
  };

  useEffect(() => {
    if (!users || users.length === 0) return;
    const data = users?.map((user) => user.email);
    postAPI("/api/get-holiday-requests", data)
      .then((res) => {
        setHolidayRequestsData(res.data.holidayRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  return (
    <Modal
      show={profileModal}
      onHide={closeModal}
      centered
      enforceFocus={false}
      autoFocus={false}
      fullscreen={fullscreen}
      dialogClassName="profileModal"
      backdropClassName="profileModalBackdrop"
      id="modal-container"
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
        <div className=" d-flex w-100">
          <div className="ProfileSidebar " style={{ width: "280px" }}>
            <div className="" style={{ padding: "24px", width: "280px" }}>
              {sidebarOptions.map((option, index) => (
                <Button
                  key={index}
                  className={`workspace-dropdown-button workspace-dropdownBtn centerIt justify-content-start fw-normal fs_14 w-100   me-2 px-2 ${
                    (selectedOption === option.name ||
                      (option.name === "Personal info" &&
                        selectedOption === "Schedule holiday")) &&
                    "Selected"
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
          <div style={{ marginLeft: "280px" }} className="w-100 overflow-auto">
            {selectedOption === "Schedule holiday" && (
              <Breadcrumb className="ms-4 mt-2">
                <Breadcrumb.Item
                  style={{ color: "var(--gray-hover-color)" }}
                  className="cursor_pointer graytext"
                  onClick={() => setSelectedOption("Personal info")}
                >
                  Personal info
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="cursor_pointer whiteText"
                  onClick={() => setSelectedOption("Schedule holiday")}
                >
                  Schedule holiday
                </Breadcrumb.Item>
              </Breadcrumb>
            )}
            {selectedOption === "Timesheet" && (
              <Breadcrumb className="ms-4 mt-2">
                <Breadcrumb.Item
                  className="cursor_pointer graytext"
                  onClick={() => setSelectedOption("Work & holidays")}
                >
                  Manage holiday
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="cursor_pointer whiteText "
                  onClick={() => setSelectedOption("Schedule holiday")}
                >
                  Timesheet
                </Breadcrumb.Item>
              </Breadcrumb>
            )}

            {selectedOption === "Personal info" ? (
              <PersonalInfo setSelectedOption={setSelectedOption} />
            ) : selectedOption === "Working status" ? (
              <WorkingStatus />
            ) : selectedOption === "Schedule holiday" ? (
              <AccountScheduleModal />
            ) : selectedOption === "Timesheet" ? (
              <TimeSheetModal />
            ) : selectedOption === "Work & holidays" ? (
              <WorkAndHoliday setSelectedOption={setSelectedOption} />
            ) : selectedOption === "Business info" ? (
              <BusinessInfo />
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
