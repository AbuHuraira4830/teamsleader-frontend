import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import EmailVerification from "./EmailVerification";
import InviteTeam from "./InviteTeam";
import HomeCustomization from "./HomeCustomization";
import { getAPI } from "./api"; // Adjust the import according to your project structure
import MainLayout from "./MainLayout"; // Adjust the import according to your project structure
import ForgetPassword from "./teamsLeader/Pages/forgetPassword/ForgetPassword";

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const [workspaceID, setWorkspaceID] = useState(null);
  const [teamID, setTeamID] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAPI("/api/user/get-user-from-token")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data._doc);
          getAPI("/api/workspace/list")
            .then((response) => {
              const firstWorkspaceID = response.data.workspaces[0]._id;
              const firstTeamID = response.data.workspaces[0].teams[0]._id;
              setWorkspaceID(firstWorkspaceID);
              setTeamID(firstTeamID);
              if (!workspaceID || !teamID) {
                navigate(`/workspace/${firstWorkspaceID}/team/${firstTeamID}`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setUser(null);
          return navigate("/login");
        }
        console.log(e.response.data.message);
      });
  }, [navigate, workspaceID, teamID]);

  if (!workspaceID || !teamID) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Home workspaceID={workspaceID} teamID={teamID} user={user} />
          }
        />
        <Route
          path="/workspace/:workspaceID/team/:teamID"
          element={
            <Home workspaceID={workspaceID} teamID={teamID} user={user} />
          }
        />
        <Route
          path="/workspace/:workspaceID"
          element={
            <Home workspaceID={workspaceID} teamID={teamID} user={user} />
          }
        />
        <Route path="/verify-email/:id" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/invite-team" element={<InviteTeam />} />
        <Route path="/home-customization" element={<HomeCustomization />} />
        <Route path="/home-customization2" element={<HomeCustomization2 />} />
        <Route path="/popover" element={<PopoverStatus />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/inbox" element={<ChatInbox />} />
        <Route path="/inbox/:workspaceId/:chatId" element={<ChatInbox />} />
        <Route path="/inbox/:workspaceId" element={<ChatInbox />} />
        <Route path="/first-pusher" element={<FirstPusher />} />
        <Route path="/first-pusher/:workspaceId" element={<FirstPusher />} />
        <Route path="/second-pusher" element={<SecondPusher />} />
        <Route path="/manage-teams/*" element={<TeamsMain />} />
        <Route path="/invoices" element={<InvoicesMain />} />
        <Route path="/invoices/create" element={<CreateInvoiceWrapper />} />
        {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
        <Route
          path="/workspace/:workspaceID/team/:teamID/teams-invites"
          element={<InviteTeamsMain />}
        />
        <Route path="/new-post" element={<PostEditorWrapper />} />
      </Route>
    </Routes>
  );
};

export default AppWrapper;
