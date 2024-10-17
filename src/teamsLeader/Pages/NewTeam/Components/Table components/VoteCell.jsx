import React, { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const VoteCell = ({ columnData, columnID, table }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
    teamTasks,
    setTotalVotes,
  } = useStateContext();

  // Convert string 'true'/'false' to boolean true/false
  const [cellChecked, setCellChecked] = useState(columnData === "true");

  // This effect will update cellChecked if columnData changes from outside
  useEffect(() => {
    setCellChecked(columnData === "true");
  }, [columnData]);

  let columnsArray = [];
  if (table?.tasks?.length > 0) {
    table.tasks[0]?.columns?.map((column) => {
      columnsArray.push({ _id: column._id, name: column.name });
    });
  }

  const handleCheckboxClick = () => {
    const updatedChecked = !cellChecked;
    setCellChecked(updatedChecked); // Toggle based on the current state
    const postData = {
      data: updatedChecked, // Send the updated state after toggle
      workspaceID: selectedWorkspace._id,
    };

    postAPI(`/api/table-cell/update/${columnID}`, postData)
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

  const calculateProgress = () => {
    if (table.tasks && table.tasks.length > 0) {
      let totalVotes = 0;
      let trueVotes = 0;

      table.tasks.forEach((task) => {
        task.columns.forEach((column) => {
          if (column.name === "Vote") {
            totalVotes += 1;
            if (column.data === "true") {
              trueVotes += 1;
            }
          }
        });
      });

      setTotalVotes(trueVotes);
      // return totalVotes > 0 ? (trueVotes / totalVotes) * 100 : 0;
      return trueVotes > 0 ? 100 / trueVotes : 0;
    }
    return 0;
  };

  return (
    <div className="flex">
      <span
        className="rounded-circle vote_check me-2 flex align-items-center text-white"
        style={{
          minWidth: "24px",
          height: "24px",
          border: cellChecked ? "2px solid #0086c0" : "2px solid #c4e0ec",
          backgroundColor: cellChecked ? "#0086c0" : "",
        }}
        onClick={handleCheckboxClick}
      >
        <HiCheck className={`fs-5 ${cellChecked ? "" : "d-none"}`} />
      </span>

      <div
        className=""
        style={{
          backgroundColor: "#c4e0ec",
          minWidth: "120px",
          height: "26px",
          width: "100%",
        }}
      >
        <span
          style={{
            display: "block",
            width: `${calculateProgress()}%`,
            height: "26px",
            backgroundColor: cellChecked ? "#0086c0" : "",
            transition: "width 0.2s ease-in-out",
          }}
        ></span>
      </div>
    </div>
  );
};

export default VoteCell;
