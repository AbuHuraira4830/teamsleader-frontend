import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./teamsLeader/Home/Home";
import "./app.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import Login from "./teamsLeader/Pages/Login/Login";
// import Signup from "./teamsLeader/Pages/Signup.jsx/SignUp";
import InviteTeam from "./teamsLeader/Pages/InviteTeam/InviteTeam";
import HomeCustomization from "./teamsLeader/Pages/homeCustmizingPage/homeCustomization";
import HomeCustomization2 from "./teamsLeader/Pages/homeCustmizingPage/HomeCustomization2";
import PasswordManger from "./passwordManager/PasswordManger";
import PopoverStatus from "./teamsLeader/Pages/NewTeam/Components/Kanban Components/SubComp/PopoverStatus";
import Testing from "./Testing";
import ChatInbox from "./teamsLeader/Pages/ChatInbox/ChatInbox";
import FirstPusher from "./teamsLeader/chats/pusher/FirstPusher";
import SecondPusher from "./teamsLeader/chats/pusher/SecondPusher";
// =-==================================================================
import "react-toastify/dist/ReactToastify.css";
import InviteTeamsMain from "./teamsLeader/InviteTeams/InviteTeamsMain";
import InvoicesMain from "./teamsLeader/Invoices/InvoicesMain";
import CreateInvoiceWrapper from "./teamsLeader/Invoices/CreateInvoiceWrapper";
import TeamsMain from "./teamsLeader/ManageTeams/TeamsMain";
import PostEditorWrapper from "./teamsLeader/SocialMediaPlanner/PostPreview/PostEditorWrapper";

import Signup from "./teamsLeader/Pages/Signup/index.jsx";
import EmailVerification from "./teamsLeader/Pages/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "./teamsLeader/Pages/NewTeam/Components/Kanban Components/Main.jsx";

import PasswordTable from "./teamsLeader/Pages/PasswordsTable/PasswordTable.jsx";
import Proposals from "./teamsLeader/Pages/proposals/Proposals.jsx";
import TestCkEditor from "./teamsLeader/proposals/components/DropableComponents/TestCkEditor.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace/:workspaceID/team/:teamID" element={<Home />} />
        <Route path="/workspace/:workspaceID" element={<Home />} />
        <Route path="/verify-email/:id" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/invite-team" element={<InviteTeam />} />
        <Route path="/home-customization" element={<HomeCustomization />} />
        <Route path="/home-customization2" element={<HomeCustomization2 />} />
        {/* <Route path="/password-managment" element={<PasswordTable />} /> */}
        <Route path="/popover" element={<PopoverStatus />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/inbox" element={<ChatInbox />} />
        <Route
          path="/inbox/:workspaceId/:user_Id/:chat_Id"
          element={<ChatInbox />}
        />
        <Route path="/inbox/:workspaceId" element={<ChatInbox />} />
        <Route path="/inbox/:workspaceId/:channel_Id" element={<ChatInbox />} />
        <Route path="/first-pusher" element={<FirstPusher />} />
        <Route path="/first-pusher/:workspaceId" element={<FirstPusher />} />
        <Route path="/kanban-demo" element={<SecondPusher />} />
        {/* <Route path="*" element={<div>Page not found</div>} /> */}
        {/* ================================================================ */}
        <Route path="/manage-teams/*" element={<TeamsMain />} />{" "}
        <Route path="/invoices" element={<InvoicesMain />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/invoices/create" element={<CreateInvoiceWrapper />} />
        <Route path="/teams-invites" element={<InviteTeamsMain />} />
        <Route path="/new-post" element={<PostEditorWrapper />} />
        <Route path="/test-ckeditor" element={<TestCkEditor />} />
        {/* <Route path="/calendar" element={<CalendarWrapper />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
