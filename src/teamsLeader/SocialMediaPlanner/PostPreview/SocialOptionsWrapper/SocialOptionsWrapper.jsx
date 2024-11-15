import React from "react";

import InstagramDropdown from "./InstagramDropdown ";
import TikTokDropdown from "./TikTokDropdown";
import PinterestDropdown from "./PinterestDropdown ";
import TagsDropdown from "./TagsDropdown";
import ScheduleDropdown from "./ScheduleDropdown";
import ErrorDropdown from "./ErrorDropdown";
import YouTubeDropdown from "./YouTubeDropdown";
const SocialOptionsWrapper = ({
  activeAccounts,
  linkedAccounts,
  errors,
  setLinkedAccounts,
  youtubeInfo,
  setYoutubeInfo,
}) => {
  return (
    <>
      {/* {activeAccounts.Instagram && (
        <div className="mb-8">
          <InstagramDropdown />
        </div>
      )}
      {activeAccounts.Tiktok && (
        <div className="mb-8">
          <TikTokDropdown />
        </div>
      )} */}
      {activeAccounts.YouTube && (
        <div className="mb-8">
          <YouTubeDropdown
            linkedAccounts={linkedAccounts}
            setLinkedAccounts={setLinkedAccounts}
            youtubeInfo={youtubeInfo}
            setYoutubeInfo={setYoutubeInfo}
          />
        </div>
      )}{" "}
      {/* {activeAccounts.Pinterest && (
        <div className="mb-10">
          <PinterestDropdown />
        </div>
      )} */}
      <div className="mb-10">
        <TagsDropdown />
      </div>
      <div className="mb-10">
        <ScheduleDropdown />
      </div>
      {errors.length > 0 && (
        <div className="mb-10">
          <ErrorDropdown errors={errors} />
        </div>
      )}
    </>
  );
};

export default SocialOptionsWrapper;
