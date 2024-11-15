import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { BiExpand } from "react-icons/bi"; // Assuming you are using react-icons/Bi for expand icon
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { format, addMonths, subMonths } from "date-fns";

const PlannerHeader = ({ currentMonth, onMonthChange }) => {
  // State to track the active view
  const [activeView, setActiveView] = useState("month"); // 'list', 'week', or 'month'
  const [activeViewList, setActiveViewList] = useState("expand");

  // Helper function to set the active view
  const handleSetActiveView = (view) => {
    setActiveView(view);
  };

  const handleSetActiveViewList = (view) => {
    setActiveViewList(view);
  };

  const handlePrevMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    onMonthChange(new Date()); // Reset to the current month
  };

  return (
    <div className="flex items-center  justify-between px-6 py-4 bg-white rounded-lg ">
      {/* <div className="flex items-center shadow justify-between px-6 py-4 bg-white rounded-lg "> */}
      {/* Left Group */}
      <div className="flex items-center">
        <div className="flex items-center ">
          <button
            aria-label="Previous Month"
            className="p-2 hover:bg-gray-200 transition  border-gray-400 border rounded-md"
            onClick={handlePrevMonth}
          >
            <IoIosArrowRoundBack className="text-xl" />
          </button>
          <button
            aria-label="Today"
            className="text-sm font-semibold px-4 py-2 mx-2 hover:bg-gray-50 transition  border-gray-400 border rounded-md"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            aria-label="Next Month"
            className="p-2 hover:bg-gray-200 transition  border-gray-400 border rounded-md"
            onClick={handleNextMonth}
          >
            <IoIosArrowRoundForward className="text-xl" />
          </button>
        </div>
        <span className="text-lg font-semibold ml-2">
          {format(currentMonth, "MMMM yyyy")}
        </span>
      </div>

      {/* Right Group - List/Expand Toggle */}
      <div className="flex">
        <div className="flex items-center">
          <div className="border-gray-400 border rounded-md text-sm mr-2">
            <Tooltip
              title="Compact View"
              placement="bottom"
              sx={{
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "white !important",
                },
              }}
            >
              <button
                aria-label="List View"
                className={`p-1 mx-1 my-[0.15rem] ${
                  activeViewList === "list"
                    ? " bg-[#00854d] text-white rounded-md"
                    : "text-gray-700"
                }`}
                onClick={() => handleSetActiveViewList("list")}
              >
                <BsList className="text-xl" />
              </button>
            </Tooltip>
            <Tooltip title="Expanded View" placement="bottom">
              <button
                aria-label="Expand View"
                className={`p-1 mx-1 my-[0.15rem] ${
                  activeViewList === "expand"
                    ? " bg-[#00854d] text-white rounded-md"
                    : "text-gray-700"
                }`}
                onClick={() => handleSetActiveViewList("expand")}
              >
                <BiExpand className="text-xl" />
              </button>
            </Tooltip>
          </div>
        </div>
        {/* Right Group - View Selector */}
        <div className="flex items-center">
          <div className=" rounded-lg text-sm   selected_bg text-[#323338]">
            <button
              aria-label="List View"
              className={`px-4 py-1 ${
                activeView === "List" && " bg-[#00854d]  text-white"
                // : " text-white"
              } transition-all duration-200`}
              onClick={() => handleSetActiveView("List")}
            >
              List
            </button>
            <button
              aria-label="Week View"
              className={`px-4 py-1 ${
                activeView === "week" && "bg-[#00854d] text-white"
                // : " text-white"
              } transition-all duration-200`}
              onClick={() => handleSetActiveView("week")}
            >
              Week
            </button>
            <button
              aria-label="Month View"
              className={`px-4 py-1 ${
                activeView === "month" && "bg-[#00854d] text-white"
                // : "text-gray-700"
              } transition-all duration-200`}
              onClick={() => handleSetActiveView("month")}
            >
              Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerHeader;
