import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const BudgetComponent = ({ column, task, handleBudgetChange }) => {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [inputVisibleTaskId, setInputVisibleTaskId] = useState(null);

  const handleMouseEnter = () => {
    setHoveredTaskId(task.id);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  const handleIconClick = () => {
    setInputVisibleTaskId(task.id);
  };

  const handleBudgetInputChange = (event) => {
    handleBudgetChange(event, column.id, task.id);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 flex gap-2 items-center">
        <MonetizationOnOutlinedIcon />
        <span>Budget</span>
      </div>
      <span className="rounded due-date-box bg-gray-100 flex-1 h-8 flex items-center cursor-pointer">
        <div
          key={task.id}
          className={`m-1 w-full h-6 flex items-center justify-center ${
            hoveredTaskId === task.id
              ? "hover:bg-white hover:border hover:border-gray-500"
              : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {inputVisibleTaskId === task.id ? (
            <input
              type="text"
              className="mx-1 h-6 rounded border-none outline-none shadow-none w-full bg-transparent text-center"
              value={task.budget}
              onChange={handleBudgetInputChange}
              onBlur={() => setInputVisibleTaskId(null)}
            />
          ) : (
            <div
              className="w-full flex items-center justify-center gap-1"
              onClick={handleIconClick}
            >
              {task.budget ? (
                <span>{"$" + task.budget}</span>
              ) : (
                // Only show icons on hover when budget is empty
                <>
                  {hoveredTaskId === task.id && (
                    <>
                      <AddCircleIcon
                        style={{ fontSize: "16px" }}
                        className="text-blue-500"
                      />
                      <MonetizationOnOutlinedIcon
                        style={{ fontSize: "16px" }}
                      />
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

export default BudgetComponent;
