import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LinkedAccountsDropdown from "./LinkedAccountsDropdown";
import PostPreview from "./PostPreview";
import PostFroalaEditor from "./PostFroalaEditor";
import SocialOptionsWrapper from "./SocialOptionsWrapper/SocialOptionsWrapper";
import { useStateContext } from "../../../contexts/ContextProvider";
import VideoPreview from "./VideoPreview";

const PostEditor = () => {
  // const [postContent, setPostContent] = useState("");
  const { postContent, setPostContent, setImgSrc, setVideoSrc } =
    useStateContext();
  const [activeAccounts, setActiveAccounts] = useState({
    Facebook: false,
    Instagram: false,
    Linkedin: false,
    Pinterest: false,
    Tiktok: false,
    Twitter: false,
  });

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
      });
    }
  };
  const handleAccountToggle = (account, isActive) => {
    setActiveAccounts((prev) => ({ ...prev, [account]: isActive }));
  };

  return (
    <div className="bg-white h-screen">
      <div className="sticky top-0 z-10 bg-white w-full px-4 py-2 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">New Post</h1>
        <button className="text-2xl">
          <AiOutlineClose />
        </button>
      </div>

      <div className="flex flex-row h-full">
        <div className="flex-1 p-4 overflow-auto planner_customHeight">
          <LinkedAccountsDropdown
            activeStates={activeAccounts}
            onAccountToggle={handleAccountToggle}
          />
          <PostFroalaEditor
            postContent={postContent}
            onContentChange={handleInputChange}
          />
          <VideoPreview />
          <SocialOptionsWrapper />
        </div>
        <div className="w-1/2 h-auto my-3 bg-gray-100 overflow-auto">
          <div className="p-4">
            <h2 className="text-[1.15rem] font-bold">Network Preview</h2>
            <div className="text-center text-sm text-[#364141] mt-4 mb-3">
              Select a profile and start adding content in the left panel.
            </div>
            <PostPreview
              activeAccounts={activeAccounts}
              postContent={postContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
