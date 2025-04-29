import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getAPI, postAPI } from "../../helpers/apis"; // Assuming you're using these for API calls
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiSolidFileExport, BiLockAlt } from "react-icons/bi";

import { BsStars } from "react-icons/bs";
import { useStateContext } from "../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

const AddTeamModal = ({ handleClose, show, setTeams, teams = [] }) => {
  const { selectedWorkspace } = useStateContext();
  const plans = {
    trial: { teams: 1, name: "freelancer" },
    freelancer: { teams: 7, name: "business" },
    business: { teams: Infinity, name: "enterprise" },
    enterprise: { teams: Infinity, name: "enterprise" },
  };

  const [teamInputValue, setTeamInputValue] = useState("");
  const [privacyValue, setPrivacyValue] = useState("private");
  const [isLoading, setIsLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null); // Store the user's current plan
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // Upgrade modal control
  const { setIsPlanModalOpen } = useStateContext();
  const submitButton = useRef();
  const [teamManageValue, setTeamManageValue] = useState("Items"); // Manage value state

  // Fetch the current user plan when the modal is shown
  useEffect(() => {
    if (show) {
      getAPI("/api/get-current-plan")
        .then((response) => {
          const { userPlan } = response.data;
          setUserPlan(userPlan);
        })
        .catch((error) => {
          console.log("Error fetching plan:", error);
        });
    }
  }, [show]);

  const addNewTeamHandler = async (e) => {
    e.preventDefault();

    if (!userPlan) {
      console.error("User plan not found");
      return;
    }

    const currentTeamsCount = teams.length; // Current number of teams
    console.log("currentTeamsCount", currentTeamsCount);

    const planLimit = plans[userPlan?.package]?.teams; // Team limit for user's plan
    console.log("planLimit", planLimit);

    // Check if user has exceeded the team limit
    if (currentTeamsCount >= planLimit) {
      handleClose(); // Close the main modal
      setShowUpgradeModal(true); // Show the upgrade modal
      return;
    }

    // If the team name is not provided
    if (!teamInputValue.trim()) {
      console.error("Team name is required");
      return;
    }

    setIsLoading(true);
    submitButton.current.disabled = true;
    const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "id will be here";
    if (!workspace_uuid) {
      console.error("Cannot create event without workspace UUID.");
      return;
    }
    let data = {
      workspace_uuid,
      name: teamInputValue,
      privacy: privacyValue,
      manage: teamManageValue,
      workspaceID: selectedWorkspace._id,
    };

    postAPI("/api/teams/store", data)
      .then((response) => {
        setIsLoading(false);

        // setSelectedWorkspace(response.data?.workspace._doc);
        setTeams(response.data?.workspace?._doc?.teams);
        setTeamInputValue("");
        e.target.reset();
        handleClose(); // Close modal
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handlePlanModalOpen = () => {
    setShowUpgradeModal(false);
    setIsPlanModalOpen(true); // Open the plan selection modal
  };

  return (
    <div>
      {/* Main Modal */}
      <Modal
        className="team_modal"
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <form onSubmit={addNewTeamHandler}>
          <Modal.Header closeButton className="border-0 px-0 pb-0">
            <h2>Create Team</h2>
            <Button
              onClick={handleClose}
              variant="link"
              className="close-button position-absolute"
              style={{
                right: "20px",
                top: "20px",
                background: "transparent",
                border: "none",
              }}
            >
              <AiOutlineClose size={24} style={{ color: "#555" }} />
            </Button>
          </Modal.Header>
          <Modal.Body className="px-0">
            <span>
              <p className="fs_14 p-0 mb-2">Team name</p>
              <Form.Control
                type="text"
                value={teamInputValue}
                onChange={(e) => setTeamInputValue(e.target.value)}
                placeholder="Enter your team name"
                className="py-2 mb-3 shadow-none workspace_searchInput transparent_bg"
                required={true}
              />
            </span>

            <div className="">
              <p className="fs_14 p-0">Privacy</p>
              <div className="mt-2 pb-4 border-bottom d-flex">
                <Form.Check
                  className=".fs_15"
                  inline
                  type="radio"
                  aria-label="radio 1"
                  label="Client can see this"
                  name="privacy"
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
                        Only client can see this
                      </span>
                    }
                    name="privacy"
                    onChange={() => setPrivacyValue("public")}
                  />
                </div>
              </div>
            </div>

            {/* Further logic for managing team types */}
            <div className="mt-4">
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
                    aria-label="radio 3"
                    label="Leads"
                    name="team_manage"
                    onChange={() => setTeamManageValue("Leads")}
                  />
                </Col>
                <Col xs={4} className="mb-2">
                  <Form.Check
                    type="radio"
                    aria-label="radio 4"
                    label="Projects"
                    name="team_manage"
                    onChange={() => setTeamManageValue("Projects")}
                  />
                </Col>
                <Col xs={4} className="mb-2">
                  <Form.Check
                    type="radio"
                    aria-label="radio 5"
                    label="Clients"
                    name="team_manage"
                    onChange={() => setTeamManageValue("Clients")}
                  />
                </Col>
                <Col xs={4} className="mb-2">
                  <Form.Check
                    type="radio"
                    aria-label="radio 6"
                    label="Tasks"
                    name="team_manage"
                    onChange={() => setTeamManageValue("Tasks")}
                  />
                </Col>
                <Col xs={4} className="flex mb-2">
                  <Form.Check
                    type="radio"
                    aria-label="radio_custom"
                    className="mt-1 me-2"
                    name="team_manage_custom"
                  />
                  <Form.Control
                    type="text"
                    name="custom_team_manage"
                    placeholder="Custom"
                    onChange={(e) => setTeamManageValue(e.target.value)}
                    className="py-1 shadow-none workspace_searchInput transparent_bg"
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              className="workspace-dropdown-button position-relative fw-normal align-self-center text-start py-1 px-3"
              style={{ height: "40px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              ref={submitButton}
              type="submit"
              disabled={isLoading}
              className="p-2 px-3 workspace_addBtn border-0"
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

      {/* Upgrade Modal */}
      <Modal
        show={showUpgradeModal}
        onHide={() => setShowUpgradeModal(false)}
        centered
        dialogClassName="custom-modal-position"
        style={{
          borderRadius: "12px", // Smooth corners
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Softer shadow for elevation effect
        }}
      >
        <Modal.Header className="border-0 px-4 py-3">
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontWeight: "600",
              fontSize: "22px",
              lineHeight: "1.5",
              color: "#333", // Darker font color for better contrast
            }}
          >
            Team Limit Reached
          </Modal.Title>
          <Button
            onClick={() => setShowUpgradeModal(false)}
            className="close-button position-absolute"
            style={{
              right: "20px",
              top: "20px",
              background: "transparent",
              border: "none",
            }}
          >
            <AiOutlineClose size={24} style={{ color: "#555" }} />
          </Button>
        </Modal.Header>

        <Modal.Body
          className="text-center px-4 py-4"
          style={{ fontSize: "16px" }}
        >
          <p
            className="text-muted"
            style={{ fontSize: "15px", lineHeight: "1.7", color: "#666" }}
          >
            You have reached the team limit for the{" "}
            <strong style={{ color: "#333" }}>
              {userPlan?.package || "your"}
            </strong>{" "}
            plan. Please upgrade to the{" "}
            <strong style={{ color: "#333" }}>
              {plans[userPlan?.package]?.name || "next available"}
            </strong>{" "}
            plan to add more teams.
          </p>

          <Button
            className="workspace_addBtn border-0 mt-4"
            style={{
              borderRadius: "8px",
              backgroundColor: "#1f76c2",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              boxShadow: "0px 4px 10px rgba(31, 118, 194, 0.3)", // Button shadow effect
              transition: "background-color 0.3s ease, transform 0.2s", // Smooth hover effect
            }}
            onClick={handlePlanModalOpen}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#145a8a";
              e.currentTarget.style.transform = "translateY(-2px)"; // Subtle lift on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1f76c2";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <BsStars size={18} /> See Plans
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddTeamModal;
