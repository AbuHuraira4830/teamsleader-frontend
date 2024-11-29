import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./teamsLeader/navbar/Navbar";
import { useStateContext } from "./contexts/ContextProvider";
import Sidebar from "./teamsLeader/sidebar/Sidebar";
import { getAPI } from "./helpers/apis";
import axios from "axios"; // If you're using axios
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import TrialExpireModal from "./modals/TrialExpireModal";

const MainLayout = () => {
  const { theme, isSidebarVisible, setIsSidebarVisible, selectedTeam } =
    useStateContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trialExpired, setTrialExpired] = useState(false); // New state for trial status
  const navigate = useNavigate();
  const location = useLocation();
  const [showExpiredModal, setShowExpiredModal] = useState(false); // Control showing the modal
  const [expiredPlan, setExpiredPlan] = useState(null); // Store the type of expired plan

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get("/api/user/get-user-from-token");
        if (response.status === 200) {
          setIsAuthenticated(true);

          // After user is authenticated, check if their plan has expired
          const planResponse = await axios.get("/api/check-plan-status");
          const { planExpired, expiredPlan } = planResponse.data;
          console.log("planExpired", planExpired);

          if (planExpired) {
            setShowExpiredModal(true); // Trigger modal if the plan is expired
            setExpiredPlan(expiredPlan); // Set the expired plan type ("trial", "freelancer", "business")
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          if (location.pathname !== "/login") {
            navigate("/login");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname !== "/login") {
      checkUserAuthentication();
    } else {
      setLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const checkTrialStatus = async () => {
      try {
        const response = await axios.get("/api/check-trial-status");
        const { trialExpired } = response.data;
        console.log("trialExpired", trialExpired);

        setTrialExpired(trialExpired);
      } catch (error) {
        console.error("Error fetching trial status:", error);
      }
    };

    if (isAuthenticated) {
      checkTrialStatus();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && location.pathname !== "/login") {
    return null;
  }

  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const navbarClass =
    selectedTeam?.role === "employee"
      ? "navbar-blue"
      : selectedTeam?.role === "client"
      ? "navbar-red"
      : selectedTeam?.role === "admin"
      ? "navbar-gray"
      : "";

  const { workspaceID } = useParams();

  return (
    <div className={`app-container flex h-screen ${theme}`}>
      <div
        className={`Navbar py-1 w-100 ${navbarClass}`}
        style={{ zIndex: 999 }}
      >
        <Navbar />
      </div>
      <div className={`sidebar ${isSidebarVisible ? "" : "collapse_sidebar"}`}>
        <Sidebar
          toggleNavbar={toggleNavbar}
          workspaceID={workspaceID}
          isSidebarVisible={isSidebarVisible}
        />
      </div>
      <div
        className={`flex-grow flex ${
          isSidebarVisible ? "" : "expanded"
        } overflow-hidden`}
      >
        <Outlet />
      </div>
      {/* {showExpiredModal && <TrialExpireModal expiredPlan={expiredPlan} />} */}
    </div>
  );
};

export default MainLayout;
