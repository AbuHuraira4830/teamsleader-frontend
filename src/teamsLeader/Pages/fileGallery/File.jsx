import React from "react";
import { FileGridIcon } from "../../../dynamicComponents/FileGridIcon";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button, Dropdown } from "react-bootstrap";
import { PiImagesSquareThin } from "react-icons/pi";
import { FileListIcon } from "../../../dynamicComponents/FileListIcon";
import { BsThreeDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import UploadedFileModal from "../NewTeam/Components/UploadedFileModal";
import { getAPI } from "../../../helpers/apis";
// import Draggable from "react-draggable";

const File = ({ file, fileView, onDelete, uploadedFiles, index }) => {
  const { setPreviewModalFiles, setModalShow, setCurrentItemIndex } =
    useStateContext();
  // const handleDownload = (file) => {
  //   const link = document.createElement("a");
  //   link.href = file.url;
  //   link.setAttribute("download", file.name);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const handleDownload = () => {
    const keys = file.key;
    getAPI(`/api/download-single-file-s3?keys=${keys}`)
      .then((res) => {
        const downloadUrl = res.data?.downloadUrls;
        console.log(res.data);
        fetch(downloadUrl)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);
            // Create a link element
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          })
          .catch((err) => {
            console.error("Error downloading file:", err);
          });
      })
      .catch((err) => {
        console.error("Error getting download URL:", err);
      });
  };

  const filepreview = () => {
    setCurrentItemIndex(index);
    setModalShow({ modalActive: true });
    setPreviewModalFiles(uploadedFiles);
  };
  return (
    <>
      {fileView && (
        <div onClick={filepreview}>
          <div
            className="file-icon justify-content-center align-items-center d-flex ofcanvasFile position-relative "
            style={{ width: "100%", height: "130px" }}
          >
            <Dropdown
              className="position-absolute top-1 end-1 "
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: "9999" }}
            >
              <Dropdown.Toggle
                className="px-2 py-2 bgHover border-0 gallery_action "
                style={{ fontSize: "14px" }}
              >
                <BsThreeDots />
              </Dropdown.Toggle>

              <Dropdown.Menu className="border-0 fs_14 px-2">
                <Dropdown.Item
                  className="py-1"
                  onClick={() => handleDownload(file)}
                >
                  Download File
                </Dropdown.Item>
                <Dropdown.Item className="py-1" onClick={() => onDelete(file)}>
                  Delete File
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <FileGridIcon file={file} />
          </div>

          <div className="d-flex justify-content-between mt-2 fs_14 align-items-center px-1">
            <p className="m-0 file-name ">
              {file.name.length > 20
                ? `${file.name.substring(0, 20)}...`
                : file.name}
            </p>
            <AiOutlineClockCircle />
          </div>
          <Button
            onClick={(e) => e.stopPropagation()}
            type="button"
            className="px-1 py-0 workspace-dropdown-button border-0 centerIt"
            style={{ fontSize: "14px" }}
          >
            <PiImagesSquareThin />
            Files Gallery
          </Button>
        </div>
      )}
      {!fileView && (
        <div className="d-flex justify-content-between py-2 Border rounded-2 px-2 cursor_pointer ">
          <div className="d-flex w-100 ms-2" onClick={filepreview}>
            <div style={{ width: "90px", height: "90px" }}>
              <FileListIcon file={file} />
            </div>
            <div className="d-flex flex-column justify-content-between ps-3 ">
              <p className="fw-bolder m-0">
                {file.name.length > 20
                  ? `${file.name.substring(0, 20)}...`
                  : file.name}
              </p>
              <div>
                <Button
                  type="button"
                  className="px-1 py-0 workspace-dropdown-button border-0 centerIt"
                  style={{ fontSize: "14px" }}
                >
                  <PiImagesSquareThin />
                  Files Gallery
                </Button>
              </div>
              <span>
                <span className="nav-avatar rounded-circle align-self-center px-1  border-0 me-2">
                  UH
                </span>
                17 Oct, 2023
              </span>
              <div></div>
            </div>
          </div>
          <div className="flex-column d-flex  ">
            <Dropdown>
              <Dropdown.Toggle
                className="px-2 py-1 workspace-dropdown-button"
                style={{ fontSize: "14px" }}
              >
                <BsThreeDots />
              </Dropdown.Toggle>

              <Dropdown.Menu className="border-0 fs_14 px-2">
                <Dropdown.Item
                  className="py-1"
                  onClick={() => handleDownload(file)}
                >
                  Download File
                </Dropdown.Item>
                <Dropdown.Item className="py-1" onClick={() => onDelete(file)}>
                  Delete File
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
      <UploadedFileModal />
    </>
  );
};

export default File;
