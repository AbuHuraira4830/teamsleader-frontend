import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import PostEditor from "./PostEditor";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useLocation } from "react-router-dom";


const PostEditorWrapper = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } = useStateContext();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

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
    <>
      <div className="app-container flex">
        {/* <div
          className={`main-content ${
            isSidebarVisible ? "" : "expanded"
          } h-auto mb-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
        > */}
          <PostEditor />
        </div>
      {/* </div> */}
    </>
  );
};


export default PostEditorWrapper;
