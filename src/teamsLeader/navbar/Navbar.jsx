import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { TbGridDots } from "react-icons/tb";
import IMAGES from "../../assets/images/Images";
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
import "./teamsPaymentPlan.css";

import { RxMagnifyingGlass } from "react-icons/rx";
import { BiQuestionMark, BiSun } from "react-icons/bi";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { IoExitOutline, IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { useStateContext } from "../../contexts/ContextProvider";
import { Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI, postAPI } from "../../helpers/apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PlanModal from "./PlanModal";
import PaymentModal from "./PaymentModal/PaymentModal";
import EnterpriseModal from "./EnterpriseModal/EnterpriseModal";
import axios from "axios";
import ProfileModal from "./profileModal/ProfileModal";
import UpdateFeedModal from "../updateFeed/UpdateFeedModal";
import InviteAdminModal from "../Admins/InviteAdminModal";

const Navbar = ({ user }) => {
  console.log("UserNav", user);

  const navigate = useNavigate();
  const { workspaceID, teamID } = useParams();

  const {
    setTheme,
    isEmailVerified,
    setIsEmailVerified,
    setIsPlanModalOpen,
    isPlanModalOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    thisUser,
    profileModal,
    setProfileModal,
    setComponentToShow,
  } = useStateContext();
  const [show, setShow] = useState(false);
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState();
  const [selectedPlan, setSelectedPlan] = useState();

  const [feedModal, setFeedModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const userResponse = await axios.get("/api/user/get-user-from-token");
        setCurrentPlan(userResponse.data.currentPlan);
      } catch (error) {
        console.error("Error fetching Plan", error);
      }
    };
    fetchPlan();
  }, []);

  const handleOpenModal = () => {
    setIsPlanModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPlanModalOpen(false);
    setIsPaymentModalOpen(false);
    setIsEnterpriseModalOpen(false);
  };

  const handleContinue = (plan) => {
    setSelectedPlan(plan);
    if (plan === "Enterprise") {
      setIsPlanModalOpen(false);
      setIsEnterpriseModalOpen(true);
    } else {
      setIsPlanModalOpen(false);
      setIsPaymentModalOpen(true);
    }
  };

  const handleBackClickPayment = () => {
    setIsPaymentModalOpen(false);
    setIsPlanModalOpen(true);
  };
  const handleBackClickEnterprise = () => {
    setIsEnterpriseModalOpen(false);
    setIsPlanModalOpen(true);
  };

  // const handleClose = () => {
  //   setIsPlanModalOpen(false);
  //   setIsPaymentModalOpen(false);
  // };
  const handleClose = () => {
    setShow(false);
    setIsPaymentModalOpen(false);
  };
  const handleShow = () => setShow(true);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // const showModal = () => {
  //   setModalVisible(true);
  // };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getAPI("/api/user/get-user-from-token")
      .then((response) => {
        if (response.status === 200 && response.data?._doc?.isEmailVerified) {
          setIsEmailVerified(true);
        } else {
          // toast.error(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          return window.location.replace("/login");
        }
        // toast.error(response.data.message);
        console.log(err);
      });
  }, [isEmailVerified]);

  const resendEmail = async (e) => {
    e.preventDefault();

    e.target.style.pointerEvents = "none";
    let response = await getAPI("/api/user/resend-mail");
    if (response.status === 200) {
      // toast.success(response.data.message);
      console.log(response.data.message);
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      // toast.error(response.data.message);
      console.log(response.data.message);
    }
    e.target.style.pointerEvents = "initial";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const handleTheme = (theme) => {
    postAPI("/api/theme/update", { theme })
      .then((response) => {
        setTheme(response.data.theme.theme);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {thisUser?.isEmailVerified ? null : (
        <Alert
          className="email-verify-message"
          message={
            <span className="fs_15">
              Please confirm your email address: {thisUser?.emailAddress} &nbsp;
              <a
                href="#"
                onClick={resendEmail}
                style={{ color: "white", textDecoration: "underline" }}
              >
                Resend email
              </a>
              &nbsp;&nbsp;
              <a
                href="#"
                style={{ color: "white", textDecoration: "underline" }}
              >
                Change email address
              </a>
            </span>
          }
          type="info"
        />
      )}
      <div className="centerIt px-4 ">
        <span className="flex">
          {/* <Button className="p-0 workspace_menuBtn bgHover align-middle me-3">
          <TbGridDots />
        </Button> */}
          {/* <img
          src={IMAGES.LOGO}
          alt=""
          className="logo align-self-center mb-1 "
        /> */}
          <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
          <img
            src={IMAGES.LEAF}
            alt=""
            className="align-self-center leaf_icon me-2"
          />
          <button
            className="p-0 flex items-center px-2 nav_planBtn align-middle bg-transparent align-self-center ms-3"
            onClick={handleOpenModal}
          >
            <BsStars /> See plans
          </button>
        </span>

        <span className="centerIt ms-auto ">
          <Button
            className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1"
            onClick={() => navigate("/password-managment")}
          >
            <LiaUserLockSolid />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1">
            <AiOutlineBell />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1">
            <FiInbox />
          </Button>

          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/users`} 
            className="centerIt"
          >
            <Button
              className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1 "
              // onClick={showModal}
            >
              <AiOutlineUserAdd />
            </Button>
          </Link>
          <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center ">
            <PiPuzzlePiece />
          </Button>
          <div className="vr mx-1 nav_splitter align-self-center"></div>
          <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1">
            <RxMagnifyingGlass />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover centerIt justify-content-center me-1">
            <BiQuestionMark />
          </Button>
          {/* <span className="nav-avatar flex align-self-center">
          <img src={IMAGES.LEAF} alt="" className="align-self-center" />
        </span> */}

          {thisUser?.picture ? (
            <div
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={handleShow}
            >
              <img
                src={thisUser.picture}
                alt=""
                className="rounded-circle w-100 h-100"
              />
            </div>
          ) : (
            <div
              onClick={handleShow}
              className=" rounded-circle  centerIt justify-content-center "
              style={{
                backgroundColor: thisUser?.profileColor,
                width: "32px",
                height: "32px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {thisUser?.fullName[0]?.toUpperCase()}
            </div>
          )}

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
                        onClick={() => {
                          setProfileModal(true), handleClose();
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
                            onClick={() => handleTheme("light_theme")}
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
                            onClick={() => handleTheme("night_theme")}
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
                            onClick={() => handleTheme("dark_theme")}
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
        {/* <PlanModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
        {isPlanModalOpen && (
          <PlanModal
            isOpen={isPlanModalOpen}
            onClose={handleCloseModal}
            onContinue={handleContinue}
            // selectedPlan={selectedPlan}
            // setSelectedPlan={setSelectedPlan}
            currentPlan={currentPlan}
          />
        )}
        {isPaymentModalOpen && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handleCloseModal}
            selectedPlan={selectedPlan}
            handleBackClickPayment={handleBackClickPayment}
          />
        )}
        {isEnterpriseModalOpen && (
          <EnterpriseModal
            isOpen={isEnterpriseModalOpen}
            onClose={handleCloseModal}
            selectedPlan={selectedPlan}
            handleBackClickEnterprise={handleBackClickEnterprise}
          />
        )}
        <ProfileModal />
        {/* <InviteAdminModal visible={isModalVisible} onClose={handleModalClose} /> */}
        {/* <UpdateFeedModal feedModal={feedModal} closeModal={closeFeedModal} /> */}
      </div>
    </>
  );
};

export default Navbar;
