import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import { Tooltip } from "@mui/material";
import { useKanbanContext } from "../../../../../../contexts/KanbanContext";

const TimelineCell = ({ taskId }) => {
  const [selectedRange, setSelectedRange] = useState();
  const [formattedDateRange, setFormattedDateRange] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { data, isDataGet } = useKanbanContext();
  const { RangePicker } = DatePicker;

//   useEffect(() => {
//     // Find the task with the given taskId
//     const targetTask = data.tasks[taskId];

//     if (targetTask) {
//       // If the task is found, retrieve the timeline value
//       const timeline = targetTask.timeline;

//       if (timeline && timeline.length > 0) {
//         console.log("Timeline:", timeline);
//         setSelectedRange(timeline);
//       } else {
//         console.log("Task has no timeline entries.");
//       }
//     } else {
//       console.log("Task not found with the specified taskId.");
//     }
//   }, [taskId]);

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);

    if (dates) {
      setFormattedDateRange(formatDateRange(dates));
    } else {
      setFormattedDateRange("");
    }
  };

  const formatDateRange = (dates) => {
    if (!dates) return "";

    const startDate = formatDate(dates[0]);
    const endDate = formatDate(dates[1]);
    return `${startDate} - ${endDate}`;
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date ? new Date(date).toLocaleDateString("en-US", options) : "";
  };

  // Get the current date
  const currentDate = new Date();
  const parseDate = (dateString) => {
    // Implement the logic to parse your date string to a Date object
    // For example, using new Date(dateString) if your date format is supported
    // You may need to adjust this based on your actual date format
    return new Date(dateString);
  };

  // Determine the background color class based on conditions
  const getBackgroundColorClass = () => {
    if (!selectedRange) return "bg-gray-300"; // Default color when no range is selected

    const startDate = parseDate(selectedRange[0]);
    const endDate = parseDate(selectedRange[1]);
    const formatCurrent = parseDate(currentDate);

    let totalDays = null;

    if (startDate instanceof Date && endDate instanceof Date) {
      totalDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
    }

    const daysBeforeCurrent = Math.floor(
      (currentDate - new Date(startDate)) / (24 * 60 * 60 * 1000)
    );
    const daysRemaining = Math.floor(
      (new Date(endDate) - currentDate) / (24 * 60 * 60 * 1000)
    );
    console.log({
      startDate,
      endDate,
      formatCurrent,
      totalDays,
      daysBeforeCurrent,
      daysRemaining,
    });

    if (new Date(endDate) < currentDate) {
      return "bg-red-500";
    } else if (new Date(startDate) >= currentDate) {
      return "bg-black";
    } else if (new Date(endDate).getDate() === currentDate.getDate()) {
      return "bg-blue-500";
    } else if (
      new Date(startDate) <= currentDate &&
      new Date(endDate) >= currentDate
    ) {
      return "bg-orange-500";
    }

    return "bg-gray-300"; // Default color
  };


  // ... (remaining code)
  const getRemainingDays = () => {
    // Get background color class
    const bgColorClass = getBackgroundColorClass();

    if (bgColorClass === "bg-black" && selectedRange) {
    const endDate = parseDate(selectedRange[1]);

      const remainingDays =
        Math.floor((endDate - currentDate) / (24 * 60 * 60 * 1000)) + 1;

      return `${remainingDays} days left`;
    } else if (
      (bgColorClass === "bg-red-500" || bgColorClass === "bg-orange-500") &&
      selectedRange
    ) {
    const endDate = parseDate(selectedRange[1]);

      const remainingDays =
        Math.floor((endDate - currentDate) / (24 * 60 * 60 * 1000)) + 1;
      let title = "";
      if (bgColorClass === "bg-red-500") title = "overdue";
      if (bgColorClass === "bg-orange-500") title = "left";

      return `${Math.abs(remainingDays)} days ${title}`;
    } else if (bgColorClass === "bg-blue-500") {
      return "Today";
    }

    return "";
  };

  // Calculate the percentage of before days and after days
  const calculatePercentage = (days, totalDays) => {
    return (days / totalDays) * 100;
  };

  // Get the percentage of before current days and after days
  const getPercentageStyles = () => {
    if (!selectedRange || selectedRange.length !== 2) return {};

  
    const startDate = parseDate(selectedRange[0]);
    const endDate = parseDate(selectedRange[1]);
    const formatCurrent = parseDate(currentDate);

    let totalDays = null;

    if (startDate instanceof Date && endDate instanceof Date) {
      totalDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
    }

    const daysBeforeCurrent = Math.floor(
      (currentDate - new Date(startDate)) / (24 * 60 * 60 * 1000)
    );
    const daysRemaining = Math.floor(
      (new Date(endDate) - currentDate) / (24 * 60 * 60 * 1000)
    );

    const percentageBefore = calculatePercentage(daysBeforeCurrent, totalDays);
    const percentageAfter = calculatePercentage(daysRemaining, totalDays);

    return {
      background: `linear-gradient(to right, #3b82f6 ${percentageBefore}%, black ${percentageBefore}%, black ${percentageAfter}%)`,
    };
  };
  console.log({
    color: getBackgroundColorClass(),
    remaining: getRemainingDays(),
    testcOlor :getPercentageStyles()
  });

  return (
    <Tooltip placement="top" title={isDataGet && getRemainingDays()} arrow>
      <div
        className="position-relative d-flex justify-content-center "
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        visible={tooltipVisible}
        onVisibleChange={(visible) => setTooltipVisible(visible)}
      >
        <Space
          direction="vertical"
          size={12}
          className="table_rangePicker position-absolute start-0"
        >
          <RangePicker
            separator=""
            placeholder=""
            value={selectedRange}
            onChange={handleRangeChange}
          />
        </Space>

        {isDataGet && getBackgroundColorClass() === "bg-orange-500" ? (
          <div
            className={`m-0 rounded-pill  text-white cursor-pointer text-[10px] h-5 w-36  flex items-center justify-center `}
            style={isDataGet && getPercentageStyles()}
          >
            {(isDataGet && formattedDateRange) || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        ) : (
          <div
            className={`m-0 rounded-pill  text-white cursor-pointer text-[10px] h-5 w-36
            flex items-center justify-center  ${
              isDataGet && getBackgroundColorClass()
            }`}
          >
            {isDataGet && formattedDateRange || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default TimelineCell;
