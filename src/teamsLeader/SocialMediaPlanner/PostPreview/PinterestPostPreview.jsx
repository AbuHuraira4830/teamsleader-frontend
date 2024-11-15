import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import instaEmptyImage from "../../../assets/images/instaPreviewImage.png";
import { FaPinterest } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";

const PinterestPostPreview = ({ content }) => {
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
              <FaPinterest className="text-red-500 text-lg" />
              <div className="plannerPerviewIcon_text ml-1">Pinterest</div>
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
                <div className="pinterest_preview">
                  <div className="pinterestPreview_body">
                    <div className="pinterestPreview_Image p-2">
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
                  <div
                    className="pinterestPreview_footer"
                    dangerouslySetInnerHTML={{
                      __html: contentWithoutVideos,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinterestPostPreview;
