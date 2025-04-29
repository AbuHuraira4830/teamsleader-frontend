import React, { useState, useRef, useEffect } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { useStateContext } from "../../../contexts/ContextProvider";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { Form, Modal, Spinner } from "react-bootstrap";
import { Select, Space } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { getAPI, postAPI } from "../../../helpers/apis";
import { v4 as uuidv4 } from "uuid";
import { id } from "date-fns/locale";
import { createPortal } from "react-dom";
import { set } from "lodash";
import { FiTrash2 } from "react-icons/fi";

import DeleteModal from "../../../dynamicComponents/DeleteModal";

const UpdateHolidayRequest = ({ row, onClose, visible, isEdit }) => {
  const {
    updateRequestModal,
    setUpdateRequestModal,
    userHolidays,
    theme,
    FileAltIcons,
    setMyHolidayRequests,
    thisUser,
    setDeleteModal,         
  } = useStateContext();
  const [uploadedFiles, setUploadedFiles] = useState(row.filesData || []);
  const [timeOffName, setTimeOffName] = useState(row.holidayName || "");
  const [reasonNote, setReasonNote] = useState(row.holidayReason || "");
  const [selectedType, setSelectedType] = useState(row.type || "Vacation days");
  const [numberOfDays, setNumberOfDays] = useState(row.days || 0);
  const [dateToDate, setDateToDate] = useState(row.dateToDate || "");
  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState(row.range || []);

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const formatDateRangeFromString = (dateRangeString) => {
    if (!dateRangeString) return "";
    const [startDate, endDate] = dateRangeString
      .split(" - ")
      .map((date) => new Date(date));
    const options = { day: "numeric", month: "short" };
    const startFormatted = startDate?.toLocaleDateString("en-US", options);
    const endFormatted = endDate?.toLocaleDateString("en-US", options);
    return `${startFormatted} - ${endFormatted}`;
  };
  const [formatedDates, setFormatedDates] = useState(
    formatDateRangeFromString(row.dateToDate) || ""
  );
  const fileInputRef = useRef(null);

  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  const calculateDays = selectedRange
    ? calculateBusinessDays(dayjs(selectedRange[0]), dayjs(selectedRange[1]))
    : 0;

  useEffect(() => {
    if (selectedRange[1]) setNumberOfDays(calculateDays);
    handleDateToDate();
  }, [selectedRange]);
  useEffect(() => {
    if (dateToDate) setFormatedDates(formatDateRangeFromString(dateToDate));
  }, [dateToDate]);

  const handleDateToDate = () => {
    setDateToDate(
      `${dayjs(selectedRange[0]).format("YYYY-MM-DD")} - ${dayjs(
        selectedRange[1]
      ).format("YYYY-MM-DD")}`
    );
  };

  const updateRequest = () => {
    const data = {
      holidayName: timeOffName,
      holidayReason: reasonNote,
      type: selectedType,
      filesData: uploadedFiles,
      files: uploadedFiles.map((file) => FileAltIcons(file)),
      days: numberOfDays,
      range: selectedRange,
      dateToDate,
    };
    postAPI("/api/user/update-holiday-request", { data, id: row._id })
      .then((res) => {
        setMyHolidayRequests(res.data.holidayRequests);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRequest = () => {
    postAPI("/api/delete-holiday-request", { id: row._id })
      .then((res) => {
        setMyHolidayRequests(res.data.holidayRequests);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          setSelectedRange("");
          setTimeOffName("");
          setReasonNote("");
          setSelectedType("Vacation days");
          setUploadedFiles([]);
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset popup state
    }
  };
  const handleClick = () => {
    if (isEdit) {
      updateRequest();
    } else {
      handleAddTimeOff();
    }
  };
  return (
    <Modal
      show={visible}
      onHide={onClose}
      centered
      dialogClassName="emailPopup holidayRequestModal border-0"
      backdropClassName="updateRequestBackdrop"
    >
      <Modal.Body className="p-1">
        <div
          className="  p-3 rounded  "
          style={{
            // top: `${popupPosition.top}px`,
            // left: `${popupPosition.left}px`,
            // width: "230px",
            // zIndex: 10000,
            // backgroundColor: "var(--dropdown-bgColor) ",
            color: "var(--text-color)",
          }}
        >
          <div className="centerIt justify-content-between">
            <div className="text-xl text-bold block ">
              <span className="fw-bold">{`${numberOfDays} days `}</span>

              {formatedDates}
            </div>
            <span
              className="bgHover rounded-1 cursor_pointer centerIt justify-content-center"
              style={{ minWidth: "20px", height: "20px" }}
              onClick={onClose}
            >
              <RxCross2 />
            </span>
          </div>
          <Form.Control
            type="text"
            placeholder="Add name"
            value={timeOffName}
            onChange={(e) => setTimeOffName(e.target.value)}
            className="mb-2  mt-3 w-full rounded text-sm holidayName shadow-none border-danger"
            style={{
              height: 32,
              resize: "none",
              paddingLeft: "11px",
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
          <Space className="w-100 ">
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              className="holidaySelect"
              style={{
                width: "100%",
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
          <div className="requestHoliday">
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
                    {file.name.length > 38
                      ? file.name.slice(0, 35) + "..."
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
          <div className="centerIt mt-2">
            {row?.status?.value === "Pending" && (
              <span
                className="bgHover rounded-1 cursor_pointer centerIt justify-content-center  me-2"
                style={{ minWidth: "36px", height: "36px" }}
                onClick={() => setDeleteModal(true)}
              >
                <FiTrash2 className="text-danger fs-5" />
              </span>
            )}
            <button
              disabled={!timeOffName || !reasonNote || loading}
              onClick={handleClick}
              className=" workspace_addBtn py-2 rounded-1 w-full text-sm"
              style={{
                color: "var(--text-color)",
                cursor:
                  loading || !timeOffName || !reasonNote ? "not-allowed" : "",
              }}
            >
              {isEdit ? `Update Time off` : `Add Time off`}
            </button>
          </div>
        </div>
        <DeleteModal
          handleDeleteFile={deleteRequest}
          fileName="holiday request"
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateHolidayRequest;
