import React, { useMemo } from "react";
import InstagramPostPreview from "./InstagramPostPreview";
import FacebookPostPreview from "./FacebookPostPreview";
import DefaultPreviewSkeleton from "./DefaultPreviewSkeleton";
import PinterestPostPreview from "./PinterestPostPreview";
import LinkedinPostPreview from "./LinkedinPostPreview";
import TikTokPostPreview from "./TikTokPostPreview";
import XPostPreview from "./XPostPreview";
import YoutubePostPreview from "./YoutubePostPreview";
const PostPreview = ({
  activeAccounts,
  postContent,
  linkedAccounts,
  youtubeInfo,
}) => {
  console.log("postContent", activeAccounts);
  const renderPreview = () => {
    const activePlatforms = Object.keys(activeAccounts).filter(
      (key) => activeAccounts[key]
    );
    // console.log("Active platforms:", activePlatforms); // Check what platforms are active

    // Check if there's no content and no active platforms, then show default preview
    if (postContent === "") {
      return <DefaultPreviewSkeleton />;
    }

    // If there is content or active platforms, map and return the previews
    if (postContent !== "") {
      return activePlatforms.map((platform) => {
        console.log("platform", platform);

        switch (platform) {
          case "Facebook":
            return <FacebookPostPreview key="facebook" content={postContent} />;
          case "Instagram":
            return (
              <InstagramPostPreview key="instagram" content={postContent} />
            );
          case "YouTube":
            return (
              <YoutubePostPreview
                key="youtube"
                content={postContent}
                activeAccounts={activeAccounts}
                linkedAccounts={linkedAccounts}
                youtubeInfo={youtubeInfo}
              />
            );
          case "Linkedin":
            return <LinkedinPostPreview key="linkedin" content={postContent} />;
          case "Tiktok":
            return <TikTokPostPreview key="tiktok" content={postContent} />;

          case "Twitter":
            return <XPostPreview key="tiktok" content={postContent} />;

          case "Pinterest":
            return (
              <PinterestPostPreview key="pinterest" content={postContent} />
            );

          default:
            return (
              <div key={platform}>No preview available for {platform}</div>
            );
        }
      });
    }
  };

  return <div>{renderPreview()}</div>;
};

export default PostPreview;
