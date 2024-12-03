import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { FiTrash, FiEdit, FiChevronUp } from "react-icons/fi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import OffCanvasBillingCard from "./OffCanvasBillingCard";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { useNavigate,useParams } from "react-router-dom";

import OfCanvasCard from "../../../Pages/NewTeam/Components/OffCanvasCard";
const BillingOverview = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { workspaceID, teamID } = useParams();
  const {userEmail} = useStateContext();

  // Fetch card info when component mounts or user changes
  const fetchCardInfo = async () => {
    try {
      const response = await fetch(
        `https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com/card-info/${userEmail}`
      );
      const data = await response.json();
      console.log("Fetched card data:", data);

      if (response.ok) {
        setCards(data.cards);
        if (data.cards.length > 0) {
          setActiveCard(data.cards[0]); // Set the first card as active
        }
      } else {
        console.error("Failed to fetch card details:", data.error);
        setSnackbarMessage("Failed to load card details.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      setSnackbarMessage("Error loading card details.");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchCardInfo();
  }, [userEmail]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleAddCard = (newCard) => {
    if (cards.length < 5) {
      setCards([...cards, newCard]);
      handleCloseAdd();
      setSnackbarMessage("New card added successfully.");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Maximum of 5 cards allowed");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const formatCardNumber = (last4) => {
    return `**** **** **** ${last4}`;
  };

  return (
    <div className="p-6 bg-white">
      {/* Overview Header */}
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* Plan Details Section */}
      <h3 className="font-medium text-lg mb-2">Plan details</h3>
      <div className="border p-6 rounded-lg mb-8 shadow-sm transition-transform transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-gray-600">Current plan</div>
            <div className="text-lg font-medium">Business 199€/mo</div>
          </div>
          <Button
            className="border-none flex justify-center items-center workspace_addBtn text-white px-4 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
            onClick={() => navigate(`/workspace/${workspaceID}/team/${teamID}/plans`)}
          >
            Upgrade now
          </Button>
        </div>
        <div className="flex space-x-8">
          <div>
            <div className="text-gray-600">Status</div>
            <div className="text-base font-medium">Active</div>
          </div>
          <div>
            <div className="text-gray-600">Trial days left</div>
            <div className="text-base font-medium">14</div>
          </div>
        </div>
      </div>

      {/* Active Card Details Section */}
      {activeCard && (
        <div>
          <h3 className="font-medium text-lg mb-2">Primary Card Details</h3>
          <div className="border p-6 rounded-lg mb-6 shadow-sm transition-transform transform hover:scale-105">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <div className="text-gray-600">Card Brand</div>
                <div className="text-base font-medium">{activeCard.brand}</div>
              </div>
              <div>
                <div className="text-gray-600">Card Number</div>
                <div className="text-base font-medium">{formatCardNumber(activeCard.last4)}</div>
              </div>
              <div>
                <div className="text-gray-600">Expiry Date</div>
                <div className="text-base font-medium">
                  {activeCard.exp_month}/{activeCard.exp_year}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Country</div>
                <div className="text-base font-medium">{activeCard.country}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Cards Section */}
      <h3 className="font-medium text-lg">Manage Cards</h3>
      <div className="border p-6 rounded-lg shadow-sm mb-6">
        {cards.map((card, index) => (
          <div key={card._id} className="mb-4">
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <div className="text-gray-600">
                  {index === 0
                    ? "Primary Card"
                    : index === 1
                    ? "Second Card"
                    : index === 2
                    ? "Third Card"
                    : index === 3
                    ? "Fourth Card"
                    : "Fifth Card"}
                </div>
                <div className="text-base font-medium">{formatCardNumber(card.last4)}</div>
              </div>
              <div>
                <div className="text-gray-600">Card Brand</div>
                <div className="text-base font-medium">{card.brand}</div>
              </div>
            </div>
            <div className="flex justify-end">
              <Popover
                content={<div>Card actions here</div>}
                trigger="click"
                open={openPopover === index}
                onOpenChange={(newOpen) => setOpenPopover(newOpen ? index : null)}
              >
                <Button className="p-2 workspace_menuBtn bgHover">
                  <BsThreeDots />
                </Button>
              </Popover>
            </div>
          </div>
        ))}
        {cards.length < 5 && (
          <div className="flex justify-end mt-2">
            <Button
              onClick={handleShowAdd}
              className="workspace-dropdown-button d-flex items-center py-1 px-2"
            >
              Add New Card
            </Button>
          </div>
        )}
      </div>

      {/* Add Card Offcanvas */}
      <OfCanvasCard show={showAdd} handleClose={handleCloseAdd} handleAddCard={handleAddCard} />

      {/* Snackbar for Alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BillingOverview;
