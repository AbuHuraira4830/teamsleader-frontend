import React, { useState } from "react";
import { Button } from "antd";
import { FaUserPlus, FaUserTie } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeListItem from "./EmployeeListItem"; // Assuming you want to display this when not adding new

const EmployeeInvite = () => {
  const navigate = useNavigate();
  const { workspaceID, teamID } = useParams(); // If workspaceID and teamID are part of the URL

  const handleAddEmployeeClick = () => {
    // Navigate to the add employee page
    navigate(
      `/workspace/${workspaceID}/team/${teamID}/teams-invites/add-employee`
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
          Add Employees
        </Button>
      </div>
      <EmployeeListItem />
    </div>
  );
};

export default EmployeeInvite;
