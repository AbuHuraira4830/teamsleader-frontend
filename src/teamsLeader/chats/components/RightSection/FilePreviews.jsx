import React, { useState, useEffect, useRef } from "react";
import { useChatsContext } from "../../../../contexts/ChatsContext";
import { RxCross2 } from "react-icons/rx";
import pdficon from "../assets/images/pdf-icon.svg";
import wordicon from "../assets/images/word-icon.svg";
import zipicon from "../assets/images/zip-icon.svg";
import phpicon from "../assets/images/php-icon.svg";
import htmlicon from "../assets/images/html-icon.svg";
import cssicon from "../assets/images/css-icon.svg";
import textIcon from "../assets/images/text-icon.svg";
import { Avatar, Badge, Space, Tooltip } from "antd";
import Slider from "react-slick";
import spinningCircle from "../assets/gifs/spinning-circle.gif";

const FilePreviews = () => {
  const {
    selectedFiles,
    uploadingProgress,
    uploadedFiles,
    setUploadedFiles,
    setUploadingProgress,
  } = useChatsContext();
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const generateThumbnails = async () => {
      const promises = selectedFiles.map(async (file) => {
        if (file.type === "video/mp4") {
          const thumbnailURL = await generateThumbnail(file);
          return { name: file.name, thumbnail: thumbnailURL };
        } else {
          return { name: file.name, thumbnail: null };
        }
      });
      const thumbnailsArray = await Promise.all(promises);
      const thumbnailsObject = thumbnailsArray.reduce((acc, curr) => {
        acc[curr.name] = curr.thumbnail;
        return acc;
      }, {});
      setThumbnails(thumbnailsObject);
    };

    generateThumbnails();
  }, [selectedFiles]);

  const generateThumbnail = async (file) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.currentTime = 1; // Set the time for the thumbnail
    await new Promise((resolve) => {
      video.onloadeddata = () => {
        resolve();
      };
    });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const thumbnailURL = canvas.toDataURL("image/jpeg");
    return thumbnailURL;
  };

  const handleRemoveFile = (fileName) => {
    const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    setUploadedFiles(updatedFiles);
  };
  console.log({ uploadedFiles });
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

  useEffect(() => {
    if (selectedFiles?.length === 0) {
      setTimeout(() => {
        setUploadingProgress(0);
      }, 2500);
    }
  }, [selectedFiles]);
  console.log({ selectedFiles });

  return (
    <div className="border-l border-r border-[#ccc] pt-14 pb-2">
      <div className="flex px-3 gap-2 items-center w-full">
        {/* <Slider {...settings} className="flex w-full"> */}
        {uploadedFiles.map((file, index) => (
          <div key={index} className="p-1 border rounded-lg">
            {console.log({ file, index: index + 1 })}
            {file?.type?.startsWith("image/") ? (
              <Space size="middle">
                <Badge
                  count={
                    <Tooltip title="Remove file">
                      <RxCross2
                        className="bg-gray-200 cursor-pointer rounded-full w-6 h-6 p-1"
                        onClick={() => handleRemoveFile(file.name)}
                      />
                    </Tooltip>
                  }
                >
                  <div className="h-14 w-14 flex items-center justify-center">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Badge>
              </Space>
            ) : file?.type === "video/mp4" ? (
              <Space size="middle">
                <Badge
                  count={
                    <Tooltip title="Remove file">
                      <RxCross2
                        className="bg-gray-200 cursor-pointer rounded-full w-6 h-6 p-1"
                        onClick={() => handleRemoveFile(file.name)}
                      />
                    </Tooltip>
                  }
                >
                  <div className="h-14 w-14 flex items-center justify-center">
                  {/* <img
                      src={thumbnails[file.name] || getFileIcon(file.type)}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    /> */}
                  <video src={file.url} className="w-full h-full object-fill rounded-lg"></video>
                  </div>
                </Badge>
              </Space>
            ) : (
              <div>
                <Space size="middle">
                  <Badge
                    count={
                      <Tooltip title="Remove file">
                        <RxCross2
                          className="bg-gray-200 cursor-pointer rounded-full w-6 h-6 p-1"
                          onClick={() => handleRemoveFile(file.name)}
                        />
                      </Tooltip>
                    }
                  >
                    <div className="h-14 w-60 flex items-center justify-center gap-2 p-2">
                      <img src={getFileIcon(file.type)} className="h-full" />
                      <div className="h-full flex-1 flex flex-col gap-2">
                        <span className="text-black font-bold">
                          {file.name.length > 30
                            ? `${file.name.slice(0, 17)}...`
                            : file.name}
                        </span>
                        <span className="text-gray-500">
                          {file.type === "application/pdf"
                            ? "PDF"
                            : file.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ? "Word Document"
                            : file.type === "application/x-zip-compressed"
                            ? "ZIP"
                            : file.type ===
                              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            ? "PowerPoint"
                            : file.type === "video/mp4"
                            ? "Video"
                            : file.type === "text/html"
                            ? "HTML"
                            : file.type === "text/css"
                            ? "CSS"
                            : file.type === "application/javascript"
                            ? "JavaScript"
                            : "TXT"}
                        </span>
                      </div>
                    </div>
                  </Badge>
                </Space>
              </div>
            )}
          </div>
        ))}
        {selectedFiles.map((file, index) => (
          <div key={index} className="p-1 border rounded-lg">
            {console.log({ file, index: index + 1 })}
            {file?.type?.startsWith("image/") ? (
              <Space size="middle">
                <Badge
                  count={
                    <Tooltip title="Remove file">
                      <span className="bg-gray-200 cursor-pointer rounded-full  p-1">
                        <img
                          src={spinningCircle}
                          className="w-4 rounded-full"
                          alt=""
                        />
                      </span>
                    </Tooltip>
                  }
                >
                  <div className="h-14 w-14 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Badge>
              </Space>
            ) : file?.type === "video/mp4" ? (
              <Space size="middle">
                <Badge
                  count={
                    <Tooltip title="Remove file">
                      <span className="bg-gray-200 cursor-pointer rounded-full  p-1">
                        <img
                          src={spinningCircle}
                          className="w-4 rounded-full"
                          alt=""
                        />
                      </span>
                    </Tooltip>
                  }
                >
                  <div className="h-14 w-14 flex items-center justify-center">
                    <img
                      src={thumbnails[file.name] || getFileIcon(file.type)}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Badge>
              </Space>
            ) : (
              <div>
                <Space size="middle">
                  <Badge
                    count={
                      <Tooltip title="Remove file">
                        <span className="bg-gray-200 cursor-pointer rounded-full  p-1">
                          <img
                            src={spinningCircle}
                            className="w-4 rounded-full"
                            alt=""
                          />
                        </span>
                      </Tooltip>
                    }
                  >
                    <div className="h-14 w-60 flex items-center justify-center gap-2 p-2">
                      <img src={getFileIcon(file.type)} className="h-full" />
                      <div className="h-full flex-1 flex flex-col gap-2">
                        <span className="text-black font-bold">
                          {file.name.length > 30
                            ? `${file.name.slice(0, 17)}...`
                            : file.name}
                        </span>
                        <span className="text-gray-500">
                          {file.type === "application/pdf"
                            ? "PDF"
                            : file.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ? "DOC"
                            : file.type === "application/x-zip-compressed"
                            ? "ZIP"
                            : file.type ===
                              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            ? "PowerPoint"
                            : file.type === "video/mp4"
                            ? "Video"
                            : file.type === "text/html"
                            ? "HTML"
                            : file.type === "text/css"
                            ? "CSS"
                            : file.type === "application/javascript"
                            ? "JavaScript"
                            : "TXT"}
                        </span>
                      </div>
                    </div>
                  </Badge>
                </Space>
              </div>
            )}
          </div>
        ))}

        {/* </Slider> */}
      </div>
    </div>
  );
};

export default FilePreviews;
