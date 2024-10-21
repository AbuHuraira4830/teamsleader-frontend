import React, { useEffect, useState } from "react";
import {

  useParams,
} from "react-router-dom";

import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../contexts/ChatsContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Main from "../../Pages/NewTeam/Components/Kanban Components/Main";

const SecondPusher = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } =
    useStateContext();


  const { workspaceId, user_Id, chat_Id } = useParams();
  
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


  // console.log({ refreshData });


  //  useEffect(() => {
  //    // Subscribe to Pusher channel for workspace updates
  //    const channel = pusher.subscribe(`workspace-${workspaceId}`);
  //    channel.bind("workspace-updated", (data) => {
  //      // Handle workspace update event
  //      console.log("Workspace Updated:", data);
  //      // Update state or perform any necessary actions
  //    });

  //    return () => {
  //      // Unsubscribe from Pusher channel when component unmounts
  //      channel.unbind_all();
  //      channel.unsubscribe();
  //    };
  //  }, [workspaceId]);
  return (
    // <Router>
    <>
      <div className="Navbar p-0 w-100 py-1" style={{ zIndex: 999 }}>
        <Navbar setTheme={setTheme} />
      </div>

      <div className="app-container flex">
        <div
          className={`sidebar ${isSidebarVisible ? "" : "collapse_sidebar"}`}
        >
          <Sidebar
            toggleNavbar={toggleNavbar}
            isSidebarVisible={isSidebarVisible}
          />
        </div>
        <div
          className={`ml-[16.5rem] mr-5  mt-20 ${
            isSidebarVisible ? "" : "expanded"
          } `}
        >
         <Main/>
        </div>
      </div>
    </>
    // </Router>
  );
};

export default SecondPusher;
