import React, { useEffect, useRef, useState } from "react";
import LabelSelectionModalCalendar from "./LabelSelectionModalCalendar";
import { Popover } from "antd";
import { v4 as uuidv4 } from "uuid";
import zIndex from "@mui/material/styles/zIndex";

const Status = ({ onStatusSelection }) => {
  const labelModalRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const hide = () => {
    setOpen(false);
  };

  const [bgColor, setBgColor] = useState("#c4c4c4");
  const [labelText, setLabelText] = useState("");
  const [priority, setPriority] = useState([
    { text: "Ready", backgroundColor: "#2B76E5", id: uuidv4() },
    { text: "In Progress", backgroundColor: "#FDAB3D", id: uuidv4() },
    { text: "Pending", backgroundColor: "#7F5347", id: uuidv4() },
    { text: "Done", backgroundColor: "#00c875", id: uuidv4() },
    { text: "Stuck", backgroundColor: "#e2445c", id: uuidv4() },
  ]);
  const handlePrioritySelection = (newPriority) => {
    const clickedPriority = priority.find(
      (label) => label.id === newPriority.id
    );
    console.log({ clickedPriority });
    if (clickedPriority) {
      setLabelText(clickedPriority.text);
      setBgColor(clickedPriority.backgroundColor);
      onStatusSelection({
        labelText: clickedPriority.text,
        bgColor: clickedPriority.backgroundColor,
      });
    }
    hide();
  };
  console.log("LabelGoing", { bgColor, labelText });
  return (
    <div>
      <Popover
        content={
          <LabelSelectionModalCalendar
            labels={priority}
            setLabels={setPriority}
            labelModalRef={labelModalRef}
            handleSelection={handlePrioritySelection}
          />
        }
        zIndex={9999}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div className="calendar_cell_wrapper_component">
          <div
            className={`calendar_component_cell cursor-pointer relative  text-center text-sm ${
              labelText === "" && "py-3"
            }`}
            style={{
              backgroundColor: bgColor || "#BCBDBE",
              position: "relative",
              color: "#fff",
            }}
          >
            {labelText}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Status;
