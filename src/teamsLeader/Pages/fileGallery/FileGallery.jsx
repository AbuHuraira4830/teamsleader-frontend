import React, { useRef, useState } from "react";
import "../../../assets/css/FileGallery.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FiDownload, FiGrid } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Rnd } from "react-rnd";   
import Dropzone from "react-dropzone";
import FileUploaderPopup from "../../../dynamicComponents/FileUploaderPopup";
import File from "./File";
// import { useDrop } from "react-dnd";
// import { NativeTypes } from "react-dnd-html5-backend"; 
import { RxCross2, RxMagnifyingGlass } from "react-icons/rx";

const FileGallery = ({ title }) => {
  const [size, setSize] = useState({ width: "auto", height: "auto" }); 
  const fileInputRef = useRef();
  const [galleryTitle, setGalleryTitle] = useState(title);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { setUploading, setUploadCount, setCurrentlyUploadedFiles } =
    useStateContext();
  const [fileView, setFileView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDownload = async () => {
    if (uploadedFiles.length === 0) {
      // Do not initiate download if there are no files
      return;
    }
    const zip = new JSZip();

    // Loop through the uploadedFiles and add each file to the zip
    for (const file of uploadedFiles) {
      const response = await fetch(file.url);
      const blob = await response.blob();
      zip.file(file.name, blob);
    }

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Save the zip file
      saveAs(content, "downloadedFiles.zip");
    });
  };
  const startUploading = () => {
    setUploading(true);
  };
  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())    
  );
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onDrop = async (acceptedFiles) => {
    setUploading(false);
    setUploadCount(acceptedFiles.length);
    startUploading();
    await delay(1000);
    setUploadCount(acceptedFiles.length); 
    const updatedFiles = acceptedFiles.map((file) => ({
      name: file.name, 
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    setCurrentlyUploadedFiles(updatedFiles);
    await delay(20000);
    setUploading(false);
  };

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (fileToDelete) => {
    const updatedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
    setUploadedFiles(updatedFiles);
  };
  return (
    <div className="position-relative  h-100 ">
      <Rnd
        size={size}
        onResize={(e, direction, ref, delta, position) => {
          setSize((prevSize) => ({
            ...prevSize,
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          }));
        }}
        disableDragging
        minHeight={400}
        maxHeight={3000}
        minWidth={600}
        maxWidth={"74vw"}
        className="file_gallery border rounded-2 pb-4 mb-5  dropzone h-100"
        enableResizing={{
          bottomRight: true,
        }}
        // ref={dropRef}
        // style={{ border: isOver ? "2px dashed #f00" : "1px solid #ddd" }}
      >
        <div>
          <div className="py-2 border-bottom px-3">
            {/* <span className="file_galleryH">{title}</span> */}
            <Form.Control
              type="text"
              className="titleInput shadow-none rounded-1 border-0 px-0"
              placeholder=""
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              style={{ height: "28px" }}
            />
          </div>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="mx-3 dropZone">
                <div className="d-flex justify-content-between  mt-4">
                  <Button
                    className="workspace_addBtn border-0 text-nowrap"
                    onClick={handleAddFiles}
                  >
                    Add Files
                  </Button>
                  <div
                    className="d-flex justify-content-between w-100 ps-3"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span className="d-flex position-relative align-items-center me-2 search_inputDiv w-50">
                      <Button
                        className="position-absolute end-0 me-2 bgHover bg-transparent border-0 text-dark p-1 d-flex "
                        onclick
                      >
                        {searchQuery ? (
                          <RxCross2 onClick={() => setSearchQuery("")} />
                        ) : (
                          <RxMagnifyingGlass className="" />
                        )}
                      </Button>
                      <Form.Control
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for files"
                        className="py-1 shadow-none titleInput fw-normal border fs_14 "
                      />
                    </span>
                    <span className="d-flex">
                      <Button
                        className={`px-2 py-1 bgHover actionBtns btn_grid ${
                          fileView ? "activeBtn" : ""
                        }`}
                        onClick={() => setFileView(true)}
                      >
                        <FiGrid />
                      </Button>
                      <Button
                        className={`px-2 py-1  bgHover actionBtns btn_list ${
                          !fileView ? "activeBtn" : ""
                        }`}
                        onClick={() => setFileView(false)}
                      >
                        <FaListUl />
                      </Button>
                      <Button
                        className="p-2 ms-2 workspace_menuBtn bgHover align-middle"
                        onClick={handleDownload}
                      >
                        <FiDownload />
                      </Button>
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  // onChange={(e) => onDrop(e)}
                  {...getInputProps()}
                />
                <Row
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  style={{ minHeight: "45vh" }}
                >
                  {filteredFiles.map((file, index) => (
                    <Col xs={fileView ? 4 : 12} key={index} className="mt-3">
                      <File
                        file={file}
                        fileView={fileView}
                        onDelete={() => handleDeleteFile(file)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Dropzone>
        </div>
      </Rnd>
      <FileUploaderPopup closeUploading={() => setUploading(false)} />
    </div>
  );
};

export default FileGallery;
