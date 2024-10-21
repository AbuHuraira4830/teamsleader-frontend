import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserListComponent from "./UserListComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./UserInfo";

const TeamsMain = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } =
    useStateContext();

  const location = useLocation();
  const isAdminRoute = location.pathname === "/manage-teams/user";

  useEffect(() => {
    document.body.className = theme;
    var pathname = window.location.pathname;
    var body = document.body;

    if (pathname.includes("/login") || pathname === "/signup") {
      body.classList.add("white_body");
    } else {
      body.classList.add("green_body");
    }
  }, [theme]);

  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {!isAdminRoute && (
        <>
          <div className="Navbar p-0 w-100 py-1" style={{ zIndex: 999 }}>
            <Navbar setTheme={setTheme} />
          </div>
          <div className="app-container flex  ">
            <div
              className={`sidebar ${
                isSidebarVisible ? "" : "collapse_sidebar"
              }`}
            >
              <Sidebar
                toggleNavbar={toggleNavbar}
                isSidebarVisible={isSidebarVisible}
              />
            </div>
            <div
              className={` h-auto main-content   ${
                isSidebarVisible ? "" : "expanded"
              } `}
            >
              {/* <NewInvoice /> */}
              <UserListComponent />
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path="user" element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default TeamsMain;
