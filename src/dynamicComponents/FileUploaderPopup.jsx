import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import IMAGES from "../assets/images/Images";
import { useStateContext } from "../contexts/ContextProvider";
import { FileListIcon } from "./FileListIcon";

const FileUploaderPopup = ({ openPreviewFromPopup, closeUploading }) => {
  const { uploadCount, uploading, currentlyUploadedFiles } = useStateContext();
  // console.log({ currentlyUploadedFiles });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (uploading) {
      setShowLoader(true);

      // Simulate file upload completion after 2 seconds
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [uploading]);

  const [displayFiles, setDisplayFiles] = useState(false);

  const toggleFileDisplay = () => {
    setDisplayFiles(!displayFiles);
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
              <span>
                <Spinner animation="border" className="upload_spiner me-2" />
                <span className="">Uploading...</span>
              </span>
            ) : (
              <span className="fs_15">
                <AiOutlineCheckCircle className="uploading_modal_check rounded-circle mt-1" />{" "}
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
              console.log(file);
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between py-2 border-top"
                >
                  <div className="d-flex">
                    {/* {renderFileIcon(file)} */}
                    <FileListIcon file={file} />

                    <div className="d-flex flex-column justify-content-between ps-3 ">
                      <p className="fw-bolder">
                        {file.name.length > 20
                          ? `${file.name.substring(0, 20)}...`
                          : file.name}
                      </p>
                      <div>{fileSize}</div>
                    </div>
                  </div>
                  <div className="flex-column d-flex justify-content-between">
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
