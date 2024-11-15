import React, { useState } from "react";
import { Button } from "antd";
import { FaUserPlus, FaUserTie } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ClientListItem from "./ClientListItem"; // Assuming you want to display this when not adding new

const ClientInvite = () => {
  const navigate = useNavigate();
  const { workspaceID, teamID } = useParams(); // If workspaceID and teamID are part of the URL

  const handleAddEmployeeClick = () => {
    // Navigate to the add employee page
    navigate(
      `/workspace/${workspaceID}/team/${teamID}/teams-invites/add-client`
    );
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          className="workspace_addBtn flex items-center"
          onClick={handleAddEmployeeClick}
          icon={<FaUserPlus />}
        >
          Add Client
        </Button>
      </div>
      <ClientListItem />
    </div>
  );
};

export default ClientInvite;
