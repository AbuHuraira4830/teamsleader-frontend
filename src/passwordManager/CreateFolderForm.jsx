import React, { useState } from "react";
import { Modal, Form, Accordion, Table, Button } from "react-bootstrap";
import { TiFolderOpen } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

const CreateFolderForm = ({
  isFolderCreated,
  setIsFolderCreated,
  setFolders,
}) => {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [isDropdownEdit, setIsDropdownEdit] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState("Full Access");
  const [folderName, setFolderName] = useState("");

  const handleCreateFolderModalClose = () => {
    setShowCreateFolderModal(false);
  };

  const handleCreateFolderModalOpen = () => {
    setFolderName("");
    setShowCreateFolderModal(true);
  };

  const handleCreateFolderModal = () => {
    if (folderName.trim() && selectedAccess.trim()) {
      setFolders((prevFolders) => [
        ...prevFolders,
        { name: folderName, access: selectedAccess },
      ]);
      setIsFolderCreated(true);
    }
    setShowCreateFolderModal(false);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleDropdownEdit = () => {
    setIsDropdownEdit(!isDropdownEdit);
  };

  const handleAccessChange = (e) => {
    setSelectedAccess(e.target.value);
  };

  return (
    <Modal
      show={showCreateFolderModal}
      onHide={handleCreateFolderModalClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="folderName">
          <Form.Label>Folder Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter folder name"
            value={folderName}
            onChange={handleFolderNameChange}
          />
        </Form.Group>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="flex align-items-center">
                <span className="mr-2">User permissions for new folder</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Access</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>sample@example.com</td>
                    <td>
                      <div className="flex justify-content-center align-items-center position-relative">
                        {isDropdownEdit ? (
                          <div className="flex align-items-center">
                            <Form.Select
                              style={{
                                fontSize: "14px",
                                width: "150px",
                                cursor: "pointer",
                              }}
                              value={selectedAccess}
                              onChange={handleAccessChange}
                            >
                              <option>Full Access</option>
                              <option>No Access</option>
                              <option>Folder Listing</option>
                              <option>Read Only</option>
                              <option>Read and Edit</option>
                            </Form.Select>
                          </div>
                        ) : (
                          <div className="flex justify-content-around align-items-center">
                            <p
                              style={{
                                textAlign: "center",
                                marginBottom: 0,
                              }}
                            >
                              {selectedAccess}
                            </p>
                          </div>
                        )}
                        <div className="edit_icon_access">
                          <FiEdit
                            className="fs_1 "
                            onClick={handleDropdownEdit}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="flex justify-content-center align-items-center mt-3">
          <Button
            type="button"
            className="px-2 py-1 workspace_addBtn border-0 rounded-1 rounded-end-1"
            style={{ backgroundColor: "#025231", fontSize: "1rem" }}
            disabled={!folderName.trim()}
            onClick={handleCreateFolderModal}
          >
            <div className="flex justify-content-center align-items-center">
              Create Folder
            </div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateFolderForm;
