import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import leaf from "../../assets/images/leaf_pass.png";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const InviteTeamTopBar = ({ teamName, onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e6e9ef",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={leaf}
          alt="Logo"
          className="mr-2"
          style={{ height: "48px" }}
        />
        <h2 className="text-[2rem] ">
          {teamName && (
            <>
              <b>{teamName}</b>
            </>
          )}
        </h2>
      </div>
      <div>
        <Tooltip title="Close" placement="top">
          <Link
            to="/"
            className=" no-underline	text-[#211f1f] hover:bg-gray-300 px-1 py-0 rounded"
          >
            <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default InviteTeamTopBar;
