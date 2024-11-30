import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import IMAGES from "../../../../assets/images/Images";
import { useStateContext } from "../../../../contexts/ContextProvider";

const FileUploaderPopup = ({ openPreviewFromPopup, closeUploading }) => {
  const { uploadCount, uploading, currentlyUploadedFiles } = useStateContext();

  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (uploading) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  }, [uploading]);

  const [displayFiles, setDisplayFiles] = useState(false);

  const toggleFileDisplay = () => {
    setDisplayFiles(!displayFiles);
  };
  const renderFileIcons = (file, index) => {
    let fileTypeIcon = IMAGES.UNKNOWN; // Default icon

    if (!file.type) {
      fileTypeIcon = IMAGES.UNKNOWN;
    }

    if (file.type.startsWith("image/")) {
      fileTypeIcon = IMAGES.IMAGE;
    } else if (file.type.startsWith("video/")) {
      fileTypeIcon = IMAGES.VIDEO;
    } else if (
      file.type == "text/plain" ||
      file.type ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type == "application/msword"
    ) {
      fileTypeIcon = IMAGES.WORD;
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fileTypeIcon = IMAGES.EXCEL;
    } else if (file.type === "application/pdf") {
      fileTypeIcon = IMAGES.PDF;
    } else if (
      file.type === "application/zip" ||
      file.type === "application/x-rar-compressed"
    ) {
      fileTypeIcon = IMAGES.ZIP;
    }

    return (
      <span
        className=" p-4 rounded-3"
        style={{
          backgroundColor: `${
            fileTypeIcon == IMAGES.UNKNOWN
              ? "#5559DF"
              : fileTypeIcon == IMAGES.IMAGE
              ? "#579BFC"
              : (fileTypeIcon = IMAGES.VIDEO
                  ? "#A358DF"
                  : (fileTypeIcon = IMAGES.WORD
                      ? "#2368C4"
                      : (fileTypeIcon = IMAGES.EXCEL
                          ? "#237F4C"
                          : (fileTypeIcon = IMAGES.PDF
                              ? "#FA0F00"
                              : (fileTypeIcon = IMAGES.ZIP ? "#FFCC00" : "")))))
          }`,
        }}
      >
        <img key={index} src={fileTypeIcon} alt="Uploaded file" />;
      </span>
    );
  };

  const renderFileIcon = (file) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{
            backgroundColor: "#579BFC",
          }}
        >
          <img src={IMAGES.IMAGE} alt="Uploaded file" />
        </span>
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#A358DF" }}
        >
          <img src={IMAGES.VIDEO} alt="Uploaded file" />
        </span>
      );
    } else if (
      fileType === "text/plain" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return (
        <span
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#2368C4" }}
        >
          <img src={IMAGES.WORD} alt="Uploaded file" />
        </span>
      );
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#237F4C" }}
        >
          <img src={IMAGES.EXCEL} alt="Uploaded file" />
        </span>
      );
    } else if (fileType === "application/pdf") {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#FA0F00" }}
        >
          <img src={IMAGES.PDF} alt="Uploaded file" />
        </span>
      );
    } else if (
      fileType === "application/zip " ||
      "application/x-rar-compressed"
    ) {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#FFCC00" }}
        >
          <img src={IMAGES.ZIP} alt="Uploaded file" />
        </span>
      );
    } else {
      return (
        <span
          className=" uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#5559DF" }}
        >
          <img src={IMAGES.UNKNOWN} alt="Uploaded file" />
        </span>
      );
    }
  };

  // const renderProgressBar = () => {
  //   if (uploadProgress >= 0 && uploadProgress <= 100) {
  //     return <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />;
  //   }
  //   return null;
  // };
  return (
    <div className="h-100">
      {uploading && (
        <Card
          body
          className="file_uploader_component border-0 "
          style={{ maxHeight: "355px", overflowY: "auto" }}
        >
          <div className="centerIt justify-content-between ">
            {showLoader ? (
              <span className="centerIt">
                <Spinner animation="border" className="upload_spiner me-2" />
                <span className="">Uploading...</span>
              </span>
            ) : (
              <span className="fs_15 centerIt">
                <AiOutlineCheckCircle className="uploading_modal_check rounded-circle me-2" />{" "}
                Uploaded {uploadCount} file
              </span>
            )}
            <span>
              <Button
                type="button"
                className="px-2 py-1 workspace-dropdown-button"
                onClick={toggleFileDisplay}
                style={{ fontSize: "14px" }}
              >
                <HiOutlineChevronDown />
              </Button>
              <Button
                type="button"
                className="px-2 py-1 workspace-dropdown-button"
                style={{ fontSize: "14px" }}
                onClick={closeUploading}
              >
                Close
              </Button>
            </span>
          </div>
          {displayFiles &&
            currentlyUploadedFiles.map((file, index) => {
              const fileSize =
                file.size < 1024 * 1024
                  ? `${(file.size / 1024).toFixed(2)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;   
              // console.log(file);
              return (
                <div
                  key={index}
                  className="flex justify-content-between py-2 border-top"
                >
                  <div className="flex">
                    {renderFileIcon(file)}
                    <div className="flex flex-column justify-content-between ps-3 ">
                      <p className="fw-bolder">
                        {file.name.length > 20
                          ? `${file.name.substring(0, 20)}...`
                          : file.name}
                      </p>
                      <div>{fileSize}</div>
                    </div>
                  </div>
                  <div className="flex-column flex justify-content-between">
                    <Button
                      type="button"
                      className="px-2 py-1 workspace-dropdown-button"
                      onClick={closeUploading}
                      style={{ fontSize: "14px" }}
                    >
                      X
                    </Button>
                    <Button
                      type="button"
                      className="px-2 py-1 workspace-dropdown-button"
                      onClick={() => openPreviewFromPopup(file)}
                      style={{ fontSize: "14px" }}
                    >
                      <MdOpenInNew />
                    </Button>
                  </div>

                  {/* {renderProgressBar()} */}
                </div>
              );
            })}
        </Card>
      )}
    </div>
  );
};

export default FileUploaderPopup;
