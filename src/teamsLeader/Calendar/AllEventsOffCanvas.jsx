import React, { useEffect, useRef, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import { RxAvatar } from "react-icons/rx";

const AllEventsOffCanvas = ({ events, show, onClose, onEventSelect }) => {
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas "
    >
      <Offcanvas.Header>
        {/* <div className="flex flex-end">
          <IoMdClose />
        </div> */}
        <button className="custom_closeCanvasBtn " onClick={onClose}>
          <IoMdClose className="text-2xl " />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="mt-1 me-2">All Events</h5>

          <div className="relative flex items-center">
            <RxAvatar className="fs-5" />
            <div className="mx-2 border-r border-gray-300 h-6"></div>
            <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300">
              <BsThreeDots className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className=" main_tableBtnDiv mb-4"></div>
        {/* Cards container */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="block p-4 rounded-lg shadow transition ease-in-out duration-200 hover:bg-opacity-90 cursor-pointer transform hover:scale-105"
              style={{
                background: `linear-gradient(145deg, ${event.labelBackgroundColor}, ${event.labelBackgroundColor}cc)`, // cc for slight transparency
              }}
              onClick={() => {
                onEventSelect(event)(); // Call handleEventClick with eventData, then call the returned function with event object
              }}
            >
              <h6
                className="font-semibold text-white"
                style={{ textShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)" }}
              >
                {event.inputText}
              </h6>
              {/* Add more event details here */}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-white bg-[#00854d]  workspace_addBtn   focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AllEventsOffCanvas;
