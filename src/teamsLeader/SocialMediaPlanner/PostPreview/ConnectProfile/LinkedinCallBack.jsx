import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LinkedinCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      // Exchange authorization code for access token
      axios
        .post("api/planner/linkedin/token", { code })
        .then((response) => {
          const accessToken = response.data.access_token;

          // Store the access token in localStorage
          localStorage.setItem("linkedin_access_token", accessToken);

          // Redirect to the previous page or any other page
          navigate("/new-post");
        })
        .catch((error) => {
          console.error("Error exchanging authorization code:", error);
          // Handle error case here, e.g., show an error message to the user
        });
    }
  }, [location, navigate]);

  return <div>Authenticating LinkedIn...</div>;
};

export default LinkedinCallback;
