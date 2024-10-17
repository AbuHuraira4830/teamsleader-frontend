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
// import UploadedFileModal from "./UploadedFileModal";
import Card from "react-bootstrap/Card";
import { FaRegTrashCan } from "react-icons/fa6";
// import FileUploaderPopup from "./FileUploaderPopup";
import { BsThreeDots } from "react-icons/bs";
// import { useStateContext } from "../../../../../../contexts/ContextProvider";
// import IMAGES from "../../../../../../assets/images/Images";
// import FileUploaderPopup from "../../FileUploaderPopup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import VideoFileOutlinedIcon from "@mui/icons-material/VideoFileOutlined";
// import UploadedFileModal from "./UploadedFileModal";
import { useStateContext } from "../../../../../../../contexts/ContextProvider";
import { useKanbanContext } from "../../../../../../../contexts/KanbanContext";
import UploadedFileModal from "../../SubComp/UploadedFileModal";
import FileUploaderPopup from "../../../FileUploaderPopup";
const FileUpload = forwardRef(({ handleClose, taskId }, ref) => {
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
    setFullscreen,
    breakpoint,
    openTaskId,
    renderFileIcon,
  } = useKanbanContext();

  const { data, setData } = useKanbanContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef();

  const startUploading = () => {
    setUploading(true);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onDrop = async (acceptedFiles) => {
    setUploadCount(acceptedFiles.length);
    setCurrentlyUploadedFiles(acceptedFiles);
    startUploading();

    await delay(500);
    setUploadCount(acceptedFiles.length);

    const updatedFiles = acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

    // Update data with the new files for the specific task
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.tasks[taskId].files = [
        ...(updatedData.tasks[taskId].files || []),
        ...updatedFiles,
      ];
      return updatedData;
    });

    await delay(30000);
    setUploading(false);
  };
  console.log({ uploadedFiles });
  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

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

  const filteredFiles = data?.tasks[taskId]?.files?.filter((file) => {
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
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.slice());
    }
  };

  const handleDeleteSelected = () => {
    // Remove selected files from uploadedFiles
    const updatedFiles = uploadedFiles.filter(
      (file) => !selectedFiles.includes(file)
    );
    setUploadedFiles(updatedFiles);
  };

  const fireClick = () => {
    document.getElementById("clickFire").click();
  };

  useImperativeHandle(ref, () => ({
    fireClick,
  }));

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
            {(!data.tasks[taskId]?.files ||
              data.tasks[taskId]?.files.length === 0) && (
              <div className="w-full flex items-center justify-center gap-1">
                <AddCircleIcon
                  style={{ fontSize: "16px" }}
                  className="text-blue-500"
                />
                <InsertDriveFileOutlinedIcon style={{ fontSize: "16px" }} />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              {...getInputProps()}
            />

            <Row
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="uploaded_files"
            >
              {modalShow.modalActive && (
                <UploadedFileModal
                  taskId={taskId}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  handleClose={() => handleClose}
                />
              )}
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
              <div className="flex items-center gap-1">
                {filteredFiles?.map((file, index) => (
                  <span key={index}>
                    {fileView ? (
                      <Col xs={4} className="">
                        <div
                          className=" file-icon justify-content-center align-items-center flex ofcanvasFile w-4 h-4"
                          // style={{ height: "100%", width: "100%" }}
                          onClick={() => {
                            setModalShow({
                              modalActive: true,
                              file,
                              taskId: openTaskId,
                            });
                            setFullscreen(breakpoint);
                          }}
                        >
                          {renderFileIcon(file)}
                        </div>

                        {/* <div className="flex justify-content-between mt-2 fs_14 align-items-center px-1">
                        <p className="m-0 file-name ">
                          {file.name.length > 20
                            ? `${file.name.substring(0, 20)}...`
                            : file.name}
                        </p>
                        <AiOutlineClockCircle />
                      </div> */}
                        {/* <Button
                        type="button"
                        className="px-1 py-0 workspace-dropdown-button border-0"
                        style={{ fontSize: "14px" }}
                      >
                        <PiImagesSquareThin />
                        Files Gallery
                      </Button> */}
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
                              onClick={() => {
                                setModalShow({ modalActive: true, file });
                                setFullscreen(breakpoint);
                              }}
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
                  </span>
                ))}
              </div>
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
});

export default FileUpload;
