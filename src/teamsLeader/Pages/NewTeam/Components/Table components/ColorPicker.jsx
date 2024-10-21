import { Popover } from "antd";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { RxCross2 } from "react-icons/rx";
import { postAPI } from "../../../../../helpers/apis";

const ColorPicker = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();
  const [open, setOpen] = useState(false);

  const handleColorPickerColumn = (id, color) => {
    const data = JSON.stringify({
      color: color.hex, // Storing icon type as string
    });
    const postData = {
      data,
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/update/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        // console.log(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const clearColorPickerCell = (id) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  let cellData = JSON.parse(columnData);
  return (
    <Popover
      content={
        <ChromePicker
          color={cellData?.color}
          onChange={(color) => handleColorPickerColumn(columnID, color)}
        />
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <span
        className="d-flex align-items-center justify-content-center textCell_width"
        style={{ padding: "12px 0px" }}
      >
        <span
          className="rounded-circle"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: cellData?.color,
          }}
        ></span>
        <p className="m-0 ms-2">{cellData?.color}</p>
        {cellData && (
          <button
            className="px-0 py-0 file_deleteBtn d-flex ms-3 close-icon"
            onClick={(event) => {
              // Prevent the color picker from triggering
              event.stopPropagation();
              // Handle close icon click
              clearColorPickerCell(columnID);
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
    </Popover>
  );
};

export default ColorPicker;
