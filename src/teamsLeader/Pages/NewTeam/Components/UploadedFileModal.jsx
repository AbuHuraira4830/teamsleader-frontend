import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineFile,
  AiOutlineRight,
} from "react-icons/ai";
import {
  BsChat,
  BsEmojiSmile,
  BsPrinter,
  BsReply,
  BsThreeDots,
} from "react-icons/bs";
import { FiDownload, FiSidebar, FiTrash } from "react-icons/fi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { BiInfoCircle } from "react-icons/bi";
import { LuEyeOff, LuThumbsUp } from "react-icons/lu";
import IMAGES from "../../../../assets/images/Images";
import {
  PiAt,
  PiClockCounterClockwiseFill,
  PiImagesSquare,
  PiImagesSquareBold,
} from "react-icons/pi";
import { HiOutlineChevronDown, HiOutlinePaperClip } from "react-icons/hi";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import PreviewedFile from "./PreviewedFile";
import { useReactToPrint } from "react-to-print";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { getAPI, postAPI } from "../../../../helpers/apis";
import { RxCross2 } from "react-icons/rx";
import DeleteModal from "../../../../dynamicComponents/DeleteModal";

const UploadedFileModal = () => {
  const {
    modalShow,
    uploadedFiles,
    setAllFiles,
    renderFileIcon,
    fullscreen,
    replyFilePreview,
    setReplyFilePreview,
    setModalShow,
    FileAltIcons,
    previewModalFiles,
    setPreviewModalFiles,
    currentItemIndex,
    setCurrentItemIndex,
    selectedTask,
    setUploadedFiles,
    deletemodal,
    setDeleteModal,
  } = useStateContext();

  const modalData = modalShow;
  const allFiles = previewModalFiles;
  const closeModal = () => {
    setModalShow({ ...modalShow, modalActive: false });
    // setReplyFilePreview({ replyModalActive: false });
    setPreviewModalFiles([]);
  };

  const handleDownload = () => {
    const file = allFiles[currentItemIndex];
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

  const handleNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === allFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? allFiles.length - 1 : prevIndex - 1
    );
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // const [showComment, setShowComment] = useState(false);
  const handleDeleteFile = () => {
    const data = {
      files: [allFiles[currentItemIndex]],
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

    // Remove selected files from uploadedFiles
    const files = allFiles[currentItemIndex]?.url;
    console.log(files);
    postAPI("/api/delete-files-s3", files)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    handleNext();
    const updatedFiles = [...allFiles];
    updatedFiles.splice(currentItemIndex, 1);
    handleNext();
    setPreviewModalFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      closeModal();
    }
  };

  const closeDeleteModal = () => setDeleteModal(false);
  const openDeleteModal = () => setDeleteModal(true);
  const replyActive = replyFilePreview.replyModalActive;
  return (
    <Modal
      id="file_preview_modal"
      show={modalData.modalActive}
      onHide={closeModal}
      centered
      fullscreen={fullscreen}
    >
      <Modal.Header>
        <div className="flex">
          <span className="file_modalIcon ">
            {FileAltIcons(allFiles[currentItemIndex])}
          </span>
          <span className="ms-2">
            <p className="m-0 fs_14 fw-bold">
              {allFiles[currentItemIndex]?.name}
            </p>
            <span className=" centerIt">
              <Button
                type="button"
                className="px-1 py-0 workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                // onClick={() => handleClose}
              >
                <FiSidebar className="me-1" /> Team Name
              </Button>
              <AiOutlineRight className="fs-6 " />
              <Button
                type="button"
                className="px-1 py-0 workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                onClick={closeModal}
              >
                <TbLayoutSidebarLeftCollapse className="me-1" /> item
              </Button>
            </span>
          </span>
        </div>
        <button
          type="button"
          class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 "
          aria-label="Close"
          onClick={closeModal}
          style={{
            width: "35px",
            height: "35px",
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
        >
          <RxCross2 className="fs-3 text-color" />
        </button>
      </Modal.Header>
      <Modal.Body className="p-0 h-100 mh-100">
        <div className="flex justify-content-between h-100 mh-100">
          <div className="centerIt justify-content-center preview_modalbg w-100 position-relative">
            <div className="ps-5">
              <Button
                type="button"
                className="p-2  workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                onClick={handlePrevious}
                disabled={allFiles.length === 1}
              >
                <SlArrowLeft className="fs-3 fw-bold" />
              </Button>
            </div>
            <PreviewedFile
              file={renderFileIcon(allFiles[currentItemIndex])}
              // file={renderFileIcon(allFiles[currentItemIndex])}
              ref={componentRef}
            />
            <div className="pe-5">
              <Button
                type="button"
                className="p-2  workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                onClick={handleNext}
                disabled={allFiles.length === 1}
              >
                <SlArrowRight className="fs-3 fw-bold" />
              </Button>
            </div>
            <DeleteModal
              handleDeleteFile={handleDeleteFile}
              fileName={`file ${allFiles[currentItemIndex]?.name}`}   
            />

            <div className="centerIt preview_control position-absolute">
              {/* <Button
                type="button"
                className="px-2 py-1 mx-3 workspace-dropdown-button"
                onClick={() => setShowComment((current) => !current)}
              >
                <BsChat className="fs-5 me-1" />
                Comments
              </Button> */}
              <Button
                type="button"
                className="px-2 py-1 mx-3 workspace-dropdown-button"
                style={{ fontSize: "16px" }}
                onClick={handlePrint}
                // disabled={allFiles.length === 1}
              >
                <BsPrinter />
              </Button>
              <Button
                type="button"
                className="px-2 py-1 me-3   workspace-dropdown-button"
                style={{ fontSize: "16px" }}
                onClick={handleDownload}
              >
                <FiDownload />
              </Button>

              <Button
                type="button"
                className="px-2 py-1 me-3 workspace-dropdown-button"
                style={{ fontSize: "16px" }}
                onClick={openDeleteModal}
                // disabled={allFiles.length === 1}
              >
                <FiTrash />
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadedFileModal;

// onClick={() => handlePrint(modalData.file)}

// const [printer, setPrinter] = useState(null);

// useEffect(() => {
//   setPrinter(new usePrinter());
// }, []);
// const handlePrint = () => {
//   const content = document.getElementsByClassName("preview_modal");
//   const contentClone = content.cloneNode(true);

//   const printWindow = window.open("", "_blank");
//   printWindow.document.write("<html><head><title>Print</title></head><body>");
//   printWindow.document.write(contentClone.innerHTML);
//   printWindow.document.write("</body></html>");
//   printWindow.document.close();
//   printWindow.print();
// };

{
  /* <div
            style={{ width: "105px" }}
            className="fs_14 border-start preview_modalBtns  flex-column centerIt"
          >
            <div className="flex-column py-2 mb-3 mt-2 cursor_pointer centerIt ">
              <BsChat className="fs-3" />
              Comments
            </div>
            <div className="flex-column py-2 mb-3 cursor_pointer centerIt">
              <PiClockCounterClockwiseFill className="fs-3" /> Version
            </div>
            <div className="flex-column py-2 mb-3 cursor_pointer centerIt">
              <PiImagesSquare className="fs-3" /> Gallery
            </div>
            <div className="flex-column py-2 mb-3 cursor_pointer centerIt">
              <BiInfoCircle className="fs-3" /> Info
            </div>
          </div> */
}
