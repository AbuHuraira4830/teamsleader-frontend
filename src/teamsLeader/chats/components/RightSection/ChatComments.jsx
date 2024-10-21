import React, { useEffect, useState } from "react";
import pdficon from "../assets/images/pdf-icon.svg";
import wordicon from "../assets/images/word-icon.svg";
import zipicon from "../assets/images/zip-icon.svg";
import phpicon from "../assets/images/php-icon.svg";
import htmlicon from "../assets/images/html-icon.svg";
import cssicon from "../assets/images/css-icon.svg";
import textIcon from "../assets/images/text-icon.svg";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Tooltip } from "antd";
import { useChatsContext } from "../../../../contexts/ChatsContext";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
const pusher = new Pusher("0910daad885705576961", {
  cluster: "ap2",
  encrypted: true,
});
const ChatComments = () => {
  const [hoverIndex, setHoverIndex] = useState(false);
  const { openedChat, setOpenedChat, openedChannel } = useChatsContext();
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return pdficon;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return wordicon;
      case "application/x-zip-compressed":
        return zipicon;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return phpicon;
      case "video/mp4":
        return fileType; // Video thumbnail will be set dynamically
      case "text/html":
        return htmlicon;
      case "text/css":
        return cssicon;
      default:
        return textIcon;
    }
  };
  const downloadFile = (src, name) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFile = (fileType, src, name, index) => {
    if (fileType.startsWith("image/")) {
      return (
        <div
          className="render-image-comment w-96 rounded-lg p-1 border hover:opacity-75 transition-opacity relative"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover rounded-lg"
          />
          {hoverIndex === index && (
            <div className="download-icon absolute top-5 right-5 bg-white px-3 py-2 rounded border">
              <Tooltip title="Download">
                {/* <a href={src} download={name}>
                  <IoCloudDownloadOutline className="text-gray-500 hover:text-black" />
                </a> */}

                <button onClick={() => downloadFile(src, name)}>
                  <IoCloudDownloadOutline className="text-gray-500 hover:text-black" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <div
          className="render-video-comment w-96 rounded-lg border hover:opacity-75 transition-opacity relative"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <video
            src={src}
            controls
            alt=""
            className="h-full w-full object-cover rounded-lg"
          ></video>
          {hoverIndex === index && (
            <div className="download-icon absolute top-5 right-5 bg-white px-3 py-2 rounded border">
              <Tooltip title="Download">
                <a href={src} download={name}>
                  <IoCloudDownloadOutline className="text-gray-500 hover:text-black" />
                </a>
              </Tooltip>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className="h-16 w-80 border rounded-lg flex items-center justify-center gap-2 p-2 hover:opacity-75 transition-opacity relative"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <img src={getFileIcon(fileType)} className="h-full" />
          <div className="h-full flex-1 flex flex-col gap-1">
            <span className="text-black font-bold">
              {name.length > 30 ? `${name.slice(0, 17)}...` : name}
            </span>
            <span className="text-gray-500">
              {fileType === "application/pdf"
                ? "PDF"
                : fileType ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ? "DOCX"
                : fileType === "application/x-zip-compressed"
                ? "ZIP"
                : fileType ===
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                ? "PowerPoint"
                : fileType === "video/mp4"
                ? "Video"
                : fileType === "text/html"
                ? "HTML"
                : fileType === "text/css"
                ? "CSS"
                : fileType === "application/javascript"
                ? "JavaScript"
                : "TXT"}
            </span>
          </div>
          {hoverIndex === index && (
            <div className="download-icon absolute top-2 right-2 bg-white px-3 py-2 rounded border">
              <Tooltip title="Download">
                <a href={src} download={name}>
                  <IoCloudDownloadOutline className="text-gray-500 hover:text-black" />
                </a>
              </Tooltip>
            </div>
          )}
        </div>
      );
    }
  };

  // Sample data, replace with actual data from your application
  const files = [
    {
      type: "image/jpeg",
      src: "https://coursedashboard.mikegeerinck.com/teamleader/teamleader/files/1714504418-663142e29826a-Vp9WvV7YKdH4k8sKRePcE8 (1).jpg",
      name: "Image File",
    },
    {
      type: "video/mp4",
      src: "https://coursedashboard.mikegeerinck.com/teamleader/teamleader/files/1714504898-663144c29e269-Download.mp4",
      name: "Video File",
    },
    {
      type: "application/pdf",
      src: "https://coursedashboard.mikegeerinck.com/teamleader/teamleader/files/1714504418-663142e29826a-Vp9WvV7YKdH4k8sKRePcE8 (1).jpg",
      name: "PDF Document",
    },
    {
      type: "application/pdf",
      src: "https://coursedashboard.mikegeerinck.com/teamleader/teamleader/files/1714504418-663142e29826a-Vp9WvV7YKdH4k8sKRePcE8 (1).jpg",
      name: "PDF2 Document",
    },
  ];

  const { chat_Id, channel_Id } = useParams();
  useEffect(() => {
    console.log("useEffect hook triggered");

    // Determine the channel name based on the presence of channel_Id or chat_Id
    const channelName = channel_Id
      ? `channel-${channel_Id}`
      : `chat-${chat_Id}`;
    const channel = pusher.subscribe(channelName);
    console.log("Subscribed to channel:", channelName);

    channel.bind("add-message", (data) => {
      console.log("Received add-message event data:", data);
      console.log({ data });

      // Update the state based on the presence of channel_Id or chat_Id
      if (channel_Id) {
        // setOpenedChannel(data);
      } else {
        setOpenedChat(data);
      }
    });

    return () => {
      console.log("Unsubscribing from channel:", channelName);
      pusher.unsubscribe(channelName);
    };
  }, [channel_Id, chat_Id]);

  return (
    <div className="">
      {(channel_Id ? openedChannel?.messages : openedChat?.messages)?.map(
        (message, index) => {
          return (
            <div className="flex gap-2 single-comment" key={index}>
              {/* Replace the hard-coded values with actual data from your application */}
              <div className="w-10 h-10 bg-blue-900 text-white rounded flex items-center justify-center"></div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-end gap-1">
                  <span className="font-bold">{message?.sentBy?.name}</span>
                  <span className="text-xs text-gray-500">0:00pm</span>
                </div>
                <div className="single-comment-body flex flex-col gap-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: message?.message }}
                    className="text-sm"
                  />
                  {message?.files.map((file, index) =>
                    renderFile(file.type, file.url, file.name, index)
                  )}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ChatComments;
