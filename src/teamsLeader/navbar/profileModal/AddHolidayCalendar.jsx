import React, { useState, useRef, useEffect } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { useStateContext } from "../../../contexts/ContextProvider";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { Button, Form, Modal } from "react-bootstrap";
import { Checkbox, Divider, Input, Popover, Select, Space } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import SuccessPopup from "./SuccessPopup";
import IMAGES from "../../../assets/images/Images";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { holidayInput } from "./ManageHolidays";
import { postAPI } from "../../../helpers/apis";

const AddHolidayCalender = () => {
  const {
    theme,
    userHolidays,
    setUserHolidays,
    colors,
    setSuccessModal,
    users,
    setUsers,
    thisUser,
    setThisUser,
    mapUserHolidays,
    setSelectedOption,
    holidayHistory,
    setHolidayHistory,
    fetchTeamMembersAndHolidays,
  } = useStateContext();
  const [ranges, setRanges] = useState([]);
  const [timeOffDetails, setTimeOffDetails] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const calendarRef = useRef(null);
  const [timeOffName, setTimeOffName] = useState("");
  const [holidayColor, setHolidayColor] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [checkedList, setCheckedList] = useState([]);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const closeModal = () => {
    setIsEmployeeModalOpen(false);
  };
  // const handleRangeChange = (newRange) => {
  //   console.log({ newRange });
  //   if (newRange && newRange.length === 2) {
  //     setSelectedRange(newRange);
  //   } else {
  //     setSelectedRange([]);
  //   }
  // };

  const calculateBusinessDays = (start, end) => {
    let count = 0;
    let current = start.clone();

    while (current <= end) {
      if (current.day() !== 0 && current.day() !== 6) {
        count++;
      }
      current = current.add(1, "day");
    }
    return count;
  };

  const numberOfDays = selectedRange
    ? calculateBusinessDays(dayjs(selectedRange[0]), dayjs(selectedRange[1]))
    : 0;
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  const handleAddTimeOff = () => {
    if (timeOffName && selectedRange && checkedList.length !== 0) {
      const startDate = dayjs(selectedRange[0]).format("YYYY-MM-DD");
      const endDate = dayjs(selectedRange[1]).format("YYYY-MM-DD");

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
      const newUpdate = `${thisUser.fullName} added ${timeOffName} for ${numberOfDays} days on ${date} at ${time}`;

      postAPI("/api/members/add-holiday", {
        emailAddresses: checkedList,
        allUsers: users.map((user) => user.email),
        type: timeOffName,
        value: numberOfDays,
        color: holidayColor,
        dateToDate: `${startDate} - ${endDate}`,
      })
        .then((res) => {
          console.log(res.data);
          handleHistory(checkedList, newUpdate);
          fetchTeamMembersAndHolidays();
          setSuccessModal(true);
          setSelectedRange(null);
          setTimeOffName("");
          setHolidayColor("");
          setSelectedEmployee("");
          setUploadedFiles([]);
          setIsPopupOpen(false);
          setCheckedList([]);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const handleTimeOffNameChange = (e) => {
    setTimeOffName(e.target.value);
  };

  const handleClose = () => {
    setSuccessModal(false);
  };
  const checkAll = filteredUsers?.length === checkedList.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(
      e.target.checked ? filteredUsers.map((user) => user.email) : []
    );
  };
  const getSelectedEmployeesLabel = () => {
    if (checkAll && checkedList.length) {
      return setSelectedEmployee("All employees selected");
    } else if (checkedList.length > 0) {
      return setSelectedEmployee(`${checkedList.length} employee(s) selected`);
    } else return;
    // return "Select employees";
  };

  useEffect(() => {
    setFilteredUsers(users); // Initialize filtered users with all users
  }, [users]);

  const handleEmployeeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setEmployeeSearch(searchValue);
    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div
      className="relative "
      ref={calendarRef}
      style={{ color: "var(--text-color )!important" }}
    >
      <div style={{ width: "60%" }}>
        <p className="font-bold text-xl ">Add Holiday</p>
        <div>
          <div className="flex items-center mt-3">
            <p className="text-nowrap ">Holiday name</p>{" "}
            <Form.Control
              type="text"
              className="ms-auto focus:border-green-700 hover:border-green-700 shadow-none bg-transparent Border"
              placeholder="Enter holiday name"
              value={timeOffName}
              onChange={handleTimeOffNameChange}
              style={{ width: "60%" }}
            />
          </div>

          <div className="centerIt justify-between fs_15 mt-3">
            <p>Select days</p>
            <div className="addHolidayDatepicker" style={{ width: "60%" }}>
              <DatePicker
                className={`green ${
                  theme === "light_theme" ? "" : "range-container"
                }`}
                // shadow={false}
                // numberOfMonths={4}
                value={selectedRange}
                onChange={setSelectedRange}
                placeholder="Select days"
                range
                weekStartDayIndex={1}
                highlightToday={false}
                onOpenPickNewDate={false}
                mapDays={({ date }) => {
                  let isWeekend = [0, 6].includes(date.weekDay.index);
                  if (isWeekend) {
                    return {
                      style: { color: "#ccc" },
                    };
                  }
                }}
              />
            </div>
          </div>

          <div className="centerIt justify-between fs_15 mt-3">
            <p>Select employees</p>
            <div style={{ width: "60%" }}>
              <Form.Control
                type="text"
                className="ms-auto w-100 focus:border-green-700 hover:border-green-700 shadow-none bg-transparent Border"
                placeholder="select employees"
                // defaultValue={selectedEmployee}
                readOnly
                value={selectedEmployee || ""}
                // onChange={handleTimeOffNameChange}
                style={{ width: "60%" }}
                onClick={() => setIsEmployeeModalOpen(true)}
              />
              <Modal
                centered
                size="md"
                show={isEmployeeModalOpen}
                onHide={() => setIsEmployeeModalOpen(false)}
                backdropClassName="EmployeeModalBackdrop"
                dialogClassName="EmployeeModalDialog"
                className=""
              >
                <Modal.Header
                  // closeButton
                  style={{ borderColor: "var(--border-color) !important" }}
                >
                  <button
                    type="button"
                    class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 "
                    aria-label="Close"
                    onClick={closeModal}
                    style={{
                      width: "30px",
                      height: "30px",
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                    }}
                  >
                    <RxCross2 className="fs-5 text-color" />
                  </button>
                  <Modal.Title>Select Employees</Modal.Title>
                </Modal.Header>
                <Modal.Body className="addHolidaySection">
                  <div>
                    <HiMagnifyingGlass className="position-absolute top-7 left-6" />
                    <Form.Control
                      className="ms-auto w-100 focus:border-green-700 hover:border-green-700 shadow-none mb-3 pl-7 bg-transparent Border text-color"
                      placeholder="Search employees"
                      value={employeeSearch}
                      onChange={handleEmployeeSearch}
                    />
                  </div>
                  <Checkbox
                    className="fw-bold text-color bg-transparent"
                    indeterminate={
                      checkedList.length > 0 &&
                      checkedList.length < filteredUsers.length
                    }
                    onChange={onCheckAllChange}
                    checked={filteredUsers.length === checkedList.length}
                  >
                    &nbsp;&nbsp;Select all employees
                  </Checkbox>
                  <Divider className="my-2 Border" />
                  <div
                    className="members-list"
                    style={{ height: "170px", overflowY: "auto" }}
                  >
                    <Checkbox.Group
                      className="bg-transparent"
                      options={filteredUsers.map((user) => ({
                        label: (
                          <div className="flex-column text-color">
                            {user.user}
                          </div>
                        ),
                        value: user.email, // Use email or any unique value for identification
                      }))}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer
                  style={{ borderColor: "var(--border-color) !important" }}
                >
                  <Button
                    className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
                    style={{
                      height: "40px",
                    }}
                    onClick={() => {
                      setCheckedList([]), setSelectedEmployee("");
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    className="p-2 px-3  workspace_addBtn border-0"
                    style={{ backgroundColor: "#025231" }}
                    onClick={() => {
                      setIsEmployeeModalOpen(false),
                        getSelectedEmployeesLabel();
                    }}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <div className="centerIt justify-between fs_15 mt-3 ">
            <p>Select color</p>
            <div style={{ width: "60%" }}>
              <Popover
                content={
                  <div
                    className="rounded-2 py-2.5 px-2.5"
                    style={{ width: "200px" }}
                  >
                    {colors.map((color) => (
                      <div
                        className="colorSection rounded-2 mx-1 cursor_pointer"
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "inline-flex",
                          backgroundColor: `${color}`,
                        }}
                        onClick={() => {
                          setHolidayColor(color), setOpen(null);
                        }}
                      ></div>
                    ))}
                  </div>
                }
                trigger="click"
                open={open}
                onOpenChange={(newOpen) => setOpen(newOpen)}
                className="docBGcolorPopup rounded-2"
              >
                <div className="centerIt cursor_pointer rounded-1 Border p-1 w-min">
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      backgroundColor: `${holidayColor}`,
                    }}
                    className="backgroundPart rounded-1 "
                  ></div>
                </div>
              </Popover>
            </div>
          </div>

          <div className="ms-auto" style={{ width: "60%" }}>
            <button
              onClick={handleAddTimeOff}
              className="mt-2 workspace_addBtn py-2 rounded w-full text-sm w-auto px-3"
            >
              Add holiday
            </button>
          </div>
        </div>
      </div>

      {/* {isPopupOpen && selectedRange && (
        <div
          className="absolute bg-white p-3 rounded shadow-lg"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            width: "230px",
            zIndex: 1000,
          }}
        >
          <div className="centerIt justify-content-between">
            <span
              className="text-sm block "
              dangerouslySetInnerHTML={{ __html: getFormattedRange() }}
            ></span>
            <span
              className="bgHover rounded-1 cursor_pointer centerIt justify-content-center"
              style={{ minWidth: "20px", height: "20px" }}
              onClick={handlePopupClose}
            >
              <RxCross2 />
            </span>
          </div>
          <Form.Control
            type="text"
            placeholder="Holiday name"
            value={timeOffName}
            onChange={handleTimeOffNameChange}
            className="mb-2 px-1 py-0 mt-3 w-full rounded text-sm holidayName shadow-none"
            style={{ height: 30 }}
          />

          <div
            className="pb-3"
            style={{ borderBottom: "2px solid var(--border-color)" }}
          >
            <div className="centerIt justify-content-between fs_15 mt-3 ">
              <p>Select color</p>
              <Popover
                content={
                  <div
                    className="rounded-2 py-2.5 px-2.5"
                    style={{ width: "200px" }}
                  >
                    {colors.map((color) => (
                      <div
                        className="colorSection rounded-2 mx-1 cursor_pointer"
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "inline-flex",
                          backgroundColor: `${color}`,
                        }}
                        onClick={() => {
                          setHolidayColor(color), setOpen(null);
                        }}
                      ></div>
                    ))}
                  </div>
                }
                trigger="click"
                open={open}
                onOpenChange={(newOpen) => setOpen(newOpen)}
                className="docBGcolorPopup rounded-2"
              >
                <div className="centerIt cursor_pointer  Border p-1">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: `${holidayColor}`,
                    }}
                    className="backgroundPart rounded-1 "
                  ></div>
                </div>
              </Popover>
            </div>
          </div>
          <button
            onClick={handleAddTimeOff}
            className="mt-2 workspace_addBtn py-2 rounded w-full text-sm"
            style={{
              color: "var(--text-color)",
            }}
          >
            Add holiday
          </button>
        </div>
      )} */}
      <SuccessPopup
        handleClose={handleClose}
        text={`Holiday added successfully`}
      />
    </div>
  );
};

export default AddHolidayCalender;
