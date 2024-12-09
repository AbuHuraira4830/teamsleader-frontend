import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import React, { useEffect, useState } from "react";
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
import { getAPI } from "./helpers/apis";
import { useStateContext } from "./contexts/ContextProvider.jsx";
import YoutubeCallback from "./teamsLeader/SocialMediaPlanner/PostPreview/ConnectProfile/YoutubeCallback.jsx";
import LinkedinCallBack from "./teamsLeader/SocialMediaPlanner/PostPreview/ConnectProfile/LinkedinCallBack.jsx";
import MainLayout from "./MainLayout"; // Adjust the import according to your project structure
import AdminLayout from "./teamsLeader/navbar/Administration/AdminLayout.jsx";
import Billing from "./teamsLeader/navbar/Administration/Billing.jsx";
import AdminControls from "./teamsLeader/navbar/Administration/AdminControls/AdminControls.jsx";
import InviteEmployeeMain from "./teamsLeader/InviteTeams/InviteEmployeeMain.jsx";
import InviteClientMain from "./teamsLeader/InviteTeams/InviteClientMain.jsx";
import InviteAdminMain from "./teamsLeader/InviteTeams/InviteAdminMain.jsx";
import PermissionControl from "./teamsLeader/navbar/Administration/PermissionControls/PermissionControl.jsx";
import TrialExpireModal from "./modals/TrialExpireModal.jsx";
import AuthGuard from "./AuthGuard.jsx";
import Proposals from "./teamsLeader/Pages/proposals/Proposals.jsx";
// import Login from "./teamsLeader/Pages/Login/Login";
import TestCkEditor from "../src/teamsLeader/proposals/components/DropableComponents/TestCkEditor.jsx";
const AppWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <App />
           </AuthGuard> 
          }
        />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      {/* <Route index element={<Navigate to="/workspace/undefined" replace />} /> */}

        <Route path="/workspace/:workspaceID/team/:teamID" element={<Home />} />
        <Route path="/workspace/:workspaceID" element={<Home />} />
        {/* <Route path="/workspace/:workspaceID" element={<Home />} /> */}
        {/* <Route
          path="/workspace/:workspaceID/team/:teamID"
          element={<TrialExpireModal />}
        /> */}
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
        <Route
          path="/workspace/:workspaceID/team/:teamID/teams-invites"
          element={<InviteTeamsMain />}
        />
        <Route
          path="/workspace/:workspaceID/team/:teamID/teams-invites/add-employee"
          element={<InviteEmployeeMain />}
        />
        <Route
          path="/workspace/:workspaceID/team/:teamID/teams-invites/add-client"
          element={<InviteClientMain />}
        />
        <Route
          path="/workspace/:workspaceID/team/:teamID/teams-invites/add-admin"
          element={<InviteAdminMain />}
        />
        <Route path="/new-post" element={<PostEditorWrapper />} />
        <Route path="/new-post/youtube" element={<YoutubeCallback />} />
        <Route path="/linkedin/callback" element={<LinkedinCallBack />} />
        <Route
          path="/workspace/:workspaceID/team/:teamID/administration/*"
          element={<AdminLayout />}
        >
          <Route path="billing" element={<Billing />} />
          <Route path="users" element={<AdminControls />} />
          <Route path="permissions" element={<PermissionControl />} />
          {/* Add other administration routes here */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppWrapper;
