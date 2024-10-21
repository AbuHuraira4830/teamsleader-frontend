import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email"; // Assuming you want to use an icon

const EmailTemplateDialog = ({ setPreviewOpen, isPreviewOpen, emailData }) => {
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  const getInitials = (fullName) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={isPreviewOpen} onClose={handleClosePreview} maxWidth="md">
      <DialogActions>
        <IconButton onClick={handleClosePreview} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle>Email Preview</DialogTitle>
      <DialogContent>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            margin: "10px",
          }}
        >
          {/* Logo and Initials */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{ color: "#333", fontSize: "24px", fontWeight: "normal" }}
            >
              TEAMSLEADER
            </h1>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "orange",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {getInitials(emailData.fullName)}
            </div>
          </div>

          {/* Email Body */}
          <p style={{ color: "#555", fontSize: "16px", margin: "10px 0" }}>
            Usman Yousaf invited you to collaborate on "
            <strong>{emailData.title}</strong>" in{" "}
            <strong>teamsleader.com</strong>
          </p>

          {/* Personal Note Section */}
          {emailData.personalNote && (
            <div
              style={{
                backgroundColor: "#FFFFE0",
                padding: "15px",
                borderRadius: "5px",
                margin: "20px 0",
              }}
            >
              <p style={{ margin: 0 }}>{emailData.personalNote}</p>
            </div>
          )}

          {/* Button (Non-functional in the preview) */}
          <div style={{ margin: "20px 0" }}>
            <a
              href="#"
              style={{
                display: "inline-block",
                textDecoration: "none",
                backgroundColor: "#00854d",
                color: "white",
                padding: "15px 30px",
                borderRadius: "5px",
                fontSize: "18px",
              }}
            >
              Accept Invitation
            </a>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: "15px",
              color: "#999",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            <p>
              teamsleader.com is the Work OS that powers teams to run projects
              and workflows with confidence.
            </p>
            <p className="mb-[0.5rem]">
              Your Account's URL: <br />
              <strong>
                <a href="https://example.com">https://example.com</a>
              </strong>
            </p>

            <p>
              Your Login Email: <br /> <strong>{emailData.email}</strong>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplateDialog;
