import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LinkedAccountsDropdown from "./LinkedAccountsDropdown";
import PostPreview from "./PostPreview";
import PostFroalaEditor from "./PostFroalaEditor";
import SocialOptionsWrapper from "./SocialOptionsWrapper/SocialOptionsWrapper";
import { useStateContext } from "../../../contexts/ContextProvider";
import StickyPostFooter from "./StickyPostFooter/StickyPostFooter";
import VideoPreview from "./VideoPreview";
import { useLocation } from "react-router-dom";


const PostEditor = () => {
  const {
    videoSrc,
    imgSrc,
    postContent,
    setPostContent,
    setImgSrc,
    setVideoSrc,
  } = useStateContext();
  const [activeAccounts, setActiveAccounts] = useState({});
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [youtubeInfo, setYoutubeInfo] = useState({
    title: "",
    description: "",
    status: "public",
    tags: [],
    privacy: "public",
    category: "People & Blogs",
    playlist: "",
    audience: "no",
    ageRestriction: "no",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
      // Proceed to get access token
      getAccessToken(code);
    }
  }, [code]);

  const getAccessToken = async (authorizationCode) => {
    try {
      // Call the backend to exchange the authorization code for an access token
      const response = await fetch(`http://localhost:8888/linkedin/callback?code=${authorizationCode}&state=RANDOM_STATE_345`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch access token');
      }

      const data = await response.json();
     
      // Add LinkedIn account to linked accounts
      const linkedAccount = {
        platform: "LinkedIn",
        name: data.profile.name,
        email: data.profile.email,
        thumbnail: data.profile.picture,
        token: data.accessToken,
        active: true,
      };
      addLinkedAccount(linkedAccount);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const handleInputChange = (newContent) => {
    setPostContent(newContent);

    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const videoRegex = /<video[^>]+src="([^">]+)"/g;

    const imgMatch = imgRegex.exec(newContent);
    const videoMatch = videoRegex.exec(newContent);

    if (imgMatch) {
      setImgSrc(imgMatch[1]);
    } else {
      setImgSrc(null);
    }

    if (videoMatch) {
      setVideoSrc(videoMatch[1]);
    } else {
      setVideoSrc(null);
    }

    if (
      newContent.trim() !== "" &&
      Object.values(activeAccounts).some((active) => !active)
    ) {
      setActiveAccounts({
        Facebook: true,
        Instagram: true,
        Linkedin: true,
        Youtube: true,
        Tiktok: true,
        Twitter: true,
        Pinterest: true,
      });
    }

    if (newContent.trim() === "") {
      setActiveAccounts({
        Facebook: false,
        Instagram: false,
        Pinterest: false,
        Linkedin: false,
        Youtube: false,
      });
    }
  };

  const handleAccountToggle = (account, isActive) => {
    setActiveAccounts((prev) => ({ ...prev, [account]: isActive }));
  };

  const addLinkedAccount = (account) => {
    const newAccount = { ...account, active: true }; // Set active to true by default
    setLinkedAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setActiveAccounts((prev) => ({ ...prev, [account.platform]: true })); // Mark the account as active
  };

  useEffect(() => {
    const newErrors = [];

    linkedAccounts.forEach((account) => {
      if (account.platform.toLowerCase() === "youtube") {
        if (!youtubeInfo.title)
          newErrors.push("Title is required for YouTube.");
        if (!youtubeInfo.description)
          newErrors.push("Description is required for YouTube.");
      }
      // Add checks for other platforms if needed
    });

    setErrors(newErrors);
  }, [linkedAccounts, youtubeInfo]);

  const handleSchedulePost = async () => {
    console.log("youtubeInfoadfdas", youtubeInfo);
    const refreshToken = localStorage.getItem("youtube_refresh_token");
    let bodyContent = JSON.stringify({
      refreshToken: refreshToken,
      videoPath: videoSrc,
      videoMetaData: {
        snippet: {
          title: youtubeInfo.title,
          description: youtubeInfo.description,
          tags: youtubeInfo.tags,
          categoryId: youtubeInfo.category,
          defaultLanguage: "en",
          playlistId: youtubeInfo.playlist,
        },
        status: {
          publishAt: new Date(
            new Date().setDate(new Date().getDate())
          ).toISOString(),
          privacyStatus: youtubeInfo.privacy,
          selfDeclaredMadeForKids: youtubeInfo.audience === "yes",
        },
      },
    });
    let response = await fetch(
      "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/api/planner/youtube/upload",
      {
        method: "POST",
        body: bodyContent,
        headers: { "Content-Type": "application/json" },
      }
    );
    let uploadResponseData = await response.json();
    console.log({ uploadResponseData });
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white w-full px-4 py-2 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">New Post</h1>
        <button className="text-2xl">
          <AiOutlineClose />
        </button>
      </div>

      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="p-4 overflow-auto planner_customHeight relative w-[45%]">
          <LinkedAccountsDropdown
            activeStates={activeAccounts}
            onAccountToggle={handleAccountToggle}
            linkedAccounts={linkedAccounts}
            addLinkedAccount={addLinkedAccount}
          />
          <PostFroalaEditor
            postContent={postContent}
            onContentChange={handleInputChange}
          />
          {postContent && (
            <VideoPreview
              youtubeInfo={youtubeInfo}
              setYoutubeInfo={setYoutubeInfo}
            />
          )}

          <SocialOptionsWrapper
            activeAccounts={activeAccounts}
            linkedAccounts={linkedAccounts}
            errors={errors}
            setLinkedAccounts={setLinkedAccounts}
            youtubeInfo={youtubeInfo}
            setYoutubeInfo={setYoutubeInfo}
          />

          <StickyPostFooter
            errors={errors}
            handleSchedulePost={handleSchedulePost}
          />
        </div>

        <div className="h-auto mb-3 bg-gray-100 overflow-auto w-[40%]">
          <div className="p-4">
            <h2 className="text-[1.15rem] font-bold">Network Preview</h2>
            {Object.keys(activeAccounts).length === 0 && (
              <div className="text-center text-sm text-[#364141] mt-4 mb-3">
                Select a profile and start adding content in the left panel.
              </div>
            )}

            <PostPreview
              activeAccounts={activeAccounts}
              postContent={postContent}
              linkedAccounts={linkedAccounts}
              youtubeInfo={youtubeInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default PostEditor;
