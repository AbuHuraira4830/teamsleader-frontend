import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ChromePicker } from "react-color";
import CircularProgress from "@mui/material/CircularProgress";
import { postAPI, getAPI } from "../../../../helpers/apis.js";
import { Popover } from "antd";
import { AiOutlineClose } from "react-icons/ai"; // For a better close icon
import { BsStars } from "react-icons/bs";
import { useStateContext } from "../../../../contexts/ContextProvider.jsx";
const AddWorkspaceModal = ({
  handleClose,
  show,
  setWorkspaces,
  workspaces,
}) => {
  const plans = {
    trial: { workspaces: 1, name: "freelancer" },
    freelancer: { workspaces: 1, name: "business" },
    business: { workspaces: 5, name: "enterprise" },
    enterprise: { workspaces: Infinity, name: "enterprise" },
  };

  const [color, setColor] = useState("#FFCB00");
  const [workspaceName, setWorkspaceName] = useState("");
  const [privacyValue, setPrivacyValue] = useState("open");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null); // Store the user's current plan
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // Upgrade modal control
  const { setIsPlanModalOpen } = useStateContext();
  const submitButton = useRef();

  // Fetch the current user plan when the modal is shown
  useEffect(() => {
    if (show) {
      getAPI("/api/get-current-plan")
        .then((response) => {
          const { userPlan } = response.data;
          setUserPlan(userPlan);
          // Fetch current workspaces
          getAPI("/api/workspace/list").then((response) => {
            setWorkspaces(response.data.workspaces);
          });
        })
        .catch((error) => {
          console.log("Error fetching plan:", error);
        });
    }
  }, [show]);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const addNewWorkspaceHandler = (e) => {
    e.preventDefault();

    if (!userPlan) return;

    const currentWorkspacesCount = workspaces.length;
    const planLimit = plans[userPlan?.package]?.workspaces; // Safe navigation

    // Check if user has exceeded the workspace limit
    if (currentWorkspacesCount >= planLimit) {
      handleClose();
      setShowUpgradeModal(true); // Show the upgrade modal
      return;
    }

    setIsLoading(true);
    submitButton.current.disabled = true;

    let data = {
      color,
      name: workspaceName,
      privacy: privacyValue,
    };

    postAPI("/api/workspace/store", data)
      .then((response) => {
        setIsLoading(false);
        setWorkspaces(response.data.workspaces); // Update the workspaces list
        handleClose(); // Close modal
        setWorkspaceName("");
        setPrivacyValue("open");
        setColor("#FFCB00");
        submitButton.current.disabled = false;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handlePlanModalOpen = () => {
    // setShow(false);
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
        <form onSubmit={addNewWorkspaceHandler}>
          <Modal.Header className="border-0 px-0 pb-0">
            <h2 className="modal-title">Add new workspace</h2>
            <Button
              onClick={handleClose}
              variant="link"
              className="close-button"
            >
              <AiOutlineClose
                // className="text-[#000]"
                size={24}
                style={{ color: "#000" }}
              />{" "}
              {/* Improved close icon */}
            </Button>
          </Modal.Header>
          <Modal.Body className="px-0 ">
            <div className="">
              <Popover
                content={
                  <ChromePicker
                    color={color}
                    onChange={(color) => {
                      setColor(color.hex), handleOpenChange();
                    }}
                  />
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div
                  className="fs-1 fw-bold text-white mx-auto centerIt justify-content-center cursor_pointer"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: color,
                    borderRadius: "24px",
                  }}
                >
                  N
                </div>
              </Popover>
            </div>

            <span>
              <p className="fs_14 p-0 mb-2">Workspace name</p>
              <Form.Control
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Choose a name for your workspace"
                className="py-2 mb-3 shadow-none workspace_searchInput transparent_bg"
                required={true}
              />
            </span>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              className="workspace-dropdown-button position-relative fw-normal align-self-center text-start py-1 px-3"
              style={{
                height: "40px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              ref={submitButton}
              type="submit"
              disabled={isLoading}
              className="p-2 px-3 workspace_addBtn border-0"
              style={{ backgroundColor: "#025231", width: "148px" }}
            >
              {isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                <>Add workspace</>
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
        <Modal.Header className="border-0 position-relative px-4 py-3">
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontWeight: "600",
              fontSize: "22px",
              lineHeight: "1.5",
              color: "#333", // Darker font color for better contrast
            }}
          >
            Workspace Limit Reached
          </Modal.Title>
          {/* Custom Close Button */}
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
            <AiOutlineClose size={24} style={{ color: "#555" }} />{" "}
            {/* Slightly darker icon */}
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
            You have reached the workspace limit for the{" "}
            <strong style={{ color: "#333" }}>
              {userPlan?.package || "your"}
            </strong>{" "}
            plan. Please upgrade to the{" "}
            <strong style={{ color: "#333" }}>
              {plans[userPlan?.package]?.name || "next available"}
            </strong>{" "}
            plan to add more workspaces.
          </p>

          {/* Enhanced Button Styling */}
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

export default AddWorkspaceModal;
