import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsLayoutSidebar } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

import "../../../assets/css/welcome.css";
import IMAGES from "../../../assets/images/Images";
import { Button } from "react-bootstrap";
import ProfileCompletion from "../../navbar/profileModal/ProfileCompletion";
import { useStateContext } from "../../../contexts/ContextProvider";
import { getAPI } from "../../../helpers/apis";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../../navbar/profileModal/ProfileModal";
const WelcomePage = () => {
  const {
    workspaces,
    setWorkspaces,
    setSelectedWorkspace,
    setNewTeam,
    setSelectedTeam,
    setTeamTasks,
  } = useStateContext();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(true);
  const [recentVisit, setRecentVisit] = useState(true);
  const [updateFeed, setUpdateFeed] = useState(true);
  const [Workspace, setWorkspace] = useState(true);

  const selectWorkspace = (id) => {
    getAPI(`/api/workspace/${id}`)
      .then((response) => {
        setSelectedWorkspace(response.data._doc);
        const teams = response.data._doc.teams;
        setNewTeam(teams);
        setSelectedTeam(teams[0]);
        setTeamTasks(teams[0]);
        if (teams[0]) navigate(`/workspace/${id}/team/${teams[0]._id}`);
        else navigate(`/workspace/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setSelectedWorkspace(null);
        setNewTeam(null);
        setTeamTasks(null);
      });
  };
  return (
    <div className="" style={{ marginBottom: "100px" }}>
      <div
        className="welcomHeader centerIt"
        style={{
          height: "75px",
          paddingLeft: "20px",
          boxShadow: `0px 3px 12px var(--welcome-page)`,
        }}
      >
        <div className="">
          <p className="fs_14">Good morning, Usman!</p>
          <p className="" style={{ fontWeight: "500" }}>
            Quickly access your recent teams, Inbox and workspaces
          </p>
        </div>
      </div>
      <div className="d-flex" style={{ padding: "0px 20px" }}>
        <div
          style={{
            boxShadow: " 0px 3px 12px var(--welcome-page)",
            marginTop: "16px",
            padding: "24px 24px 60px 24px ",
            borderRadius: "8px",
            width: "100%",
            backgroundColor: "var(--dropdown-bgColor)",
          }}
          className=""
        >
          <div className="centerIt">
            <BiChevronDown
              className="fs-3 cursor_pointer"
              onClick={() => setRecentVisit(!recentVisit)}
              style={{ transform: `rotate(${recentVisit ? 0 : 270}deg)` }}
            />{" "}
            <p style={{ fontSize: "18px", fontWeight: "700" }}>
              Recently visited
            </p>
          </div>

          <div className="centerIt mb-5">
            {recentVisit && (
              <>
                <div className="" style={{ padding: "16px 16px 24px 16px" }}>
                  <div
                    className="recentCard rounded-1"
                    style={{ height: "225px" }}
                  >
                    <img
                      src={IMAGES.TABLE_DUMMY}
                      style={{
                        height: "140px",
                        width: "100%",
                        marginBottom: "8px",
                      }}
                      alt=""
                    />
                    <div>
                      <div className="centerIt justify-content-between">
                        <span className="centerIt">
                          <BsLayoutSidebar className="me-2" />
                          <p style={{ fontWeight: "700" }}>File gallery</p>
                        </span>
                        <span
                          className="rounded-2 bgHover  centerIt justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <FaRegStar className="fs-5" />
                        </span>
                      </div>
                      <div className="centerIt">
                        <img
                          style={{ height: "17px" }}
                          src={IMAGES.LEAF}
                          alt=""
                          className="align-self-center  me-1 p-0"
                        />
                        <p className="fs_14">Teamleader {">"} My Workspace</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="" style={{ padding: "16px 16px 24px 16px" }}>
                  <div
                    className="recentCard rounded-1"
                    style={{ height: "225px" }}
                  >
                    <img
                      src={IMAGES.TABLE_DUMMY}
                      style={{
                        height: "140px",
                        width: "100%",
                        marginBottom: "8px",
                      }}
                      alt=""
                    />
                    <div>
                      <div className="centerIt justify-content-between">
                        <span className="centerIt">
                          <BsLayoutSidebar className="me-2" />
                          <p style={{ fontWeight: "700" }}>To-do list</p>
                        </span>
                        <span
                          className="rounded-2 bgHover  centerIt justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <FaRegStar className="fs-5" />
                        </span>
                      </div>
                      <div className="centerIt">
                        <img
                          style={{ height: "17px" }}
                          src={IMAGES.LEAF}
                          alt=""
                          className="align-self-center  me-1 p-0"
                        />
                        <p className="fs_14">Teamleader {">"} My Workspace</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="" style={{ padding: "16px 16px 24px 16px" }}>
                  <div
                    className="recentCard rounded-1"
                    style={{ height: "225px" }}
                  >
                    <img
                      src={IMAGES.TABLE_DUMMY}
                      style={{
                        height: "140px",
                        width: "100%",
                        marginBottom: "8px",
                      }}
                      alt=""
                    />
                    <div>
                      <div className="centerIt justify-content-between">
                        <span className="centerIt">
                          <BsLayoutSidebar className="me-2" />
                          <p style={{ fontWeight: "700" }}>Calender</p>
                        </span>
                        <span
                          className="rounded-2 bgHover  centerIt justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <FaRegStar className="fs-5" />
                        </span>
                      </div>
                      <div className="centerIt">
                        <img
                          style={{ height: "17px" }}
                          src={IMAGES.LEAF}
                          alt=""
                          className="align-self-center  me-1 p-0"
                        />
                        <p className="fs_14">Teamleader {">"} My Workspace</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="centerIt ">
            <BiChevronDown
              className="fs-3 cursor_pointer"
              style={{ transform: `rotate(${updateFeed ? 0 : 270}deg)` }}
              onClick={() => setUpdateFeed(!updateFeed)}
            />{" "}
            <p style={{ fontSize: "18px", fontWeight: "700" }}>
              Update feed (Inbox)
            </p>
          </div>
          <div className=" mb-5">
            {updateFeed && (
              <div
                className="updateFeed mt-3 ms-3"
                style={{
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <div
                  className="centerIt justify-content-between  updateFeedChild  rounded-2"
                  style={{ padding: "0px 30px", height: "72px" }}
                >
                  <div className="centerIt">
                    <img
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                      src={IMAGES.MAN}
                      alt=""
                    />
                    <span className="fs_15 ">
                      <p style={{ fontWeight: "500" }}>Mike Geerinck</p>
                      <p>
                        Hi <span style={{ color: "#1f76c2" }}>@Usman</span>
                      </p>
                    </span>
                  </div>
                  <span className="centerIt">
                    <LuClock3 /> 5h
                  </span>
                </div>
                <div className="homeSaperator"></div>
                <div
                  className="centerIt justify-content-between  rounded-2 inviteTeamMate mt-3"
                  style={{ padding: "0px 30px", height: "72px" }}
                >
                  <div className="centerIt ">
                    <div
                      className="rounded-circle centerIt justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px",
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      <IoPerson className="fs-3" />
                    </div>
                    <div
                      className="rounded-circle centerIt justify-content-center me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        color: "white",
                        backgroundColor: "#0073ea",
                      }}
                    >
                      <HiOutlinePlus className="fs-3" />
                    </div>
                    <p style={{ fontWeight: "500" }}>
                      Invite your teammates and start collaborating
                    </p>
                  </div>
                  <div>
                    <Button
                      className="workspace-dropdown-button position-relative fw-normal align-self-center rounded-1 text-start py-1 me-4 px-2 fs_14"
                      style={{
                        height: "32px",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="fs_14 px-2 rounded-1 workspace_addBtn border-0"
                      style={{ backgroundColor: "#025231", height: "32px" }}
                    >
                      Invite
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="centerIt ">
            <BiChevronDown
              className="fs-3 cursor_pointer"
              style={{ transform: `rotate(${Workspace ? 0 : 270}deg)` }}
              onClick={() => setWorkspace(!Workspace)}
            />{" "}
            <p style={{ fontSize: "18px", fontWeight: "700" }}>My workspaces</p>
          </div>
          {Workspace && (
            <div className="ms-2" style={{ padding: "16px 0px 16px 0px" }}>
              {workspaces.map((item) => (
                <div
                  key={item._id}
                  className="homeWorkspace items-center inline-flex rounded-2 mb-3 me-3 cursor_pointer"
                  style={{
                    width: "400px",
                    height: "88px",
                  }}
                  onClick={() => {
                    selectWorkspace(item._id);
                  }}
                >
                  <div
                    className="centerIt justify-content-center rounded-3 me-2 "
                    style={{
                      width: "48px",
                      height: "48px",
                      color: "white",
                      backgroundColor: item.color,
                      fontSize: "24px",
                      marginLeft: "20px",
                    }}
                  >
                    {item.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: "18px" }}>{item.name}</p>
                    <p style={{ fontSize: "15px" }} className="centerIt">
                      <img
                        style={{ height: "17px" }}
                        src={IMAGES.LEAF}
                        alt=""
                        className="align-self-center  me-1 p-0"
                      />
                      Teamleader
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {show && <ProfileCompletion setShow={setShow} />}
      </div>
    </div>
  );
};

export default WelcomePage;
