import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsStars } from "react-icons/bs";


const TrialExpireModal = ({ expiredPlan, setShow, setIsPlanModalOpen }) => {
  console.log("expiredPlan", expiredPlan);

  const planExpiredMessage = {
    trial: {
      title: "Hey Usman Yousaf, your Pro trial has ended",
      message:
        "Want to continue using TeamsLeader to increase your productivity? Explore our various plans that cater to your needs and help you achieve more.",
      upgradeMessage:
        "Consider upgrading to the Freelancer plan for enhanced features or the Business plan for more advanced tools.",
    },
    freelancer: {
      title: "Hey Usman Yousaf, your Freelancer plan has ended",
      message:
        "To keep your workflow going, explore our other plans that better suit your growing business requirements.",
      upgradeMessage:
        "Upgrade to the Business plan for additional features or contact us for a personalized Enterprise plan.",
    },
    business: {
      title: "Hey Usman Haider, your Business plan has ended",
      message:
        "Your Business plan has expired. Upgrade now to continue uninterrupted access to TeamsLeader's advanced features.",
      upgradeMessage:
        "Consider exploring our Enterprise plan for personalized solutions tailored to your business needs.",
    },
  };

  const handlePlanModalOpen = () => {
    setShow(false);
    setIsPlanModalOpen(true); // Open the plan selection modal
  };

  const { title, message, upgradeMessage } =
    planExpiredMessage[expiredPlan] || {};

  return (
    <Modal
      show={true}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal-position"
    >
      <Modal.Body>
        <div className="text-center fs_14" style={{ color: "#42464d" }}>
          <p
            className="text-center mb-0"
            style={{
              fontSize: "22px",
              fontWeight: "700",
              paddingBottom: "12px",
              color: "#1e1f21",
            }}
          >
            {title}
          </p>
          <p
            className="text-center"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#676e74",
              paddingBottom: "12px",
            }}
          >
            {message}
          </p>
          {upgradeMessage && (
            <p
              className="text-center"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#1f76c2",
                paddingBottom: "24px",
                fontStyle: "italic",
              }}
            >
              {upgradeMessage}
            </p>
          )}
          <Button
            className="workspace_addBtn border-0 fs_14 mb-3"
            style={{
              borderRadius: "4px",
              backgroundColor: "#1f76c2",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              display: "inline-flex",
              gap: "8px",
            }}
            onClick={handlePlanModalOpen}
          >
            <BsStars size={18} /> See Plans
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TrialExpireModal;
