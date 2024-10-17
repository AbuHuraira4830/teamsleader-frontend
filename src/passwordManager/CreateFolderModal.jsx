import React, { useState } from "react";
import { Button, Modal, Form, Accordion, Table } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import Folders from "./Folders";

const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState("");
  const [isDropdownEdit, setIsDropdownEdit] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState("Full Access");

  const handleCreateFolderModalClose = () => {
    setShowCreateFolderModal(false);
  };

  const handleDropdownEdit = () => {
    setIsDropdownEdit(!isDropdownEdit);
  };

  const handleAccessChange = (e) => {
    setSelectedAccess(e.target.value);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleCreateFolder = () => {
    // Logic to create folder or pass data to Folders component
    setShowCreateFolderModal(false);
  };

  return (
    <Modal onHide={handleCreateFolderModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Input field for folder name */}
        <Form.Group className="mb-3" controlId="folderName">
          <Form.Label>Folder Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter folder name"
            value={folderName}
            onChange={handleFolderNameChange}
          />
        </Form.Group>

        {/* Collapsible section */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="flex align-items-center">
                <span className="mr-2">User permissions for new folder</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {/* Table with 2 columns: Email and Access */}
              <Table striped bordered hover>
                {/* ... (same as before) */}
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="flex justify-content-center align-items-center mt-3">
          <Button
            type="button"
            className="px-2 py-1 workspace_addBtn border-0 rounded-1 rounded-end-1"
            style={{ backgroundColor: "#025231", fontSize: "1rem" }}
            disabled={!folderName.trim()} // Disable if folderName is empty or contains only whitespaces
            onClick={handleCreateFolder}
          >
            <div className="flex justify-content-center align-items-center">
              Create Folder
            </div>
          </Button>
        </div>
      </Modal.Body>

      {/* Pass folderName and selectedAccess to Folders component */}
      <Folders folderName={folderName} selectedAccess={selectedAccess} />
    </Modal>
  );
};

export default CreateFolderModal;
