import React, { useState, useEffect, useRef } from "react";
import { Typography } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import DatePicker from "react-multi-date-picker";
import { da } from "date-fns/locale";

const { Title } = Typography;

const TimeTracker = () => {
  const { thisUser, setThisUser, theme, days } = useStateContext();
  const [isCheckingIn, setIsCheckingIn] = useState(
    thisUser?.timeTrackerinfo?.checkedin || false
  );
  const [isPaused, setIsPaused] = useState(
    thisUser?.timeTrackerinfo?.isPaused || false
  );
  const [elapsedTime, setElapsedTime] = useState(
    thisUser?.timeTrackerinfo?.elapsedTime || 0
  );
  console.log(elapsedTime);
  const [sessionHistory, setSessionHistory] = useState(
    thisUser.sessionHistory || {}
  );
  const [sessionSummary, setSessionSummary] = useState(
    thisUser?.sessionSummary || []
  );

  const timerRef = useRef(null);

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

  useEffect(() => {
    if (isCheckingIn && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isCheckingIn, isPaused]);

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    setIsPaused(false);
    setElapsedTime(0);
    await saveData({
      event: "Check in",
      time: getCurrentTime(),
      date: getCurrentDate(),
    });
  };

  useEffect(() => {
    if (
      sessionHistory[getCurrentDate()]?.some(
        (event) => event.event === "Check out"
      )
    ) {
      calculateSessionSummary();
    }
  }, [sessionHistory]);

  const handleCheckOut = async () => {
    setIsCheckingIn(false);
    clearInterval(timerRef.current);
    saveElapsedTime(0, "checkOut");
    await saveData({
      event: "Check out",
      time: getCurrentTime(),
      date: getCurrentDate(),
    });
  };

  const handlePlayPauseToggle = async () => {
    setIsPaused((prev) => !prev);
    const event = isPaused ? "Break end" : "Break start";
    await saveData({ event, time: getCurrentTime(), date: getCurrentDate() });
  };

  const calculateTotalWorkingTime = () => {
    const checkInEvent = sessionHistory[getCurrentDate()]?.find(
      (event) => event.event === "Check in"
    );
    const checkOutEvent = sessionHistory[getCurrentDate()]?.find(
      (event) => event.event === "Check out"
    );

    if (checkInEvent && checkOutEvent) {
      const checkInTime = new Date(`1970/01/01 ${checkInEvent.time}`);
      const checkOutTime = new Date(`1970/01/01 ${checkOutEvent.time}`);
      const totalMinutes = (checkOutTime - checkInTime) / (1000 * 60);
      const workMinutes = totalMinutes-breakTimeInMinutes()
      const hours = Math.floor(workMinutes / 60);
      const minutes = workMinutes % 60;
      return `${hours} hrs ${minutes} mins`;
    }

    return "0 hrs 0 mins";
  };

  const breakTimeInMinutes = () => {
    const breakStartTimes = sessionHistory[getCurrentDate()].filter(
      (event) => event.event === "Break start"
    );
    const breakEndTimes = sessionHistory[getCurrentDate()].filter(
      (event) => event.event === "Break end"
    );

    let totalBreakMinutes = 0;
    breakStartTimes.forEach((start, index) => {
      const end = breakEndTimes[index];
      if (end) {
        const breakStartTime = new Date(`1970/01/01 ${start.time}`);
        const breakEndTime = new Date(`1970/01/01 ${end.time}`);
        totalBreakMinutes += (breakEndTime - breakStartTime) / (1000 * 60);
      }
    });
    return totalBreakMinutes;
  };
  const calculateBreakTime = () => {
    const totalBreakMinutes = breakTimeInMinutes();
    const hours = Math.floor(totalBreakMinutes / 60);
    const minutes = totalBreakMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  const calculateSessionSummary = () => {
    const checkInEvent = sessionHistory[getCurrentDate()].find(
      (event) => event.event === "Check in"
    );
    const checkOutEvent = sessionHistory[getCurrentDate()].find(
      (event) => event.event === "Check out"
    );

    // Check if there's already a summary for the current session
    const existingSummary = sessionSummary.find(
      (summary) => summary.date === checkInEvent?.date
    );

    if (checkInEvent && checkOutEvent && !existingSummary) {
      const totalWorkingTime = calculateTotalWorkingTime();
      const totalBreakTime = calculateBreakTime();
      const overtime = calculateOverTime();

      addSessionSummary({
        date: checkInEvent.date,
        checkIn: checkInEvent.time,
        breakTime: totalBreakTime,
        checkOut: checkOutEvent.time,
        overTime: overtime,
        workedHours: totalWorkingTime,
      });
    }
  };

  const totalWorkingHours = (thisUser.teamWorkingDays || days)
    .filter((day) => day.checked) // Filter only working days
    .reduce((totalHours, day) => {
      const [startHour, startMinute] = day.startTime.split(":").map(Number);
      const [endHour, endMinute] = day.endTime.split(":").map(Number);

      // Calculate hours for each day
      const dailyHours =
        endHour + endMinute / 60 - (startHour + startMinute / 60);

      // Add to total hours
      return totalHours + dailyHours;
    }, 0);

  const calculateOverTime = () => {
    const workingDaysCount = (thisUser.teamWorkingDays || days).filter(
      (day) => day.checked
    ).length;
    const perDayHours = totalWorkingHours / workingDaysCount;
    const perdayMinutes = perDayHours * 60;
    const totalWorkingMinutes = elapsedTime / 60;
    const overtimeMinutes = totalWorkingMinutes - perdayMinutes;

    if (overtimeMinutes > 0) {
      const hours = Math.floor(overtimeMinutes / 60);
      const minutes = overtimeMinutes % 60;
      return `${hours} hrs ${minutes} mins`;
    }

    return "0 hrs 0 mins";
  };

  const calculateTotalMinutesWorked = () => {
    const checkInEvent = sessionHistory[getCurrentDate()].find(
      (event) => event.event === "Check in"
    );
    const checkOutEvent = sessionHistory[getCurrentDate()].find(
      (event) => event.event === "Check out"
    );

    if (checkInEvent && checkOutEvent) {
      const checkInTime = new Date(`1970/01/01 ${checkInEvent.time}`);
      const checkOutTime = new Date(`1970/01/01 ${checkOutEvent.time}`);
      return (checkOutTime - checkInTime) / (1000 * 60);
    }

    return 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const saveData = async (data) => {
    try {
      // Call the API to save data
      const res = await postAPI("/api/session-history/update", {
        emailAddress: thisUser.emailAddress,
        date: getCurrentDate(),
        data: data,
      });

      // Update `thisUser` in context
      setThisUser(res.data.user);

      // Add the new data directly to `sessionHistory`
      setSessionHistory((prevHistory) => {
        const date = getCurrentDate();
        const updatedHistory = { ...prevHistory };

        // Check if date already has an array; if not, initialize it
        if (!updatedHistory[date]) {
          updatedHistory[date] = [];
        }

        // Append the new data to the array for the current date
        updatedHistory[date] = [...updatedHistory[date], data];

        return updatedHistory;
      });
    } catch (error) {
      console.error("Error updating session history:", error);
    }
  };

  const addSessionSummary = async (data) => {
    try {
      const res = await postAPI("/api/session-summary/update", {
        emailAddress: thisUser.emailAddress,
        data: data,
      });
      setThisUser(res.data.user);
    } catch (error) {
      console.error("Error updating session history:", error);
    }
  };
  // useEffect(() => {
  //   if (sessionSummary.length > 0) {
  //     // saveData();
  //   }
  // }, [sessionSummary]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}/${String(currentDate.getDate()).padStart(2, "0")}`;
  const [datepickerValue, setDatepickerValue] = useState(formattedDate);
  // Check if today's date is in sessionHistory

  const formatDate = (date) => {
    if (!date) return "";
    const jsDate = new Date(date);
    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const year = jsDate.getFullYear();
    return `${year}/${month}/${day}`;
  };

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split("/");
    return `${day}/${month}/${year}`;
  };

  // const isCurrentDateInHistory = sessionHistory?.some(
  //   (session) => session.date === convertDateFormat(datepickerValue)
  // );
  // console.log(datepickerValue, isCurrentDateInHistory);
  const elapsedTimeRef = useRef(elapsedTime);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  const saveElapsedTime = async (elapsedTime, source) => {
    const timeTrackerinfo =
      source === "interval"
        ? {
            elapsedTime: elapsedTime, // Capture the current elapsedTime
            isPaused: true,
            checkedin: true,
          }
        : {};
    try {
      await postAPI("/api/user/time-tracker-info", { timeTrackerinfo });
    } catch (error) {
      console.error("Error saving elapsed time:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCheckingIn && !isPaused) {
        saveElapsedTime(elapsedTimeRef.current, "interval");
      }
    }, 10000); // Runs every minute

    return () => clearInterval(interval);
  }, [isCheckingIn, isPaused]);

  return (
    <div style={{ padding: "20px", color: "var(--text-color)" }}>
      <p style={{ fontWeight: "600", fontSize: "20px" }}>Time Tracker</p>

      <div style={{ marginTop: "20px" }}>
        <p className="mb-3 " style={{ fontSize: "18px" }}>
          Elapsed Time: <strong>{formatTime(elapsedTime)}</strong>
        </p>
      </div>
      <div className="mb-3 ">
        <Button
          className={`timeTrackerBtns fs_14 ${
            !isCheckingIn
              ? "workspace_addBtn text-white"
              : "bg-transparent text-color"
          }`}
          type="primary"
          onClick={handleCheckIn}
          disabled={isCheckingIn}
        >
          Check In
        </Button>
        <Button
          className={`timeTrackerBtns fs_14 ${
            isCheckingIn
              ? "workspace_addBtn text-white "
              : "bg-transparent text-color"
          }`}
          type="primary"
          onClick={handleCheckOut}
          disabled={!isCheckingIn}
          style={{ marginLeft: "10px" }}
        >
          Check Out
        </Button>
        <Button
          className="playPauseBtn fs_14"
          type="default"
          onClick={handlePlayPauseToggle}
          disabled={!isCheckingIn}
          style={{ marginLeft: "10px" }}
        >
          {isPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}{" "}
          {isPaused ? "Play" : "Pause"}
        </Button>
      </div>

      <div style={{ marginBottom: "20px", color: "var(--text-color)" }}>
        <div className="centerIt mb-2">
          <Title
            level={4}
            style={{ color: "var(--text-color)" }}
            className="m-0"
          >
            Session History:&nbsp;
          </Title>
          <div className="hover:outline outline-1 outline-gray-300 rounded-1 p-1">
            {/* {currentDate} */}
            <DatePicker
              className={`green ${
                theme === "light_theme" ? "" : "range-container"
              }`}
              inputClass=" border-0 outline-0 w-[90px]"
              // shadow={false}
              highlightToday={false}
              onChange={(value) => setDatepickerValue(formatDate(value))}
              value={datepickerValue}
              weekStartDayIndex={1}
              mapDays={({ date }) => {
                let isWeekend = [0, 6].includes(date.weekDay.index);
                if (isWeekend)
                  return {
                    // disabled: true,
                    style: { color: "#ccc" },
                  };
              }}
            />
          </div>
        </div>
        <div style={{ height: " 100px", overflowY: "auto", direction: "rtl" }}>
          <ul className="ms-2" style={{ direction: "ltr" }}>
            {
              // isCurrentDateInHistory &&
              sessionHistory[convertDateFormat(datepickerValue)]?.map(
                (item, index) => (
                  <li key={index}>
                    {item.event}: <strong>{item.time}</strong>
                  </li>
                )
              )
            }
          </ul>
        </div>
        <p style={{ marginTop: "10px" }}>
          Total Working Time:{" "}
          <strong>
            {thisUser.sessionSummary.find(
              (summary) => summary.date === getCurrentDate()
            )?.workedHours || calculateTotalWorkingTime()}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default TimeTracker;
