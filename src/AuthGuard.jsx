import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { getAPI } from "./helpers/api";
import Loader from "./Loader";
const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Send the token to the backend for validation
          const response = await axios.get("/api/user/get-user-from-token", {
            headers: {
              Authorization: token,
            },
          });

          if (response && response.status === 200) {
            setIsAuthenticated(true);
          } else {
            throw new Error("Unauthorized");
          }
        } else {
          throw new Error("No token");
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (location.pathname !== "/login") {
          navigate("/login");
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

  if (loading) {
    return <Loader />;
  }
  

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
