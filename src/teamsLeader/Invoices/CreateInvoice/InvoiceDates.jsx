import React, { useState, useRef, useEffect } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { useStateContext } from "../../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceDates = () => {
  const { selectedColorInvoice, issuedDate, setIssuedDate, dueDate, setDueDate} = useStateContext();

  // const [issuedDate, setIssuedDate] = useState(new Date());
  // const [dueDate, setDueDate] = useState(new Date());

  const issuedCalendarRef = useRef();
  const dueDateCalendarRef = useRef();
  const [isIssuedOpen, setIsIssuedOpen] = useState(false);
  const [issuedCalendarPosition, setIssuedCalendarPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDueOpen, setIsDueOpen] = useState(false);
  const [dueCalendarPosition, setDueCalendarPosition] = useState({
    x: 0,
    y: 0,
  });
  const openDatePicker = (ref, type) => {
    if (ref.current) {
      const { left, top, height } = ref.current.getBoundingClientRect();
      let newPosition = {
        x: left,
        y: top + window.scrollY + height,
      };

      if (type === "issued") {
        setIssuedCalendarPosition(newPosition);
        setIsIssuedOpen(true);
        setIsDueOpen(false);
      } else if (type === "due") {
        setDueCalendarPosition(newPosition);
        setIsDueOpen(true);
        setIsIssuedOpen(false);
      }
    }
  };
  const handleDateChange = (newDate) => {
    setIssuedDate(newDate); // Update the date state
  };
  const handleDateChangeDue = (newDate) => {
    setDueDate(newDate); // Update the date state
  };
  // When calling the function

  return (
    <>
      <div className="flex justify-end invoice_customCalendar">
        <div className="text-black text-opacity-60 block whitespace-nowrap  text-sm uppercase text-right group-hover:hidden">
          <div className="flex flex-col items-end py-1 border-b border-transparent gap-2 leading-tight">
            <span className="">Issued</span>
            <span
              className="font-semibold"
              style={{ color: selectedColorInvoice }}
            >
 {issuedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}            </span>
          </div>
          <div className="flex flex-col items-end py-1 border-b border-transparent gap-2 leading-tight">
            <span className="first-letter:capitalize">due date</span>
            <span
              className="font-semibold"
              style={{ color: selectedColorInvoice }}
            >
                   {dueDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
            </span>
          </div>
        </div>
        <div className="text-black text-opacity-60  hidden   whitespace-nowrap  text-sm uppercase text-right group-hover:block ">
          <div className="flex flex-col items-end py-1 border-b  border-transparent gap-2 leading-tight">
            <span className="">Issued </span>
            <div
              className="flex items-center justify-between border-gray-300 
              border-transparent border-b border-dashed text-sm
                            
            "
            >
              <span
                className="font-semibold"
                style={{ color: selectedColorInvoice }}
              >
                {issuedDate
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g, " ")}{" "}
                {/* Example: "28 Feb 2024" */}
              </span>

              <div
                ref={issuedCalendarRef}
                onClick={() => openDatePicker(issuedCalendarRef, "issued")}
              >
                <FaRegCalendar
                  className="text-[12px] ml-2 mb-[0.1rem] cursor-pointer"
                  style={{ color: selectedColorInvoice }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end py-1 border-b border-transparent gap-2 leading-tight">
            <span className="first-letter:capitalize">due date</span>
            <div
              className="flex items-center justify-between border-gray-300 
              border-transparent border-b border-dashed text-sm
                            
            "
            >
              <span
                className="font-semibold"
                style={{ color: selectedColorInvoice }}
              >
                {dueDate
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g, " ")}{" "}
                {/* Example: "28 Feb 2024" */}
              </span>

              <div
                ref={dueDateCalendarRef}
                onClick={() => openDatePicker(dueDateCalendarRef, "due")}
              >
                <FaRegCalendar
                  className="text-[12px] ml-2 mb-[0.1rem] cursor-pointer"
                  style={{ color: selectedColorInvoice }}
                />
              </div>
            </div>
          </div>
        </div>
        {isIssuedOpen && (
          <div className="issuedCalendarInvoice">
            <DatePicker
              selected={issuedDate}
              onChange={handleDateChange}
              open={isIssuedOpen}
              onClickOutside={() => setIsIssuedOpen(false)}
            />
          </div>
        )}
        {isDueOpen && (
          <div className="dueCalendarInvoice">
            <DatePicker
              selected={dueDate}
              onChange={handleDateChangeDue}
              open={isDueOpen}
              onClickOutside={() => setIsDueOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceDates;
