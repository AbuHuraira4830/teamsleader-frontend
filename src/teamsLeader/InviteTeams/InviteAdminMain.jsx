import React, { useEffect } from "react";
import InviteAdmin from "./InviteAdmin"; // Adjust the import according to your project structure
import { useStateContext } from "../../contexts/ContextProvider";

const InviteAdminMain = () => {
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
    <div
      className={`main-content ${
        isSidebarVisible ? "" : "expanded"
      } h-screen mb-8 overflow-auto`}
    >
      <InviteAdmin role="admin" />
    </div>
  );
};

export default InviteAdminMain;
