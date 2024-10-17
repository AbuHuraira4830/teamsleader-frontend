import { FaTimes } from "react-icons/fa";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoCheckmarkDone,
  IoPersonOutline,
} from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { PiAt, PiAtBold, PiGlobeHemisphereWestLight } from "react-icons/pi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import PersonalInfo from "./PersonalInfo";
// import WorkingStatus from "./WorkingStatus";
// import { set } from "date-fns";
// import LanguageAndRegion from "./LanguageAndRegion";
// import Password from "./Password";
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from "../../contexts/ContextProvider";
import ProfileCompletion from "../navbar/profileModal/ProfileCompletion";
import { TbInfoCircle } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import IMAGES from "../../assets/images/Images";

const UpdateFeedModal = ({ closeModal, feedModal }) => {
  const [selectedOption, setSelectedOption] = React.useState("Personal info");
  const { fullscreen } = useStateContext();
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

  return (
    <Modal
      show={feedModal}
      onHide={closeModal}
      centered
      fullscreen={fullscreen}
      dialogClassName="profileModal rounded-top rounded-4"
      backdropClassName="profileModalBackdrop"
    >
      <Modal.Body className="p-0 h-100 mh-100 rounded-0">
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
        <div className=" d-flex h-100">
          <div className="feedSidebar " style={{ width: "400px" }}>
            <div className="" style={{ padding: "24px", width: "400px" }}>
              <ProfileCompletion />
            </div>
            <div style={{ padding: "30px" }}>
              <div className="centerIt">
                <p className="" style={{ fontSize: "32px", fontWeight: "900" }}>
                  Update feed
                </p>
                <TbInfoCircle className="fs-5 ms-3" />
              </div>
              <p className="fs_14 mb-5 mt-2">
                What goes in my feed?
                {"  "}
                <span style={{ color: "#1f76c2" }}> See more</span>
              </p>
              <div className="centerIt justify-content-between mb-3">
                <p style={{ fontSize: "18px", fontWeight: "500" }}>
                  Filter by team
                </p>
                <div
                  style={{ height: "32px" }}
                  className="rounded-1 bgHover px-2 py-1 centerIt fs_14"
                >
                  <LuSettings className="me-2" />
                  Feed setting
                </div>
              </div>

              <div className="rounded-1 bgHover px-2 py-1 centerIt Selected fs_14 mb-2">
                All teams in my feed
              </div>
              <div className="rounded-1 bgHover px-2 py-1 centerIt fs_14">
                Updates without teams
              </div>
            </div>
          </div>
          <div
            className="feedMain "
            style={{ width: "100%", marginLeft: "400px" }}
          >
            <div className=" feedHeader d-flex   " style={{ height: "72px" }}>
              <div className="d-flex" style={{ padding: "32px 0px 0px 40px" }}>
                <div className="rounded-1 bgHover px-3 py-1 centerIt ">
                  All updates
                </div>
                <div className="rounded-1 bgHover px-3 py-1 centerIt ">
                  <PiAt className="me-2" />I was mentioned
                </div>
                <div className="rounded-1 bgHover px-3 py-1 centerIt ">
                  <IoBookmarkOutline className="me-2" />
                  Bookmarked
                </div>
                <div className="rounded-1 bgHover px-3 py-1 centerIt ">
                  <IoBriefcaseOutline className="me-2" />
                  All account updates
                </div>
              </div>
            </div>
            <div
              className="feedContent h-auto pb-4"
              style={{ paddingLeft: "40px" }}
            >
              <div style={{ width: "100%", maxWidth: "750px" }}>
                <div className="centerIt py-3">
                  <div className="fs_14 rounded-1 bgHover px-3 py-1 centerIt ">
                    <span style={{ fontWeight: "500" }}>Show &nbsp; </span>{" "}
                    {"  "} Unread updates&nbsp;&nbsp;
                    <IoIosArrowDown />
                  </div>
                  <div className="fs_14 rounded-1 bgHover px-3 py-1 centerIt ms-auto">
                    <IoCheckmarkDone />
                    &nbsp; Mark all as read{" "}
                  </div>
                </div>
                <div className="msgPart px-3 pt-3 ">
                  <div className="centerIt mb-3">
                    <img
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                      src={IMAGES.MAN}
                      alt=""
                    />
                    <span className="fs_15 ">
                      <p style={{ fontWeight: "500" }}>Mike Geerinck</p>
                    </span>
                  </div>
                  <p>
                    Hi{" "}
                    <span
                      style={{ color: "#1f76c2", backgroundColor: "#cce5ff" }}
                    >
                      @Usman
                    </span>
                    ,
                  </p>
                  <p>I'm happy to see that you're here.</p>

                  <p className="mb-4">
                    Your business journey starts here with{" "}
                    <strong>Teamsleader</strong>, Where you can.
                  </p>
                  <div className="d-flex">
                    1.
                    <p>
                      Maximize the productivity of your team's daily tasks with
                      our cool to-do lists.
                    </p>
                  </div>
                  <div className="d-flex">
                    2.
                    <p>
                      Simplify complicated tasks by outlining a system process
                      within our message board.
                    </p>
                  </div>
                  <div className="d-flex mb-4">
                    3.
                    <p>
                      Onboard clients within a team, increase response time with
                      your clients, and give them an outstanding experience.
                    </p>
                  </div>
                  <p className="mb-4">
                    Teamsleader has been created with the intended result of
                    giving as many tools as needed for a business to operate,
                    whether they work with clients, remote teams, or a lot of
                    projects.
                  </p>
                  <p className="mb-4">
                    Therefore I believe that all tools should be within
                    Teamsleader, instead of many external tools.
                  </p>
                  <p className="mb-4">
                    I recommend you invite your team, as soon as possible to
                    Teamsleader and start discovering the power of Teamsleader.
                  </p>
                  <p className="mb-4">
                    If you have any additional questions, we have an amazing
                    support team that is available to you, within the Central
                    European Time zone 9 Am-5 Pm if you click on the question
                    mark on top of your desktop.
                  </p>
                  <p className="mb-4">Enjoy Teamsleader.</p>
                  <p>Mike Geerinck</p>
                  <p className="mb-5">CEO of Teamsleader.com</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{ marginLeft: "280px" }}>
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
          </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateFeedModal;
