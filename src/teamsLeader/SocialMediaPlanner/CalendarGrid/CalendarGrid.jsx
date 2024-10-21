import React from "react";

import {
  startOfDay,
  isAfter,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  addDays,
  isSameDay,
  format,
} from "date-fns";

import PostSkeletonFill from "./PostSkeletonFill";
import PostSkeletonTrans from "./PostSkeletonTrans";

const CalendarGrid = ({ currentMonth }) => {
  const now = new Date();

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const isTomorrow = (someDate) => {
    const today = startOfDay(new Date()); // startOfDay will set the time to 00:00:00
    const tomorrow = addDays(today, 1); // addDays is used to get the next day
    return isSameDay(someDate, tomorrow);
  };

  const isAfterToday = (someDate) => {
    const today = startOfDay(new Date()); // Again, ensuring the time is set to 00:00:00 for correct comparison
    return isAfter(someDate, today); // isAfter will return true if someDate is after today
  };

  return (
    <div>
      {/* Weekdays Header */}
      {/* <div className="grid grid-cols-7  mt-3 border-[#dee1e1]"> */}
      <div className="grid grid-cols-7 sticky top-[-3%] mt-3 z-10  border-[#dee1e1] ">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day, index) => (
          <div
            key={index}
            className="py-2 text-center text-[13px] font-semibold text-gray-600 border border-[#dee1e1]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const isDayInCurrentMonth =
            day >= startOfMonth(now) && day <= endOfMonth(now);
          // const isDayInCurrentMonth = isSameMonth(day, currentMonth);

          // const isAfterToday = isToday(day) || day > new Date();

          return (
            <div
              key={index}
              className={` ${
                isDayInCurrentMonth && isTomorrow(day) ? "has-schedule" : ""
              } day-cell border relative px-2 pt-2 pb-[40px] flex flex-col justify-between items-center text-center  border-[#dee1e1] text-[13px] ${
                isToday(day)
                  ? "bg-blue-100 border-2 border-blue-500 always-show"
                  : isAfterToday(day)
                  ? "bg-white"
                  : "bg-gray-100"
              }`}
              style={{ minHeight: "200px" }}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={`text-[13px] `}
              >
                {format(day, "d")}
              </time>
              {isDayInCurrentMonth && isTomorrow(day) && <PostSkeletonFill />}
              {/* {isDayInCurrentMonth && isAfterToday && !isTomorrow(day) && (
                <div className="post-skeleton-trans-hover">
                  <PostSkeletonTrans />
                </div>
              )}{" "} */}
              {isAfterToday(day) && !isTomorrow(day) && (
                // <div className="post-skeleton-trans-hover">
                <div className={`post-skeleton-trans-hover `}>
                  <PostSkeletonTrans />
                </div>
              )}
              {isToday(day) && (
                // <div className="post-skeleton-trans-hover">
                <div className={`post-skeleton-trans-hover `}>
                  <PostSkeletonTrans />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
