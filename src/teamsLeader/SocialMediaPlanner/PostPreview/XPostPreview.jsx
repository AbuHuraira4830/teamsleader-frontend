import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import instaEmptyImage from "../../../assets/images/instaPreviewImage.png";
import default_profile_normal from "../../../assets/images/default_profile_normal.png";
import { FaXTwitter } from "react-icons/fa6";
import { FiCircle } from "react-icons/fi";
import { useStateContext } from "../../../contexts/ContextProvider";

const XPostPreview = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { imgSrc, videoSrc } = useStateContext();
  const contentWithoutImages = content.replace(/<img[^>]*>/g, "");
  const contentWithoutVideos = contentWithoutImages.replace(
    /<video[^>]*>([^<]+)<\/video>|<span[^>]*>Your browser does not support HTML5 video.<\/span>/g,
    ""
  );
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="mb-4 mt-4">
      <div className=" plannerInsta_preview">
        <button className="plannerInsta_previewBtn" onClick={toggleDropdown}>   
          <div className="plannerInsta_previewBtnContainer">
            <div className="plannerInsta_previewBtnInner">
              <FaXTwitter className=" text-lg" />
              <div className="plannerPerviewIcon_text ml-1">X</div>
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
                <div className="twitterPreview twitterPreview_mobile">
                  <div className="twitterPreview_container">
                    <a href="" className="twitterPreview_avatar">
                      <img
                        src={default_profile_normal}
                        alt="default_profile_normal"
                        className="twitterPreview_avatarImage"
                      />
                    </a>
                    <div className="twitterPreview_content">
                      <div className="twitterPreview_author">
                        <a href="" className="twitterPreview_authorLink">
                          <span className="twitterPreview_name">Huraira</span>
                          <span className="twitterPreview_screenName">
                            @Huraira161518
                          </span>
                        </a>
                        <span className="twitterPreview_time">
                          ·
                          <span className="twitterPreview_timeDate">May 8</span>
                        </span>
                      </div>
                      <div className="twitterPreview_body">
                        <span className="twitterPreview_text">
                          <div>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: contentWithoutVideos,
                              }}
                            ></span>
                          </div>
                        </span>
                      </div>
                      <div className="twitterPreview_images twitterPreview_images--1">
                        <div className="twitterPreview_column twitterPreview_columnPrimary">
                          <div className="twitterPreview_image">
                            {videoSrc ? (
                              ""
                            ) : (
                              <img
                                src={imgSrc ? imgSrc : instaEmptyImage}
                                alt="instaEmptyImage"
                                className="instaPreview_image"
                              />
                            )}
                            {videoSrc && <video src={videoSrc}></video>}
                          </div>
                        </div>
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

export default XPostPreview;
