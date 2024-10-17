import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import defaultVideoPlaceholder from "../../../assets/images/defaultVideoPlaceholder.png";
import { useStateContext } from "../../../contexts/ContextProvider";

const TikTokPostPreview = ({ content }) => {
  const { imgSrc, videoSrc } = useStateContext();

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
              <FaTiktok className="text-black text-lg" />
              <div className="plannerPerviewIcon_text ml-1">Tiktok</div>
            </div>
            {isOpen ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="instaPreview_open">
            <div className="w-full">
              <div className="flex justify-center items-center flex-col">
                <div className="tiktok_preview">
                  <div className="tiktokPreview_inner">
                    {videoSrc ? (
                      ""
                    ) : (
                      <img
                        src={imgSrc ? imgSrc : defaultVideoPlaceholder}
                        alt="defaultVideoPlaceholder"
                        className="tiktokPreview_image"
                      />
                    )}
                    {videoSrc && <video src={videoSrc}></video>}
                  </div>
                  <div className="tiktokPreview_column">
                    <div className="tiktokPreview_columnInner">
                      <div className="tiktokPreview_textContainer">
                        <div className="tiktokPreview_text">@najeeb1</div>
                        <div
                          className="tiktokPreview_post"
                          dangerouslySetInnerHTML={{
                            __html: contentWithoutVideos,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokPostPreview;
