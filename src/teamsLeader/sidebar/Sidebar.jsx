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
// import Workspace from "../Workspaces/Workspace";
// import { Popover } from "antd";
// import { getAPI, postAPI } from "../../helpers/apis";

import { SlHome } from "react-icons/sl";
import { BsFillChatDotsFill, BsThreeDots } from "react-icons/bs";
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { AiOutlineBug, AiOutlineLeft } from "react-icons/ai";
import { BiChevronDown, BiSolidFileExport, BiLockAlt } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { PiClockCounterClockwiseFill, PiFunnel } from "react-icons/pi";
import { FiFileText, FiPlus, FiSidebar, FiTrash } from "react-icons/fi";
import { TbEdit, TbFileInvoice } from "react-icons/tb";
import { LuFileInput, LuCrown } from "react-icons/lu";
import { DiScrum } from "react-icons/di";
import { CiLock } from "react-icons/ci";
import { useStateContext } from "../../contexts/ContextProvider";
import { set } from "date-fns";


import { getAPI, postAPI } from "../../helpers/apis";
import { Popover } from "antd";
import Workspace from "../Pages/NewTeam/Components/WorkspaceComponent";
import { CircularProgress } from "@mui/material";
import AddTeamModal from "./AddTeamModal"; // Import the AddTeamModal component
import DocAddingModal from "./DocAddingModal";
// import { BiSolidFileExport } from "react-icons/md";
// import "../../assets/css/sidebar.css";

