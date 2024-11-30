import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Button, Col, InputGroup, Modal, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FiPlus, FiTrash } from "react-icons/fi";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineFile,
  AiOutlineFileImage,
} from "react-icons/ai";
import { PiImagesSquareThin } from "react-icons/pi";
import { ImFilePdf } from "react-icons/im";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { GiZipper } from "react-icons/gi";
import UploadedFileModal from "./UploadedFileModal";
import Card from "react-bootstrap/Card";
import { FaRegTrashCan } from "react-icons/fa6";
import FileUploaderPopup from "./FileUploaderPopup";
import { BsThreeDots } from "react-icons/bs";
import IMAGES from "../../../../assets/images/Images";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { getAPI, postAPI } from "../../../../helpers/apis";
import { data } from "autoprefixer";

const FileUploader = ({ handleClose }) => {
  const {
    fileView,
    searchQuery,
    setUploading,
    setUploadCount,
    setCurrentlyUploadedFiles,
    setUploadedFiles,
    modalShow,
    setModalShow,
    uploadedFiles,
    renderFileIcon,
    setFullscreen,
    breakpoint,
    selectedTask,
    setPreviewModalFiles,
    setCurrentItemIndex,
  } = useStateContext();

  const [selectedFiles, setSelectedFiles] = useState([]);
  // const fileInputRef = useRef();

  // useEffect(() => {
  //   setCurrentlyUploadedFiles(uploadedFiles);
  // }, [uploadedFiles]);

  const startUploading = () => {
    setUploading(true);
  };
  // const { name, setName } = useStateContext();

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
        refID: selectedTask,
      });

      console.log(URL);
    }
    const data = {
      files: updatedFiles,
      refID: selectedTask,
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
  // useEffect(() => {
  //   // Update file input element's ref when fileSectionRef changes
  //   fileSectionRef.current = fileSectionRef?.current;
  // }, [fileSectionRef]);

  // useImperativeHandle(ref, () => ({
  //   fireClick,
  // }));

  const renderListIcon = (file) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return (
        <span
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
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
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
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
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#237F4C" }}
        >
          <img src={IMAGES.EXCEL} alt="Uploaded file" />
        </span>
      );
    } else if (fileType === "application/pdf") {
      return (
        <span
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
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
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#FFCC00" }}
        >
          <img src={IMAGES.ZIP} alt="Uploaded file" />
        </span>
      );
    } else {
      return (
        <span
          className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
          style={{ backgroundColor: "#5559DF" }}
        >
          <img src={IMAGES.UNKNOWN} alt="Uploaded file" />
        </span>
      );
    }
  };

  const openPreviewFromPopup = (file) => {
    setModalShow({ modalActive: true, file });
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    return file.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCheckboxClick = (file) => {
    const index = selectedFiles.indexOf(file);
    if (index === -1) {
      setSelectedFiles([...selectedFiles, file]);
    } else {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(index, 1);
      setSelectedFiles(newSelectedFiles);
    }
    console.log(selectedFiles);
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.slice());
    }
  };

  const handleDeleteSelected = () => {
    const files = selectedFiles.map((file) => file.url);
    console.log(files);
    postAPI("/api/delete-files-s3", files)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const data = {
      files: selectedFiles,
      refID: selectedTask,
    };
    console.log(data);
    postAPI("/api/files/delete", data)
      .then((res) => {
        setUploadedFiles(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });

    setSelectedFiles([]);
  };
  const fileSectionRef = useRef(null);
  const handleAddFiles = () => {
    fileSectionRef.current?.click();
  };
  const handleShowModal = (index) => {
    setCurrentItemIndex(index);
    setModalShow({ modalActive: true });
    setPreviewModalFiles(uploadedFiles);
  };
  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <Button
              onClick={handleAddFiles}
              id="clickFire"
              className="d-none"
            ></Button>

            {uploadedFiles == "" && (
              <div className="text-center flex flex-column justify-content-center pt-5 mt-5 mb-2">
                <p className="fw-bold m-0">Drag & drop or add files here</p>
                <p className="w-75 align-self-center fs_14">
                  Upload, comment, and review all files in this item to easily
                  collaborate in context
                </p>
                <div className="flex justify-content-center">
                  {" "}
                  <Button
                    type="button"
                    className="px-3 py-2 flex align-items-center workspace_addBtn border-0"
                    style={{ backgroundColor: "#025231", fontSize: "14px" }}
                    onClick={handleAddFiles}
                  >
                    <FiPlus className="me-2" />
                    Add files
                  </Button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileSectionRef}
              style={{ display: "none" }}
              {...getInputProps()}
            />

            <Row
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="uploaded_files"
            >
              {/* {modalShow.modalActive && ( */}
              <UploadedFileModal
                onClick={(event) => {
                  event.stopPropagation();
                }}
                handleClose={() => handleClose}
              />
              {/* )} */}
              {!fileView && (
                <Col xs={12} className="flex mt-4 ps-3">
                  {uploadedFiles.length > 0 && (
                    <>
                      <InputGroup.Checkbox
                        checked={selectedFiles.length === filteredFiles.length}
                        onChange={handleSelectAll}
                      />
                      <Button
                        className="p-2 workspace_menuBtn bgHover ms-2 border text-danger"
                        onClick={handleDeleteSelected}
                      >
                        <FaRegTrashCan />
                      </Button>
                    </>
                  )}
                </Col>
              )}
              {filteredFiles.map((file, index) => (
                <>
                  {fileView ? (
                    <Col xs={4} key={index} className="mt-3">
                      <div
                        className="file-icon justify-content-center align-items-center flex ofcanvasFile"
                        style={{ height: "115px", width: "100%" }}
                        onClick={() => handleShowModal(index)}
                      >
                        {renderFileIcon(file)}
                      </div>

                      <div className="centerIt justify-content-between mt-2 fs_14  px-1">
                        <p className="m-0 file-name ">
                          {file.name.length > 20
                            ? `${file.name.substring(0, 20)}...`
                            : file.name}
                        </p>
                        <AiOutlineClockCircle />
                      </div>
                      <Button
                        type="button"
                        className="px-1  centerIt py-0 workspace-dropdown-button border-0"
                        style={{ fontSize: "14px" }}
                      >
                        <PiImagesSquareThin />
                        Files Gallery
                      </Button>
                    </Col>
                  ) : (
                    <>
                      <Col xs={12} key={index} className="mt-3">
                        <div className="flex justify-content-between py-2 border rounded-2 px-2 cursor_pointer ">
                          <InputGroup.Checkbox
                            checked={selectedFiles.includes(file)}
                            onChange={() => handleCheckboxClick(file)} 
                            // className="me-2"
                          />
                          <div
                            className="flex w-100 ms-2"
                            onClick={() => handleShowModal(index)}
                          >
                            {renderListIcon(file)}
                            <div className="flex flex-column justify-content-between ps-3 ">
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
                          <div className="flex-column flex ">
                            <Button
                              type="button"
                              className="px-2 py-1 workspace-dropdown-button"
                              style={{ fontSize: "14px" }}
                            >
                              <BsThreeDots />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </>
                  )}
                </>
              ))}
            </Row>
          </div>
        )}
      </Dropzone>
      <FileUploaderPopup
        closeUploading={() => setUploading(false)}
        openPreviewFromPopup={openPreviewFromPopup}
      />
    </>
  );
};

export default FileUploader;
