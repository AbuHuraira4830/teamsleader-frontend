import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/FileGallery.css";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { FiDownload, FiGrid } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Rnd } from "react-rnd";
import Dropzone from "react-dropzone";
import File from "./File";
// import { useDrop } from "react-dnd";
// import { NativeTypes } from "react-dnd-html5-backend";
import { RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import { getAPI, postAPI } from "../../../helpers/apis";
import FileUploaderPopup from "../NewTeam/Components/FileUploaderPopup";
import { BsThreeDots } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";
import { GoPencil } from "react-icons/go";

const FileGallery = ({ gallery }) => {
  const [size, setSize] = useState({
    width: gallery?.width,
    height: gallery?.height,
  });
  const galleryTitleRef = useRef();
  const fileInputRef = useRef();
  const [galleryTitle, setGalleryTitle] = useState(gallery.name);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState(gallery?.files);

  const {
    setUploading,
    setUploadCount,
    setCurrentlyUploadedFiles,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();
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

  useEffect(() => {
    getAPI(`/api/files/list?refID=${gallery._id}`).then((res) => {
      try {
        setUploadedFiles(res.data.files);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const startUploading = () => {
    setUploading(true);
  };
  const filteredFiles = uploadedFiles?.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onDrop = async (acceptedFiles) => {
    setUploadCount(acceptedFiles.length);
    setCurrentlyUploadedFiles(acceptedFiles);
    startUploading();
    setUploadCount(acceptedFiles.length);
    const updatedFiles = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const res = await getAPI("api/s3url");
      await fetch(res.data.data.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // Extract the URL without query parameters
      const URL = res.data.data.url.split("?")[0];
      const key = res.data.data.key;
      // Add file data to updatedFiles array
      updatedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL,
        key: key,
        refID: gallery._id,
      });

      console.log(URL);
    }
    const data = {
      files: updatedFiles,
      refID: gallery._id,
    };
    postAPI("/api/files/store", data)
      .then((res) => {
        setUploadedFiles(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });

    setUploading(false);
  };
  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (file) => {
    const files = [file.url];
    console.log(files);
    postAPI("/api/delete-files-s3", files)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const data = {
      files: [file],
      refID: gallery._id,
    };
    postAPI("/api/files/delete", data)
      .then((res) => {
        setUploadedFiles(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateGallery = () => {
    const data = {
      files: gallery.files,
      name: galleryTitle,
      width: size.width,
      height: size.height,
      galleryID: gallery._id,
      teamID: selectedTeam._id,
    };
    postAPI("/api/gallery/update", data)
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGallery = () => {
    const data = {
      galleryID: gallery._id,
      teamID: selectedTeam._id,
    };
    postAPI("/api/gallery/delete", data)
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "Error deleting gallery");
      });
  };
  return (
    <>
      <div className="position-relative  h-100 mt-5">
        <Rnd
          size={size}
          onResize={(e, direction, ref, delta, position) => {
            setSize({ width: ref.style.width, height: ref.style.height });
            UpdateGallery();
          }}
          disableDragging
          minHeight={400}
          maxHeight={3000}
          minWidth={600}
          maxWidth={"74vw"}
          className="file_gallery  rounded-2 pb-4 mb-5  dropzone h-100"
          enableResizing={{
            bottomRight: true,
          }}
          // ref={dropRef}
          // style={{ border: isOver ? "2px dashed #f00" : "1px solid #ddd" }}
        >
          <div>
            <div className="py-2 gallery_header px-3 centerIt justify-content-between ">
              {/* <span className="file_galleryH">{title}</span> */}
              <Form.Control
                ref={galleryTitleRef}
                type="text"
                className="titleInput bg-transparent shadow-none rounded-1 border-0 ps-2 me-3"
                placeholder=""
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
                onBlur={UpdateGallery}
                style={{ height: "28px" }}
              />
              <Dropdown>
                <Dropdown.Toggle
                  className="px-2 py-2 workspace-dropdown-button"
                  style={{ fontSize: "14px" }}
                >
                  <BsThreeDots />
                </Dropdown.Toggle>

                <Dropdown.Menu className="border-0 fs_14 px-2">
                  <Dropdown.Item
                    className="py-1 centerIt"
                    onClick={() => galleryTitleRef.current.focus()}
                  >
                    <GoPencil className="me-2" />
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-1 centerIt"
                    onClick={deleteGallery}
                  >
                    <LuTrash className="me-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
                          // onClick
                        >
                          {searchQuery ? (
                            <RxCross2 onClick={() => setSearchQuery("")} />
                          ) : (
                            <RxMagnifyingGlass className="text-color" />
                          )}
                        </Button>
                        <Form.Control
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for files"
                          className="py-1 shadow-none titleInput dynamicBG fw-normal Border fs_14 h-100"
                        />
                      </span>
                      <span className="d-flex">
                        <Button
                          className={`px-2 py-1 actionBtns btn_grid ${
                            fileView ? "activeBtn" : ""
                          }`}
                          onClick={() => setFileView(true)}
                        >
                          <FiGrid />
                        </Button>
                        <Button
                          className={`px-2 py-1 actionBtns btn_list ${
                            !fileView ? "activeBtn" : ""
                          }`}
                          onClick={() => setFileView(false)}
                        >
                          <FaListUl />
                        </Button>
                        <Button
                          className="p-2 h-100 ms-2 workspace_menuBtn bgHover align-middle"
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
                      <Col
                        xs={fileView ? 4 : 12}
                        key={file._id}
                        className="mt-3"
                      >
                        <File
                          index={index}
                          uploadedFiles={uploadedFiles}
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
        {/* <FileUploaderPopup closeUploading={() => setUploading(false)} /> */}
      </div>
    </>
  );
};

export default FileGallery;
