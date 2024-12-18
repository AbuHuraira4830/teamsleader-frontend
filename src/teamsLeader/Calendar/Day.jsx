import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import Popover from "@mui/material/Popover";
import { useStateContext } from "../../contexts/ContextProvider";
import OffCanvasEvent from "./OffCanvasEvent";
import AllEventsOffCanvas from "./AllEventsOffCanvas";

const Day = ({ day, rowIdx }) => {
  const {
    setShowEventModal,
    monthIndex,
    modalDataCalendar,
    setModalDataCalendar,
    setModalInfo,
  } = useStateContext();
  const cellRef = useRef(null); // Step 1: Create a ref

  const [anchorEl, setAnchorEl] = useState(null);

  const isCurrentMonth = day.month() === monthIndex;
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showAllEventsOffCanvas, setShowAllEventsOffCanvas] = useState(false); // New state for showing all events OffCanvas

  const handleShowAllEventsClick = (e) => {
    e.stopPropagation();
    setShowAllEventsOffCanvas(true);
  };

  const eventsForDay = modalDataCalendar.filter((range) =>
    dayjs(day).isBetween(
      dayjs(range.startDate),
      dayjs(range.endDate),
      null,
      "[]"
    )
  );
  const moreEventsCount = eventsForDay.length - 2;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getCurrentDayClass = () => {
    return (
      day.format("DD-MM-YY") ===
      dayjs().format(
        "DD-MM-YY"
          ? " bg-blue-600 font-bold text-white rounded-full w-7 text-center ml-auto mr-1"
          : ""
      )
    );
  };

  const isCenterCell = (range) => {
    const startDate = dayjs(range.startDate);
    const endDate = dayjs(range.endDate);
    const rangeStart = startDate.date();
    const rangeEnd = endDate.date();

    if (rangeStart === rangeEnd) {
      return day.date() === rangeStart;
    }

    const middleCell = (rangeStart + rangeEnd) / 2;
    return day.date() === Math.round(middleCell);
  };

  const handleEventClick = (eventData) => (e) => {
    // alert("i am here");
    // setSelectedEvent(eventData);

    setCurrentEvent(eventData);
    setShowAllEventsOffCanvas(false);
    // alert("i am here2");

    setShowOffCanvas(true); // Show the OffCanvasEvent
    e.stopPropagation();
  };

  const handleDayClick = () => {
    setShowEventModal(true);
  };

  const updateEvent = (id, newInputText) => {
    const updatedEvent = {
      inputText: newInputText,
      // include other fields that might need updating
    };

    fetch(`http://localhost:8888/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Event updated:", data);
        // setModalDataCalendar((currentEvents) =>
        //   currentEvents.map((event) =>
        //     event._id === id ? { ...event, inputText: newInputText } : event
        //   )
        // );
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  // Function to delete an event
  const deleteEvent = (id) => {
    console.log("id sent", id);
    // offCanvasOpenRef.current = true;

    fetch(`http://localhost:8888/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setShowOffCanvas(false);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <>
      <div
        className={`Border flex flex-col bg-[var(--sidebar-background-color)] color-[var(--text-color)] calendar_table_cell ${
          rowIdx === 0 ? "first_row" : "other_rows"
        } ${
          modalDataCalendar.some((range) =>
            dayjs(day).isBetween(
              dayjs(range.startDate),
              dayjs(range.endDate),
              null,
              "[]"
            )
          )
            ? "event-added"
            : ""
        }`}
        ref={cellRef}
        onClick={handleDayClick}
      >
        <header className="flex flex-col ">
          {rowIdx === 0 && (
            <div className="text-sm text-center mt-1  border-b border-[var(--border-color)]  pb-1 w-full relative z-30	">
              {day.format("ddd").toUpperCase()}
            </div>
          )}
          {isCurrentMonth && (
            <p
              className={`  relative z-30 text-sm  my-1 text-right   ${getCurrentDayClass()}`}
            >
              {day.format("DD")}
              {/* Display up to the first two events */}
              {modalDataCalendar
                .filter((range) =>
                  dayjs(day).isBetween(
                    dayjs(range.startDate),
                    dayjs(range.endDate),
                    null,
                    "[]"
                  )
                )
                .slice(0, 2)
                .map((range, index) => (
                  <div
                    key={index}
                    onClick={handleEventClick(range)}
                    className={`h-[24px] w-[101%] flex justify-center items-center mt-[.3rem] rounded`}
                    style={{ background: `${range.labelBackgroundColor}` }}
                  >
                    {isCenterCell(range) && (
                      <>
                        <span className="text-white">{range.inputText}</span>
                      </>
                    )}
                  </div>
                ))}
              {moreEventsCount > 0 && (
                <div
                  onClick={handleShowAllEventsClick}
                  className="text-sm text-blue-600 cursor-pointer hover:underline text-gray-600"
                >
                  +{moreEventsCount} more
                </div>
              )}
            </p>
          )}
        </header>
      </div>

      {showOffCanvas && (
        // <OffCanvasEvent
        //   event={currentEvent}
        //   onClose={() => setShowOffCanvas(false)}
        //   show={showOffCanvas}
        //   deleteEvent={deleteEvent}
        //   updateEvent={updateEvent}
        // />
        <OffCanvasEvent
          event={currentEvent}
          onClose={() => {
            setShowOffCanvas(false);
            setCurrentEvent(null);
          }}
          show={showOffCanvas}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
        />
      )}
      {showAllEventsOffCanvas && (
        <AllEventsOffCanvas
          events={eventsForDay}
          onClose={() => setShowAllEventsOffCanvas(false)}
          show={showAllEventsOffCanvas}
          onEventSelect={handleEventClick}
        />
      )}
    </>
  );
};

export default Day;
