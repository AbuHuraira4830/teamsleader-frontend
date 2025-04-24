import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import { useStateContext } from "../../contexts/ContextProvider";
import { getAPI } from "../../helpers/api";

const CalendarHeader = ({ handleNextMonth, handlePreviousMonth, month }) => {
  const { monthIndex, setMonthIndex, setFilteredEvents  } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.trim() === "") {
      setFilteredEvents([]); // Clear filter
      return;
    }
  
    try {
      const res = await getAPI(`/api/events/search?q=${value}`);
      setFilteredEvents(res.data); // ✅ set globally
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <div className="relative pb-[16px] flex items-center ">
      <div className="flex position-relative align-items-center me-2 search_inputDiv">
        <RxMagnifyingGlass className="position-absolute ms-1 search_icon" />
        <Form.Control
  type="text"
  placeholder="Search an event"
  value={searchTerm}
  onChange={handleSearch}
  className="px-4 py-1 shadow-none workspace_searchInput transparent_bg"
/>

      </div>
      <header className="flex items-center">
        <button
          className="hover:bg-[#dcdfec] border rounded py-2 px-4 mr-5 text-sm transition duration-300"
          onClick={handleReset}
        >
          Today
        </button>
        <button
          onClick={handlePreviousMonth}
          className="bgHover hover:rounded-full mx-1 mt-[0.2rem] w-[28px] h-[28px] transition duration-300"
        >
          <span className="cursor-pointer  color-[var(--text-color)] flex justify-center items-center">
            <MdChevronLeft className="text-xl" />
          </span>
        </button>
        <button
          onClick={handleNextMonth}
          className="bgHover hover:rounded-full mx-1 mt-[0.2rem] w-[28px] h-[28px] transition duration-300"
        >
          <span className="cursor-pointer color-[var(--text-color)] flex justify-center items-center">
            <MdChevronRight className="text-xl" />
          </span>
        </button>
        <h2 className="ml-4 text-[1rem]  mt-[0.8rem] text-nowrap">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>
    </div>
  );
};

export default CalendarHeader;
