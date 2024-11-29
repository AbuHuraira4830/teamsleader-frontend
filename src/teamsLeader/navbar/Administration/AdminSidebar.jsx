import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  FaCog,
  FaUsers,
  FaShieldAlt,
  FaLink,
  FaChartBar,
  FaFolder,
  FaLayerGroup,
  FaTasks,
  FaThList,
} from "react-icons/fa";

const AdminSidebar = () => {
  const { workspaceID, teamID } = useParams();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-[#c6e9d5]" : "";
  };

  return (
    <div className="h-full p-4 text-gray-700 bg-white shadow-md ">
      <h2 className="mb-4 text-2xl font-bold">Administration</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/general`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/general`
            )}`}
          >
            <FaCog />
            <span>General</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/customization`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/customization`
            )}`}
          >
            <FaTasks />
            <span>Customization</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/users`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/users`
            )}`}
          >
            <FaUsers />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/security`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/security`
            )}`}
          >
            <FaShieldAlt />
            <span>Security</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/connections`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/connections`
            )}`}
          >
            <FaLink />
            <span>Connections</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/billing`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/billing`
            )}`}
          >
            <FaChartBar />
            <span>Billing</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/usage-stats`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/usage-stats`
            )}`}
          >
            <FaChartBar />
            <span>Usage stats</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/tidy-up`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/tidy-up`
            )}`}
          >
            <FaThList />
            <span>Tidy Up</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/content-directory`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/content-directory`
            )}`}
          >
            <FaFolder />
            <span>Content directory</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/apps`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/apps`
            )}`}
          >
            <FaLayerGroup />
            <span>Apps</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/administration/permissions`}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive(
              `/workspace/${workspaceID}/team/${teamID}/administration/permissions`
            )}`}
          >
            <FaShieldAlt />
            <span>Permissions</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
