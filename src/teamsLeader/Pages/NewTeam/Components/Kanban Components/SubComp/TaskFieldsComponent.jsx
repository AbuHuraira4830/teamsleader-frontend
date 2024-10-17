import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileUpload from "./FileUpload";
import { useKanbanContext } from "../../../../../../contexts/KanbanContext";
const TaskFieldsComponent = ({
  column,
  task,
  fieldName,
  handleFieldChange,
}) => {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [inputVisibleTaskId, setInputVisibleTaskId] = useState(null);
  const {setIsEditData , isEditData} = useKanbanContext()

  const handleMouseEnter = () => {
    setHoveredTaskId(task.id);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  const handleIconClick = () => {
    setInputVisibleTaskId(task.id);
  };

  const handleFieldInputChange = (event) => {
    handleFieldChange(event, column.id, task.id, fieldName);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 flex gap-2 items-center">
        {fieldName === "budget" ? (
          <MonetizationOnOutlinedIcon />
        ) : fieldName === "file" ? (
          <InsertDriveFileOutlinedIcon />
        ) : (
          <TitleOutlinedIcon />
        )}
        <span>
          {fieldName === "budget"
            ? "Budget"
            : fieldName === "file"
            ? "Files"
            : "Notes"}
        </span>
      </div>
      {/* <span className="cursor-pointer rounded due-date-box bg-gray-100 flex-1 h-8 flex items-center">
        <div
          key={task.id}
          className={`m-1 w-full h-6 flex items-center justify-center ${
            hoveredTaskId === task.id && fieldName !== "file" // Exclude "file" from applying the border
              ? "hover:bg-white hover:border hover:border-gray-500"
              : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {inputVisibleTaskId === task.id ? (
            fieldName === "file" ? (
              <FileUpload taskId={task.id}/>
            ) : (
              <input
                type="text"
                className="mx-1 h-6 rounded border-none outline-none shadow-none w-full bg-transparent text-center"
                value={task[fieldName]}
                onChange={handleFieldInputChange}
                onBlur={() => {
                  setInputVisibleTaskId(null);
                      setIsEditData(!isEditData);
                
                }}
              />
            )
          ) : (
            <div
              className="w-full flex items-center justify-center gap-1"
              onClick={handleIconClick}
            >
              {task[fieldName] ? (
                <span>
                  {fieldName === "budget"
                    ? `$${task[fieldName]}`
                    : task[fieldName]}
                </span>
              ) : (
                <>
                  {hoveredTaskId === task.id && (
                    <>
                      <AddCircleIcon
                        style={{ fontSize: "16px" }}
                        className="text-blue-500"
                      />
                      {fieldName === "budget" ? (
                        <MonetizationOnOutlinedIcon
                          style={{ fontSize: "16px" }}
                        />
                      ) : fieldName === "file" ? (
                        <InsertDriveFileOutlinedIcon
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <TitleOutlinedIcon style={{ fontSize: "16px" }} />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </span> */}
      <span
        className={`cursor-pointer rounded due-date-box bg-gray-100 flex-1 flex items-center ${
          fieldName === "note" ? "h-8" : "h-8"
        }`}
      >
        <div
          key={task?.id}
          className={`m-1 w-full h-[90%] flex items-center justify-center ${
            hoveredTaskId === task?.id && fieldName !== "file" // Exclude "file" from applying the border
              ? "hover:bg-white hover:border hover:border-gray-500"
              : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {inputVisibleTaskId === task?.id ? (
            fieldName === "file" ? (
              <FileUpload taskId={task?.id} />
            ) : fieldName === "note" ? (
              <textarea
                className="mx-1 h-full rounded border-none outline-none shadow-none w-full bg-transparent text-center"
                value={task[fieldName]}
                onChange={handleFieldInputChange}
                onBlur={() => {
                  setInputVisibleTaskId(null);
                  setIsEditData(!isEditData);
                }}
              />
            ) : (
              <input
                type="text"
                className="mx-1 h-6 rounded border-none outline-none shadow-none w-full bg-transparent text-center"
                value={task[fieldName]}
                onChange={handleFieldInputChange}
                onBlur={() => {
                  setInputVisibleTaskId(null);
                  setIsEditData(!isEditData);
                }}
              />
            )
          ) : (
            <div
              className="w-full flex items-center justify-center gap-1"
              onClick={handleIconClick}
            >
              {task[fieldName] ? (
                <span className={`truncate ${fieldName === "note" && "w-32"}`}>
                  {fieldName === "budget"
                    ? `$${task[fieldName]}`
                    : task[fieldName]}
                </span>
              ) : (
                <>
                  {hoveredTaskId === task?.id && (
                    <>
                      <AddCircleIcon
                        style={{ fontSize: "16px" }}
                        className="text-blue-500"
                      />
                      {fieldName === "budget" ? (
                        <MonetizationOnOutlinedIcon
                          style={{ fontSize: "16px" }}
                        />
                      ) : fieldName === "file" ? (
                        <InsertDriveFileOutlinedIcon
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <TitleOutlinedIcon style={{ fontSize: "16px" }} />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </span>
    </div>
  );
};

export default TaskFieldsComponent;
