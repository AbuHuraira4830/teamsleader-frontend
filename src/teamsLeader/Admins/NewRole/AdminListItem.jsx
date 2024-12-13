import React, { useState } from "react";
import { Table, Button, Modal, Dropdown, Menu, Checkbox } from "antd";
import { FaTrash, FaEllipsisH, FaUserTie } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useStateContext } from "../../../contexts/UsersContext"; // Adjust the import path as needed
import axios from "axios";

const AdminListItem = () => {
  const { admins, moveToEmployees, setAdmins, setEmployees } =
    useStateContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentEmail, setCurrentEmail] = useState(null);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!currentEmail) return;

    try {
      // Make an API call to remove the admin role from the user in the database
      const response = await axios.post("/api/remove-admin-role", {
        email: currentEmail,
        teamId: filteredAdmins.find((admin) => admin.email === currentEmail)
          .teamId,
      });

      if (response.data.success) {
        // Remove the admin from the state
        setAdmins((prev) => prev.filter((adm) => adm.email !== currentEmail));
        setSelectedRowKeys((prevKeys) =>
          prevKeys.filter((k) => k !== currentEmail)
        );
      } else {
        console.error("Failed to remove admin:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing admin:", error);
    } finally {
      setIsModalVisible(false); // Close the modal after deletion
    }
  };

  const handleBulkDelete = () => {
    selectedRowKeys.forEach((email) => {
      setCurrentEmail(email);
      handleDelete();
    });
    setSelectedRowKeys([]); // Clear the selection after deletion
  };

  const handleBulkMove = () => {
    selectedRowKeys.forEach((email) => moveToEmployeeHandler(email));
    setSelectedRowKeys([]); // Clear the selection after moving
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDeleteConfirm = (email) => {
    setCurrentEmail(email);
    setIsModalVisible(true);
  };

  const showMoveConfirm = (email) => {
    Modal.confirm({
      title: "Confirm Move",
      content: (
        <>
          <p>
            Employees have access to limited features. Any admin access given
            before will also be removed for this user. Would you like to
            continue?
          </p>
        </>
      ),
      okText: "Move",
      okButtonProps: { className: "workspace_addBtn" },
      onOk: () => moveToEmployeeHandler(email),
    });
  };

  const moveToEmployeeHandler = async (email) => {
    try {
      const admin = admins.find((adm) => adm.email === email);
      if (!admin) return;

      // Make an API call to update the user's role in the database
      const response = await axios.post("/api/move-to-employee", {
        email: admin.email, // using email instead of key as the user identifier
        teamId: admin.teamId, // send the team ID where the admin is being moved to an employee
      });

      if (response.data.success) {
        // Remove from admins list and add to employees list
        setAdmins((prev) => prev.filter((adm) => adm.email !== email));
        setEmployees((prev) => [...prev, { ...admin, role: "employee" }]);
      } else {
        console.error(
          "Failed to move admin to employee:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error moving admin to employee:", error);
    }
  };

  const menu = (record) => (
    <Menu className="w-[11rem]">
      <Menu.Item
        key="1"
        onClick={() => showMoveConfirm(record.email)}
        icon={<FaUserTie />}
      >
        Move to Employees
      </Menu.Item>
      <Menu.Item
        key="3"
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
      align: "center", // Center-align checkbox column
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="table-row-content flex justify-center items-center text-nowrap">
          {text}
          <Dropdown
            overlay={menu(record)}
            trigger={["click"]}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            overlayStyle={{ zIndex: 1050 }}
            className="action-dropdown action-dropdown-admin hover:bg-[#6768791a] rounded-md px-2 py-0"
          >
            <FaEllipsisH
              style={{ cursor: "pointer" }}
              className="text-[#6c757d] text-[1.7rem] hover:text-[#000]"
            />
          </Dropdown>
        </div>
      ),
      align: "center", // Center-align name column
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center", // Center-align role column
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center", // Center-align email column
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      align: "center", // Center-align team name column
    },
  ];

  return (
    <div className="w-full p-8">
      <div className="admin_searchInput flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Search admins by name, email, or team name"
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
            List of admins
          </p>
        </div>
        <div className="flex">
          {selectedRowKeys.length > 1 && (
            <Button
              type="primary"
              style={{ backgroundColor: "#00854d", borderColor: "green" }}
              className="workspace_addBtn mx-2"
              onClick={handleBulkMove}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaUserTie style={{ marginRight: "8px" }} />
                Move to Employees
              </div>
            </Button>
          )}
          <Button
            type="primary"
            danger
            onClick={() => showDeleteConfirm(selectedRowKeys[0])}
            disabled={selectedRowKeys.length === 0}
            icon={<FaTrash />}
            className={selectedRowKeys.length < 1 ? "DeleteButton" : ""}     
          >
            Delete
          </Button>
        </div>
      </div>

      <Table
        dataSource={filteredAdmins}
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
        onOk={handleDelete}
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

export default AdminListItem;
