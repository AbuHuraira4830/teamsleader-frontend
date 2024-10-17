import React, { useState, useEffect } from "react";
import { Popover, Input } from "antd";
import moment from "moment-timezone";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { IoMdMoon } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const WorldClockCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const [searchValue, setSearchValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [cellData, setCellData] = useState(JSON.parse(columnData));
  const [timezone, setTimezone] = useState(cellData?.timezone);
  const timezones = moment.tz.names();

  useEffect(() => {
    if (timezone) {
      const intervalId = setInterval(() => {
        updateTimezoneTime(columnID, timezone);
      }, 60000); // Update every 1 minute

      return () => clearInterval(intervalId);
    }
  }, [timezone, columnID]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleTimezoneSelect = (id, timezone) => {
    setTimezone(timezone);
    updateTimezoneTime(id, timezone);
    setOpen(false);
  };

  const updateTimezoneTime = (id, timezone) => {
    const currentTime = moment.tz(moment(), timezone).format("hh : mm A z");
    const currentHour = moment.tz(moment(), timezone).hour();
    const isDay = currentHour >= 6 && currentHour < 18;
    const backgroundColor = isDay ? "#47ADFF" : "#504F6F";

    const data = JSON.stringify({
      timezone: timezone,
      time: currentTime,
      backgroundColor: backgroundColor,
      icon: isDay ? "day" : "night",
    });

    const postData = {
      data,
      workspaceID: selectedWorkspace._id,
    };

    postAPI(`/api/table-cell/update/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setCellData(JSON.parse(data)); // Update cell data state
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (
    <div
      style={{
        maxHeight: "185px",
        overflow: "hidden",
        cursor: "pointer",
        width: "180px",
        textAlign: "center",
      }}
      className="timezome_list"
    >
      {timezones
        .filter((timezone) =>
          timezone.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((timezone) => (
          <div
            key={timezone}
            className="cursor-pointer py-1  px-3 border-bottom "
            onClick={() => handleTimezoneSelect(columnID, timezone)}
          >
            {timezone}
          </div>
        ))}
    </div>
  );

  const clearCell = (id) => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };

    postAPI(`/api/table-cell/clear/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setTimezone(null);
        setCellData({});
      })
      .catch((err) => {
        console.log(err);
      });
    setSearchValue("");
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div
        style={{
          backgroundColor: cellData?.backgroundColor,
          height: "43px",
          minWidth: "180px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex align-items-center justify-content-center"
      >
        {cellData?.icon === "day" ? (
          <FaCircle
            className="me-1"
            style={{ color: "#F5FF00", fontSize: "16px" }}
          />
        ) : cellData?.icon === "night" ? (
          <IoMdMoon
            className="me-1"
            style={{ color: "white", fontSize: "19px" }}
          />
        ) : null}
        <span>
          <Form.Control
            className={`${
              cellData?.time ? "text-white" : ""
            } py-0 shadow-none workspace_searchInput world_clock transparent_bg h-100 me-1 `}
            style={{
              width: "130px",
            }}
            type="text"
            value={cellData?.time || searchValue}
            onChange={handleSearchChange}
          />
        </span>

        <span style={{ width: "14px" }}>
          {cellData && isHovered && (
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
    </Popover>
  );
};

export default WorldClockCell;
