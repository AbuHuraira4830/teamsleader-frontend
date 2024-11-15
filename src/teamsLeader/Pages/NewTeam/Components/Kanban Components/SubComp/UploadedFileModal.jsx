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
// import IMAGES from "../../../../assets/images/Images";
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
import { useStateContext } from "../../../../../../contexts/ContextProvider";
import { useKanbanContext } from "../../../../../../contexts/KanbanContext";
// import { useStateContext } from "../../../../contexts/ContextProvider";
// import { useKanbanContext } from "../../../../../../contexts/KanbanContext";

const UploadedFileModal = ({ handleClose, taskId }) => {
  console.log({
    taskId,
  });
  const {
    modalShow,
    uploadedFiles,
    // setAllFiles,
    renderFileIcon,
    fullscreen,
    replyFilePreview,
    setReplyFilePreview,
    setModalShow,
    FileAltIcons,
  } = useStateContext();
  console.log({ modalShow });
  const { data, setData } = useKanbanContext();
  const closeModal = () => {
    setModalShow({ ...modalShow, modalActive: false });
    setReplyFilePreview({ replyModalActive: false });
  };
  const modalData = modalShow;
  console.log({
    modalData,
  });
  
  const allFiles = data.tasks[modalData?.taskId]?.files || [];
  console.log({
    allFiles,
  });
  const handleDownload = () => {
    const file = replyActive
      ? replyFilePreview.file
      : allFiles[currentItemIndex];

    const link = document.createElement("a");
    link.href = file.url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [currentItemIndex, setCurrentItemIndex] = useState(
    allFiles.findIndex((file) => file === modalData.file)
  );

  const handleNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === allFiles.length - 1 ? 0 : prevIndex + 1
    );
    console.log(allFiles[currentItemIndex]);
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
    const updatedFiles = [...allFiles];
    updatedFiles.splice(currentItemIndex, 1);
    // setAllFiles(updatedFiles);
    handleNext();
    if (updatedFiles.length === 0) {
      closeModal();
    }
  };
  const [deletemodal, setDeleteModal] = useState(false);

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
      <Modal.Header closeButton>
        <div className="flex">
          <span className="file_modalIcon ">
            {" "}
            {replyActive
              ? FileAltIcons(replyFilePreview.file)
              : FileAltIcons(allFiles[currentItemIndex])}
          </span>
          <span className="ms-2">
            <p className="m-0 fs_14 fw-bold">{modalData.file.name}</p>
            <span className=" centerIt">
              <Button
                type="button"
                className="px-1 py-0 workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                onClick={() => handleClose}
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
                disabled={replyActive}
              >
                <SlArrowLeft className="fs-3 fw-bold" />
              </Button>
            </div>
            <PreviewedFile
              file={
                replyActive
                  ? renderFileIcon(replyFilePreview.file)
                  : renderFileIcon(allFiles[currentItemIndex])
              }
              // file={renderFileIcon(allFiles[currentItemIndex])}
              ref={componentRef}
            />
            <div className="pe-5">
              <Button
                type="button"
                className="p-2  workspace-dropdown-button border-0 centerIt"
                style={{ fontSize: "14px" }}
                onClick={handleNext}
                disabled={replyActive}
              >
                <SlArrowRight className="fs-3 fw-bold" />
              </Button>
            </div>
            <Modal show={deletemodal} onHide={closeDeleteModal}>
              <Modal.Header className="border-0" closeButton>
                <p className="m-0">Delete the file {modalData.file.name}?</p>
              </Modal.Header>
              <Modal.Footer className="border-0">
                <Button
                  className="workspace-dropdown-button fw-normal rounded-1 py-1  px-3 "
                  style={{
                    height: "40px",
                  }}
                  onClick={closeDeleteModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="p-2 px-3  workspace_addBtn rounded-1 border-0"
                  style={{ backgroundColor: "#025231" }}
                  onClick={() => {
                    closeDeleteModal();
                    handleDeleteFile();
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
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
                disabled={replyActive}
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
                disabled={replyActive}
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
