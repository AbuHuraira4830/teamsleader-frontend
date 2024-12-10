import { useEffect, useState } from "react";
import React from "react";
import IMAGES from "../../../assets/images/Images";
import { Popover, Table } from "antd";
import { Button, Form } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { ca } from "date-fns/locale";
import { postAPI } from "../../../helpers/apis";

export const holidayInput = (
  days,
  type,
  emailAddress,
  fetchTeamMembersAndHolidays,
  adminName
) => {
  // const { fetchTeamMembersAndHolidays } = useStateContext();
  const handleChange = async (inputValue) => {
    const value = Number(inputValue);
    if (days === value) {
      return;
    }
    const now = new Date();
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = now.toLocaleDateString("en-US", options);
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const time = now
      .toLocaleTimeString("en-US", timeOptions)
      .replace(":", " : ");
    const newUpdate = `${adminName} updated ${type} from ${days} day(s) to ${value} day(s) on ${date} at ${time}`;

    try {
      const res = await postAPI(`/api/holiday/update-value`, {
        emailAddress,
        type,
        value,
      });
      handleHistory(emailAddress, newUpdate);
      fetchTeamMembersAndHolidays();
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHistory = (emailAddress, holidayHistory) => {
    console.log(emailAddress, holidayHistory);
    postAPI("/api/holiday-history/update", {
      emailAddress,
      holidayHistory,
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form.Control
      type="number"
      defaultValue={days}
      // onChange={}
      onBlur={(e) => handleChange(e.target.value)}
      className="workspace_searchInput py-1 Border shadow-none rounded-1 mx-auto text-center "
      style={{
        height: "30px",
        width: "100px",
        color: "var(--text-color) !important",
        backgroundColor: "transparent",
      }}
    />
  );
};
export const userProfile = (
  name,
  picture,
  setSelectedOption,
  setSelectedEmployee,
  email
) => {
  const handleClick = (email) => {
    setSelectedOption("Timesheet");
    setSelectedEmployee(email);
  };
  return (
    <div
      className="centerIt employee_profile cursor_pointer"
      onClick={() => handleClick(email)}
    >
      <img
        src={IMAGES.PAUL}
        width={30}
        alt=""
        className="align-self-center me-2"
      />

      <span className="text-nowrap">{name}</span>
    </div>
  );
};

const defaultHolidays = [
  { color: "#bb7900", value: 20, type: "Holidays left" },
  { color: "#3d9970", value: 0, type: "Holidays taken" },
  { color: "#1890ff", value: 0, type: "Vacation days" },
  { color: "#722ed1", value: 0, type: "Sick days" },
];
const ManageHolidays = ({ setSelectedOption }) => { 
  const { users, setEmployeeSummary } = useStateContext();

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };
  console.log(users);
  const holidaysToDisplay =
    users[0]?.holidays?.length > 0 ? users[0].holidays : defaultHolidays;  

  const holidayColumns = holidaysToDisplay.map((holiday) => ({
    title: holiday.type,
    align: "center",
    dataIndex: toCamelCase(holiday.type),
  }));

  const columns = [
    {
      title: "Employee",
      dataIndex: "user",
      align: "left",
    },   
    ...holidayColumns,
  ];

  useEffect(() => {
    const fetchSessionSummary = async () => {
      try {
        const res = await postAPI("/api/employee/session-summary-list", {
          emailAddresses: users.map((user) => user.email),
        });
        setEmployeeSummary(res.data.userSessionSummary);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSessionSummary();
  }, [users]);
  return (
    <div className="w-100 fs_14" style={{ padding: "24px" }}>
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        className="holiday-table"
        scroll={{
          x: 800,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              {Array.isArray(record.holidayHistory) &&
                record.holidayHistory.map((history, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    {history}
                  </p>
                ))}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ManageHolidays;
