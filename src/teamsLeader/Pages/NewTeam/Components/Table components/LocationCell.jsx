import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const LocationCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const [locationValue, setLocationValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const saveLocation = () => {
    const postData = {
      data: locationValue,
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
  };

  const clearCell = () => {
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
    setLocationValue("");
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex align-items-center justify-content-center"
    >
      <Form.Control
        className="py-0 shadow-none workspace_searchInput world_clock transparent_bg h-100 me-1 fw-normal text-center"
        value={columnData || locationValue}
        onChange={(e) => setLocationValue(e.target.value)}
        onBlur={saveLocation}
        style={{
          width: "150px",
        }}
      />
      <span style={{ width: "14px" }}>
        {columnData && isHovered && (
          <button
            className="px-0 py-0  file_deleteBtn flex  close-icon"
            onClick={(event) => {
              event.stopPropagation();
              clearCell();
            }}
          >
            <RxCross2
              className=""
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
        )}
      </span>
    </div>
  );
};

export default LocationCell;
