import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
import { Button, Card, Col, Row } from "react-bootstrap";
// import Navbar from "../navbar/Navbar";
// import RadioGroup from "../navbar/RadioGroup";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
// import { useStateContext } from "../../contexts/ContextProvider";
// import DynamicTable from "../navbar/RadioGroup";
import { useStateContext } from "../../../contexts/ContextProvider";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import ChatModule from "../../chats/ChatModule";
import { sendRequest } from "../../../assets/js/config";
import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../contexts/ChatsContext";
import Pusher from "pusher-js";

const pusher = new Pusher("0910daad885705576961", {
  cluster: "ap2",
  encrypted: true,
});
const ChatInbox = () => {
  const { theme, setTheme, isSidebarVisible, setIsSidebarVisible } =
    useStateContext();

  const {
    loginUserChats,
    setLoginUserChats,
    refreshData,
    setLoginUserId,
    setWorkspaceIndex,
    setOpenedPrivateUser,
    workspaceIndex,
    openedPrivateUser,
    setOpenedChannel,
  } = useChatsContext();
  const { workspaceId, user_Id, channel_Id, chat_Id } = useParams();
  console.log({
    workspaceId,
    user_Id,
    chat_Id,
    channel_Id,
  });

  console.log({ openedPrivateUser });

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

  const getLoginUserChatDetail = async () => {
    try {
      const response = await sendRequest(
        "workspaces/user",
        "GET",
        null,
        getLocalStorageItem("auth-token")
      );
      if (response.success) {
        console.log({ response });
        setLoginUserId(response.userId);
        setLoginUserChats(response?.workspaces);
        // Find the index of the workspace with matching ID
        const index = response?.workspaces.findIndex(
          (workspace) => workspace._id === workspaceId
        );
        setWorkspaceIndex(index);

        if (workspaceIndex !== -1) {
                  const currentWorkspace = response?.workspaces[index];

           if (channel_Id) {
          const targetChannel = currentWorkspace?.channels.find(
            (channel) => channel._id === channel_Id
          );

          if (targetChannel) {
            console.log("Target channel:", targetChannel);
            // Set the target channel or use it as needed
            setOpenedChannel(targetChannel);
          }
        }

        // If user_Id is provided, find the member whose _id matches the user_Id
        if (user_Id) {
          const matchingMember = currentWorkspace?.members.find(
            (member) => member._id === user_Id
          );

          if (matchingMember) {
            console.log("Matching member:", matchingMember);
            // Set the matching member or use it as needed
            setOpenedPrivateUser(matchingMember);
          }
        }}
      } else {
        console.log({ response });
      }
    } catch (err) {
      console.error({ error: err });
    }
  };
  console.log({ loginUserChats });
  useEffect(() => {
    getLoginUserChatDetail();
  }, [refreshData]);
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
          className={`ml-[16.5rem] mr-5  ${
            isSidebarVisible ? "" : "expanded"
          } `}
        >
          <ChatModule getLoginUserChatDetail={getLoginUserChatDetail} />
        </div>
      </div>
    </>
    // </Router>
  );
};

export default ChatInbox;
