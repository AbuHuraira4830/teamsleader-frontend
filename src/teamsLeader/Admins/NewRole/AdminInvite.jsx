import React, { useState } from "react";
import AddNewRole from "./AddNewRole";
import AdminListItem from "./AdminListItem"; // This will be the component for showing the list of admins
import { Button } from "antd";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const AdminInvite = () => {
  const navigate = useNavigate();

  const { workspaceID, teamID } = useParams(); // If workspaceID and teamID are part of the URL

  const handleAddAdminClick = () => {
    // Navigate to the add employee page
    navigate(
      `/workspace/${workspaceID}/team/${teamID}/teams-invites/add-admin`
    );
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          className="workspace_addBtn flex items-center"
          onClick={handleAddAdminClick}
          icon={<FaUserPlus />}
        >
          Add Admin
        </Button>
      </div>
      <AdminListItem />
    </div>
  );
};

export default AdminInvite;
