import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { BsFillChatDotsFill, BsThreeDots } from "react-icons/bs";
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { AiOutlineBug, AiOutlineLeft } from "react-icons/ai";
import { BiChevronDown, BiSolidFileExport, BiLockAlt } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { PiClockCounterClockwiseFill, PiFunnel } from "react-icons/pi";
import { FiPlus, FiSidebar, FiTrash } from "react-icons/fi";
import { TbEdit, TbFileInvoice } from "react-icons/tb";
import { LuFileInput } from "react-icons/lu";
import { useStateContext } from "../../contexts/ContextProvider";
import { getAPI, postAPI } from "../../helpers/apis";
import { Popover } from "antd";
import Workspace from "../Pages/NewTeam/Components/WorkspaceComponent";
import { CircularProgress } from "@mui/material";
import AddTeamModal from "./AddTeamModal"; // Import the AddTeamModal component

const Sidebar = ({ toggleNavbar, workspaceID, teamID }) => {
  const {
    isSidebarVisible,
    setTeamTasks,
    teamTasks,
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setSelectedTeam,
  } = useStateContext();
  const navigate = useNavigate();

  const [isButtonVisible, setButtonVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [actionMenu, setActionMenu] = useState(false);
  const [workSpaceActionMenu, setWorkspaceActionMenu] = useState(false);
  const HandleMouseEnter = () => {
    setButtonVisible(true);
  };
  const HandleMouseLeave = () => {
    setButtonVisible(false);
  };
  const HandleInputFocus = () => {
    setButtonVisible(true);
  };
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [activeButton, toggleButton] = useToggleButton();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTeam, setNewTeam] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamEditing, setTeamEditing] = useState(false);
  const [teamEditingInput, setTeamEditingInput] = useState("");
  const [workspaceRenameInput, setWorkspaceRenameInput] = useState("");
  const [workspaceEditing, setWorkspaceEditing] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  const deleteWorkspace = () => {
    postAPI("/api/workspace/delete", {
      workspaceID: selectedWorkspace._id,
    }).then((response) => {
      if (response.status === 200) {
        setWorkspaces(response.data.workspaces);
        if (response.data?.workspaces?.length)
          setSelectedWorkspace(response.data.workspaces[0]);
        setNewTeam(response.data.workspaces[0].teams);
        const teams = response.data.workspaces[0].teams;
        setSelectedTeam(teams[0]);
        setTeamTasks(teams[0]);
        setWorkspaceActionMenu(false);
      } else {
        console.log(response.data.message);
      }
    });
  };
  const revokeworkspaceEditing = (e) => {
    setWorkspaceEditing(false);
    postAPI("/api/workspace/update", {
      name: e.target.value,
      workspaceID: selectedWorkspace._id,
    }).then((response) => {
      if (response.status === 200) {
        setWorkspaces(response.data.workspaces);
        const workspace = response.data.workspaces.find(
          (workspace) => workspace._id === selectedWorkspace._id
        );
        setSelectedWorkspace(workspace);
        setWorkspaceRenameInput("");
      } else {
        console.log(response.data.message);
      }
    });
  };
  const renameWorkspace = () => {
    setWorkspaceActionMenu(false);
    setWorkspaceEditing(true);
  };

  const focusTeamInput = (data, id) => {
    setTeamEditingInput(data);
    setTeamEditing(id);
    setActionMenu(false);
  };

  const revokeTeamEditing = (e) => {
    setTeamEditing(null);
    postAPI("/api/teams/update", {
      name: e.target.value,
      teamID: selectedTeam._id,
      workspaceID: selectedWorkspace._id,
    }).then((response) => {
      if (response.status === 200) {
        setNewTeam(response.data?.workspace?.teams);
        setTeamEditingInput("");
      } else {
        console.log(response.data.message);
      }
    });
    // setTeamEditingInput("");
  };

  const getTeam = (teamID) => {
    //  const workspace = workspaces.find((ws) => ws._id === workspaceID);
    if (selectedWorkspace) {
      const team = selectedWorkspace.teams.find((t) => t._id === teamID);
      if (team) {
        setSelectedTeam(team);
        setTeamTasks(team);
        navigate(`/workspace/${selectedWorkspace?._id}/team/${teamID}`);
      } else {
        console.error("Team not found");
      }
    } else {
      console.error("Workspace not found");
    }
  };

  useEffect(() => {
    getAPI("/api/workspace/list")
      .then((response) => {
        setWorkspaces(response.data.workspaces);
        console.log("WorkspacesResponse",{ response });
        const selectedWorkspace = response.data.workspaces.filter(
          (workspace) => {
            return workspace._id === workspaceID;
          }
        );
        const selectedTeam = selectedWorkspace[0]?.teams.filter((team) => {
          return team._id === teamID;
        });

        console.log({ selectedTeam, selectedWorkspace });
        setSelectedWorkspace(selectedWorkspace[0]);
        setNewTeam(selectedWorkspace[0]?.teams);
        setSelectedTeam(selectedWorkspace[0]?.teams[0]);
        setTeamTasks(selectedTeam[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const deleteTeam = (id) => {
    let data = {
      teamID: id,
      workspaceID: selectedWorkspace._id,
    };
    postAPI("/api/teams/delete", data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setNewTeam(response.data?.workspace?.teams);
          setTeamTasks(response.data?.workspace?.teams[0]);
          setSelectedTeam(response.data?.workspace?.teams[0]);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAPI("/api/get-current-plan")
      .then((response) => {
        const { userPlan } = response.data;
        setUserPlan(userPlan); // Store the user plan
      })
      .catch((error) => {
        console.error("Error fetching user plan:", error);
      });
  }, []);
  return (
    <div className="sidebar_widthDiv ">
      <div className=" w-100 m-0 ">
        <span className="top-0 end-0 sidebar_toggleBtn position-absolute">
          <Button className=" " onClick={() => toggleNavbar()}>
            <AiOutlineLeft className="" />
          </Button>
        </span>
        <div className={` ${isSidebarVisible ? "" : "d-none"}`}>
          <Stack
            gap={1}
            className="ps-3 pe-5 pt-3 pb-3 sidebar_topBtn border-bottom "
          >
            <Link to="/ " className="text-decoration-none">
              <Button
                className={`w-100 text-start ${
                  activeButton === 1 ? "selected_bg" : "transparent_bg"
                }`}
                onClick={() => toggleButton(1)}
              >
                <SlHome className="me-2 " /> Home
              </Button>
            </Link>

            <Button
              className={`w-100 text-start ${
                activeButton === 2 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(2)}
            >
              <FaRegCalendarCheck className="me-2 " />
              My work
            </Button>
            {selectedWorkspace?.isOwner ? (
              <>
                {userPlan?.package !== "trial" && (
                  <Button
                    className={`w-100 text-start ${
                      activeButton === 3 ? "selected_bg" : "transparent_bg"
                    }`}
                    onClick={() => toggleButton(3)}
                  >
                    <span className="flex">
                      <LuFileInput className="me-2 " />
                      Proposals
                    </span>
                  </Button>
                )}

                <Link to="/invoices" className="text-decoration-none">
                  <Button
                    className={`w-100 text-start ${
                      activeButton === 4 ? "selected_bg" : "transparent_bg"
                    }`}
                    onClick={() => toggleButton(4)}
                  >
                    <span className="flex items-center">
                      <TbFileInvoice className="me-2 " />
                      Invoices
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {selectedTeam?.accessRights?.includes("proposals") && (
                  <Button
                    className={`w-100 text-start ${
                      activeButton === 3 ? "selected_bg" : "transparent_bg"
                    }`}
                    onClick={() => toggleButton(3)}
                  >
                    <span className="flex">
                      <LuFileInput className="me-2 " />
                      Proposals
                    </span>
                  </Button>
                )}

                {selectedTeam?.accessRights?.includes("invoices") && (
                  <Link to="/invoices" className="text-decoration-none">
                    <Button
                      className={`w-100 text-start ${
                        activeButton === 4 ? "selected_bg" : "transparent_bg"
                      }`}
                      onClick={() => toggleButton(4)}
                    >
                      <span className="flex items-center">
                        <TbFileInvoice className="me-2 " />
                        Invoices
                      </span>
                    </Button>
                  </Link>
                )}
              </>
            )}
          </Stack>

          <div className="flex m-3  ">
            <Popover
              content={
                <Workspace
                  setNewTeam={setNewTeam}
                  selectedWorkspace={selectedWorkspace}
                  setSelectedTeam={setSelectedTeam}
                  workspaces={workspaces}
                  setWorkspaces={setWorkspaces}
                  setSelectedWorkspace={setSelectedWorkspace}
                  hide={hide}
                />
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}

              // content={<Workspace hide={hide} />}
              // trigger="click"
              // open={open}
              // onOpenChange={handleOpenChange}
              // placement="bottom"
            >
              <Button
                className="workspace-dropdown-button workspace-dropdownBtn  w-100  py-1 me-2 px-2 centerIt justify-content-between"
                // onClick={handleShow}
              >
                <span className="centerIt">
                  <span
                    className="workspace_icon  me-2"
                    style={{
                      backgroundColor: selectedWorkspace?.color,
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    {selectedWorkspace?.name[0]}
                  </span>
                  {workspaceEditing ? (
                    <Form.Control
                      type="text"
                      id="teamInput"
                      autoFocus
                      value={workspaceRenameInput}
                      onChange={(e) => setWorkspaceRenameInput(e.target.value)}
                      onBlur={(e) => revokeworkspaceEditing(e)}
                      className=" py-0 shadow-none workspace_searchInput  rounded-0  w-100 text-start "
                    />
                  ) : (
                    <> {selectedWorkspace?.name}</>
                  )}
                </span>
                {!workspaceEditing && (
                  <BiChevronDown className="float-end fs-5 " />
                )}
              </Button>
            </Popover>

            <Popover
              content={
                <div className="px-1 py-2">
                  <p
                    className="centerIt cursor_pointer bgHover mb-2 px-2 rounded-1"
                    onClick={() => {
                      renameWorkspace(),
                        setWorkspaceRenameInput(selectedWorkspace?.name);
                    }}
                  >
                    <TbEdit className="fs-6 me-2" /> Rename
                  </p>
                  <p
                    className="centerIt cursor_pointer bgHover m-0 px-2 rounded-1"
                    onClick={deleteWorkspace}
                  >
                    <FiTrash className="fs-6 me-2" /> Delete
                  </p>
                </div>
              }
              open={workSpaceActionMenu}
              onOpenChange={(newOpen) => setWorkspaceActionMenu(newOpen)}
              trigger="click"
              placement="bottom"
            >
              <Button className="p-2 workspace_menuBtn bgHover align-middle">
                <BsThreeDots />
              </Button>
            </Popover>
          </div>

          <div className="flex m-3 ">
            <div className="flex position-relative align-items-center me-2 search_inputDiv">
              <RxMagnifyingGlass className="position-absolute ms-1 search_icon" />
              <Form.Control
                type="text"
                placeholder="Search"
                className="px-4 py-1 shadow-none workspace_searchInput transparent_bg"
                onFocus={HandleInputFocus}
                onMouseEnter={HandleMouseEnter}
                onMouseLeave={HandleMouseLeave}
              />
              {isButtonVisible && (
                <Button
                  className="px-1 py-0 workspace_menuBtn bgHover position-absolute end-0 text-center mx-1"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onMouseEnter={HandleMouseEnter}
                  onMouseLeave={HandleMouseLeave}
                >
                  <PiFunnel className="fs-6  mt-1" />
                </Button>
              )}
            </div>
            <Dropdown className="add_team_dropdown">
              <OverlayTrigger
                overlay={<Tooltip>Add item to work space</Tooltip>}
              >
                <Dropdown.Toggle
                  className="p-2 workspace_menuBtn bgHover workspace_addBtn"
                  style={{ backgroundColor: "#025231" }}
                >
                  <FiPlus />
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>Create Team</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <AddTeamModal
              show={show}
              handleClose={handleClose}
              setTeams={setNewTeam}
              teams={newTeam} // Pass the current teams list
            />
          </div>
          <div className="m-3 submenu_container">
            <div className="">
              {newTeam?.map((team, index) => {
                return (
                  <Button
                    onMouseEnter={() => setHoveredItem(team._id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => getTeam(team._id, team)}
                    key={index}
                    className={`workspace-dropdown-button workspace-dropdownBtn  centerIt fw-normal justify-content-between w-100 text-start py-1 me-2 mb-1 ps-2 pe-3 ${
                      selectedTeam?._id === team?._id && "Selected"
                    } `}
                  >
                    <span className="centerIt">
                      <FaUsers className="me-2 fs-6 align-middle" />
                      {teamEditing === team._id ? (
                        <Form.Control
                          type="text"
                          id="teamInput"
                          autoFocus
                          value={teamEditingInput || team.name}
                          onChange={(e) => setTeamEditingInput(e.target.value)}
                          onBlur={(e) => revokeTeamEditing(e)}
                          className=" py-0 shadow-none workspace_searchInput dynamicBG rounded-0  w-100 text-start "
                        />
                      ) : (
                        team.name
                      )}
                    </span>
                    <Popover
                      content={
                        <div className="px-1 py-2">
                          <p
                            className="centerIt cursor_pointer bgHover mb-2 px-2 rounded-1"
                            onClick={() => {
                              focusTeamInput(team.name, team._id);
                            }}
                          >
                            <TbEdit className="fs-6 me-2" /> Rename
                          </p>
                          <p
                            className="centerIt cursor_pointer bgHover m-0 px-2 rounded-1"
                            onClick={() => deleteTeam(team._id)}
                          >
                            <FiTrash className="fs-6 me-2" /> Delete
                          </p>
                        </div>
                      }
                      open={actionMenu === team._id}
                      onOpenChange={(newOpen) =>
                        setActionMenu(newOpen ? team._id : null)
                      }
                      trigger="click"
                      placement="bottom"
                    >
                      <span style={{ width: "25px", height: "25px  " }}>
                        {hoveredItem === team._id && (
                          <Button
                            className="ms-1 p-0 centerIt justify-content-center text-color fs-4 border-0 text bg-transparent bgHover "
                            style={{
                              display: "flex",
                              width: "25px",
                              height: "25px  ",
                            }}
                          >
                            <BsThreeDots className=" fs-6 " />
                          </Button>
                        )}
                      </span>
                    </Popover>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

function useToggleButton() {
  const [activeButton, setActiveButton] = useState(1);

  const toggleButton = (buttonId) => {
    setActiveButton(buttonId);
  };

  return [activeButton, toggleButton];
}
