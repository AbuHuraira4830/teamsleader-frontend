import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RxMagnifyingGlass } from "react-icons/rx";
// import { getAPI } from "../../helpers/apis";
import { useChatsContext } from "../../contexts/ChatsContext";
import AddWorkSpaceModal from "./AddWorkSpaceModal";
import { useNavigate } from "react-router-dom";

const Workspace = ({ hide }) => {
  const navigate = useNavigate();
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const handleClose = () => setWorkspaceModal(false);
  const {
    loginUserChats,
    workspaceIndex,
    setWorkspaceIndex,
    setOpenWorkspaceList,
    setOpenedPrivateUser,
  } = useChatsContext();
  const addWorkspace = (newWorkspace) => {
    setWorkspaces((currentWorkspaces) => [...currentWorkspaces, newWorkspace]);
  };

  //   const showWorkspace = (id) => {
  //     getAPI(`/api/workspace/${id}`)
  //       .then((response) => {
  //         setSelectedWorkspace(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setSelectedWorkspace(null);
  //       });
  //   };
  const handleWorkspaceClick = (index, Wid) => {
    setWorkspaceIndex(index);
    setOpenedPrivateUser({});
    navigate(`/inbox/${Wid}`);
  };
  return (
    <div className="p-2 ">
      <div className="flex position-relative align-items-center me-2 search_inputDiv mb-3">
        <Form.Control
          type="text"
          placeholder="Search for a workspace"
          className="px-4 py-1 shadow-none workspace_searchInput transparent_bg"
        />
        <RxMagnifyingGlass
          className="position-absolute fs-5 "
          style={{ right: "5px", color: "#676879" }}
        />
      </div>
      <p className="m-2 fs_14" style={{ color: "#676879" }}>
        My workspacesddas
      </p>

      <div className="mb-2">
        {/* {workspaces.map((workspace, index) => (
          <Button
            key={index}
            className="workspace-dropdown-button workspace-dropdownBtn centerIt w-100 text-start py-1 me-2 px-2"
            // onClick={() => showWorkspace(workspace._id)}
          >
            {workspace.logo ? (
              <img
                src={workspace.logo}
                alt={workspace.name}
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                className="me-2"
              />
            ) : (
              <span
                className="workspace_icon me-2"
                style={{ backgroundColor: workspace.color }}
              >
                {workspace.name[0]}
              </span>
            )}
            {workspace.name}
          </Button>
        ))} */}
        <div className="flex flex-col gap-2">
          {loginUserChats?.map((workspace, index) => (
            // <span
            //   key={workspace?._id}
            //   className={
            //     workspaceIndex === index
            //       ? "font-bold cursor-pointer"
            //       : "cursor-pointer"
            //   }
            //   onClick={() => handleWorkspaceClick(index)}
            // >
            //   {workspace?.name}
            // </span>
            <Button
              key={index}
              className="workspace-dropdown-button workspace-dropdownBtn centerIt w-100 text-start py-1 me-2 px-2"
              // onClick={() => showWorkspace(workspace._id)}
              onClick={() => handleWorkspaceClick(index, workspace?._id)}
            >
              {workspace.logo ? (
                <img
                  src={workspace.logo}
                  alt={workspace.name}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  className="me-2"
                />
              ) : (
                <span
                  className="workspace_icon me-2"
                  style={{ backgroundColor: workspace.color }}
                >
                  {workspace.name[0]}
                </span>
              )}
              {workspace.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-top py-2">
        <Button
          className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 w-100"
          onClick={() => {
            setWorkspaceModal(true), hide();
          }}
        >
          + Add workspace
        </Button>
      </div>

      {/* <AddWorkSpaceModal
        show={workspaceModal}
        handleClose={handleClose}
        addWorkspace={addWorkspace}
      /> */}
    </div>
  );
};

export default Workspace;
