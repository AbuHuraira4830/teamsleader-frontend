import { useState, useEffect } from "react";
import { Modal } from "antd";
import React from "react";
import { Table } from "react-bootstrap";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { useStateContext } from "../../../contexts/ContextProvider";

const TimeSheetModal = ({ timeSheetModal, setTimeSheetModal }) => {
  const { theme, thisUser, employeeSummary, selectedEmployee } =
    useStateContext();

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

  console.log(employeeSummary[selectedEmployee]);

const filteredData = employeeSummary[selectedEmployee]?.filter((item) => {
  const [day, month, year] = item.date.split("/");
  const itemDate = new Date(`${year}-${month}-${day}`);
  itemDate.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  return itemDate >= start && itemDate <= end;
});          

  const formatDate = (date) => {
    if (!date) return "";
    const jsDate = new Date(date);
    const day = jsDate.getDate();
    const month = jsDate.toLocaleString("default", { month: "short" });
    const year = jsDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="timeSheetModal" style={{ padding: "8px 24px 24px" }}>
      <div className="pb-3 ">
        <p className="fs-3 fw-bold">John's Time Sheet</p>
        <div className="mt-2 mb-2">
          <Calendar
            range
            className={`green ${
              theme === "light_theme" ? "" : "range-container"
            }`}
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
                  // disabled: true,
                  style: { color: "#ccc" },
                };
            }}
          />
        </div>
        <div>
          {endDate && (
            <p className="fs-4 fw-bold mb-1">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          )}
          <Table bordered className="holiday-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Break Time</th>
                <th>Check Out</th>
                <th>Over Time</th>
                <th>Worked Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.checkIn}</td>
                    <td>{item.breakTime}</td>
                    <td>{item.checkOut}</td>
                    <td>{item.overTime}</td>
                    <td>{item.workedHours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data available for the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetModal;
