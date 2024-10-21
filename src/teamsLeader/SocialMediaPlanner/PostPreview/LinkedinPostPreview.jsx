import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import instaEmptyImage from "../../../assets/images/instaPreviewImage.png";
import { FaLinkedin } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";

const LinkedinPostPreview = ({ content }) => {
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
              <FaLinkedin className="text-blue-600 text-lg" />
              <div className="plannerPerviewIcon_text ml-1">Linkedin</div>
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
                <div className="facebook_preview">
                  <div className="facebookPreview_container">
                    <div className="facebookPreview_top">
                      <div className="facebookPreview_header">
                        <div className="planner_avatar mr-2 w-10 h-10">
                          <div className="avatar_letter text-base">
                            {/* {account.username.charAt(0)} */}H
                          </div>
                        </div>
                        <div className="facebookPreview_author">
                          <a href="" className="facebookPreview_authorLink">
                            <span className="facebookPreview_name">Najeeb</span>
                          </a>
                          <span className="facebookPreview_time">May 7</span>
                        </div>
                      </div>
                      <div className="facebookPreview_content">
                        <div className="facebookPreview_body">
                          <div className="facebookPreview_text">
                            <div>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: contentWithoutVideos,
                                }}
                              ></span>
                              {videoSrc && <video src={videoSrc}></video>}
                              {imgSrc && <img src={imgSrc} style={{width: "100%"}}/>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="facebookPreview_Images facebookPreview_Images--1">
                      <div className="facebookPreview_Image facebookPreview_Image--1">
                        <img
                          src={instaEmptyImage}
                          alt="instaEmptyImage"
                          className="facebookPreview_imageImage"
                        />
                      </div>
                    </div> */}
                    <div className="facebookPreview_actions">
                      <div className="facebookPreview_action facebookPreview_actionLike">
                        <div className="facebookPreview_actionIcon">
                          <svg
                            class="LinkedinPreview-networkAction"
                            viewBox="0 0 20 20"
                            enableBackground="new 0 0 20 20"
                            aria-hidden="true"
                            style={{ transform: "scaleX(-1)" }}
                          >
                            <path d="M14.1 9l-1.9-3.2c-.3-.5-.5-1.1-.7-1.7l-.2-1.1h-1.8c-1.1 0-2 .9-2 2v.4c0 .6.1 1.3.3 1.9l.2.7h-3c-.8 0-1.5.7-1.5 1.5 0 .4.1.7.4 1-.3.3-.4.6-.4 1 0 .5.3 1 .7 1.3-.1.2-.2.5-.2.7 0 .8.6 1.4 1.3 1.5-.1.3-.1.6 0 1 .2.6.9 1 1.5 1h2.7c.9 0 1.5-.1 2.1-.3l2.1-.7h2.8v-7h-2.4zm-8.2 3.1l-.4-.5c-.1-.2-.2-.4-.1-.7l.1-.9h5.1l-1.1-3.3c-.1-.4-.1-.9-.1-1.3v-.3c0-.2.2-.4.4-.4h.1c.1.7.4 1.5.7 2l2.6 4.3h1.3v3h-.6l-2.5.8c-.4.1-.8.2-1.2.2h-2.8c-.2 0-.4-.2-.5-.4l-.1-.5-.6-.5c-.2-.2-.4-.5-.3-.8v-.7z"></path>
                          </svg>
                        </div>
                        <span className="facebookPreview_actionText">Like</span>
                      </div>
                      <div className="facebookPreview_action facebookPreview_actionLike">
                        <div className="facebookPreview_actionIcon">
                          <svg
                            class="LinkedinPreview-networkAction"
                            viewBox="0 0 20 20"
                            enableBackground="new 0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M16 4h-12c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h9l4 3v-11c0-.6-.4-1-1-1zm-11 7v-5h10v6.1l-1.5-1.1h-8.5zm2-3h6v1h-6v-1z"></path>
                          </svg>
                        </div>
                        <span className="facebookPreview_actionText">
                          Comment
                        </span>
                      </div>
                      <div className="facebookPreview_action facebookPreview_actionLike">
                        <div className="facebookPreview_actionIcon">
                          <svg
                            class="LinkedinPreview-networkAction"
                            viewBox="0 0 24 24"
                            enableBackground="new 0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M19.7 11.3l-6.7-6.3v4h-2c-3.9 0-7 3.1-7 7v3h1.4c0-2.2 1.9-4 4.1-4h3.5v4l6.7-6.3c.4-.3.4-1 0-1.4zm-4.7 3.3v-1.6h-5.4c-1.2 0-2.4.4-3.4 1.1.9-1.9 2.7-3.1 4.8-3.1h4v-1.6l2.7 2.6-2.7 2.6z"></path>
                          </svg>
                        </div>
                        <span className="facebookPreview_actionText">
                          Share
                        </span>
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

export default LinkedinPostPreview;
