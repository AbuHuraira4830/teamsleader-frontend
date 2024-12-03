import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./administration.css";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminLayout = () => {
  const { theme, isSidebarVisible } = useStateContext();

  useEffect(() => {
    document.body.className = theme;
    const pathname = window.location.pathname;
    const body = document.body;

    if (pathname.includes("/login") || pathname === "/signup") {
      body.classList.add("white_body");
    } else {
      body.classList.add("green_body");
    }
  }, [theme]);

  return (
    <div className="app-container flex">
      {/* Sidebar */}
      <div
        className={`admin-sidebar  ${
          isSidebarVisible ? "" : "collapsed-sidebar"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div
        className={`admin-main-content flex-grow ${
          isSidebarVisible ? "" : "expanded"
        }`}
      >
        <div className="p-6 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default AdminLayout;
