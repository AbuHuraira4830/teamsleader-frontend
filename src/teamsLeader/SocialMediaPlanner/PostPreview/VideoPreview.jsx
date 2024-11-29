import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { TbInfoCircle } from "react-icons/tb";
import colors from "react-multi-date-picker/plugins/colors";
import { useStateContext } from "../../../contexts/ContextProvider";

const VideoPreview = ({ youtubeInfo, setYoutubeInfo }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [video, setVideo] = useState(null);
  const { postContent, videoSrc } = useStateContext();
  const contentWithoutImages = postContent.replace(/<img[^>]*>/g, "");
  const contentWithoutVideos = contentWithoutImages.replace(
    /<video[^>]*>([^<]+)<\/video>|<span[^>]*>Your browser does not support HTML5 video.<\/span>/g
  );
  useEffect(() => {
    const spanWithIframePattern =
      /<span[^>]*>(<iframe[^>]*>.*?<\/iframe>)<\/span>/gi;
    const matchedSpans = contentWithoutVideos.match(spanWithIframePattern);
    if (matchedSpans) {
      setVideo(matchedSpans);
    } else {
      setVideo(null);
    }
  }, [postContent]);
  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-8">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>Video Preview</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden centerIt ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="videoPreview me-3 rounded-3 centerIt"
          style={{
            width: "200px",
            height: "180px",
            padding: "10px",
            backgroundColor: "var(--gray-hover-color)",
          }}
        >
          {" "}
          {videoSrc && <video src={videoSrc}></video>}
          <span
            dangerouslySetInnerHTML={{
              __html: video,
            }}
          ></span>
        </div>
        <div className="space-y-4">
          {/* Title */}
          <Form.Group controlId="youtubeTitle">
            <div className="centerIt justify-content-between">
              <Form.Label className="text-sm text-[#364141] font-medium">
                Video Title
              </Form.Label>
              <span>
                <LuTrash2 className="mb-2" />
              </span>
            </div>
            <Form.Control
              type="text"
              value={youtubeInfo.title}
              onChange={(e) =>
                setYoutubeInfo({ ...youtubeInfo, title: e.target.value })
              }
              className="text-sm shadow-none focus:border-[#00854d]"
              placeholder="Add title"
            />
          </Form.Group>

          {/* <p className="centerIt fs_14">
            Subtitle File <TbInfoCircle className="ms-2 fs-5" />
          </p>
          <div className="centerIt" style={{ color: "#1f76c2" }}>
            <LuPlus className="me-2" />
            <u className=" fs_14">Add a subtitle file</u>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
