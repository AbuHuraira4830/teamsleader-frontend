import { Table, Button, Modal, Dropdown, Menu, Checkbox } from "antd";
import React, { useState } from "react";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useStateContext } from "../../contexts/UsersContext"; // Adjust the import path as needed
import axios from "axios";

const ClientListItem = () => {
  const { clients, setClients } = useStateContext(); // Assuming you have setClients in your context
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      (client.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.teamName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (key) => {
    try {
      const teamId = filteredClients.find(
        (client) => client.email === key
      ).teamId;

      // Make an API call to remove the client role from the user in the database
      const response = await axios.post("/api/remove-client-role", {
        email: key,
        teamId: teamId,
      });

      if (response.data.success) {
        // Remove the client from the state
        setClients((prev) => prev.filter((client) => client.email !== key));
        setSelectedRowKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      } else {
        console.error("Failed to remove client:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing client:", error);
    } finally {
      setIsModalVisible(false); // Close the modal after deletion
    }
  };

  const handleBulkDelete = async () => {
    for (const key of selectedRowKeys) {
      await handleDelete(key);
    }
    setSelectedRowKeys([]); // Clear the selection after deletion
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDeleteConfirm = (key) => {
    setCurrentKey(key);
    setIsModalVisible(true);
  };

  const menu = (record) => (
    <Menu className="w-[7rem]">
      <Menu.Item
        key="1"
        onClick={() => showDeleteConfirm(record.email)}
        icon={<FaTrash />}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.email)}
          onChange={() => {
            const isSelected = selectedRowKeys.includes(record.email);
            const newSelectedRowKeys = isSelected
              ? selectedRowKeys.filter((k) => k !== record.email)
              : [...selectedRowKeys, record.email];
            setSelectedRowKeys(newSelectedRowKeys);
          }}
          className="ant-checkbox"
        />
      ),
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="table-row-content flex justify-center items-center">
          {text}
          <Dropdown
            overlay={menu(record)}
            trigger={["click"]}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            overlayStyle={{ zIndex: 1050 }}
            className="action-dropdown action-dropdown-clientItem hover:bg-[#6768791a] rounded-md px-2 py-0"
          >
            <FaEllipsisH
              style={{ cursor: "pointer" }}
              className="text-[#6c757d] text-[1.7rem] hover:text-[#000]"
            />
          </Dropdown>
        </div>
      ),
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      align: "center",
    },
  ];

  return (
    <div className="w-full p-8">
      <div className="admin_searchInput flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Search clients by name, email, or team name"
          className="searchInput py-[0.4rem] px-2.5 flex-grow border-none"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ outline: "none" }}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] mx-2" />
      </div>
      <div className="d-flex justify-between pb-4">
        <div className="flex">
          <span className="title_border me-2"></span>
          <p className="mb-0" style={{ fontSize: "18px", fontWeight: 600 }}>
            List of clients
          </p>
        </div>
        <Button
          type="primary"
          danger
          onClick={() => showDeleteConfirm(selectedRowKeys[0])}
          disabled={selectedRowKeys.length === 0}
          icon={<FaTrash />}
        >
          Delete
        </Button>
      </div>
      <Table
        dataSource={filteredClients}
        columns={columns}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          hideSelectAll: true, // Hide the "Select All" checkbox
          renderCell: () => null, // Disable default checkbox rendering
        }}
        rowClassName="hover-row" // Add this class to each row
      />

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={currentKey ? () => handleDelete(currentKey) : handleBulkDelete}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
        zIndex={1060}
      >
        <p>
          Any user you remove from your company will have their access revoked
          and this action is irreversible.
        </p>
        <p>Are you sure you want to continue?</p>
      </Modal>
    </div>
  );
};

export default ClientListItem;
