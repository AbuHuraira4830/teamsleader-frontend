import React, { useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  FaCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { FiPlus } from "react-icons/fi";

import { FaXTwitter } from "react-icons/fa6";

const ScheduleDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [whenToPost, setWhenToPost] = useState("Specific Days & Times");
  const [whenToPostDropdownOpen, setWhenToPostDropdownOpen] = useState(false);

  const [scheduleItems, setScheduleItems] = useState([
    {
      date: null, // Initialize as null
      time: {
        hour: "12",
        minute: "00",
        ampm: "am",
      },
      platformDropdownOpen: false,
      platforms: {
        facebook: false,
        instagram: false,
        twitter: false,
        tiktok: false,
        x: false,
        linkedin: false,
        pinterest: false,
      },
    },
  ]);
  const datePickerRef = useRef(null);

  const whenToPostOptions = ["Specific Days & Times", "Immediately"];

  const handleIconClick = () => {
    datePickerRef.current.setFocus();
  };

  const handleDateChange = (index, date) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems[index].date = date;
    setScheduleItems(newScheduleItems);
  };

  const handleTimeChange = (index, field, value) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems[index].time[field] = value;
    setScheduleItems(newScheduleItems);
  };

  const handlePlatformChange = (index, event) => {
    const { name, checked } = event.target;
    const newScheduleItems = [...scheduleItems];
    newScheduleItems[index].platforms[name] = checked;
    setScheduleItems(newScheduleItems);
  };

  const togglePlatformDropdown = (index) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems[index].platformDropdownOpen =
      !newScheduleItems[index].platformDropdownOpen;
    setScheduleItems(newScheduleItems);
  };

  const addScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      {
        date: null, // Initialize as null
        time: {
          hour: "12",
          minute: "00",
          ampm: "am",
        },
        platformDropdownOpen: false,
        platforms: {
          facebook: false,
          instagram: false,
          twitter: false,
          tiktok: false,
          x: false,
          linkedin: false,
          pinterest: false,
        },
      },
    ]);
  };

  const removeScheduleItem = (index) => {
    const newScheduleItems = scheduleItems.filter((_, i) => i !== index);
    setScheduleItems(newScheduleItems);
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 w-full text-left text-gray-700 text-sm font-medium"
      >
        <span>Schedule Post</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out px-4 ${
          isOpen
            ? "max-h-[50vh] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="space-y-4">
          <div className="relative mb-4">
            <label className="text-sm text-[#364141] font-medium">
              When to post
            </label>
            <button
              onClick={() => setWhenToPostDropdownOpen(!whenToPostDropdownOpen)}
              className="form-control text-sm shadow-none focus:border-[#00854d] appearance-none w-full pr-10 py-2 border border-gray-300 rounded flex items-center justify-between"
            >
              {whenToPost}
              <IoIosArrowDown className="text-gray-600 pointer-events-none" />
            </button>
            {whenToPostDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                <div className="p-2">
                  {whenToPostOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setWhenToPost(option);
                        setWhenToPostDropdownOpen(false);
                      }}
                      className="cursor-pointer text-sm text-[#364141] p-2 hover:bg-gray-100"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {whenToPost === "Specific Days & Times" && (
          <>
            {scheduleItems.map((item, index) => (
              <div key={index} className="scheduleItem mb-4">
                <div className="flex items-center">
                  <div className="mr-[8px]">
                    <label
                      htmlFor={`scheduleDate_label_${index}`}
                      className="scheduleDate_label"
                    >
                      Date
                    </label>
                    <div className="flex items-center scheduleDate_container invoice_customCalendar schedule_customCalendar">
                      <div
                        className="pl-2 cursor-pointer"
                        onClick={handleIconClick}
                      >
                        <FaCalendarAlt className="text-gray-600 text-sm" />
                      </div>
                      <DatePicker
                        selected={item.date}
                        onChange={(date) => handleDateChange(index, date)}
                        className="form-control text-sm shadow-none focus:border-[#00854d] pl-4"
                        dateFormat="EEE, MMM d, yyyy"
                        ref={datePickerRef}
                        placeholderText="Select a date"
                      />
                    </div>
                  </div>
                  <div className="mr-[8px]">
                    <label
                      htmlFor={`scheduleTime_label_${index}`}
                      className="scheduleDate_label"
                    >
                      Time
                    </label>
                    <div className="flex items-center">
                      <div className="relative inline-block w-full mr-[4px]">
                        <select
                          value={item.time.hour}
                          onChange={(e) =>
                            handleTimeChange(index, "hour", e.target.value)
                          }
                          className="form-control text-xs shadow-none focus:border-[#00854d] appearance-none w-full pr-8 py-2 border border-gray-300 rounded"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (hour) => (
                              <option key={hour}>{hour}</option>
                            )
                          )}
                        </select>
                        <IoIosArrowDown className="absolute text-sm top-1/2 right-2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                      </div>
                      <div className="mr-[4px]">:</div>
                      <div className="relative inline-block w-full mr-[4px]">
                        <select
                          value={item.time.minute}
                          onChange={(e) =>
                            handleTimeChange(index, "minute", e.target.value)
                          }
                          className="form-control text-xs shadow-none focus:border-[#00854d] appearance-none w-full pr-8 py-2 border border-gray-300 rounded"
                        >
                          {Array.from({ length: 60 }, (_, i) => i).map(
                            (minute) => (
                              <option
                                key={minute}
                                value={minute.toString().padStart(2, "0")}
                              >
                                {minute.toString().padStart(2, "0")}
                              </option>
                            )
                          )}
                        </select>
                        <IoIosArrowDown className="absolute text-sm top-1/2 right-2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                      </div>
                      <div className="mr-[4px]">:</div>
                      <div className="relative inline-block w-full">
                        <select
                          value={item.time.ampm}
                          onChange={(e) =>
                            handleTimeChange(index, "ampm", e.target.value)
                          }
                          className="form-control text-xs shadow-none focus:border-[#00854d] appearance-none w-full pr-7 py-2 border border-gray-300 rounded"
                        >
                          <option value="am">am</option>
                          <option value="pm">pm</option>
                        </select>
                        <IoIosArrowDown className="absolute text-sm top-1/2 right-2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                      </div>
                      <div className="ml-4 cursor-pointer text-gray-600 hover:text-red-600">
                        <MdDeleteOutline
                          className="text-lg"
                          onClick={() => removeScheduleItem(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Choose your platform Dropdown */}
                <div className="relative mt-4">
                  <button
                    onClick={() => togglePlatformDropdown(index)}
                    className="form-control text-sm shadow-none focus:border-[#00854d] appearance-none w-full pr-10 py-2 border border-gray-300 rounded flex items-center justify-between"
                  >
                    Choose your platform
                    <IoIosArrowDown className="text-gray-600 pointer-events-none" />
                  </button>
                  {item.platformDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                      <div className="p-2 space-y-2">
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaFacebook className="mr-2 text-blue-500" />{" "}
                              Facebook
                            </span>
                          }
                          name="facebook"
                          checked={item.platforms.facebook}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaInstagram className="mr-2 text-pink-500" />{" "}
                              Instagram
                            </span>
                          }
                          name="instagram"
                          checked={item.platforms.instagram}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaXTwitter className="mr-2" /> Twitter
                            </span>
                          }
                          name="twitter"
                          checked={item.platforms.twitter}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaTiktok className="mr-2 text-black" /> TikTok
                            </span>
                          }
                          name="tiktok"
                          checked={item.platforms.tiktok}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaPinterest className="mr-2 text-red-500" />{" "}
                              Pinterest
                            </span>
                          }
                          name="pinterest"
                          checked={item.platforms.pinterest}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="flex items-center">
                              <FaLinkedin className="mr-2 text-blue-600" />{" "}
                              LinkedIn
                            </span>
                          }
                          name="linkedin"
                          checked={item.platforms.linkedin}
                          onChange={(e) => handlePlatformChange(index, e)}
                          className="text-sm text-[#364141] font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isOpen && (
              <div className="scheduleCalendarSeparator relative ">
                <button
                  className=" flex items-center px-2 nav_planBtn align-middle bg-transparent align-self-center  transition-all"
                  onClick={addScheduleItem}
                >
                  <FiPlus className="mr-1" /> Add more scheduled times
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleDropdown;
