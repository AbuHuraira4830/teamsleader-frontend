import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useChatsContext } from "../../../../contexts/ChatsContext";
import { Tooltip } from "antd";
import { uploadImagesAndCalculateRealTimePercentage } from "../../script";
import { Button, message } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flex, Progress } from "antd";

const AlertMessageBox = () => {
  const { uploadingProgress } = useChatsContext();
  return (
    <>
      <div className="flex items-center justify-center gap-5 w-80">
        {uploadingProgress < 100 ? (
          <span>Uploading in Progress</span>
        ) : (
          <span>Upload Complete</span>
        )}
        <span>{uploadingProgress + " %"}</span>
      </div>
    </>
  );
};
const FileUpload = () => {
  const {
    selectedFiles,
    setSelectedFiles,
    uploadingProgress,
    setUploadingProgress,
    uploadedFiles,
    setUploadedFiles,
  } = useChatsContext();
  // console.log({ uploadingProgress });
  const [messageApi, contextHolder] = message.useMessage();

  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (uploadingProgress === 100 && toastId) {
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    }
  }, [uploadingProgress, toastId]);
  // const success = () => {
  //   messageApi.open({
  //     // type: "success",
  //     content: "Uploading .........",
  //     className: "custom-class",
  //     style: {
  //       marginTop: "10vh",
  //     },
  //   });
  // };

  const handleFileChange = (e) => {
    const newFilesArray = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
    // success();

    // Initialize formData for multiple files
    const formData = new FormData();

    newFilesArray.forEach((file, index) => {
      formData.append(`fileBase64[${index}]`, file);
    });

    uploadImagesAndCalculateRealTimePercentage(
      formData,
      uploadingProgress,
      setUploadingProgress,
      setSelectedFiles,
      setUploadedFiles
    );
    const newToastId = toast(<AlertMessageBox />, {
      position: "top-center",
      autoClose: false, // Disable autoClose to keep the toast open until uploadingProgress reaches 100%
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: {
        marginTop: "100px", // Set the top margin to 100px
        width: "fit-content",
        height: "fit-content",
      },
      closeButton: false,
    });

    setToastId(newToastId);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      {/* {contextHolder} */}
      <input
        id="fileInput"
        type="file"
        multiple
        // accept=".pdf,.doc,.docx,.zip,image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        className="cursor-pointer bg-gray-100 p-1 rounded-full text-2xl"
        onClick={handleButtonClick}
      >
        <Tooltip title="Add files">
          <IoAddOutline />
        </Tooltip>
      </button>
      <ToastContainer />
    </>
  );
};

export default FileUpload;
