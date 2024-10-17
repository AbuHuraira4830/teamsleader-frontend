import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoPencil } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { SketchPicker } from "react-color";
import { Popover } from "antd";
// import { useStateContext } from "../../contexts/ContextProvider";

import { RxCross2 } from "react-icons/rx";

export default function LabelSelectionModalCalendar({
  handleSelection,
  labelModalRef,
  setLabels,
  labels,
}) {
  // const { labelModalVisible, setLabelModalVisible } = useStateContext();
  const colorPickerRef = useRef();
  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      closeColorPicker();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [editing, setEditing] = useState(false);
  const [editedLabels, setEditedLabels] = useState([...labels]);
  // console.log({ testLable: editedLabels });
  const [selectedColorPicker, setSelectedColorPicker] = useState(null);
  const handleLabelChange = (id, value) => {
    const updatedLabels = [...editedLabels];
    const index = updatedLabels.findIndex((label) => label.id === id);
    updatedLabels[index].text = value;
    setEditedLabels(updatedLabels);
  };
  const handleColorChange = (id, color) => {
    const updatedLabels = [...editedLabels];
    const index = updatedLabels.findIndex((label) => label.id === id);
    updatedLabels[index].backgroundColor = color.hex;
    setEditedLabels(updatedLabels);
  };
  const handleNewLabel = () => {
    // Adding a new label with an empty id
    const newLabel = { id: uuidv4(), text: "", backgroundColor: "#BCBDBE" };
    setEditedLabels([...editedLabels, newLabel]);
  };
  const applyChanges = () => {
    setLabels([...editedLabels]);
    setEditing(false);
  };
  const openColorPicker = (id) => {
    setSelectedColorPicker(id);
  };
  const closeColorPicker = () => {
    setSelectedColorPicker(null);
  };

  return (
    <div className="labelSelection_modal p-4 pb-2" ref={labelModalRef}>
      <div className="text-center">
        {editing
          ? editedLabels.map((label) => (
              <div
                className="d-flex align-items-center mb-2 ps-"
                key={label.id}
              >
                <Popover
                  content={
                    <div ref={colorPickerRef} className="colorPicker">
                      <SketchPicker
                        color={label.backgroundColor}
                        onChange={(color) => {
                          handleColorChange(label.id, color);
                          // closeColorPicker();
                        }}
                      />
                    </div>
                  }
                  trigger="click"
                  open={selectedColorPicker === label.id}
                >
                  <span
                    className=" ms-1 rounded-1 fs_14 position-absolute cursor_pointer color_Picker"
                    style={{
                      backgroundColor: label.backgroundColor,
                      color: "white",
                      height: "25px",
                      width: "25px",
                    }}
                    onClick={() => openColorPicker(label.id)}
                  >
                    ab
                  </span>
                </Popover>
                <Form.Control
                  key={label.id}
                  value={label.text}
                  placeholder="Add new"
                  style={{ paddingLeft: "38px" }}
                  onChange={(e) => handleLabelChange(label.id, e.target.value)}
                  className="rounded-1 py-1 shadow-none workspace_searchInput fs_14  transparent_bg h-100 w-100"
                  type="text"
                />
                <button
                  className="px-0 py-0  file_deleteBtn d-flex ms-1"
                  onClick={() =>
                    setEditedLabels(
                      editedLabels.filter((l) => l.id !== label.id)
                    )
                  }
                >
                  <RxCross2
                    className=""
                    style={{
                      width: "14px",
                      height: "auto",
                    }}
                  />
                </button>
              </div>
            ))
          : labels.map((label) => {
              // {
              //   console.log({ label: label.backgroundColor });
              // }
              return (
                <div
                  key={label.id}
                  className="fs_14 text-white mb-2 py-1  cursor_pointer"
                  style={{
                    height: "33px",
                    backgroundColor: label.backgroundColor,
                  }}
                  onClick={() => handleSelection(label)}
                >
                  {label.text}
                </div>
              );
            })}
        {editing && (
          <Button
            className="workspace-dropdown-button workspace-dropdownBtn align-self-center border py-1 w-100 px-2 "
            onClick={handleNewLabel}
          >
            + New label
          </Button>
        )}
      </div>
      <hr className="my-2" />
      {editing ? (
        <Button
          className="workspace-dropdown-button workspace-dropdownBtn align-self-center py-1 w-100 px-2 "
          onClick={applyChanges}
        >
          Apply
        </Button>
      ) : (
        <Button
          className="workspace-dropdown-button workspace-dropdownBtn align-self-center py-1 w-100 px-2"
          onClick={() => setEditing(true)}
          style={{ display: "flex", alignItems: "center" }}
        >
          <GoPencil className="me-2" />
          Edit Labels
        </Button>
      )}
    </div>
  );
}
