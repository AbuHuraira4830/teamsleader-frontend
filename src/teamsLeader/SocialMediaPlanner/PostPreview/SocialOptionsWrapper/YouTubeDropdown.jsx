import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";

const YouTubeDropdown = ({
  linkedAccounts,
  setLinkedAccounts,
  youtubeInfo,
  setYoutubeInfo,
}) => {
  const categoryMapping = {
    "People & Blogs": 22,
    Comedy: 23,
    Education: 27,
    Entertainment: 24,
    "Howto & Style": 26,
    Music: 10,
    "News & Politics": 25,
    "Science & Technology": 28,
    Sports: 17,
  };

  const [isOpen, setIsOpen] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchYouTubePlaylists = async (channelId) => {
    try {
      const refreshToken = localStorage.getItem("youtube_refresh_token");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await axios.post(
        "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/api/planner/youtube/playlists",
        { refreshToken: refreshToken, channelId: channelId },
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
        "Error fetching YouTube playlists:",
        error.response ? error.response.data : error.message
      );
      return [];
    }
  };

  // useEffect(() => {
  //   console.log("useEffect triggered");

  //   const fetchPlaylists = async () => {
  //     const youtubeAccount = linkedAccounts.find(
  //       (account) => account.platform === "YouTube"
  //     );

  //     if (youtubeAccount && youtubeAccount.channelID) {
  //       const fetchedPlaylists = await fetchYouTubePlaylists(
  //         youtubeAccount.channelID
  //       );
  //       console.log("fetchedPlaylists:", fetchedPlaylists);
  //       setPlaylists(fetchedPlaylists);
  //     }
  //   };

  //   fetchPlaylists();
  // }, [linkedAccounts]);
  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (youtubeInfo.tagInput.trim() !== "") {
        setYoutubeInfo((prevInfo) => ({
          ...prevInfo,
          tags: [...prevInfo.tags, prevInfo.tagInput.trim()],
          tagInput: "",
        }));
      }
    }
  };

  const removeTag = (index) => {
    setYoutubeInfo((prevInfo) => ({
      ...prevInfo,
      tags: prevInfo.tags.filter((tag, i) => i !== index),
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setYoutubeInfo({ ...youtubeInfo, category: categoryMapping[category] });
  };

  const handlePlaylistChange = (e) => {
    const playlistId = e.target.value;
    setYoutubeInfo({ ...youtubeInfo, playlist: playlistId });
  };

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm ">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>YouTube Options</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 mt-4 overflow-auto"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {/* Title */}
          {/* <Form.Group controlId="youtubeTitle">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Title
            </Form.Label>
            <Form.Control
              type="text"
              value={youtubeInfo.title}
              onChange={(e) =>
                setYoutubeInfo({ ...youtubeInfo, title: e.target.value })
              }
              className="text-sm shadow-none focus:border-[#00854d]"
              placeholder="Title"
            />
          </Form.Group> */}

          {/* Description */}
          <Form.Group controlId="youtubeDescription">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={youtubeInfo.description}
              onChange={(e) =>
                setYoutubeInfo({ ...youtubeInfo, description: e.target.value })
              }
              className="text-sm shadow-none focus:border-[#00854d]"
              placeholder="Description"
            />
          </Form.Group>

          {/* Status */}
          <Form.Group controlId="youtubeStatus">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Status
            </Form.Label>
            <Form.Control
              as="select"
              value={youtubeInfo.status}
              onChange={(e) =>
                setYoutubeInfo({ ...youtubeInfo, status: e.target.value })
              }
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Form.Control>
          </Form.Group>

          {/* Tags */}
          <Form.Group controlId="youtubeTags">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Tags
            </Form.Label>
            <div className="flex flex-wrap items-center">
              {youtubeInfo.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 flex items-center"
                >
                  <span className="mr-1">{tag}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeTag(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <Form.Control
                type="text"
                value={youtubeInfo.tagInput}
                onChange={(e) =>
                  setYoutubeInfo({ ...youtubeInfo, tagInput: e.target.value })
                }
                onKeyDown={handleTagInput}
                className="text-sm shadow-none focus:border-[#00854d] flex-1"
                placeholder="Enter comma-separated values"
              />
            </div>
          </Form.Group>

          {/* Privacy */}
          <Form.Group controlId="youtubePrivacy">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Privacy
            </Form.Label>
            <Form.Control
              as="select"
              value={youtubeInfo.privacy}
              onChange={(e) =>
                setYoutubeInfo({ ...youtubeInfo, privacy: e.target.value })
              }
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="unlisted">Unlisted</option>
            </Form.Control>
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="youtubeCategory">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Category
            </Form.Label>
            <Form.Control
              as="select"
              value={
                Object.keys(categoryMapping).find(
                  (key) => categoryMapping[key] === youtubeInfo.category
                ) || ""
              }
              onChange={handleCategoryChange}
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              {Object.keys(categoryMapping).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Playlist */}
          <Form.Group controlId="youtubePlaylist">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Playlist (optional)
            </Form.Label>
            <Form.Control
              as="select"
              value={youtubeInfo.playlist}
              onChange={handlePlaylistChange}
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.snippet.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Audience */}
          <Form.Group controlId="youtubeAudience">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Audience
            </Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                label="Yes, it's made for kids"
                className="text-sm"
                name="audience"
                value="yes"
                checked={youtubeInfo.audience === "yes"}
                onChange={(e) =>
                  setYoutubeInfo({ ...youtubeInfo, audience: e.target.value })
                }
              />
              <Form.Check
                type="radio"
                label="No, it's not made for kids"
                name="audience"
                value="no"
                checked={youtubeInfo.audience === "no"}
                onChange={(e) =>
                  setYoutubeInfo({ ...youtubeInfo, audience: e.target.value })
                }
                className="ml-3 text-sm"
              />
            </div>
          </Form.Group>

          {youtubeInfo.audience === "no" && (
            <Form.Group controlId="youtubeAgeRestriction">
              <Form.Label className="text-sm text-[#364141] font-medium">
                Age restriction
              </Form.Label>
              <div className="">
                <Form.Check
                  type="radio"
                  label="Yes, restrict my video to viewers over 18"
                  name="ageRestriction"
                  value="yes"
                  checked={youtubeInfo.ageRestriction === "yes"}
                  onChange={(e) =>
                    setYoutubeInfo({
                      ...youtubeInfo,
                      ageRestriction: e.target.value,
                    })
                  }
                  className="text-sm"
                />
                <Form.Check
                  type="radio"
                  label="No, don't restrict my video to viewers over 18"
                  name="ageRestriction"
                  value="no"
                  checked={youtubeInfo.ageRestriction === "no"}
                  onChange={(e) =>
                    setYoutubeInfo({
                      ...youtubeInfo,
                      ageRestriction: e.target.value,
                    })
                  }
                  className=" text-sm"
                />
              </div>
            </Form.Group>
          )}

          <button
            onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
            className="text-sm nav_planBtn  transition-all duration-100  px-2 text-[#364141] font-medium mt-4"
          >
            {advancedSettingsOpen
              ? "Hide Advanced Settings"
              : "Show Advanced Settings"}
          </button>

          {advancedSettingsOpen && (
            <div className="mt-4 space-y-4">
              {/* License Rights & Ownership */}
              <Form.Group controlId="youtubeLicense">
                <Form.Label className="text-sm text-[#364141] font-medium">
                  License Rights & Ownership
                </Form.Label>
                <Form.Control
                  as="select"
                  value="Standard YouTube License"
                  className="text-sm shadow-none focus:border-[#00854d]"
                >
                  <option value="Standard YouTube License">
                    Standard YouTube License
                  </option>
                </Form.Control>
              </Form.Group>

              {/* Embedding */}
              <Form.Group controlId="youtubeEmbedding">
                <Form.Check
                  type="checkbox"
                  label="Allow embedding"
                  defaultChecked
                  className="text-sm text-[#364141] font-medium"
                />
              </Form.Group>

              {/* Publish to subscriptions feed */}
              <Form.Group controlId="youtubeSubscriptionFeed">
                <Form.Check
                  type="checkbox"
                  label="Publish to subscriptions feed and notify subscribers"
                  defaultChecked
                  className="text-sm text-[#364141] font-medium"
                />
              </Form.Group>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeDropdown;
