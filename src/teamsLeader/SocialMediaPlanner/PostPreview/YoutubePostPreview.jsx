import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import defaultVideoPlaceholder from "../../../assets/images/defaultVideoPlaceholder.png";
import { useStateContext } from "../../../contexts/ContextProvider";

const YoutubePostPreview = ({
  content,
  activeAccounts,
  linkedAccounts,
  youtubeInfo,
}) => {
  const { imgSrc, videoSrc } = useStateContext();
  console.log("linkedAccountsYRT", linkedAccounts);
  console.log("linkedAccountsThumb", linkedAccounts[0].thumbnail);
  console.log("youtubeInfo", youtubeInfo);

  const contentWithoutImages = content.replace(/<img[^>]*>/g, "");
  const contentWithoutVideos = contentWithoutImages.replace(
    /<video[^>]*>([^<]+)<\/video>|<span[^>]*>Your browser does not support HTML5 video.<\/span>/g,
    ""
  );
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="mb-4 mt-4">
      <div className=" plannerInsta_preview">
        <button className="plannerInsta_previewBtn" onClick={toggleDropdown}>
          <div className="plannerInsta_previewBtnContainer">
            <div className="plannerInsta_previewBtnInner">
              <FaYoutube className="text-red-600 text-lg" />
              <div className="plannerPerviewIcon_text ml-1">Youtube</div>
            </div>
            {isOpen ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}
          </div>
        </button>

        {isOpen && (
          <>
            <div className="youtube_previewWrapper">
              <div className="w-full">
                <div className="youtubeInlineMessagePreview">
                  <div className="youtube_preview">
                    <div className="youtube_previewBody">
                      <div className="youtubeVideo_wrapper">
                        <div className="youtube_previewImagePlanner">
                          {/* <img src="" alt="youtube_previewImagePlanner" /> */}
                          {videoSrc ? (
                            ""
                          ) : (
                            <img
                              src={imgSrc ? imgSrc : defaultVideoPlaceholder}
                              alt="youtube_previewImagePlanner"
                            />
                          )}
                          {videoSrc && <video src={videoSrc}></video>}
                        </div>
                      </div>
                      <div className="youtubePreview_footer">
                        <a href="" className="youtubePreview_avatar">
                          <img
                            src={linkedAccounts[0].thumbnail}
                            // src="https://yt3.ggpht.com/Oy50n8FgdsOVA8xtjsYh3Q0C7YdbR_dDZWGte5bdwpbMtdHlVKzPF2t4kfF4w_hcW36ok0rUrQ=s88-c-k-c0x00ffffff-no-rj"
                            alt="linkedAccounts"
                            className="youtubePreview_avatarImage"
                          />
                        </a>
                        <div className="youtubePreview_content">
                          <div className="youtubePreview_title">
                            {youtubeInfo.title}{" "}
                          </div>
                          <div className="youtubePreview_description">
                            <span>{youtubeInfo.description}</span>
                          </div>
                          <div className="youtubePreview_name">
                            {linkedAccounts[0].name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YoutubePostPreview;
