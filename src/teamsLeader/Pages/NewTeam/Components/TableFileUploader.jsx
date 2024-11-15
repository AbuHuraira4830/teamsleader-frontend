import React, { useRef } from "react";
import { FiX, FiUpload } from "react-icons/fi"; // Import the necessary icons
import { useStateContext } from "../../../../contexts/ContextProvider";
import { Button } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import UploadedFileModal from "./UploadedFileModal";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFileOn } from "react-icons/ci";
import { getAPI, postAPI } from "../../../../helpers/apis";

const TableFileUploader = ({ columnID, columnData }) => {
  const {
    FileAltIcons,
    setReplyFilePreview,
    setPreviewModalFiles,
    replyFilePreview,
    setModalShow,
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
    setCurrentItemIndex,
  } = useStateContext();
  const fileInputRef = useRef(null);
  let cellData = JSON.parse(columnData);

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const res = await getAPI("api/s3url");
    console.log(res.data);
    await fetch(res.data.data.url, {
      method: "PUT",
      headers: {
        "Content-Type": `${file?.type}`,
      },
      body: file,
    });
    const URL = res.data.data.url.split("?")[0];
    const data = JSON.stringify({
      name: file.name,
      url: URL,
      type: file?.type,
    });

    const postData = {
      data,
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/update/${columnID}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
      })
      .catch((err) => {
        console.log(err);
      });

    fileInputRef.current.value = null;
  };

  const onFileDelete = () => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${columnID}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    console.log(cellData);
    setModalShow({ modalActive: true });
    setPreviewModalFiles([cellData]);
    setCurrentItemIndex(0);
  };
  const handleFileAddClick = () => {
    // Programmatically trigger the file input when the "AiOutlinePlus" button is clicked
    fileInputRef.current.click();
  };

  const onFileUpload = () => {};
  return (
    <div>
      {cellData ? (
        <div className="centerIt justify-content-center">
          <a onClick={toggleModal}>{FileAltIcons(cellData)}</a>
          <UploadedFileModal replyFilePreview={replyFilePreview} />
          {/* <img
            src={files.url}
            alt="File"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          /> */}
          {/* <button onClick={onFileDelete}>
            <FiX />
          </button> */}
          <button
            className="px-0 py-0  file_deleteBtn flex ms-3"
            onClick={onFileDelete}
          >
            <RxCross2
              className=""
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
        </div>
      ) : (
        <div className="centerIt justify-content-center">
          <button
            className="px-0 py-0  file_deleteBtn file_addBtn ms-3"
            onClick={handleFileAddClick}
            style={{}}
          >
            <AiOutlinePlus
              className="mb-1"
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
          <CiFileOn className="" />
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default TableFileUploader;
