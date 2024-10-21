import React, { useState } from "react";
import { Modal, Input, Button, Select, Upload } from "antd";
import { TeamOutlined, UploadOutlined } from "@ant-design/icons";
import { Button as BootstrapButton } from "react-bootstrap";
import leaf from "../../assets/images/leaf_pass.png";
const { Option } = Select;

const CreateTeamModal = ({ visible, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamImage, setTeamImage] = useState(false); // State for the uploaded image

  const uploadButton = (
    <div>
      {teamImage ? (
        <img src={teamImage} alt="avatar" style={{ width: "100%" }} />
      ) : (
        <UploadOutlined />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // Dummy data for team members
  const members = [
    { id: "usman", name: "Usman Haider", email: "usmanhaider3610@gmail.com" },
    { id: "ayesha", name: "Ayesha Ahmed", email: "ayesha.ahmed@example.com" },
    { id: "john", name: "John Doe", email: "john.doe@example.com" },
    { id: "jane", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "mike", name: "Mike Johnson", email: "mike.johnson@example.com" },
    { id: "john", name: "John Doe", email: "john.doe@example.com" },
    { id: "jane", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "mike", name: "Mike Johnson", email: "mike.johnson@example.com" },
    { id: "john", name: "John Doe", email: "john.doe@example.com" },
    { id: "jane", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "mike", name: "Mike Johnson", email: "mike.johnson@example.com" },
    { id: "john", name: "John Doe", email: "john.doe@example.com" },
    { id: "jane", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "mike", name: "Mike Johnson", email: "mike.johnson@example.com" },
    { id: "john", name: "John Doe", email: "john.doe@example.com" },
    { id: "jane", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "mike", name: "Mike Johnson", email: "mike.johnson@example.com" },

    // Add more members as needed
  ];

  const handleMemberChange = (selected) => {
    setTeamMembers(selected);
  };
  const handleImageChange = () => {
    setTimeout(() => {
      setTeamImage(true);
    }, 1000); // Set timeout to 1000 milliseconds (1 second)
  };

  const modalTitle = (
    <div className="mb-4 flex items-center">
      {teamImage ? (
        <img
          src={leaf}
          alt="team"
          style={{
            width: "36px",
            height: "36px",
            marginRight: "8px",
          }}
        />
      ) : (
        <TeamOutlined style={{ fontSize: "26px", marginRight: "8px" }} />
      )}
      <span className="text-base"> Create new team</span>
    </div>
  );

  return (
    <Modal
      title={modalTitle}
      open={visible}
      onCancel={onClose}
      footer={[
        <div className="flex justify-content-end mb-4">
          <BootstrapButton
            className="workspace-dropdown-button fw-normal rounded-1 py-1 me-3 px-3 "
            style={{
              height: "34px",
            }}
            onClick={onClose}
          >
            Cancel
          </BootstrapButton>
          <BootstrapButton
            type="submit"
            className="py-1 px-3  workspace_addBtn rounded-1 border-0"
            style={{ height: "34px" }}
            // onClick={handleSavePassword}
            // disabled={!isSaveButtonEnabled}
          >
            Save
          </BootstrapButton>
        </div>,
      ]}
    >
      <div className="mb-4">
        <div>Team name</div>
        <Input
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="custom-input"
        />
      </div>
      <div className="mb-4">
        <div>Team members</div>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select team members"
          value={teamMembers}
          onChange={handleMemberChange}
          className="custom-select"
        >
          {members.map((member) => (
            <Option key={member.id} value={member.email}>
              {member.name}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Upload onClick={handleImageChange}>
          <Button icon={<UploadOutlined />} className="custome_uploadBtn">
            Upload team profile picture
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
