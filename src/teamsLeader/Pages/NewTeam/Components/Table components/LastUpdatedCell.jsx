import React, { useEffect, useState } from "react";
import { getAPI, postAPI } from "../../../../../helpers/apis";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const LastUpdatedCell = ({ rowId, columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
    teamTasks,
  } = useStateContext();
  const [tasks, setTasks] = useState(teamTasks);
  const [lastUpdated, setLastUpdated] = useState("");

  // Calculate lastUpdated effect
  useEffect(() => {
    getAPI(`/api/tasks/${rowId}`)
      .then((res) => {
        const updatedAt = res.data._doc.updatedAt;
        if (updatedAt) {
          const formattedDate = formatDate(updatedAt);
          setLastUpdated(formattedDate);
          const postData = {
            data: formattedDate,
            workspaceID: selectedWorkspace._id,
          };
          return postAPI(`/api/table-cell/update/${columnID}`, postData);
        } else {
          throw new Error("Invalid updatedAt value");
        }
      })
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
  }, [tasks]);
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };
  return <div>{columnData}</div>;
};

export default LastUpdatedCell;
