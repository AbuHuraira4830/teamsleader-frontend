import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { BsArchive, BsCodeSlash, BsMoon, BsStars } from "react-icons/bs";
import { AiOutlineBell, AiOutlineUserAdd } from "react-icons/ai";
import {
  FiChevronRight,
  FiInbox,
  FiPlus,
  FiTrash,
  FiUsers,
} from "react-icons/fi";
import { PiGearSix, PiPuzzlePiece } from "react-icons/pi";
import { LiaUserLockSolid } from "react-icons/lia";

import { RxMagnifyingGlass } from "react-icons/rx";
import { BiQuestionMark, BiSun } from "react-icons/bi";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { IoExitOutline, IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useStateContext } from "../../../contexts/ContextProvider";
import IMAGES from "../../../assets/images/Images";
import { FaArrowLeft } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setTheme, isEmailVerified, setIsEmailVerified } = useStateContext();
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex px-4 py-2">
      <span className="flex">
        <button className="p-0 flex items-center px-3  nav_planBtn align-middle bg-transparent align-self-center transition-all ease-in">
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </span>

      <span className="flex ms-auto ">
        {/* <div className="vr mx-1 nav_splitter align-self-center"></div> */}

        {/* <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1">
          <BiQuestionMark />
        </Button> */}
        {/* <span className="nav-avatar flex align-self-center">
          <img src={IMAGES.LEAF} alt="" className="align-self-center" />
        </span> */}
        <span
          onClick={handleShow}
          className="nav-avatar rounded-circle align-self-center p-1 border-0"
        >
          UH
        </span>
        <div className="">
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            id="nav_avatar_modal"
            backdropClassName="my-modal-backdrop"
          >
            <Modal.Body className="p-0">
              <Row className="w-100 m-0 border-bottom pb-3">
                <Col xs={12} className="fs_15 border-bottom py-3 centerIt">
                  {" "}
                  <img
                    src={IMAGES.LEAF}
                    alt=""
                    className="align-self-center leaf_icon me-2"
                  />
                  Usman
                </Col>
                <Col xs={6}>
                  <p className=" my-2 ps-2 ">Account</p>{" "}
                  <div>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span className="centerIt">
                        <IoPersonOutline className="me-2 fs-6 align-middle" />
                        My profile
                      </span>
                    </Button>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span className="centerIt">
                        <BsCodeSlash className="me-2 fs-6 align-middle" />
                        Developers
                      </span>
                    </Button>
                    <Link to="/manage-teams" className="no-underline">
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn d-flex  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <FiUsers className="me-2 fs-6 align-middle h-[1.2em]" />
                        <span>Teams</span>
                      </Button>
                    </Link>
                    {/* <Button
                    className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                    style={{
                      height: "34px",
                    }}
                  >
                    <span className="centerIt">
                      <FiUsers className="me-2 fs-6 align-middle" />
                      Teams
                    </span>
                  </Button> */}
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                      onClick={() => navigate("/administration/dashboard")}
                    >
                      <span className="centerIt">
                        <PiGearSix className="me-2 fs-6 align-middle" />
                        Administration
                      </span>
                    </Button>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                      onClick={handleLogout}
                    >
                      <span className="centerIt">
                        <IoExitOutline className="me-2 fs-6 align-middle" />
                        Log out
                      </span>
                    </Button>
                  </div>
                </Col>

                <Col xs={6} style={{ marginTop: "39px" }}>
                  <Button
                    className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                    style={{
                      height: "34px",
                    }}
                  >
                    <span className="centerIt">
                      <BsArchive className="me-2 fs-6 align-middle" />
                      Archive
                    </span>
                  </Button>
                  <Button
                    className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                    style={{
                      height: "34px",
                    }}
                  >
                    <span className="centerIt">
                      <FiPlus className="me-2 fs-6 align-middle" />
                      Invite members
                    </span>
                  </Button>
                  <Button
                    className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                    style={{
                      height: "34px",
                    }}
                  >
                    <span className="centerIt">
                      <FiTrash className="me-2 fs-6 align-middle" />
                      Trash
                    </span>
                  </Button>

                  <Dropdown
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    show={isHovered}
                  >
                    <Dropdown.Toggle
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span className="centerIt">
                        <BiSun className="me-2 fs-6 align-middle" />
                        Change theme
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="theme_dropdown"
                      style={{ margin: "-3px" }}
                    >
                      <Dropdown.Item className="px-2">
                        <Button
                          className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                          style={{
                            height: "34px",
                          }}
                          onClick={() => setTheme("light_theme")}
                        >
                          <span className="centerIt">
                            <BiSun className="me-2 fs-6 align-middle" />
                            Light
                          </span>
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item className="px-2">
                        <Button
                          className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                          style={{
                            height: "34px",
                          }}
                          onClick={() => setTheme("night_theme")}
                        >
                          <span className="centerIt">
                            <BsMoon className="me-2 fs-6 align-middle" />
                            Dark
                          </span>
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item className="px-2">
                        <Button
                          className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                          style={{
                            height: "34px",
                          }}
                          onClick={() => setTheme("dark_theme")}
                        >
                          <span className="centerIt">
                            <BsStars className="me-2 fs-6 align-middle" />
                            Night
                          </span>
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    type="button"
                    className="py-1 centerIt mt-2 px-5 ms-3 workspace_addBtn border-0"
                    style={{ backgroundColor: "#025231", height: "32px" }}
                    onClick={handleClose}
                  >
                    <BsStars className=" fs-6 align-middle " />
                    Upgrade
                  </Button>
                </Col>
              </Row>{" "}
              <div className=" flex justify-content-between py-2 px-3">
                <div>
                  <p className=" my-2 ps-2 mb-0 ">Working Status</p>
                  <div className="flex align-items-center">
                    <span className="centerIt my-2 ps-2 me-3">
                      {" "}
                      <GoBell className="  me-3" />
                      Do not disturb
                    </span>
                    <span className="flex ">
                      <Form.Check
                        type="radio"
                        className="mb-0 me-3"
                        aria-label="radio 1"
                        label="On"
                        name="disturbance"
                      />
                      <Form.Check
                        type="radio"
                        className="mb-0 me-3"
                        aria-label="radio 1"
                        label="Off"
                        name="disturbance"
                      />
                    </span>
                  </div>
                </div>
                <span className="align-self-end mb-2 centerIt ">
                  More <FiChevronRight className=" fs-6 " />
                </span>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <Dropdown>
          <Dropdown.Menu className="w-auto"></Dropdown.Menu>
        </Dropdown>
      </span>
    </div>
  );
};

export default AdminNavbar;