const Sidebar = ({ toggleNavbar, workspaceID, teamID }) => {
  const {
    isSidebarVisible,
    setTeamTasks,
    teamTasks,
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setSelectedTeam,
    setComponentToShow,
    allDocuments,
    setAllDocuments,
    selectedDocument,
    setSelectedDocument,
    workspaces,
    setWorkspaces,
    newTeam,
    setNewTeam,
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

  const handleMouseEnter = () => {
    setIsButtonActive(true);
  };

  const handleMouseLeave = () => {
    setIsButtonActive(false);
  };

  const [activeButton, toggleButton] = useToggleButton();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [newTeam, setNewTeam] = useState([]);
  // const [workspaces, setWorkspaces] = useState([]);

  const [teamInputValue, setTeamInputValue] = useState("New Team");
  const [privacyValue, setPrivacyValue] = useState("private");
  const [teamManageValue, setTeamManageValue] = useState("Items");

  const [isLoading, setIsLoading] = useState(false);
  const [teamEditing, setTeamEditing] = useState(false);
  const [teamEditingInput, setTeamEditingInput] = useState("");
  const [workspaceRenameInput, setWorkspaceRenameInput] = useState("");
  const [workspaceEditing, setWorkspaceEditing] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  const [docRenameInput, setDocRenameInput] = useState("");
  const [docEditing, setDocEditing] = useState(false);
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
  const newTeamHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      name: teamInputValue,
      privacy: privacyValue,
      manage: teamManageValue,
      workspaceID: selectedWorkspace._id,
    };

    postAPI("/api/teams/store", data)
      .then((response) => {
        setIsLoading(false);

        // setSelectedWorkspace(response.data?.workspace._doc);
        setNewTeam(response.data?.workspace?._doc?.teams);
        setTeamInputValue("New Team");
        e.target.reset();
        setShow(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getTeam = (teamID, team) => {
    getAPI(`/api/teams/${teamID}`)
      .then((response) => {
        if (response.status === 200) {
          setComponentToShow("newTeam");
          setSelectedDocument(null);
          setSelectedTeam(team);
          setTeamTasks(response.data._doc);
          navigate(
            `/workspace/${
              workspaceID || selectedDocument?.workspaceID
            }/team/${teamID}`
          );
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   getAPI("/api/teams/list")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setNewTeam(response.data.teams);
  //         if (response.data?.teams.length > 0)
  //           setTeamTasks(response.data.teams[0]);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.status === 401) {
  //         return window.location.replace("/login");
  //       }
  //       console.log(err.data.message);
  //     });
  // }, []);
  useEffect(() => {
    getAPI("/api/workspace/list")
      .then((response) => {
        setWorkspaces(response.data.workspaces);
        if (response.data?.workspaces?.length)
          setSelectedWorkspace(response.data.workspaces[0]);
        setNewTeam(response.data.workspaces[0].teams);
        const teams = response.data.workspaces[0].teams;
        setSelectedTeam(teams[0]);
        setTeamTasks(teams[0]);
        setAllDocuments(response.data.workspaces[0].documents);
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

  const teamActionPopup = (open, teamID) => {
    setActionMenu(open ? teamID : null);
  };

  const [docName, setDocName] = useState([]);
  const [docModal, setDocModal] = useState(false);
  const showDocModal = () => {
    setDocModal(true);
  };
  const hideDocModal = () => {
    setDocModal(false);
  };
  // const getDocument = (doc) => {
  //   getAPI(`/api/doc/${doc._id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setSelectedTeam(null);
  //         setComponentToShow("docCreator");
  //         setSelectedDocument(doc);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const getDocument = (doc) => {
    navigate(`/docs/${doc?._id}`);
  };
  const deleteDoc = (docID) => {
    postAPI("/api/doc/delete", {
      docID: docID,
      workspaceID: selectedWorkspace,
    }).then((response) => {
      if (response.status === 200) {
        setComponentToShow("newTeam");
        setAllDocuments(response.data.workspace.documents);
        setTeamTasks(response.data?.workspace?.teams[0]);
        setSelectedTeam(response.data?.workspace?.teams[0]);
      } else {
        console.log(response.data.message);
      }
    });
  };
  const focusDocInput = (data, id) => {
    setDocRenameInput(data);
    setDocEditing(id);
    setActionMenu(false);
  };
  const revokeDocEditing = (e) => {
    setDocEditing(null);
    postAPI("/api/doc/update", {
      name: e.target.value,
      docID: selectedDocument._id,
      data: selectedDocument.data,
      workspaceID: selectedWorkspace._id,
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setAllDocuments(res.data.workspace.documents);
        setDocRenameInput("");
      } else {
        console.log(res.data.message);
      }
    });
    // setTeamEditingInput("");
  };
  return (
    <div className="sidebar_widthDiv ">
      <div className=" w-100 m-0 ">
        <span className="top-0 end-0 sidebar_toggleBtn position-absolute">
          <Button className=" " onClick={() => toggleNavbar()}>
            <AiOutlineLeft className="" />
          </Button>
        </span>
        <div className={` ${isSidebarVisible ? "" : "d-none"}`}>
          <Stack gap={1} className="ps-3 pe-5 pt-3 pb-3 sidebar_topBtn  ">
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

            {/* <Button
              className={`w-100 text-start ${
                activeButton === 2 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(2)}
            >
              <FaRegCalendarCheck className="me-2 " />
              My work
            </Button> */}

            <Link to="/proposals" className="text-decoration-none">
              <Button
                className={`w-100 text-start ${
                  activeButton === 3 ? "selected_bg" : "transparent_bg"
                }`}
                onClick={() => toggleButton(3)}
              >
                <span className="flex items-center">
                  <LuFileInput className="me-2 " />
                  Proposals
                </span>
              </Button>
            </Link>
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
            {/* <Link to="/password-managment " className="text-decoration-none">
              <Button
                className={`w-100 text-start ${
                  activeButton === 5 ? "selected_bg" : "transparent_bg"
                }`}
                onClick={() => toggleButton(5)}
              >
                <span className="centerIt">
                  <CiLock className="me-2 " />
                  Passwords
                </span>
              </Button>
            </Link> */}
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
                      className=" py-0 shadow-none workspace_searchInput dynamicBG rounded-0  w-100 text-start "
                    />
                  ) : (
                    selectedWorkspace?.name
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
                className="px-4 py-1 shadow-none workspace_searchInput Border  transparent_bg"
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
                <Dropdown.Item onClick={handleShow} href="#/action-1">
                  Create Team
                </Dropdown.Item>
                <Dropdown.Item onClick={showDocModal} className="d-flex  ">
                  <FiFileText className="me-1 mt-1" />
                  New Doc
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DocAddingModal
              show={docModal}
              hideDocModal={hideDocModal}
              onHide={hideDocModal}
              setDocName={setDocName}
              docName={docName}
            />
            <Modal
              className="team_modal"
              show={show}
              onHide={handleClose}           
              animation={true}
            >
              <form onSubmit={newTeamHandler}>
                <Modal.Header closeButton className="border-0 px-0 pb-0">
                  <h1 className="text-[22px] font-[800]">Create Team</h1>
                </Modal.Header>
                <Modal.Body className="px-0 pb-0">
                  <div className="mt-4">
                    <p className="fs_14 p-0 mb-2">Team name</p>
                    <Form.Control
                      type="text"
                      value={teamInputValue}
                      onChange={(e) => setTeamInputValue(e.target.value)}
                      placeholder="New Team"
                      className=" py-2  mb-3 shadow-none workspace_searchInput transparent_bg"
                      required={true}
                    />
                  </div>
                  <div className=" mt-4">           
                    <p className="fs_14 p-0">Privacy</p>

                    <div className="mt-2 pb-4   d-flex ">
                      <Form.Check
                        className=".fs_15"
                        inline
                        type="radio"
                        aria-label="radio 1"
                        label="Client can see this"
                        name="privacy"
                        // checked={true}
                        defaultChecked
                        onChange={() => setPrivacyValue("private")}
                      />
                      <div className="centerIt">
                        <Form.Check
                          type="radio"
                          aria-label="radio 2"
                          className="me-0 .fs_15"
                          label={
                            <span className="d-flex">
                              <BiLockAlt className="me-1 mb-1 fs-5" />
                              Private
                            </span>
                          }
                          name="privacy"
                          onChange={() => setPrivacyValue("public")}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-4 ">
                    <p className="fs_16 p-0">
                      Select what you're managing in this team
                    </p>
                    <Row className="mt-3 align-items-center modals_radioBtn_wrapper">
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Items"
                          name="team_manage"
                          defaultChecked
                          onChange={() => setTeamManageValue("Items")}
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 2"
                          label="Employees"
                          name="team_manage"
                          onChange={() => setTeamManageValue("Employees")}
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Leads"
                          name="team_manage"
                          onChange={() => setTeamManageValue("Leads")}
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Projects"
                          name="team_manage"
                          onChange={() => setTeamManageValue("Projects")}
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Clients"
                          name="team_manage"
                          onChange={() => setTeamManageValue("Clients")}
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Tasks"
                          name="team_manage"
                          onChange={() => setTeamManageValue("Tasks")}
                        />
                      </Col>
                      <Col xs={4} className="flex mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          className="mt-1 me-2"
                          name="team_manage"
                        />
                        <Form.Control
                          type="text"
                          name="team_manage"
                          placeholder="Custom"
                          onChange={(e) => {
                            setTeamManageValue(e.target.value);
                          }}
                          className=" py-1 shadow-none workspace_searchInput transparent_bg"
                        />
                      </Col>
                    </Row>
                  </div> */}
                </Modal.Body>
                <Modal.Footer className="border-0">
                  <Button
                    className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
                    style={{
                      height: "40px",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="p-2 px-3  workspace_addBtn border-0"
                    style={{ backgroundColor: "#025231", width: "128px" }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} className="text-white" />
                    ) : (
                      <>Create Team</>
                    )}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
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

              {allDocuments?.map((item) => (
                <Button
                  key={item._id}
                  className={`workspace-dropdown-button workspace-dropdownBtn centerIt justify-content-between fw-normal  w-100  py-1 me-2 px-2   ${
                    selectedDocument?._id === item?._id && "Selected"
                  }`}
                  style={{
                    height: "34px",
                  }}
                  onMouseEnter={() => setHoveredItem(item._id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => getDocument(item)}
                >
                  <span className="centerIt">
                    <FiFileText className="me-2 fs-6 " />
                    {docEditing === item._id ? (
                      <Form.Control
                        type="text"
                        id="teamInput"
                        autoFocus
                        value={docRenameInput || item.name}
                        onChange={(e) => setDocRenameInput(e.target.value)}
                        onBlur={(e) => revokeDocEditing(e)}
                        className=" py-0 shadow-none workspace_searchInput dynamicBG rounded-0  w-100 text-start "
                      />
                    ) : (
                      item.name
                    )}
                  </span>

                  <Popover
                    content={
                      <div className="px-1 py-2">
                        <p
                          className="centerIt cursor_pointer bgHover mb-2 px-2 rounded-1"
                          onClick={() => {
                            focusDocInput(item.name, item._id);
                          }}
                        >
                          <TbEdit className="fs-6 me-2" /> Rename
                        </p>
                        <p
                          className="centerIt cursor_pointer bgHover m-0 px-2 rounded-1"
                          onClick={() => deleteDoc(item._id)}
                        >
                          <FiTrash className="fs-6 me-2" /> Delete
                        </p>
                      </div>
                    }
                    open={actionMenu === item._id}
                    onOpenChange={(newOpen) =>
                      setActionMenu(newOpen ? item._id : null)
                    }
                    trigger="click"
                    placement="bottom"
                  >
                    <span style={{ width: "25px", height: "25px  " }}>
                      {hoveredItem === item._id && (
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
              ))}
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
