import React, { useState } from "react";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { Form } from "react-bootstrap";
import { postAPI } from "../../../../../helpers/apis";
import { RxCross2 } from "react-icons/rx";

const TextCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const [inputValue, setInputvalue] = useState(columnData);
  const [hovered, setIsHovered] = useState(false);

  const handleChange = () => {
    const postData = {
      data: inputValue,
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

  const clearCell = (id) => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        // console.log(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setInputvalue("");
        // console.log({team});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="centerIt "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "160px" }}
    >
      <Form.Control
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
        onBlur={handleChange}
        className="rounded-1 py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100 text-center"
        type="text"
      />

      <span style={{ width: "14px", marginLeft: "3px" }}>
        {inputValue && hovered && (
          <button
            className="px-0 py-0  file_deleteBtn flex  close-icon"
            onClick={(event) => {
              event.stopPropagation();
              clearCell(columnID);
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

export default TextCell;
