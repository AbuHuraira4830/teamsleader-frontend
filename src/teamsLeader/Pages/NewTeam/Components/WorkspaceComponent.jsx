import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RxMagnifyingGlass } from "react-icons/rx";
import AddWorkspaceModal from "./AddWorksaceModal";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
const Workspace = ({
  hide,
  setSelectedWorkspace,
  setNewTeam,
  selectedWorkspace,
  setSelectedTeam,
  workspaces,
  setWorkspaces,
}) => {
  const navigate = useNavigate();
  const { setTeamTasks } = useStateContext();
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const handleClose = () => setWorkspaceModal(false);
  const showWorkspace = (id) => {
    hide();
    const targetWorkspace = workspaces.find(
      (workspace) => workspace._id === id
    );
    if (targetWorkspace) {
      setSelectedWorkspace(targetWorkspace);
      const teams = targetWorkspace.teams;
      setNewTeam(teams);
      setSelectedTeam(teams[0]);
      setTeamTasks(teams[0]);
      if (teams[0]) navigate(`/workspace/${id}/team/${teams[0]._id}`);
      else navigate(`/workspace/${id}`);
    } else {
      console.error("Workspace not found");
      setSelectedWorkspace(null);
      setNewTeam(null);
      setTeamTasks(null);
    }
  };

  return (
    <div className="p-2">
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
        My workspaces
      </p>
      <div className="mb-2">
        {workspaces?.map((workspace, index) => (
          <Button
            key={index}
            className={`workspace-dropdown-button workspace-dropdownBtn centerIt w-100 text-start py-1 me-2 px-2 ${
              selectedWorkspace?._id === workspace?._id && "Selected"
            }`}
            onClick={() => {
              showWorkspace(workspace._id);
            }}
          >
            <span
              className="workspace_icon me-2"
              style={{ backgroundColor: workspace.color }}
            >
              {workspace.name[0]}
            </span>
            {workspace.name}
          </Button>
        ))}
      </div>
      <div className="border-top py-2">
        <Button
          className="workspace-dropdown-button position-relative fw-normal align-self-center text-start py-1 px-3 w-100"
          onClick={() => {
            setWorkspaceModal(true);
            hide();
          }}
        >
          + add workspace
        </Button>
      </div>
      <AddWorkspaceModal
        show={workspaceModal}
        handleClose={handleClose}
        setWorkspaces={setWorkspaces}
        workspaces={workspaces}
      />
    </div>
  );
};
export default Workspace;
