import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment"; // Import moment library for date comparisons
import { Tooltip } from "@mui/material";
import { postAPI } from "../../../../../helpers/apis";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { RxCross2 } from "react-icons/rx";
import dayjs from "dayjs";

const TimelineCell = ({ columnData, columnID }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const [selectedRange, setSelectedRange] = useState(null);
  const [formattedDateRange, setFormattedDateRange] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [percentColor, setPercentColor] = useState(null);
  const { RangePicker } = DatePicker;

  let cellData = JSON.parse(columnData);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log({ columnData, selectedRange });

  const checkDateChange = () => {
    const currentDate = new Date().toLocaleDateString();
    console.log(currentDate, cellData?.currentDate);
    if (!cellData?.currentDate) return;
    if (cellData?.currentDate !== currentDate) {
      handleRangeChange(cellData?.selectedRange);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkDateChange, 1000 * 60 * 1); // Check every hour
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  const handleDate = (data) => {
    const postData = {
      data, // Data is already structured as needed
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRangeChange = (dates) => {
    console.log(dates);
    // debugger;
    setSelectedRange(dayjs(dates));
    // getBackgroundColorClass();
    // getPercentageStyles();
    // getRemainingDays();
    if (dates) {
      const formattedRange = formatDateRange(dates);
      const bgColorClass = getBackgroundColorClass(dates);
      const percentStyles = getPercentageStyles(dates);
      const remDays = getRemainingDays(dates);

      // Prepare and send the structured data
      const data = JSON.stringify({
        currentDate: new Date().toLocaleDateString(),
        selectedRange: dates,
        dateRange: formattedRange,
        backgroundColorClass: bgColorClass,
        percentageStyles: percentStyles,
        remainingDays: remDays,
      });

      handleDate(data);
    }
  };
  console.log(selectedRange);
  const formatDateRange = (dates) => {
    if (!dates) return "";

    const startDate = dates[0].format("DD MMM YYYY");
    const endDate = dates[1].format("DD MMM YYYY");
    return `${startDate} - ${endDate}`;
  };
  // console.log({ formattedDateRange });
  // Get the current date
  const currentDate = moment();

  const currentDate11 = moment("2024-02-01");
  const startDate1 = moment("2024-01-09");

  const daysDifference = currentDate11.diff(startDate1, "days");

  // Determine the background color class based on conditions
  const getBackgroundColorClass = (dates) => {
    console.log({ selectedRange });
    if (!dates) return "bg-gray-300"; // Default color when no range is selected

    const startDate = dates[0].format("DD MMM YYYY");
    const endDate = dates[1].format("DD MMM YYYY");
    const formatCurrent = currentDate.format("DD MMM YYYY");

    const totalDays = dates[1].diff(dates[0], "days");
    const daysBeforeCurrent = moment(formatCurrent, "DD MMM YYYY").diff(
      moment(startDate, "DD MMM YYYY"),
      "days"
    );
    const daysRemaining = moment(endDate, "DD MMM YYYY").diff(
      moment(formatCurrent, "DD MMM YYYY"),
      "days"
    );

    if (moment(endDate, "DD MMM YYYY").isBefore(currentDate, "day")) {
      return "bg-red-500";
    } else if (
      moment(startDate, "DD MMM YYYY").isSameOrAfter(currentDate, "day")
    ) {
      return "bg-black";
    } else if (moment(endDate, "DD MMM YYYY").isSame(currentDate, "day")) {
      return "bg-blue-500";
    } else if (
      moment(startDate, "DD MMM YYYY").isSameOrBefore(currentDate, "day") &&
      moment(endDate, "DD MMM YYYY").isSameOrAfter(currentDate, "day")
    ) {
      return "bg-orange-500";
    }

    return "bg-gray-300"; // Default color
  };

  // ... (remaining code)
  const getRemainingDays = (dates) => {
    // Get background color class
    const bgColorClass = getBackgroundColorClass(dates);

    if (bgColorClass === "bg-black" && dates) {
      // const currentDate = moment();
      const startDate = dates[0];
      const endDate = dates[1];

      // Calculate remaining days
      const remainingDays = endDate.diff(currentDate, "days") + 1;

      return `${remainingDays} days left`;
    } else if (
      (bgColorClass === "bg-red-500" || bgColorClass === "bg-orange-500") &&
      dates
    ) {
      // const currentDate = moment();
      const endDate = dates[1];

      // Calculate remaining days to end date
      const remainingDays = endDate.diff(currentDate, "days") + 1;
      let title = "";
      if (bgColorClass === "bg-red-500") title = "overdue";
      if (bgColorClass === "bg-orange-500") title = "left";

      return `${Math.abs(remainingDays)} days ${title}`;
    } else if (bgColorClass === "bg-blue-500") {
      // If bg-blue-500, return "Today"
      return "Today";
    }

    return "";
  };
  // Calculate the percentage of before days and after days
  const calculatePercentage = (days, totalDays) => {
    return (days / totalDays) * 100;
  };
  // Get the percentage of before current days and after days
  const getPercentageStyles = (dates) => {
    if (!dates) return {};

    const totalDays = dates[1]?.diff(dates[0], "days");
    const daysBeforeCurrent = moment(
      currentDate.format("DD MMM YYYY"),
      "DD MMM YYYY"
    ).diff(moment(dates[0].format("DD MMM YYYY"), "DD MMM YYYY"), "days");
    const daysRemaining = moment(
      dates[1].format("DD MMM YYYY"),
      "DD MMM YYYY"
    ).diff(moment(currentDate.format("DD MMM YYYY"), "DD MMM YYYY"), "days");

    const percentageBefore = calculatePercentage(daysBeforeCurrent, totalDays);
    const percentageAfter = calculatePercentage(daysRemaining, totalDays);

    return {
      background: `linear-gradient(to right, #3b82f6 ${percentageBefore}%, black ${percentageBefore}%, black ${percentageAfter}%)`,
    };
  };
  console.log({ cellData });
  return (
    <Tooltip placement="top" title={cellData?.remainingDays} arrow>
      <div
        className="position-relative d-flex justify-content-center "
        style={{ width: "180px" }}
        onMouseEnter={() => {
          setTooltipVisible(true), setIsHovered(true);
        }}
        onMouseLeave={() => {
          setTooltipVisible(false), setIsHovered(true);
        }}
        open={tooltipVisible}
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
        {cellData?.backgroundColorClass === "bg-orange-500" ? (
          <div
            className={`m-0 rounded-pill text-[13px] text-white cursor-pointer h-5 flex items-center justify-center w-100 mt-1`}
            style={cellData?.percentageStyles}
          >
            {cellData?.dateRange || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        ) : (
          <div
            className={`m-0 rounded-pill text-[13px] text-white cursor-pointer h-5 flex items-center justify-center w-100 mt-1 ${
              cellData?.backgroundColorClass
                ? cellData?.backgroundColorClass
                : "bg-gray-300"
            }`}
          >
            {cellData?.dateRange || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        )}
        <span className="mt-1" style={{ width: "14px", marginLeft: "3px" }}>
          {columnData && isHovered && (
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
    </Tooltip>
  );
};

export default TimelineCell;
