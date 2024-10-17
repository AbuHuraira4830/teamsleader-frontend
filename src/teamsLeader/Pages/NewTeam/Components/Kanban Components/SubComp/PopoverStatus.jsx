import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import { v4 as uuidv4 } from "uuid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useKanbanContext } from "../../../../../../contexts/KanbanContext";
const PopoverContent = ({ taskId, onSelectColumn }) => {
  // const [status, setStatus] = useState([
  //   { text: "Working on it", backgroundColor: "#fdab3d", id: uuidv4() },
  //   { text: "Stuck", backgroundColor: "#e2445c", id: uuidv4() },
  //   { text: "Done", backgroundColor: "#00c875", id: uuidv4() },
  // ]);

  const { data, setData } = useKanbanContext();
const handleStatusSelection = (targetColumnId) => {
  // Find the task in the data object
  const taskToUpdate = data.tasks[taskId];

  // Find the current column of the task
  const currentColumnId = Object.keys(data.columns).find(
    (columnId) => data.columns[columnId].taskIds.indexOf(taskId) !== -1
  );

  // Check if the selected column is different from the current column
  if (currentColumnId !== targetColumnId) {
    // Remove the task from the current column
    const updatedColumns = {
      ...data.columns,
      [currentColumnId]: {
        ...data.columns[currentColumnId],
        taskIds: data.columns[currentColumnId].taskIds.filter(
          (id) => id !== taskId
        ),
      },
      [targetColumnId]: {
        ...data.columns[targetColumnId],
        taskIds: [...data.columns[targetColumnId].taskIds, taskId],
      },
    };

    // Update the data object with the updated columns
    const updatedData = {
      ...data,
      columns: updatedColumns,
    };

    // Set the updated data in the state
    setData(updatedData);

    // Set the selected column information
    onSelectColumn({
      title: data.columns[targetColumnId].title,
      backgroundColor: data.columns[targetColumnId].backgroundColor,
    });
  } 
};



  // const taskStatus = data.tasks[taskId]?.status;
  // console.log({ taskStatus });
  return (
   
    <div className="w-52 p-2">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        return (
          <div
            key={column.id}
            className="py-2 mx-3 my-2 text-white text-center cursor-pointer"
            style={{ background: column.backgroundColor }}
            onClick={() => handleStatusSelection(columnId)}
          >
            <div>{column.title}</div>
          </div>
        );
      })}
      {/* <hr />
      <div className="flex items-center justify-center gap-1">
        <EditOutlinedIcon />
        <span>Edit Labels</span>
      </div> */}
    </div>
  );
};
const PopoverStatus = ({ taskId }) => {
  const { data, setData, isEditTaskModalOpen } = useKanbanContext();
  const [open, setOpen] = useState(false);
  // const hide = () => {
  //   setOpen(false);
  // };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const [selectedColumn, setSelectedColumn] = useState(null);
  useEffect(() => {
    // Set the default selected column based on the current column of the task
    const currentColumnId = Object.keys(data.columns).find(
      (columnId) => data.columns[columnId].taskIds.indexOf(taskId) !== -1
    );

    if (currentColumnId) {
      setSelectedColumn({
        title: data.columns[currentColumnId].title,
        backgroundColor: data.columns[currentColumnId].backgroundColor,
      });
    }
  }, [data, taskId]);
  return (
    <Popover
      content={
        <PopoverContent taskId={taskId} onSelectColumn={setSelectedColumn} />
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <span
        className={`rounded bg-gray-100 flex-1 ${isEditTaskModalOpen ? "h-10":"h-8"} flex items-center justify-center cursor-pointer`}
        style={{
          background: selectedColumn?.backgroundColor,
          color: selectedColumn ? "white" : "black",
        }}
      >
        {selectedColumn?.title}
      </span>
    </Popover>
  );
};
export default PopoverStatus;
