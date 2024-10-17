import React from "react";
import InstagramDropdown from "./InstagramDropdown ";
import TikTokDropdown from "./TikTokDropdown";
import PinterestDropdown from "./PinterestDropdown ";
import TagsDropdown from "./TagsDropdown";
import ScheduleDropdown from "./ScheduleDropdown";
const SocialOptionsWrapper = () => {
  return (
    <>
      <div className="mb-8">
        <InstagramDropdown />
      </div>
      <div className="mb-8">
        <TikTokDropdown />
      </div>
      <div className="mb-10">
        <PinterestDropdown />
      </div>
      <div className="mb-10">
        <TagsDropdown />
      </div>
      <div className="mb-10">
        <ScheduleDropdown />
      </div>
    </>
  );
};

export default SocialOptionsWrapper;
