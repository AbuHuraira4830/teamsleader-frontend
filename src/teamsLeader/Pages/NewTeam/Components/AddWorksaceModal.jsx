import { Popover } from "antd";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ChromePicker } from "react-color";
import { postAPI } from "../../../../helpers/apis";
import { CircularProgress } from "@mui/material";

const AddWorkspaceModal = ({ handleClose, show, setWorkspaces }) => {
  const [color, setColor] = useState("#FFCB00");
  const [workspaceName, setWorkspaceName] = useState("");
  const [privacyValue, setPrivacyValue] = useState("open");
  const [open, setOpen] = useState(false);
  const submitButton = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const addNewWorkspaceHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    submitButton.current.disabled = true;
    const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "id will be here";
    if (!workspace_uuid) {
      console.error("Cannot create event without workspace UUID.");
      return;
    }

    let data = {
      workspace_uuid,
      color,
      name: workspaceName,
      privacy: privacyValue,
    };

    postAPI("/api/workspace/store", data) 
      .then((response) => {
        setIsLoading(false);
        setWorkspaces(response.data.workspaces);

        handleClose();
        setWorkspaceName("");
        setPrivacyValue("open");
        setColor("#FFCB00");
        submitButton.current.disabled = false;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Modal
        className="team_modal"
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <form onSubmit={addNewWorkspaceHandler}>
          <Modal.Header closeButton className="border-0 px-0 pb-0">
            <h2>Add new workspace</h2>
          </Modal.Header>
          <Modal.Body className="px-0 ">
            <div className="">
              <Popover
                content={
                  <ChromePicker
                    color={color}
                    onChange={(color) => {
                      setColor(color.hex), handleOpenChange();
                    }}
                  />
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div
                  className="fs-1 fw-bold text-white mx-auto centerIt justify-content-center cursor_pointer"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: color,
                    borderRadius: "24px",
                  }}
                >
                  N
                </div>
              </Popover>
            </div>

            <span>
              <p className="fs_14 p-0 mb-2">Workspace name</p>

              <Form.Control
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Choose a name for your workspace"
                className=" py-2  mb-3 shadow-none workspace_searchInput transparent_bg"
                required={true}
              />
            </span>
            {/* <div className="">
              <p className="fs_14 p-0">Privacy</p>

              <div className="mt-2 pb-4   d-flex ">
                <Form.Check
                  className=".fs_15"
                  inline
                  type="radio"
                  label="Open"
                  name="privacy"
                  defaultChecked
                  onChange={() => setPrivacyValue("open")}
                />
                <div className="centerIt">
                  <Form.Check
                    type="radio"
                    aria-label="radio 2"
                    className="me-0 .fs_15"
                    label="Closed"
                    name="privacy"
                    onChange={() => setPrivacyValue("closed")}
                  />
                </div>
              </div>
            </div> */}
          </Modal.Body>
          <Modal.Footer className="border-0 border-0">
            <Button
              className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
              style={{
                height: "40px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              ref={submitButton}
              type="submit"
              disabled={isLoading}
              className="p-2 px-3  workspace_addBtn border-0"
              style={{ backgroundColor: "#025231", width: "148px" }}
            >
              {isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                <>Add workspace</>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddWorkspaceModal;
