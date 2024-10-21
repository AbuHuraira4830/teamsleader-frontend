import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import LabelSelectionModal from "../LabelSelectionModal";
import { getAPI, postAPI } from "../../../../../helpers/apis";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const PriorityCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
    setTaskMode,
  } = useStateContext();
  const cellData = JSON.parse(columnData);
  const [labels, setLabels] = useState(null);
  const [open, setOpen] = useState("");

  useEffect(() => {
    if (!labels) {
      getAPI("/api/task-priority/list")
        .then((response) => {
          console.log(response.data.taskLabel);
          setLabels(response.data.taskLabel);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleLabelSelection = (lID, tID, label) => {
    const data = { text: label.text, color: label.color };
    const postData = {
      data: JSON.stringify(data), // Data is already structured as needed
      workspaceID: selectedWorkspace._id,
    };
    const id = columnID;
    postAPI(`/api/table-cell/update/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popover
      content={
        <LabelSelectionModal
          labels={labels}
          setLabels={setLabels}
          //   labelModalRef={labelModalRef}
          handleSelection={handleLabelSelection}
        />
      }
      trigger="click"
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <span
        className="d-flex justify-content-center statusSpan textCell_width"
        onClick={() => setTaskMode("priority")}
        style={{
          backgroundColor: cellData?.color || "#CDCDCD",
          position: "relative",
        }}
      >
        {cellData?.text}
      </span>
    </Popover>
  );
};

export default PriorityCell;



