import { useState } from "react";
import React from "react";
import { postAPI } from "../../../helpers/apis";
import { useStateContext } from "../../../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";
const ProjectTimer = () => {
  const { thisUser, setThisUser, selectedTeam, setSelectedTeam } =
    useStateContext();
  const [projectTimer, setProjectTimer] = useState(false);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateTotalTime = () => {
    // Parse the times into Date objects
    const parseTime = (time) => {
      const [hour, minutePart] = time.split(":");
      const [minute, period] = [minutePart.slice(0, 2), minutePart.slice(3)];
      let hours24 = parseInt(hour);
      if (period === "PM" && hours24 !== 12) {
        hours24 += 12;
      }
      if (period === "AM" && hours24 === 12) {
        hours24 = 0;
      }
      return { hours: hours24, minutes: parseInt(minute) };
    };

    const start = parseTime(thisUser?.currentProjectSession.start);
    const stop = parseTime(getCurrentTime());

    // Calculate the difference in hours and minutes
    let totalMinutes =
      stop.hours * 60 + stop.minutes - (start.hours * 60 + start.minutes);
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Account for crossing midnight
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hrs ${minutes} mins`;
  };

  const startSession = async () => {
    const data = {
      name: thisUser?.fullName,
      email: thisUser?.emailAddress,
      start: getCurrentTime(),
      stop: "",
      date: getCurrentDate(),
      totalTime: "",
    };
    const res = await postAPI("/api/members/update-current-project-session", {
      emailAddress: thisUser.emailAddress,
      projectId: selectedTeam.currentProjectId || uuidv4(),
      teamId: selectedTeam._id,
      data,
    });
    setThisUser(res.data.user);
  };

  const stopSession = async () => {
    const data = {
      name: thisUser?.fullName,
      email: thisUser?.emailAddress,
      start: thisUser?.currentProjectSession.start,
      stop: getCurrentTime(),
      date: thisUser?.currentProjectSession.date,
      totalTime: calculateTotalTime(),
    };

    const res = await postAPI("/api/members/update-project-session", {
      emailAddress: thisUser.emailAddress,
      teamId: selectedTeam._id,
      data,
      projectId: selectedTeam.currentProjectId,
    });
    setThisUser(res.data.user);
    // setSelectedTeam(res.data.team);
  };

  const selectedTeamStatus = thisUser?.projectsStatus?.find(
    (team) => team.teamId === selectedTeam?._id
  );

  const project = selectedTeamStatus?.projects?.find(
    (project) => project.projectId === selectedTeam?.currentProjectId
  );

  const isTimerRunning = project?.isTimerRunning;

  console.log(
    isTimerRunning,
    selectedTeamStatus,
    selectedTeam?.currentProjectId
  );
  return (
    <div className="centerIt">
      <p>
        Project Timer <strong>:</strong>
        {/* <strong>{formatTime(projectTime)}</strong> */}
      </p>

      {isTimerRunning ? (
        <button
          className={`fs_14 rounded-1 hover:text-white align-middle ms-2 me-4 hover:bg-red-500  `}
          onClick={stopSession}
          style={{
            borderColor: "red",
            padding: "4.7px 11px",
          }}
        >
          Stop
        </button>
      ) : (
        <button
          className={`fs_14 rounded-1 Border hover:text-white align-middle ms-2 me-4 hover:bg-green-700 `}    
          onClick={startSession}
          style={{
            borderColor: "green",
            padding: "4.7px 11px",
          }}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default ProjectTimer;
