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
      <div
        className={`h-auto main-content ${isSidebarVisible ? "" : "expanded"}`}
      >
        <div className="flex h-screen ml-[2rem] w-[89%]">
          <div className="w-64 flex-shrink-0 bg-white shadow-md fixed h-screen">
            <AdminSidebar />
          </div>
          <div className="flex-grow p-6 ml-64 h-screen overflow-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
