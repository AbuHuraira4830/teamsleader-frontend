import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const YoutubeCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refreshToken = queryParams.get("refresh_token");

    if (refreshToken) {
      // Save the refresh token to localStorage
      localStorage.setItem("youtube_refresh_token", refreshToken);
      // Close the tab
      window.close();
    } else {
      // Close the tab even if it fails
      window.close();
    }
  }, [location.search]);

  return null;
};

export default YoutubeCallback;
