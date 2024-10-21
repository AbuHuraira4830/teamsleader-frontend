import React, { useEffect } from "react";
import Sidebar from "../teamsLeader/sidebar/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../teamsLeader/navbar/Navbar";
import PasswordHeader from "./PasswordHeader";
const PasswordManger = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } =
    useStateContext();
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
      <div className="Navbar p-0 w-100 py-1" style={{ zIndex: 999 }}>
        <Navbar setTheme={setTheme} />
      </div>
      <div className="app-container flex  ">
        <div
          className={`sidebar ${isSidebarVisible ? "" : "collapse_sidebar"}`}
        >
          <Sidebar
            toggleNavbar={toggleNavbar}
            isSidebarVisible={isSidebarVisible}
          />
        </div>
        <div className={`main-content  ${isSidebarVisible ? "" : "expanded"} `}>
          <PasswordHeader />
        </div>
      </div>
    </>
  );
};

export default PasswordManger;
