import React, { useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const OffCanvasEvent = ({ event, show, onClose, updateEvent, deleteEvent }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState(event.inputText);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBlur = () => {
    if (inputValue.trim() !== event.inputText.trim()) {
      updateEvent(event._id, inputValue);
    }
  };

  const handleDelete = () => {
    deleteEvent(event._id);
    setShowDropdown(false);
  };

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas"
    >
      <Offcanvas.Header>
        <button className="custom_closeCanvasBtn" onClick={onClose}>
          <IoMdClose className="text-2xl" />
        </button>
      </Offcanvas.Header>

      <Offcanvas.Body className="custom-scrollbar">
        {/* Editable Event Title */}
        <div className="flex justify-between items-center mb-2">
          <input
            ref={inputRef}
            type="text"
            className="editable-input border px-3 py-2 rounded text-lg font-medium w-full max-w-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            placeholder="Event name"
          />

          <div className="relative flex items-center ml-3">
            <RxAvatar className="fs-5" />
            <div className="mx-2 border-r border-gray-300 h-6" />
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <BsThreeDots className="text-gray-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-5 mt-2 py-2 w-48 bg-white rounded-md text-[#323338] z-50 calendar_shadow">
                <a
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  <BsTrash className="text-gray-400 mr-2" />
                  Delete
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Static Info Sections */}
        <div className="px-4 py-2">
          <div className="mb-4 rounded-lg overflow-hidden">
            <div className="p-4" style={{ backgroundColor: event.labelBackgroundColor }}>
              <h6 className="font-semibold text-white">
                Status: {event.labelText}
              </h6>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h6 className="font-semibold text-gray-700">Event Description</h6>
              <p className="text-sm text-gray-600 mt-1">
                The development phase is critical, with a focus on feature
                completion and testing. Ensure to review the documentation.
              </p>
            </div>
            <div className="p-4 border-b border-gray-200">
              <h6 className="font-semibold text-gray-700">Assigned To</h6>
              <p className="text-sm text-gray-600 mt-1">
                Alex Johnson - Lead Developer
              </p>
            </div>
            <div className="p-4">
              <h6 className="font-semibold text-gray-700">Time Frame</h6>
              <p className="text-sm text-gray-600 mt-1">
                Start: {new Date(event.startDate).toLocaleDateString()}
                <br />
                End: {new Date(event.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-white bg-[#00854d] workspace_addBtn font-medium rounded-lg text-sm px-5 py-2.5 transition"
          >
            Close
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasEvent;
