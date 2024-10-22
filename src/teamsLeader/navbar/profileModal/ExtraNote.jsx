import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { createPortal } from "react-dom";
import { postAPI } from "../../../helpers/apis";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Popover } from "antd";

const ExtraNote = ({ extraNotes, setExtraNotes, item }) => {
  const { setHolidayRequestsData } = useStateContext();

  const [open, setOpen] = useState(null);
  const handleOpenChange = (id) => {
    setOpen(open === id ? null : id);
  };

  const handleExtraNoteChange = (id, value) => {
    setExtraNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  const handleSubmit = (id, emailAddress) => {
    postAPI("/api/update-holiday-request", {
      id,
      emailAddress,
      extraNote: extraNotes[id],
    })
      .then((res) => {
        setOpen(null);
        setHolidayRequestsData(res.data.holidayRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popover
      content={
        <div className="p-3 ">
          <p className="font-bold text-[16px] mb-1">Extra Note</p>
          <Form.Control
            className="workspace_searchInput py-1 Border shadow-none rounded-1"
            style={{
              width: "400px",
              color: "var(--text-color) !important",
              backgroundColor: "transparent",
              resize: "none",
            }}
            as="textarea"
            rows={10}
            value={
              extraNotes[item._id] !== undefined
                ? extraNotes[item._id]
                : item.extraNote || ""
            }
            onChange={(e) => handleExtraNoteChange(item._id, e.target.value)}
            // onClick={(e) => e.preventDefault()}
          />

          <div className="flex justify-end mt-2">
            <Button
              className="workspace_addBtn py-1 border-0 rounded w-full text-sm w-auto px-2 "
              onClick={() => handleSubmit(item._id, item.emailAddress)}
            >
              Save
            </Button>
          </div>
        </div>
      }
      placement="topRight"
      trigger="click"
      open={open === item._id}
      onOpenChange={() => handleOpenChange(item._id)}
    >
      <div
        className="centerIt justify-content-center Border rounded-1 cursor_pointer px-1"
        style={{ height: "30px" }}
      >
        {item.extraNote.length > 8
          ? item.extraNote.slice(0, 8) + "..."
          : item.extraNote}
      </div>
    </Popover>
  );
};

export default ExtraNote;
