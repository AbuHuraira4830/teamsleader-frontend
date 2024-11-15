import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ShowOffCanvasEvent = ({
  show,
  handleClose,
  eventsToShow,
  updateEvent,
  deleteEvent,
  offCanvasOpenRef,
}) => {
  const [editingEventId, setEditingEventId] = useState(null);
  const [editInputText, setEditInputText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [moreButtonClicked, setMoreButtonClicked] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const handleEdit = (event) => {
    console.log("editeventid", event._id);
    offCanvasOpenRef.current = true;

    setEditingEventId(event._id); // Set the event being edited
    setEditInputText(event.inputText); // Set initial edit text
    setEditDescription(event.description); // Set initial edit description
  };

  const handleSaveEdit = (id) => {
    offCanvasOpenRef.current = true;

    updateEvent(id, editInputText, editDescription);
    setEditingEventId(null); // Reset editing event id
  };
  const handleCancelEdit = () => {
    offCanvasOpenRef.current = true;
    setEditingEventId(null);
  };
  const handleEditDescription = (e) => {
    setIsSaveButtonEnabled(true);

    setEditDescription(e.target.value);
  };
  const handleEditText = (e) => {
    setIsSaveButtonEnabled(true);
    setEditInputText(e.target.value);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas" // Adjust width to 50% of the viewport
    >
      <Offcanvas.Header
        closeButton
        className="flex justify-between items-center p-4 border-b"
      >
        <h5 className="text-xl font-semibold mb-0">Events</h5>{" "}
        {/* Header text */}
      </Offcanvas.Header>

      <div className="px-4 py-2">
        <Offcanvas.Body className="space-y-4 overflow-auto">
          <div className="space-y-3">
            {eventsToShow.map((event, index) => (
              <div
                key={index}
                className="bg-white p-4 group rounded-lg shadow relative "
              >
                {console.log("eventId", event._id)}

                {editingEventId === event._id ? (
                  <div>
                    {/* Editable fields */}
                    <input
                      type="text"
                      value={editInputText}
                      //   onChange={(e) => setEditInputText(e.target.value)}
                      onChange={() => handleEditText}
                      className="text-lg font-semibold w-full"
                    />
                    <textarea
                      value={editDescription}
                      //   onChange={(e) => setEditDescription(e.target.value)}
                      onChange={() => handleEditDescription}
                      className="text-gray-600 w-full"
                    />
                    {/* <button onClick={() => handleSaveEdit(event.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button> */}

                    <div className="flex justify-content-end mt-1">
                      <Button
                        className="workspace-dropdown-button  fw-normal rounded-1 py-1 me-3 px-2 "
                        style={{
                          height: "34px",
                          fontSize: ".8rem",
                        }}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="py-1 px-[0.6rem]  workspace_addBtn rounded-1 border-0"
                        style={{ height: "34px", fontSize: ".8rem" }}
                        onClick={() => handleSaveEdit(event.id)}
                        disabled={!isSaveButtonEnabled}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Display fields */}
                    <div className="flex justify-between items-center relative">
                      <h5 className="text-lg font-semibold mb-2">
                        {event.inputText}
                      </h5>
                      {/* Icons */}
                      <div className="absolute top-2 right-2 flex custom_opac0  group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <MdEdit
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleEdit(event)}
                        />
                        <MdDelete
                          className="text-gray-500 hover:text-rose-700	 cursor-pointer ml-2"
                          onClick={() => deleteEvent(event._id)}
                        />
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default ShowOffCanvasEvent;
