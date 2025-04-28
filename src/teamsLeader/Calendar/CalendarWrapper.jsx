import React, { useContext, useState, useEffect } from "react";
import getMonth from "./util";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddNewPerson from "./AddNewPerson";
import Month from "./Month";
import CalendarHeader from "./CalendarHeader";
import { useStateContext } from "../../contexts/ContextProvider";
import EventModal from "./EventModal";
import Status from "./Status";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdCircle } from "react-icons/md";
import Slider from "react-slick";
import { LuChevronLeftCircle } from "react-icons/lu";
import { LuChevronRightCircle } from "react-icons/lu";
import "./calendar.css";

const CustomArrow = ({ className, onClick, icon, statusItems }) => (
  <button
    className={`${className} ${statusItems.length <= 5 && "hidden"}`}
    onClick={onClick}
  >
    {icon}
  </button>
);

const CalendarWrapper = () => {
  // const statusItems = [
  //   { color: "#00C875", label: "Done" },
  //   { color: "#FDAB3D", label: "In Progress" },
  //   { color: "#2B76E5", label: "Ready" },
  //   { color: "#7F5347", label: "Pending" },
  //   { color: "#e2445c", label: "Stuck" },
  // ];
  const [statusItems, setStatusItems] = useState([
    { color: "#00C875", label: "Done" },
    { color: "#FDAB3D", label: "In Progress" },
    { color: "#2B76E5", label: "Ready" },
    { color: "#7F5347", label: "Pending" },
    { color: "#e2445c", label: "Stuck" },
  ]);

  const settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: (
      <CustomArrow
        className="slick-prev"
        icon={<LuChevronLeftCircle />}
        statusItems={statusItems}
      />
    ),
    nextArrow: (
      <CustomArrow
        className="slick-next"
        icon={<LuChevronRightCircle />}
        statusItems={statusItems}
      />
    ),
  };
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, setMonthIndex } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");


  const handlePreviousMonth = () => {
    setMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const addNewStatusItem = (newItem) => {
    setStatusItems((prevStatusItems) => [...prevStatusItems, newItem]);
  };

  return (
    <>
      <div className="h-[90vh] flex flex-col w-[98%] relative bg-[var(--sidebar-background-color)] color-[var(--text-color)]">
        <CalendarHeader
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
          month={currentMonth}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <div className="flex flex-1 ">
          <Month month={currentMonth} searchTerm={searchTerm}/>
        </div>

        <div className="flex justify-center items-center calendar_dateRange">
          {showEventModal && (
            <EventModal
              addNewStatusItem={addNewStatusItem}
              statusItems={statusItems}
            />
          )}
        </div>
      </div>
      <div className="calendarStatus_barWrapper">
        <Slider
          {...settings}
          className="flex justify-start	 items-center py-[0.4rem] "
        >
          {statusItems.map((item, index) => (
            <div key={index} className="stausLabel_wrapper">
              <MdCircle
                className={`text-xs `}
                style={{ color: `${item.color}` }}
              />
              <div className="text-xs pl-1 ">{item.label}</div>
            </div>
          ))}
        </Slider>
        {/* ================================== */}
      </div>
    </>
  );
};

export default CalendarWrapper;
