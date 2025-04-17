import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { LuClock3, LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
// import { PiIslandLight } from "react-icons/pi";
import { GiPalmTree } from "react-icons/gi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Calendar, DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import { useStateContext } from "../../../contexts/ContextProvider";
import { data } from "autoprefixer";
import TimeTracker from "./TimeTracker.jsx";
import { Collapse, Modal } from "antd";
import { createStyles, useTheme } from "antd-style";
import { Accordion, Button } from "react-bootstrap";
import Calendars from "./Calendars.jsx";
import EmployeeTimeOffs from "./EmployeeTimeOffs.jsx";
import UpdateHolidayRequest from "./UpdateHolidayRequest.jsx";
const AccountScheduleModal = ({
  closeModal,
  scheduleModal,
  setScheduleModal,
}) => {
  const {
    days,
    theme,
    userHolidays,
    thisUser,
    holidayHistory,
    myHolidayRequests,
    setMyHolidayRequests,
  } = useStateContext();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ranges, setRanges] = useState([
    // [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
    // [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
    // [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })],
  ]);
  const [visible, setVisible] = useState(false);
  const items = [
    {
      key: "1",
      label: "Holidays History",
      children: (
        <>
          {thisUser.holidayHistory.map((item) => (
            <>
              <p>
                {item}
                {/* {`${item.name} added ${item.days} vacation days on ${item.date} at ${item.time}`}  */}
              </p>{" "}
              <br />
            </>
          ))}
        </>
      ),
    },
  ];

  const calculateTotalOvertime = (userData) => {
    let totalMinutes = 0;

    userData.forEach((entry) => {
      const [hours, mins] = entry.overTime
        .split(" hrs ")
        .map((time) => parseInt(time));
      totalMinutes += hours * 60 + mins;
    });

    // Convert total minutes back to hours and minutes
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours} hrs ${remainingMinutes} mins`;
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
  return (
    <div className="w-100 " style={{ padding: "8px 24px 24px" }}>
      <div className="centerIt ">
        <p className="fs-3 fw-bold">Schedule your holidays</p>
      </div>
      {/* <Calendars setMyHolidayRequests={setMyHolidayRequests} /> */}
      <div>
        <TimeTracker />
      </div>
      <div>
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          className="hoiday-history mb-5"
        />
      </div>
      <div className="centerIt justify-between ">
        <div className="centerIt">
          <LuClock3 className="fs-5 me-2" />
          <p style={{ fontWeight: "600" }}>Work-days and hours</p>
        </div>
        <div className="centerIt">
          <p style={{ fontWeight: "600" }}>Work hours per week: </p> &nbsp;
          {totalWorkingHours} hrs
        </div>
      </div>
      <div
        className="mt-3 d-flex justify-content-between fs_14 rounded-1"
        style={{ padding: "12px 24px", backgroundColor: "var(--light-gray)" }}
      >
        {days.map((day, index) => (
          <div key={index} className="">
            <p
              className="mb-2"
              style={{ fontWeight: "600", color: !day.checked && "#ababaf" }}
            >
              {day.day}
            </p>
            {day.checked && <p>{day.startTime + "-" + day.endTime}</p>}
          </div>
        ))}
        {/* <p className="" style={{ color: "#ababaf" }}>
            Saturday
          </p>
          <p style={{ color: "#ababaf" }}>Sunday</p> */}
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: "32px" }}
      >
        <div className="w-100">
          <div className="centerIt justify-between pr-[82px]">
            <div className="centerIt ">
              <GiPalmTree className="me-2" />

              <p style={{ fontWeight: "600" }}>Time off {selectedYear}</p>
              <button
                className="rounded-1 bgHover centerIt justify-content-center ms-2"
                style={{ width: "24px", height: "24px" }}
                onClick={() => setSelectedYear(selectedYear - 1)}
              >
                <FaAngleLeft style={{ fontSize: "12px" }} />
              </button>
              <button
                className="rounded-1 bgHover centerIt justify-content-center"
                style={{ width: "24px", height: "24px" }}
                onClick={() => setSelectedYear(selectedYear + 1)}
              >
                <FaAngleRight style={{ fontSize: "12px" }} />
              </button>
            </div>
            <Button
              onClick={()=>setVisible(true)}
              type="button"
              className=" px-2 py-1.5   workspace_addBtn border-0 rounded-1  centerIt "
              style={{ backgroundColor: "#025231", fontSize: "14px" }}
            >
              <LuPlus className="me-1" />
              Holiday request
            </Button>
          </div>

          <div style={{ width: "900px" }}>
            <EmployeeTimeOffs
              selectedYear={selectedYear}
              myHolidayRequests={myHolidayRequests}
              setMyHolidayRequests={setMyHolidayRequests}
            />
          </div>
        </div>
        <div className="">
          {userHolidays
            ?.filter((holiday) => holiday.value !== null)
            .map((holiday, index) => (
              <div
                key={index}
                className="centerIt me-4 mb-2 justify-content-between"
              >
                <span
                  className="rounded-circle fs_14 centerIt justify-content-center me-2"
                  style={{
                    backgroundColor: holiday.color,
                    minWidth: "24px",
                    height: "24px",
                    color: "white",
                  }}
                >
                  {holiday.value}
                </span>
                <p className="fs_15 w-100 text-end text-nowrap">
                  {holiday.type}
                </p>
              </div>
            ))}
          <div className="mt-4">
            <p className="font-[900] text-[18px]">Overtime</p>

            <p className="font=[600] mt-1">
              {calculateTotalOvertime(thisUser.sessionSummary)}
            </p>
          </div>
        </div>
      </div>
      <UpdateHolidayRequest
        row={""}
        visible={visible}
        onClose={() => setVisible(false)}
        isEdit={false}
      />
    </div>
  );
};

export default AccountScheduleModal;
