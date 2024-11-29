import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const YouTubeChannelsOffCanvas = ({ show, handleClose, addChannel }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (show) {
      fetchYouTubeChannels();
    }
  }, [show]);

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

      console.log("ChannelsResponse", response);

      if (response.data && Array.isArray(response.data.items)) {
        setChannels(response.data.items);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(
        "Error fetching YouTube channels:",
        error.response ? error.response.data : error.message
      );
      setError("Error fetching YouTube channels");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  const handleLinkChannel = () => {
    if (selectedChannel) {
      addChannel(selectedChannel);
      handleClose();
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="planner_offCanvasWidth  "
    >
      <Offcanvas.Header>
        <button className="custom_closeCanvasBtn " onClick={handleClose}>
          <IoMdClose className="text-2xl " />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="flex justify-content-between mb-0">
          <h5 className="mt-1 me-1 font-semibold">Select a YouTube Channel</h5>
        </div>
        <div className="main_tableBtnDiv mb-4"></div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress size={24} color="success" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="w-1/2 m-auto ">
            {channels.map((channel) => (
              <div key={channel.id} className="w-full">
                <div className="profileConnection_card">
                  <div
                    className="top-border"
                    style={{ backgroundColor: "#FF0000" }}
                  ></div>
                  <div className="profileConnection_cardInner">
                    <img
                      src={channel.snippet.thumbnails.default.url}
                      alt={channel.snippet.title}
                      className="profileConnection_icon"
                    />
                  </div>
                  <div className="profileConnection_cardText">
                    <span className="profileConnection_cardIconText font-semibold">
                      {channel.snippet.title}
                    </span>
                    <button
                      className="profileConnection_button mt-2"
                      onClick={() => handleSelectChannel(channel)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default YouTubeChannelsOffCanvas;
