import React, { useEffect, useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RxAvatar, RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Popover } from "antd";
import { Button, Form } from "react-bootstrap";
import { postAPI } from "../../../helpers/apis";
import { AiOutlinePlus } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineEnvelope } from "react-icons/hi2";

// import io from "socket.io-client";
// const socket = io("http://localhost:8888");
const MemberInvitationPopup = ({
  totalMembers,
  task,
  handleDectiveMember,
  handleActiveMember,
  inviteMember,
  addButton,
}) => {
  const {
    thisUser,
    selectedTeam,
    selectedWorkspace,
    colors,
    setTeamTasks,
    memberInvitationPopup,
    setMemberInvitationPopup,
  } = useStateContext();

  const [invitingMember, setInvitingMember] = useState(false);
  const [userDetailPopup, setUserDetailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedUser, setselectedUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeMembers, setActiveMembers] = useState([]);

  // useEffect(() => {
  //   // Emit online status when component mounts
  //   socket.emit("userOnline", thisUser.emailAddress);

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.emit("userOffline", thisUser.emailAddress);
  //   };
  // }, [thisUser.emailAddress]);

  // useEffect(() => {
  //   // Listen for user status updates
  //   socket.on("userStatusUpdate", (statusUpdate) => {
  //     setActiveMembers((prevMembers) => {
  //       const index = prevMembers.findIndex(
  //         (member) => member.email === statusUpdate.email
  //       );
  //       if (index > -1) {
  //         const updatedMembers = [...prevMembers];
  //         updatedMembers[index] = {
  //           ...updatedMembers[index],
  //           isOnline: statusUpdate.isOnline,
  //         };
  //         return updatedMembers;
  //       }
  //       return prevMembers;
  //     });
  //   });

  //   return () => {
  //     socket.off("userStatusUpdate");
  //   };
  // }, []);

  // const filteredMembers = task.members.filter(
  //   (item) => item.email !== task.owner
  // );
  const activeMmber = task.members.filter((member) => member.active);
  const inActive = task.members.filter((member) => !member.active);
  const currentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format (12 for midnight)
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading 0
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  const currentHour = new Date().getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18;
  const handleChange = (email, task) => {
    inviteMember(email, task);
    setInvitingMember(false);
    setEmail("");
  };
  return (
    <Popover
      content={
        invitingMember ? (
          <div className="py-3 px-4" style={{ with: "360px" }}>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="px-4 py-1 shadow-none workspace_searchInput Border mt-3 "
              style={{
                height: "32px",
                backgroundColor: "var(--sidebar-background-color) !important",
              }}
            />
            <div className="mt-3 centerIt justify-content-end">
              {" "}
              <Button
                className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
                style={{
                  height: "32px",
                }}
                onClick={() => setInvitingMember(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-0 px-2  workspace_addBtn border-0 rounded-1 ms-2"
                style={{ backgroundColor: "#025231", height: "32px" }}
                onClick={() => handleChange(email, task)}
              >
                Invite new member
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-3 px-4" style={{ width: "360px" }}>
            {/* {task.members.map((email, index) => ( */}

            <div className="centerIt flex-wrap">
              {
                //   task.members
                // .filter((item) => item.active)
                activeMmber.map((user, index) => (
                  <div
                    key={index}
                    className="  rounded-pill text-dark mb-3 me-2 "
                    style={{
                      backgroundColor: "#e5f4ff",
                      width: "fit-content",
                      padding: "1px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {user.picture ? (
                      <div style={{ width: "22px", height: "22px" }}>
                        <img
                          src={user.picture}
                          alt=""
                          className="rounded-circle h-100 w-100"
                        />
                      </div>
                    ) : (
                      <div
                        className="rounded-circle centerIt justify-content-center"
                        style={{
                          width: "22px",
                          height: "22px",
                          backgroundColor: user.profileColor,
                          fontSize: "12px",
                          color: "white",
                        }}
                      >
                        {user.name[0].toUpperCase()}
                      </div>
                    )}
                    <p className="px-2" style={{ fontSize: "12px" }}>
                      {user.name}
                    </p>
                    <div
                      className="rounded-circle centerIt justify-content-center hover:bg-white cursor_pointer "
                      style={{
                        width: "16px",
                        height: "16px",

                        // backgroundColor: "var(--sidebar-background-color)",
                      }}
                      onClick={() => handleDectiveMember(user.email, task)}
                    >
                      <RxCross2 className="" style={{ fontSize: "12px" }} />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="centerIt mb-3">
              <RxMagnifyingGlass className="position-absolute ms-1 search_icon" />
              <Form.Control
                type="text"
                placeholder="Search"
                className="px-4 py-1 shadow-none workspace_searchInput Border  bg-transparent   "
                style={{
                  height: "32px",
                  //   backgroundColor: "var(--sidebar-background-color) !important",
                }}
              />
            </div>
            <div>
              <p>Suggested people</p>
            </div>
            <div style={{ maxHeight: "170px", overflowY: "auto" }}>
              {inActive
                .slice(0, isCollapsed ? 3 : inActive.length)
                .map((user, index) => (
                  <div
                    key={index}
                    className="bgHover centerIt  rounded-2 mt-2 p cursor_pointer  ps-3"
                    style={{ height: "40px" }}
                    onClick={() => handleActiveMember(user.email, task)}
                  >
                    {user.picture ? (
                      <div style={{ width: "27px", height: "27px" }}>
                        <img
                          src={user.picture}
                          alt=""
                          className="rounded-circle h-100 w-100"
                        />
                      </div>
                    ) : (
                      <div
                        className="rounded-circle centerIt justify-content-center "
                        style={{
                          width: "27px",
                          height: "27px",
                          backgroundColor: user.profileColor,
                          color: "white",
                        }}
                      >
                        {user.name && user.name[0].toUpperCase()}
                      </div>
                    )}
                    <p className="fs_14 ms-2">{user.name}</p>
                  </div>
                ))}
            </div>
            {inActive.length > 3 && (
              <p
                className="text-end cursor_pointer fs_14"
                style={{ color: "#0086c0" }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? "Show All" : "Show Less"}
              </p>
            )}
            <div
              className="bgHover centerIt  rounded-2 mt-2 ps-3 cursor_pointer"
              style={{ height: "40px" }}
              onClick={() => {
                setInvitingMember(true);
              }}
            >
              <MdOutlinePersonAddAlt className="me-2 fs-5 " />
              Invite a new member by email
            </div>
          </div>
        )
      }
      trigger="click"
      open={memberInvitationPopup === task._id}
      onOpenChange={(newOpen) => {
        setUserDetailPopup(null);
        setMemberInvitationPopup(newOpen ? task._id : null);
      }}
    >
      {/* <RxAvatar /> */}
      <div className="centerIt justify-content-between">
        <span
          style={{ width: "14px", height: "14px" }}
          className="m-2 centerIt"
        >
          {addButton === task._id && (
            <button
              className="px-0 py-0  file_deleteBtn file_addBtn "
              // onClick={handleFileAddClick}
              style={{}}
            >
              <AiOutlinePlus
                className="mb-1"
                style={{
                  width: "14px",
                  height: "auto",
                }}
              />
            </button>
          )}
        </span>
        <Popover
          content={
            <div className="py-3 " style={{ width: "330px" }}>
              <div className="d-flex px-4">
                <div
                  className=" centerIt justify-content-center"
                  style={{ width: "75px", height: "75px" }}
                >
                  {selectedUser?.picture ? (
                    <img src={selectedUser?.picture} alt="" className="" />
                  ) : (
                    <div
                      className="centerIt justify-content-center rounded-circle"
                      style={{
                        width: "75px",
                        height: "75px",
                        fontSize: "25px",
                        fontWeight: "500",
                        color: "white",
                        backgroundColor: selectedUser?.profileColor,
                      }}
                    >
                      {selectedUser?.email[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ps-2 ">
                  <p className="centerIt mb-3" style={{ fontSize: "18px" }}>
                    {selectedUser?.name}{" "}
                    {selectedUser?.isOnline && (
                      <div
                        style={{
                          marginLeft: "6px",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#00c875",
                        }}
                      ></div>
                    )}
                  </p>
                  <p className="centerIt fs_14 mb-2">
                    {isDaytime ? (
                      <CiSun
                        className="me-1 fs-5"
                        style={{ color: "#fdab3d" }}
                      />
                    ) : (
                      <IoMoonOutline className="me-1" />
                    )}
                    {currentTime()}, {selectedUser?.timezone}
                  </p>
                  <div
                    className=" text-center fs_14 Selected rounded-1"
                    style={{ height: "24px", width: "64px" }}
                  >
                    {" "}
                    Admin
                  </div>
                </div>
              </div>
              <div className="centerIt fs_14 px-3 justify-content-between mt-4">
                <div className="centerIt">
                  <HiOutlineEnvelope className="fs-5 me-2" />
                  <p>{selectedUser?.email}</p>
                </div>
                <div
                  style={{ backgroundColor: "" }}
                  className="rounded-1 workspace_addBtn ms-2 px-1 cursor_pointer"
                >
                  copy
                </div>
              </div>
            </div>
          }
          // style={{ display: "none" : "block" }}
          trigger="hover"
          open={
            activeMmber.length &&
            !memberInvitationPopup &&
            userDetailPopup === task._id
          }
          onOpenChange={(newOpen) =>
            setUserDetailPopup(newOpen ? task._id : null)
          }
        >
          <div className="centerIt Persons">
            {activeMmber.length === 0 ? (
              <RxAvatar />
            ) : (
              <>
                {activeMmber
                  .slice(0, totalMembers ? activeMmber.length : 2)
                  .map((user, index) => (
                    <div onMouseEnter={() => setselectedUser(user)}>
                      {user.picture ? (
                        <div style={{ width: "30px", height: "30px" }}>
                          <img
                            src={user.picture}
                            alt=""
                            className="rounded-circle h-100 w-100"
                          />
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="centerIt justify-content-center rounded-circle"
                          style={{
                            width: "30px",
                            height: "30px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: user.profileColor,
                          }}
                        >
                          {user.email[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}
                {!totalMembers && activeMmber.length > 2 && (
                  <div
                    className="centerIt justify-content-center rounded-circle"
                    style={{
                      width: "30px",
                      height: "30px",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "white",
                      backgroundColor: "#FF642A",
                    }}
                  >
                    +{activeMmber.length - 2}
                  </div>
                )}
              </>
            )}
          </div>
        </Popover>
      </div>
    </Popover>
  );
};

export default MemberInvitationPopup;
