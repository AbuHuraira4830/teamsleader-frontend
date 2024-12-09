import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Calendar } from "react-multi-date-picker";
import { useStateContext } from "../../contexts/ContextProvider";
import "react-multi-date-picker/styles/colors/green.css";

const ProjectTimeSheet = ({ member }) => {
  const {
    theme,
    selectedEmployee,
    selectedTeam,
    selectedmember,
  } = useStateContext();
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Set today's date and filter data for today's date on component mount
  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  }, []);

  const handleDateRangeChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const membersessions =
    selectedTeam?.projectSessions[selectedTeam.currentProjectId].data.filter(  
      (item) => item.email === selectedmember.email
    ) || [];

  // Filter sessions based on the selected date range
  const filteredData = membersessions.filter((session) => {
    const [day, month, year] = session.date.split("/");
    const sessionDate = new Date(`${year}-${month}-${day}`);
    sessionDate.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    return sessionDate >= start && sessionDate <= end;
  });

  return (
    <div className="timeSheetModal mt-4 mb-5" style={{ padding: "8px 24px 24px" }}>
      <div className="pb-3 ">
        <p className="fs-3 fw-bold mb-3">
          {selectedmember.name?.split(" ")[0]}'s Project time sheet
        </p>
        <div className="mt-2 mb-2">
          <Calendar
            range
            className={`green ${theme === "light_theme" ? "" : "range-container"}`}
            inputClass="timeSheetInput"
            shadow={false}
            highlightToday={false}
            onChange={handleDateRangeChange}
            value={[startDate, endDate]}
            weekStartDayIndex={1}
            mapDays={({ date }) => {
              let isWeekend = [0, 6].includes(date.weekDay.index);
              if (isWeekend)
                return {
                  style: { color: "#ccc" },
                };
            }}
          />
        </div>
        <div className="mt-5 ">
          <TimeSheetTable sessions={filteredData} />
        </div>
      </div>
    </div>
  );
};

const TimeSheetTable = ({ sessions }) => {
  const convertToMinutes = (timeString) => {
    const timeParts = timeString.match(/(\d+)\s*hrs\s*(\d+)\s*mins/);
    if (timeParts) {
      const hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      return hours * 60 + minutes;
    }
    return 0;
  };

  const convertToHrsMins = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hrs ${mins} mins`;
  };

  const aggregateSessions = (sessions) => {
    const aggregatedData = {};

    sessions?.forEach((session) => {
      const key = `${session.name}-${session.date}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          name: session.name,
          date: session.date,
          totalTimeInMinutes: 0,
          startTimes: [],
          stopTimes: [],
        };
      }
      aggregatedData[key].totalTimeInMinutes += convertToMinutes(session.totalTime);
      aggregatedData[key].startTimes.push(session.start);
      aggregatedData[key].stopTimes.push(session.stop);
    });

    return Object.values(aggregatedData);
  };

  const aggregatedSessions = aggregateSessions(sessions);

  return (
    <Table className="holiday-table text-center fs_14">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Start</th>
          <th>Stop</th>
          <th>Working Time</th>
        </tr>
      </thead>
      <tbody>
        {aggregatedSessions.length > 0 ? (
          aggregatedSessions.map((session, index) => (
            <tr key={index}>
              <td>{session.name}</td>
              <td>{session.date}</td>
              <td>
                <ul>
                  {session.startTimes.map((start, idx) => (
                    <li key={idx}>{start}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {session.stopTimes.map((stop, idx) => (
                    <li key={idx}>{stop}</li>
                  ))}
                </ul>
              </td>
              <td>{convertToHrsMins(session.totalTimeInMinutes)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No data available for the selected date range.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export { TimeSheetTable, ProjectTimeSheet };
