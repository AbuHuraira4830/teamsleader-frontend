import React from "react";
import "./userList.css"; // Make sure to create a CSS file for styles
import TeamsSideBar from "./TeamsSideBar";
import ContentTeams from "./ContentTeams";
const UserListComponent = () => {
  // You would have state and functions here to handle search, user actions, etc.

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <TeamsSideBar />
      <ContentTeams />
      {/* Table */}
    </div>
  );
};

export default UserListComponent;
