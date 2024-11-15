import React from "react";
import { FileGridIcon } from "../../../dynamicComponents/FileGridIcon";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button, Dropdown } from "react-bootstrap";
import { PiImagesSquareThin } from "react-icons/pi";
import { FileListIcon } from "../../../dynamicComponents/FileListIcon";
import { BsThreeDots } from "react-icons/bs";
// import Draggable from "react-draggable";

const File = ({ file, fileView, onDelete, onDragStart }) => {
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDelete = () => {
    // Trigger delete for the current file
    if (onDelete) {
      onDelete(file);
    }
  };

  const handleDragStart = (e) => {
    // Provide the dragged data along with the file type
    e.dataTransfer.setData("file", JSON.stringify({ type: file.type, file }));
    onDragStart();
  };
  return (
    <>
      {fileView && (
        <div draggable>
          <div
            draggable
            className="file-icon justify-content-center align-items-center d-flex ofcanvasFile "
            style={{ width: "100%", height: "130px" }}
          >
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
            type="button"
            className="px-1 py-0 workspace-dropdown-button border-0"
            style={{ fontSize: "14px" }}
          >
            <PiImagesSquareThin />
            Files Gallery
          </Button>
        </div>
      )}
      {!fileView && (
        <div
          draggable
          onDragStart={handleDragStart}
          className="d-flex justify-content-between py-2 border rounded-2 px-2 cursor_pointer "
        >
          <div className="d-flex w-100 ms-2">
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
                  className="px-1 py-0 workspace-dropdown-button border-0"
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

              <Dropdown.Menu className="border-0 fs_14">
                <Dropdown.Item
                  className="py-1"
                  onClick={() => handleDownload(file)}
                >
                  Download File
                </Dropdown.Item>
                <Dropdown.Item className="py-1" onClick={handleDelete}>
                  Delete File
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </>
  );
};

export default File;
