import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./teamsLeader/navbar/Navbar";
import { useStateContext } from "./contexts/ContextProvider";
import { AiOutlineBug, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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
import Loader from "./Loader";

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
  const { workspaceID } = useParams();

  const [height, setHeight] = useState(getHeight());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getHeight() {
    const width = window.innerWidth;
    if (width < 375) {
      return "390vh";
    } else if (width < 426) {
      return "350vh";
    } else if (width > 426) {
      return "";
    } else {
      return "";
    }
  }

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

  useEffect(() => {
    const fetchWorkspacesAndRedirect = async () => {
      try {
        const response = await axios.get("/api/user/get-user-from-token");
        if (response.status === 200) {
          setIsAuthenticated(true);

          // Fetch user workspaces
          const workspacesResponse = await axios.get("/api/workspace/list");
          const workspaces = workspacesResponse.data.workspaces;

          if (workspaces.length > 0) {
            const firstWorkspace = workspaces[0];
            const firstTeam =
              firstWorkspace.teams.length > 0 ? firstWorkspace.teams[0] : null;

            // Navigate to the first workspace and team (if available)
            if (!workspaceID || workspaceID === "undefined") {
              if (firstTeam) {
                navigate(
                  `/workspace/${firstWorkspace._id}/team/${firstTeam._id}`,
                  { replace: true }
                );
              } else {
                navigate(`/workspace/${firstWorkspace._id}`, { replace: true });
              }
            }
          } else {
            console.error("No workspaces available for this user.");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (
      location.pathname === "/" ||
      location.pathname === "/workspace/undefined"
    ) {
      fetchWorkspacesAndRedirect();
    } else {
      setLoading(false);
    }
  }, [navigate, location.pathname, workspaceID]);

  if (loading) {
    return <Loader />;
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

  return (
    <div className={`position-relative ${theme}`}>
      <div className="Navbar py-1 w-100" style={{ zIndex: 999 }}>
        <Navbar />
      </div>
      <div className="dashboard-container">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarVisible ? "" : "collapse_sidebar"}`}
        >
          <Sidebar />
        </div>

        {/* Toggle Button */}

        {/* Main Content */}
        <div className={`main-content ${isSidebarVisible ? "" : "expanded"}`}>
          <div className="respon">
            {!isSidebarVisible && (
              <div
                className="sidebar_toggleBtn position-absolute"
                style={{ top: "0", left: "16px" }}  
              >
                <button onClick={toggleNavbar} className="toggle-btn">
                  <AiOutlineRight className="icon" />
                </button>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
