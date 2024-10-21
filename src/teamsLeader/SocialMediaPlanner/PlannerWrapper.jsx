import React, { useState } from "react";
import PlannerHeader from "./PlannerHeader/PlannerHeader";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import "./planner.css";
import { addMonths, subMonths } from "date-fns";

const PlannerWrapper = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };
  return (
    // <div className="h-screen bg-[#f3f4f4]  p-4 overflow-auto  ">
    <div className="h-screen p-4  overflow-auto planner_customScrollbar">
      {/* <div className="h-screen shadow-lg p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100"> */}
      <PlannerHeader
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />
      <CalendarGrid currentMonth={currentMonth} />
    </div>
  );
};

export default PlannerWrapper;
