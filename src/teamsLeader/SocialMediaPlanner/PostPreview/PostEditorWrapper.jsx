import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import PostEditor from "./PostEditor";
import { useStateContext } from "../../../contexts/ContextProvider";

const PostEditorWrapper = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } =
    useStateContext();
  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

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
        <div
          className={`main-content ${
            isSidebarVisible ? "" : "expanded"
          } h-auto mb-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
        >
          <PostEditor />
        </div>
      </div>
    </>
  );
};

export default PostEditorWrapper;
