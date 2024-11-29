import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const DowngradeAlert = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay effect
        zIndex: 1051, // Higher than the modal
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          padding: "24px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FaTimes size={24} />
        </button>
        <div className="text-center" style={{ color: "#42464d" }}>
          <p
            style={{
              fontSize: "22px",
              fontWeight: "700",
              paddingBottom: "12px",
              color: "#1e1f21",
            }}
          >
            Downgrade Not Allowed
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#676e74",
              paddingBottom: "12px",
            }}
          >
            {message}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1f76c2",
              paddingBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Please adjust your usage to fit within the limits of the selected
            plan or consider upgrading.
          </p>
          <button
            className="workspace_addBtn border-0 fs_14 mb-3"
            style={{
              borderRadius: "4px",
              backgroundColor: "#1f76c2",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              display: "inline-flex",
              gap: "8px",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <BsStars size={18} /> Adjust Usage
          </button>
        </div>
      </div>
    </div>
  );
};

export default DowngradeAlert;
