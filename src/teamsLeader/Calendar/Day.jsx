import React, { useState, useRef, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import Popover from "@mui/material/Popover";
import { useStateContext } from "../../contexts/ContextProvider";
import OffCanvasEvent from "./OffCanvasEvent";
import AllEventsOffCanvas from "./AllEventsOffCanvas";
import { getAPI, deleteAPI, putAPI } from "../../helpers/api";


const Day = ({ day, rowIdx, searchTerm }) => {
  const {
    setShowEventModal,
    monthIndex,
    modalDataCalendar,
    setModalDataCalendar,
    setModalInfo,
    replaceModalInfo,
    filteredEvents
  } = useStateContext();
  const cellRef = useRef(null); // Step 1: Create a ref

  const [anchorEl, setAnchorEl] = useState(null);

  const isCurrentMonth = day.month() === monthIndex;
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isSearching = searchTerm.trim() !== "";

  const [showAllEventsOffCanvas, setShowAllEventsOffCanvas] = useState(false); // New state for showing all events OffCanvas
  const activeEvents = useMemo(() => {
    if (filteredEvents.length > 0) {
      return filteredEvents;
    }
    return modalDataCalendar;
  }, [filteredEvents, modalDataCalendar]);
  

console.log("Active Events Rendering:", activeEvents); // 👈 log




// ✅ This finds events for a specific day
const eventsForDay = activeEvents.filter((range) =>
  dayjs(day).isBetween(
    dayjs(range.startDate),
    dayjs(range.endDate),
    null,
    "[]"
  )
);






  const handleShowAllEventsClick = (e) => {
    e.stopPropagation();
    setShowAllEventsOffCanvas(true);
  };

 
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

  const updateEvent = async (id, newInputText) => {
    try {
      const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "temporary-workspace-uuid";
    
      await putAPI(`/api/events/${id}?workspace_uuid=${workspace_uuid}`, { inputText: newInputText });
    
      const res = await getAPI(`/api/events?workspace_uuid=${workspace_uuid}`);
      const safeArray = Array.isArray(res.data) ? res.data : [];
      replaceModalInfo(safeArray);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  
  const deleteEvent = async (id) => {
    try {
      const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "temporary-workspace-uuid";
  
      await deleteAPI(`/api/events/${id}?workspace_uuid=${workspace_uuid}`);
  
      const res = await getAPI(`/api/events?workspace_uuid=${workspace_uuid}`);
      const safeArray = Array.isArray(res.data) ? res.data : [];
      replaceModalInfo(safeArray);
  
      setShowOffCanvas(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  

  return (
    <>
    <div
  className={`Border flex flex-col bg-[var(--sidebar-background-color)] color-[var(--text-color)] calendar_table_cell ${
    rowIdx === 0 ? "first_row" : "other_rows"
  } ${eventsForDay.length > 0 ? "event-added" : ""}`}
  ref={cellRef}
  onClick={handleDayClick}
>
  <header className="flex flex-col">
    {rowIdx === 0 && (
      <div className="text-sm text-center mt-1 border-b border-[var(--border-color)] pb-1 w-full relative z-30">
        {day.format("ddd").toUpperCase()}
      </div>
    )}

    {isCurrentMonth && (
      <p className={`relative z-30 text-sm my-1 text-right ${getCurrentDayClass()}`}>
        {day.format("DD")}

        {/* ✅ Display up to first two events */}
        {eventsForDay.slice(0, 2).map((range, index) => (
          <div
            key={index}
            onClick={handleEventClick(range)}
            className="h-[24px] w-[101%] flex justify-center items-center mt-[.3rem] rounded"
            style={{ background: range.labelBackgroundColor }}
          >
            {isCenterCell(range) && (
              <span className="text-white">{range.inputText}</span>
            )}
          </div>
        ))}

        {/* ✅ Show "+x more" if needed */}
        {eventsForDay.length > 2 && (
          <div
            onClick={handleShowAllEventsClick}
            className="text-sm text-blue-600 cursor-pointer hover:underline text-gray-600"
          >
            +{eventsForDay.length - 2} more
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
