import { Modal, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { useStateContext } from "../../contexts/ContextProvider";

const ClientLimitModal = ({
  showUpgradeModal,
  setShowUpgradeModal,
  userPlan,
}) => {
  const { setIsPlanModalOpen } = useStateContext();

  const plans = {
    trial: { clients: 0, name: "freelancer" },
    freelancer: { clients: 5, name: "business" },
    business: { clients: Infinity, name: "enterprise" },
    enterprise: { clients: Infinity, name: "enterprise" },
  };

  const handlePlanModalOpen = () => {
    // Close this modal and open another modal for plan upgrade
    setShowUpgradeModal(false);
    // Trigger the plan selection modal here
    setIsPlanModalOpen(true);
  };

  return (
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
          Client Limit Reached
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
        {/* Conditionally render text based on the user's current plan */}
        {userPlan?.package === "trial" ? (
          <p
            className="text-muted"
            style={{ fontSize: "15px", lineHeight: "1.7", color: "#666" }}
          >
            You are currently on the{" "}
            <strong style={{ color: "#333" }}>
              {userPlan?.package || "trial"}
            </strong>{" "}
            plan, which does not allow adding clients. Please upgrade to the{" "}
            <strong style={{ color: "#333" }}>
              {plans[userPlan?.package]?.name || "next available"}
            </strong>{" "}
            plan to add clients.
          </p>
        ) : (
          <p
            className="text-muted"
            style={{ fontSize: "15px", lineHeight: "1.7", color: "#666" }}
          >
            You have reached the client limit for the{" "}
            <strong style={{ color: "#333" }}>
              {userPlan?.package || "your"}
            </strong>{" "}
            plan. Please upgrade to the{" "}
            <strong style={{ color: "#333" }}>
              {plans[userPlan?.package]?.name || "next available"}
            </strong>{" "}
            plan to add more clients.
          </p>
        )}

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
  );
};

export default ClientLimitModal;
