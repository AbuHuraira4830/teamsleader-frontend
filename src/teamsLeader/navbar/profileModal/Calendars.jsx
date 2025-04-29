import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import { useStateContext } from "../../../contexts/ContextProvider";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { Form, Spinner } from "react-bootstrap";
import { Select, Space } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { getAPI, postAPI } from "../../../helpers/apis";
import { v4 as uuidv4 } from "uuid";
import { id } from "date-fns/locale";
import { createPortal } from "react-dom";
import UpdateHolidayRequest from "./UpdateHolidayRequest";
const Calendars = ({ setMyHolidayRequests }) => {
  const {
    theme,
    userHolidays,
    FileAltIcons,
    setHolidayRequestsData,
    setThisUser,
    thisUser,
  } = useStateContext();
  const [ranges, setRanges] = useState(thisUser.holidayRanges || []);
  // const [timeOffDetails, setTimeOffDetails] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const calendarRef = useRef(null);
  const [timeOffName, setTimeOffName] = useState(null);
  const [reasonNote, setReasonNote] = useState(null);
  const [selectedType, setSelectedType] = useState("Vacation days");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add no-scroll class when popup opens, remove it when it closes
    if (isPopupOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup to remove class if component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (selectedRange && selectedRange[0]) {
      const endDate = selectedRange[1];
      const dayWithLeadingZero = endDate.format("D").padStart(2, "0"); // Ensures dates like "1" become "01"

      const dateElement = document.querySelector(
        `[aria-label="Choose ${endDate.format(
          "dddd MMMM"
        )} ${dayWithLeadingZero} of ${endDate.format("YYYY")}"]`
      );
      console.log(
        endDate.format("dddd MMMM "),
        dayWithLeadingZero,
        endDate.format("YYYY")
      );
      if (dateElement) {
        const rect = dateElement.getBoundingClientRect();
        const popupHeight = 284;
        const popupWidth = 230;

        // Calculate initial top and left positions
        let top = rect.bottom + window.scrollY + 5;
        let left = rect.left + window.scrollX + rect.width / 2 - popupWidth / 2;

        // Ensure the popup stays within viewport bounds
        if (top + popupHeight > window.innerHeight) {
          top = rect.top + window.scrollY - popupHeight - 5;
        }
        if (left + popupWidth > window.innerWidth) {
          left = window.innerWidth - popupWidth - 10;
        } else if (left < 0) {
          left = 10;
        }
        console.log("selected", dateElement, top, left);
        setPopupPosition({ top, left });
      } else {
        // If the element is not found, position in the center of the viewport as a fallback
        console.log("not selected");
        setPopupPosition({
          top: window.innerHeight / 2 - 100, // Adjust to place it around the center
          left: window.innerWidth / 2 - 100,
        });
      }
    }
  }, [selectedRange]);

  const handleRangeChange = (newRanges) => {
    if (newRanges.length > 0 && newRanges[newRanges.length - 1][1]) {
      const newRange = newRanges[newRanges.length - 1];
      setSelectedRange(newRange);
      setRanges(newRanges); // Update ranges to include the new range
      setIsPopupOpen(true);
    } else {
      setSelectedRange(null);
      setRanges(newRanges); // Update ranges to reflect the change
      setIsPopupOpen(false);
    }
  };
  const storeRanges = async () => {
    await postAPI("/api/user/update", {
      holidayRanges: ranges,
    })
      .then((res) => {
        setThisUser(res.data.updatedUser);
      })
      .catch((err) => {
        console.error("Error saving range", err);
      });
  };
  const handlePopupClose = () => {
    setSelectedRange(null);
    setRanges((prevRanges) => prevRanges.slice(0, -1)); // Remove the last (unsubmitted) range
    setIsPopupOpen(false);
  };

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

  const handleAddTimeOff = () => {
    if (selectedRange && timeOffName) {
      const startDate = dayjs(selectedRange[0]).format("YYYY-MM-DD");
      const endDate = dayjs(selectedRange[1]).format("YYYY-MM-DD");
      const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "id will be here";
    if (!workspace_uuid) {
      console.error("Cannot create event without workspace UUID.");
      return;
    }
      const data = {
        workspace_uuid,
        holidayName: timeOffName,
        holidayReason: reasonNote,
        status: { color: "#FFAE42", bgColor: "#FFFAA0", value: "Pending" },
        dateToDate: `${startDate} - ${endDate}`,
        days: numberOfDays,
        approvedBy: "",
        rejectedBy: "",
        files: uploadedFiles.map((file) => FileAltIcons(file)),
        extraNote: "",
        // range: [startDate, endDate],
        // name: timeOffName,
        type: selectedType,
        filesData: uploadedFiles,
        picture: thisUser.picture,
        fullName: thisUser.fullName,
        emailAddress: thisUser.emailAddress,
        range: selectedRange,
      };
      postAPI("/api/add-holiday-request", data)
        .then((res) => {
          setMyHolidayRequests(res.data.holidayRequests);
          storeRanges();
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset popup state
      setSelectedRange(null);
      setTimeOffName(null);
      setReasonNote(null);
      setSelectedType("Vacation days");
      setUploadedFiles([]);
      setIsPopupOpen(false);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleFileChange = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);
    const updatedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await getAPI("api/s3url");
      await fetch(res.data.data.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      setLoading(false);

      // Extract the URL without query parameters
      const URL = res.data.data.url.split("?")[0];
      const key = res.data.data.key;
      // Add file data to updatedFiles array
      updatedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL,
        key: key,
      });
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const getFormattedRange = () => {
    if (!selectedRange) return "";

    const startDate = dayjs(selectedRange[0]);
    const endDate = dayjs(selectedRange[1]);
    const days = calculateBusinessDays(startDate, endDate);
    const formattedStart = startDate.format("DD MMM");
    const formattedEnd = endDate.format("DD MMM");

    return `<strong>${days} days</strong> ${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="relative holidayRequest" ref={calendarRef}>
      <Calendar
        className={`green ${theme === "light_theme" ? "" : "range-container"}`}
        shadow={false}
        numberOfMonths={4}
        value={ranges}
        onChange={handleRangeChange}
        multiple
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
      {isPopupOpen &&
        selectedRange &&
        createPortal(
          <div
            className="absolute  p-3 rounded shadow-lg "
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
              width: "230px",
              zIndex: 10000,
              backgroundColor: "var(--dropdown-bgColor) ",
              color: "var(--text-color)",
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
              placeholder="Add name"
              value={timeOffName}
              onChange={(e) => setTimeOffName(e.target.value)}
              className="mb-2 px-1 mt-3 w-full rounded text-sm holidayName shadow-none border-danger"
              style={{
                height: 30,
                resize: "none",
                backgroundColor: "var(--sidebar-background-color) !important",
                color: "var(--text-color) !important",
              }}
            />
            <Form.Control
              as="textarea"
              placeholder="Add reason"
              value={reasonNote}
              onChange={(e) => setReasonNote(e.target.value)}
              className="mb-2 px-1 w-full rounded text-sm holidayName textareaReason shadow-none"
              style={{
                height: 30,
                resize: "none",
                backgroundColor: "var(--sidebar-background-color) !important",
                color: "var(--text-color) !important",
              }}
            />
            <Space wrap className="w-100 ">
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                className="holidaySelect"
                style={{
                  width: "198px",
                  height: 30,
                  zIndex: 99999,
                }}
                options={userHolidays
                  .filter(
                    (holiday) =>
                      holiday.type !== "Holidays taken" &&
                      holiday.type !== "Holidays left"
                  )
                  .map((holiday) => ({
                    value: holiday.type,
                    label: holiday.type,
                  }))}
              />
            </Space>
            <div
              className="pb-3"
              style={{ borderBottom: "2px solid var(--border-color)" }}
            >
              <div className="centerIt justify-content-between fs_15 mt-3 ">
                <p>Upload files</p>
                <div
                  className="rounded-1 centerIt justify-content-center cursor_pointer"
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "var( --gray-hover-color)",
                  }}
                  onClick={handleFileUploadClick}
                >
                  <MdOutlineFileUpload className="fs-5" />
                </div>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="px-2 mt-2 bgHover py-1 rounded w-full text-sm centerIt justify-content-between"
                    style={{
                      color: "var(--text-color)",
                    }}
                  >
                    <span className="centerIt">
                      <CiFileOn className="me-2" />{" "}
                      {file.name.length > 18
                        ? file.name.slice(0, 15) + "..."
                        : file.name}
                    </span>
                    <span
                      className="bgHover rounded-1 cursor_pointer centerIt justify-content-center"
                      style={{ minWidth: "16px", height: "16px" }}
                      onClick={() => handleFileRemove(index)}
                    >
                      <RxCross2 />
                    </span>
                  </div>
                ))}
                {loading && (
                  <div className="centerIt justify-center">
                    <Spinner animation="border holiday-spinner mt-2" />
                  </div>
                )}
              </div>
            </div>
            <button
              disabled={!timeOffName || !reasonNote || loading}
              onClick={handleAddTimeOff}
              className="mt-2 workspace_addBtn py-2 rounded w-full text-sm"
              style={{
                color: "var(--text-color)",
                cursor:
                  loading || !timeOffName || !reasonNote ? "not-allowed" : "",
              }}
            >
              Add Time off
            </button>
          </div>,
          document.body
        )}
      {/* <UpdateHolidayRequest /> */}
    </div>
  );
};

export default Calendars;

// import React, { useState, useRef, useEffect } from "react";
// import { Calendar } from "react-multi-date-picker";
// import { Popover, Button, Select, Space } from "antd";
// import { Form } from "react-bootstrap";
// // ... other imports

// const Calendars = ({ setMyHolidayRequests }) => {
//   // ... other state and ref definitions

//   const [open, setOpen] = useState(false);
//   const [popoverTarget, setPopoverTarget] = useState(null);

//   const handleOpenChange = (newOpen) => {
//     setOpen(newOpen);
//   };

//   // const handlePopoverTargetChange = (target) => {
//   //   setPopoverTarget(target);
//   // };

//  const handleRangeChange = (newRanges) => {
//    if (newRanges.length > 0) {
//      const selectedRange = newRanges[newRanges.length - 1];
//      const lastSelectedDateElement = document.querySelector(
//        `[aria-label="Choose ${selectedRange[1].format(
//          "dddd MMMM D"
//        )} of ${selectedRange[1].format("YYYY")}"]`
//      );
//      setPopoverTarget(lastSelectedDateElement);
//      setOpen(true);
//    }
//  };

//   const content = (
//     <div>
//       <Form.Control
//         type="text"
//         placeholder="Add name"
//         // value={timeOffName}
//         // onChange={(e) => setTimeOffName(e.target.value)}
//         // ... other styles
//       />
//       {/* ... other form elements and content */}
//     </div>
//   );

//   return (
//     <div className="relative holidayRequest">
//       <Calendar
//         // className={`green ${theme === "light_theme" ? "" : "range-container"}`}
//         shadow={false}
//         numberOfMonths={4}
//         // value={ranges}
//         onChange={handleRangeChange} // Retained for single date selections
//         // multiple
//         range
//         weekStartDayIndex={1}
//         highlightToday={false}
//         onOpenPickNewDate={false}
//         mapDays={({ date }) => {
//           let isWeekend = [0, 6].includes(date.weekDay.index);
//           if (isWeekend) {
//             return {
//               style: { color: "#ccc" },
//             };
//           }
//         }}
//       />
//       <Popover
//         placement="bottom"
//         content={content}
//         trigger="click"
//         open={open}
//         onOpenChange={handleOpenChange}
//         target={popoverTarget}
//       />
//       {/* ... rest of your component */}
//     </div>
//   );
// };

// export default Calendars;
