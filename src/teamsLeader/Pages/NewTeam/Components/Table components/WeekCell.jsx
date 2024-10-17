import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const WeekCell = ({ columnData, columnID }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const [weekNumber, setWeekNumber] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePreviousClick = () => {
    setWeekNumber((prevWeekNumber) =>
      prevWeekNumber !== null ? prevWeekNumber - 1 : 0
    );
  };

  const handleNextClick = () => {
    setWeekNumber((prevWeekNumber) =>
      prevWeekNumber !== null ? prevWeekNumber + 1 : 0
    );
  };
  // const data = JSON.stringify({ link: linkValue, text: alternativeText });
  useEffect(() => {
    if (weekNumber !== null) {
      const postData = {
        data: getWeekStatus(columnID),
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

      // setRows((prevRows) =>
      //   prevRows.map((row) =>
      //     row.id === rowId ? { ...row, Week: getWeekStatus() } : row
      //   )
      // );
    }
  }, [weekNumber]);

  const getWeekStatus = () => {
    if (weekNumber === null) {
      return "";
    } else if (weekNumber === 0) {
      return "This week";
    } else if (weekNumber === 1) {
      return "In 1 week";
    } else if (weekNumber === -1) {
      return "1 week ago";
    } else if (weekNumber < -1) {
      return `${Math.abs(weekNumber)} weeks ago`;
    } else {
      return `In ${weekNumber} weeks`;
    }
  };

  return (
    <div
      className="flex  justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: "27px" }}
    >
      <span style={{ width: "20px" }}>
        <button
          onClick={handlePreviousClick}
          className={`week_btn rounded-circle ${isHovered ? "" : "d-none"}`}
        >
          <FiChevronLeft />
        </button>
      </span>
      <span style={{ minWidth: "100px", textAlign: "center" }}>
        {columnData}
      </span>
      <span style={{ width: "20px" }}>
        <button
          onClick={handleNextClick}
          className={`week_btn rounded-circle ${isHovered ? "" : "d-none"}`}
        >
          <FiChevronRight />
        </button>
      </span>
    </div>
  );
};

export default WeekCell;
