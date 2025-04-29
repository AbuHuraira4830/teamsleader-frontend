import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoPencil } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { SketchPicker } from "react-color";
import { Popover } from "antd";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { RxCross2 } from "react-icons/rx";
import { getAPI, postAPI } from "../../../../helpers/apis";
import "../../../../assets/css/labelmodel.css";
export default function LabelSelectionModal({
  handleSelection,
  labelModalRef,
  setLabels,
  labels,
  taskId,
}) {
  const { labelModalVisible, setLabelModalVisible, taskMode } =
    useStateContext();

  const [editing, setEditing] = useState(false);
  const [editedLabels, setEditedLabels] = useState(labels);
  // const [selectedColorPicker, setSelectedColorPicker] = useState(null);
  const [openPopovers, setOpenPopovers] = useState({});


  const handleLabelChange = (id, value) => {
    const updatedLabels = editedLabels.map((label) =>
      label._id === id ? { ...label, text: value } : label
    );
    setEditedLabels(updatedLabels);
  };

  const handleColorChange = (id, color) => {
    const updatedLabels = editedLabels.map((label) =>
      label._id === id ? { ...label, color: color.hex } : label
    );
    setEditedLabels(updatedLabels);
    setOpenPopovers({ ...openPopovers, [id]: false });
    // console.log(editedLabels);
  };

  const handleNewLabel = () => {
    const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "id will be here";
    if (!workspace_uuid) {
      console.error("Cannot create event without workspace UUID.");
      return;
    }
    const updatedLabels = editedLabels.map((label) => {
      if (!label.workspace_uuid) {
        return { ...label, workspace_uuid };
      }
      return label;
    })
    const data = {workspace_uuid, text: "", color: "#BCBDBE" ,};
    setEditedLabels([...updatedLabels, data]);
  };

  const applyChanges = () => {
    console.log(editedLabels);
    postAPI(`/api/task-${taskMode}/store`, { statuses: editedLabels })
      .then((response) => {
        if (response.status === 200) {
          setLabels(response.data?.statuses);
          setEditedLabels(response.data?.statuses);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setEditing(false);
  };

  // const openColorPicker = (id) => {
  //   setSelectedColorPicker(id);
  // };

  const deleteStatus = (id, index) => {
    // If the label has an ID, it's an existing label
    if (id) {
      getAPI(`/api/task-${taskMode}/delete/${id}`)
        .then((response) => {
          console.log(response.data);
          setEditedLabels(response.data?.statuses);
          setLabels(response.data?.statuses);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If the label doesn't have an ID, it's a new label
      const updatedLabels = [...editedLabels];
      updatedLabels.splice(index, 1);
      setEditedLabels(updatedLabels);
    }
  };

  // console.log;
  // console.log(editedLabels);
  return (
    <div className="labelSelection_modal p-4 pb-2">
      <div className="text-center">
        {editing
          ? editedLabels?.map((label, index) => (
              <div className="flex align-items-center mb-2 ps-" key={label._id}>
                <Popover
                  content={
                    <div className="colorPicker">
                      <SketchPicker
                        color={label.color}
                        onChange={(color) => {
                          handleColorChange(label._id, color);
                          // closeColorPicker();
                        }}
                      />
                    </div>
                  }
                  id="colorPicker"
                  zIndexPopup={9999}
                  trigger="click"
                  open={openPopovers[label._id] || false}
                  onOpenChange={(open) => {
                    setOpenPopovers({ ...openPopovers, [label._id]: open });
                  }}
                >
                  <span
                    className=" ms-1 rounded-1 fs_14 position-absolute cursor_pointer color_Picker"
                    style={{
                      backgroundColor: label.color,
                      color: "white",
                      height: "25px",
                      width: "25px",
                    }}
                    // onClick={() => openColorPicker(label._id)}
                  >
                    ab
                  </span>
                </Popover>

                <Form.Control
                  key={label.id}
                  value={label.text}
                  placeholder="Add new"
                  style={{ paddingLeft: "38px" }}
                  onChange={(e) => handleLabelChange(label._id, e.target.value)}
                  className="rounded-1 py-1 shadow-none workspace_searchInput fs_14  transparent_bg h-100 w-100"
                  type="text"
                />
                <button
                  className="px-0 py-0  file_deleteBtn flex ms-1"
                  onClick={() => deleteStatus(label?._id, index)}
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
          : labels?.map((label) => {
              // {
              //   console.log({ label: label.backgroundColor });
              // }
              return (
                <div
                  key={label._id}
                  className="fs_14 text-white mb-2 py-1  cursor_pointer"
                  style={{
                    height: "33px",
                    backgroundColor: label.color,
                  }}
                  onClick={() => handleSelection(label._id, taskId, label)}
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
          className="workspace-dropdown-button workspace-dropdownBtn centerIt justify-content-center py-1 w-100 px-2"
          onClick={() => setEditing(true)}
        >
          <GoPencil className="me-2" />
          Edit Labels
        </Button>
      )}
    </div>
  );
}
