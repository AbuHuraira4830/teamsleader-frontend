import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import instaEmptyImage from "../../../assets/images/instaPreviewImage.png";
import { useStateContext } from "../../../contexts/ContextProvider";

const InstagramPostPreview = ({ content }) => {
  const { imgSrc, videoSrc } = useStateContext();
  const contentWithoutImages = content.replace(/<img[^>]*>/g, "");
  const contentWithoutVideos = contentWithoutImages.replace(
    /<video[^>]*>([^<]+)<\/video>|<span[^>]*>Your browser does not support HTML5 video.<\/span>/g,
    ""
  );
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <div className=" plannerInsta_preview">
        <button className="plannerInsta_previewBtn" onClick={toggleDropdown}>
          <div className="plannerInsta_previewBtnContainer">
            <div className="plannerInsta_previewBtnInner">
              <FaInstagram className="text-pink-500 text-lg" />
              <div className="plannerPerviewIcon_text ml-1">Instagram</div>
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
                <div className="instagram_preview">
                  <div className="instaPreview_header">
                    <div className="planner_avatar mr-2 w-10 h-10">
                      <div className="avatar_letter text-base">
                        {/* {account.username.charAt(0)} */}H
                      </div>
                    </div>
                    <a href="" className="instaPreview_author">
                      huzaifa4543
                    </a>
                  </div>
                  <div className="relative">
                    <div>
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
                  <div className="insta_previewContent">
                    <div className="insta_previewActions">
                      <div className="insta_like">
                        <svg
                          class="InstagramPreview-networkAction"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            d="M6.975 4c-.89 0-1.779.338-2.457 1.016-.656.656-1.018 1.529-1.018 2.458 0 .927.362 1.8 1.018 2.457l5.601 5.6 5.601-5.601c1.355-1.355 1.355-3.559 0-4.914-1.356-1.355-3.559-1.354-4.914 0l-.688.688-.686-.688c-.678-.678-1.567-1.016-2.457-1.016zm3.144 12.945l-6.308-6.307c-.846-.846-1.311-1.97-1.311-3.164 0-1.196.465-2.32 1.311-3.165 1.738-1.738 4.562-1.746 6.309-.02 1.744-1.726 4.567-1.719 6.307.02 1.744 1.745 1.744 4.584 0 6.329l-6.308 6.307z"
                            fill="#231F20"
                          ></path>
                        </svg>
                      </div>
                      <div className="insta_comment">
                        <svg
                          class="InstagramPreview-networkAction"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M9.929 4.001l-.344.011c-1.634.1-3.171.885-4.218 2.15-1.062 1.282-1.53 2.909-1.317 4.581.333 2.617 2.472 4.77 5.084 5.119 1.462.194 2.937-.144 4.146-.955l.204-.137 2.544.855-.885-2.72.098-.185c.443-.848.677-1.805.676-2.77-.003-1.599-.697-3.169-1.907-4.303-1.125-1.057-2.596-1.646-4.081-1.646zm6.316 12.295v.001-.001zm-6.299.62c-.314 0-.629-.02-.945-.062-3.053-.41-5.553-2.925-5.943-5.984-.247-1.95.299-3.848 1.538-5.346 1.224-1.477 3.02-2.392 4.927-2.51 1.888-.123 3.76.579 5.172 1.903 1.409 1.323 2.219 3.157 2.222 5.031v.001c.001 1.054-.238 2.102-.694 3.043l.974 2.995c.076.232.015.485-.16.658-.173.172-.427.234-.66.153l-2.751-.925c-1.102.685-2.378 1.043-3.68 1.043z"
                            fill="#231F20"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="insta_previewBody">
                      <span className="instaPreview_author">huzaifa4543</span>
                      <div className="instaPreview_text">
                        <div>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: contentWithoutVideos,
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>

                    <span className="insta_postDate">May 6</span>
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

export default InstagramPostPreview;
