import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { Button, Card, Col, Row } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import RadioGroup from "../navbar/RadioGroup";
import { NewTeam } from "../Pages/NewTeam/NewTeam";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { useStateContext } from "../../contexts/ContextProvider";
import WeekCell from "../Pages/NewTeam/Components/Table components/WeekCell";
import DynamicTable from "../navbar/RadioGroup";
import Login from "../Pages/Login/Login";
import NewInvoice from "./NewInvoice";
const InvoicesMain = () => {
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
      <div className=" flex  justify-center">
       
        {/* <div className={`main-content  ${isSidebarVisible ? "" : "expanded"} `}> */}
          <NewInvoice />
        {/* </div> */}
      </div>
    </>
  );
};

export default InvoicesMain;
