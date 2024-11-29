import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useLocation } from "react-router-dom";


const platforms = [
  {
    name: "Facebook",
    icon: <FaFacebook className="text-blue-500" />,
    color: "rgb(33, 123, 238)",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-pink-500" />,
    color: "rgb(225, 48, 108)",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-blue-700" />,
    color: "rgb(0, 119, 181)",
  },
  {
    name: "X",
    icon: <FaXTwitter className="text-black" />,
    color: "rgb(0, 0, 0)",
  },
  {
    name: "TikTok",
    icon: <FaTiktok className="text-black" />,
    color: "rgb(0, 0, 0)",
  },
  {
    name: "YouTube",
    icon: <FaYoutube className="text-red-600" />,
    color: "rgb(255, 0, 0)",
  },
  {
    name: "Pinterest",
    icon: <FaPinterest className="text-red-600" />,
    color: "rgb(189, 8, 28)",
  },
];
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ProfileConnectionCards = ({
  handleCloseCanvas,
  addLinkedAccount,
  setShowChannelsCanvas,
}) => {
  const location = useLocation();

  const [connectedProfiles, setConnectedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingProfile, setIsGettingProfile] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [linedinAccessCode, setLinkedinAccessCode] = useState();
  

  const handleConnect = async (platform) => {
    if (platform === "YouTube") {
      setIsLoading(true);
      const newWindow = window.open(
        "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/api/planner/youtube/login",
        "_blank"
      );

      const interval = setInterval(async () => {
        if (newWindow.closed) {
          clearInterval(interval);
          const refreshToken = localStorage.getItem("youtube_refresh_token");
          if (refreshToken) {
            setIsGettingProfile(true);
            // let bodyContent = JSON.stringify({ refreshToken: refreshToken });
            // let response = await fetch(
            //   "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/api/planner/youtube/profile",
            //   {
            //     method: "POST",
            //     body: bodyContent,
            //     headers: { "Content-Type": "application/json" },
            //   }
            // );
            // let data = await response.json();
            // const profile = {
            //   platform: "YouTube",
            //   name: data.name,
            //   email: data.email,
            //   token: refreshToken,
            // };
            const channelList = await fetchYouTubeChannels();

            console.log({ channelList });
            if (channelList) {
              const item = channelList[0];
              const profile = {
                platform: "YouTube",
                name: item.snippet.title,
                channelID: item.id,
                thumbnail: item.snippet.thumbnails.default.url,
                channelList,
                token: refreshToken,
              };
              setConnectedProfiles((prevProfiles) => [
                ...prevProfiles,
                profile,
              ]);
              setIsLoading(false);
              setIsGettingProfile(false);
              addLinkedAccount(profile);
              handleCloseCanvas();
              setSnackbarOpen(true);
              // setShowChannelsCanvas(true); // Open the YouTubeChannelsOffCanvas
            }
          }
        }
      }, 1000);
    } 
    else if (platform === "LinkedIn") {
      const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=785c9h3ilpv647&redirect_uri=${encodeURIComponent(
        "http://localhost:5173/new-post"
      )}&state=RANDOM_STATE&scope=openid%20profile%20w_member_social%20email`;
  
      // Redirect the current window to LinkedIn's OAuth page
      window.location.href = authorizationUrl;
    }
    else {
      // Handle other platforms if needed
    }
  };
  const fetchYouTubeChannels = async () => {
    try {
      const refreshToken = localStorage.getItem("youtube_refresh_token");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await axios.post(
        "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/api/planner/youtube/channels",
        { refreshToken: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data.items)) {
        return response.data.items;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(
        "Error fetching YouTube channels:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const addChannel = (channel) => {
    // Logic to add the selected channel to the linked accounts
    console.log("Selected channel:", channel);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {platforms.map((platform, index) => (
        <div key={platform.name} className="w-full">
          <div className="profileConnection_card">
            <div
              className="top-border"
              style={{ backgroundColor: platform.color }}
            ></div>
            <div className="profileConnection_cardInner">
              <span className="profileConnection_icon text-2xl">
                {platform.icon}
              </span>
            </div>
            <div className="profileConnection_cardText">
              <span className="profileConnection_cardIconText font-semibold">
                {platform.name}
              </span>
              <button
                className="profileConnection_button mt-2"
                onClick={() => handleConnect(platform.name)}
              >
                {isLoading && platform.name === "YouTube" ? (
                  isGettingProfile ? (
                    <span>Getting Profile Data...</span>
                  ) : (
                    <CircularProgress size={24} color="success" />
                  )
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          YouTube Profile connected successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ProfileConnectionCards;
