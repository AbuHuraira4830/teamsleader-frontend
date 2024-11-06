import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Tabs } from "antd";
import { useStateContext } from "../../../contexts/ContextProvider";
import HolidayRequests from "./HolidayRequests";
import ManageHolidays from "./ManageHolidays";
import ScheduledHolidays from "./ScheduledHolidays";
import AddHolidayCalender from "./AddHolidayCalendar";
import { postAPI } from "../../../helpers/apis";
import IMAGES from "../../../assets/images/Images";

const { TabPane } = Tabs;

const WorkAndHoliday = ({ setSelectedOption }) => {
  const { days, setDays, theme, thisUser, setThisUser, users } =
    useStateContext();
  console.log(thisUser.teamWorkingDays, "days", days);
  const [usersTotalWorkingHours, setUsersTotalWorkingHours] = useState({});
  const isFirstRender = useRef(true);

  const handleCheckboxChange = (index) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === index ? { ...day, checked: !day.checked } : day
      )
    );
  };

  const handleTimeChange = (index, type, value) => {
    setDays((prevDays) =>
      prevDays.map((day, i) => (i === index ? { ...day, [type]: value } : day))
    );
  };

  useEffect(() => {
    const updateWorkingDaysAndHours = async () => {
      const updatedDays = days.map(({ day, checked, startTime, endTime }) => ({
        day,
        checked,
        startTime,
        endTime,
      }));
      const emailAddresses = users.map((user) => user.email);

      try {
        const response = await postAPI("/api/working-days-time/update-admin", {
          emailAddress: thisUser.emailAddress,
          workingDaysAndHours: updatedDays,
        });
        console.log(response.data.user);
        setThisUser(response.data.user);
        const res = await postAPI("/api/working-days-time/update", {
          emailAddresses,
          workingDaysAndHours: updatedDays,
        });
        console.log(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (!isFirstRender.current) {
      updateWorkingDaysAndHours();
    } else {
      isFirstRender.current = false;
    }
  }, [days]);

  const fetchTotalWorkingHours = async () => {
    const emailAddresses = users.map((user) => user.email);
    try {
      const res = await postAPI("/api/user/total-working-hours", {
        emailAddresses,
      });
      console.log(res.data.UsersWoringHours);
      setUsersTotalWorkingHours(res.data.UsersWoringHours);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTotalWorkingHours();
  }, []);

  const calculateTotalWorkingHours = () => {
    let totalHours = 0;
    (thisUser.teamWorkingDays || days).forEach(
      ({ checked, startTime, endTime }) => {
        if (checked) {
          const [startHour, startMinute] = startTime.split(":").map(Number);
          const [endHour, endMinute] = endTime.split(":").map(Number);
          const hours = endHour - startHour;
          const minutes = endMinute - startMinute;
          totalHours += hours + minutes / 60;
        }
      }
    );
    return totalHours;
  };

  const updateTotalWorkingHours = async (emailAddress) => {
    const hours = usersTotalWorkingHours[emailAddress];
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
    const newUpdate = `${thisUser.fullName} updated your working hours to ${hours} hrs on ${date} at ${time}`;
    try {
      const res = await postAPI("/api/user/total-working-hours/update", {
        emailAddress,
        totalWorkingHours: hours,
      });
      console.log(res.data.message);
      fetchTotalWorkingHours();
      handleHistory(emailAddress, newUpdate);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHistory = (emailAddress, holidayHistory) => {
    postAPI("/api/holiday-history/update", {
      emailAddress: emailAddress,
      holidayHistory,
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const userProfile = (name, picture) => {
    return (
      <div className="centerIt employee_profile ">
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

  return (
    <div className="w-100 fs_14" style={{ padding: "24px" }}>
      <p className="mb-4" style={{ fontSize: "32px", fontWeight: "500" }}>
        Work & Holidays
      </p>
      <div className="mt-5">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="medium"
          className="holiday-tab"
        >
          <TabPane tab="Manage Holidays" key="1">
            <ManageHolidays setSelectedOption={setSelectedOption} />
          </TabPane>
          <TabPane tab="Requested Holidays" key="2">
            <HolidayRequests />
          </TabPane>
          <TabPane tab="Scheduled Holidays" key="3">
            <ScheduledHolidays />
          </TabPane>
          <TabPane tab="Setting" key="4">
            <div>
              <AddHolidayCalender />
            </div>
            <div style={{ color: "var(--text-color)" }}>
              <p
                className="font-bold my-4"
                style={{ fontSize: "18px", color: "var(--text-color)" }}
              >
                Select working days and daily capacity
              </p>
              <div
                className="rounded-2 work-daysP"
                style={{
                  padding: "32px",
                  backgroundColor: "var(--toggle-btnBg)",
                }}
              >
                {(thisUser.teamWorkingDays.length > 0
                  ? thisUser.teamWorkingDays
                  : days
                )?.map((day, index) => (
                  <div key={index} className="centerIt py-3 work-days">
                    <Form.Check
                      checked={day.checked}
                      className="Check me-3"
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <p
                      className="font-bold"
                      style={{ minWidth: "85px", marginRight: "55px" }}
                    >
                      {day.day}
                    </p>
                    <Form.Control
                      disabled={!day.checked}
                      className="holiday-time me-3 shadow-none Border"
                      type="time"
                      style={{
                        maxWidth: "100px",
                        backgroundColor:
                          "var(--sidebar-background-color) !important",
                      }}
                      value={day.checked ? day.startTime : ""}
                      onChange={(e) =>
                        handleTimeChange(index, "startTime", e.target.value)
                      }
                    />
                    to
                    <Form.Control
                      disabled={!day.checked}
                      className="holiday-time ms-3 Border"
                      type="time"
                      style={{
                        maxWidth: "100px",
                        backgroundColor:
                          "var(--sidebar-background-color) !important",
                      }}
                      value={day.checked ? day.endTime : ""}
                      onChange={(e) =>
                        handleTimeChange(index, "endTime", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="font-bold my-4"
                  style={{ fontSize: "18px", color: "var(--text-color)" }}
                >
                  Select weekly working hours
                </p>
                <div className="ps-3">
                  {users.map((user, index) => (
                    <div key={index} className="centerIt pb-2">
                      <div style={{ width: "175px" }}>
                        {userProfile(user.name, user?.picture)}
                      </div>
                      <Form.Control
                        className="holiday-time ms-3 Border shadow-none text-center"
                        type="number"
                        style={{
                          maxWidth: "100px",
                          backgroundColor:
                            "var(--sidebar-background-color) !important",
                        }}
                        value={
                          usersTotalWorkingHours[user.email] ??
                          calculateTotalWorkingHours()
                        }
                        onBlur={() => updateTotalWorkingHours(user.email)}
                        onChange={(e) =>
                          setUsersTotalWorkingHours((prevInputs) => ({
                            ...prevInputs,
                            [user.email]: e.target.value,
                          }))
                        }
                      />
                      &nbsp; Hours
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkAndHoliday;
