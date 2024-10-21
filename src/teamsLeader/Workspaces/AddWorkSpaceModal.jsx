import React, { useState, useRef } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import {
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
  BsPencil,
  BsXCircle,
} from "react-icons/bs";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { sendRequest } from "../../assets/js/config";
import { getLocalStorageItem, useChatsContext } from "../../contexts/ChatsContext";

const AddWorkSpaceModal = ({ handleClose, show, addWorkspace }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceLogo, setWorkspaceLogo] = useState(null);
  const [privacyValue, setPrivacyValue] = useState("open");
  const {refreshData, setRefreshData} = useChatsContext()
  const fileInputRef = useRef();
  console.log({ workspaceLogo });
  const addNewWorkspaceHandler = async () => {
    // const newWorkspace = {
    //   _id: Math.random().toString(36).substr(2, 9), // Simulated unique ID
    //   logo: workspaceLogo, // The uploaded logo file URL or object
    //   name: workspaceName,
    //   privacy: privacyValue,
    //   logo: workspaceLogo, // Workspace logo URL
    // };
    const newWorkspace = {
      logo: workspaceLogo, // The uploaded logo file URL or object
      workspaceName,
    };
    try {
      const response = await sendRequest(
        "create-workspace",
        "POST",
        newWorkspace,
        getLocalStorageItem("auth-token")
      );
      setRefreshData(!refreshData);
      console.log({ response });
    } catch (err) {
      console.error({ error: err });
    }
    // addWorkspace(newWorkspace); // Call the function to add the new workspace
    handleClose(); // Close the modal
    // resetForm();
  };

  const handleLogoChange = async (event) => {
    // if (event.target.files && event.target.files[0]) {
    //   setWorkspaceLogo(URL.createObjectURL(event.target.files[0]));
    // }

    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("fileBase64[0]", file);

        const response = await fetch(
          "https://coursedashboard.mikegeerinck.com/teamleader/uploadfiles.php",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const logoUpload = await response.json();
          console.log("Upload successful:", logoUpload);
          setWorkspaceLogo(logoUpload[0]?.url);
        } else {
          console.error("Upload failed:", response);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleEditClick = () => {
    // Logic to handle edit
    fileInputRef.current.click();
  };

  const handleDeleteClick = () => {
    // Logic to handle deletion
    setWorkspaceLogo(null);
  };

  return (
    <Modal
      className="team_modal"
      show={show}
      onHide={handleClose}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center items-center">
          <div
            className="flex justify-center mb-3 text-center"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            {workspaceLogo ? (
              <img
                src={workspaceLogo}
                alt="Workspace Logo"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                  backgroundColor: "#FFCB00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsPencilSquare color="white" size={24} />
              </div>
            )}
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={handleLogoChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div>
            <Dropdown className="ms-2">
              <Dropdown.Toggle as="button" className="btn btn-light btn-sm">
                <IoEllipsisHorizontalSharp size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditClick}>
                  <div className="flex items-center">
                    <BsPencil className="me-2" /> Edit
                  </div>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteClick}>
                  <div className="flex items-center">
                    <BsTrash className="me-2" /> Delete
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Form.Group className="mb-3">
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
        </Form.Group>

        <Form.Group>
          <Form.Check
            inline
            label="Open"
            name="privacy"
            type="radio"
            checked={privacyValue === "open"}
            onChange={() => setPrivacyValue("open")}
          />
          <Form.Check
            inline
            label="Closed"
            name="privacy"
            type="radio"
            checked={privacyValue === "closed"}
            onChange={() => setPrivacyValue("closed")}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
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
          type="submit"
          className="p-2 px-3  workspace_addBtn border-0"
          style={{ backgroundColor: "#025231" }}
          onClick={addNewWorkspaceHandler}
        >
          Add workspace
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWorkSpaceModal;
