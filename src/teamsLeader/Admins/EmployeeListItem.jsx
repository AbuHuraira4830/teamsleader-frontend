import React, { useState } from "react";
import { Table, Button, Modal, Dropdown, Menu, Checkbox } from "antd";
import { FaTrash, FaEllipsisH, FaUserTie } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useStateContext } from "../../contexts/UsersContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const EmployeeListItem = () => {
  const { employees, setEmployees, setAdmins } = useStateContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentEmail, setCurrentEmail] = useState(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.teamName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!currentEmail) return;

    try {
      // Make an API call to remove the employee role from the user in the database
      const response = await axios.post("/api/remove-employee-role", {
        email: currentEmail,
        teamId: filteredEmployees.find(
          (employee) => employee.email === currentEmail
        ).teamId,
      });

      if (response.data.success) {
        // Remove the employee from the state
        setEmployees((prev) =>
          prev.filter((emp) => emp.email !== currentEmail)
        );
        setSelectedRowKeys((prevKeys) =>
          prevKeys.filter((key) => key !== currentEmail)
        );
      } else {
        console.error("Failed to remove employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing employee:", error);
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
    selectedRowKeys.forEach((email) => moveToAdminHandler(email));
    setSelectedRowKeys([]); // Clear the selection after moving
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsMoveModalVisible(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDeleteConfirm = (email) => {
    setCurrentEmail(email);
    setIsModalVisible(true);
  };

  const showMoveConfirm = (email) => {
    setCurrentEmail(email);
    setIsMoveModalVisible(true);
  };

  const handleMove = () => {
    moveToAdminHandler(currentEmail);
    setIsMoveModalVisible(false);
  };

  const moveToAdminHandler = async (email) => {
    try {
      const employee = employees.find((emp) => emp.email === email);
      if (!employee) return;

      // Make an API call to update the user's role in the database
      const response = await axios.post("/api/move-to-admin", {
        email: employee.email, // using email as the user identifier
        teamId: employee.teamId, // send the team ID where the employee is being moved to an admin
      });

      if (response.data.success) {
        // Remove from employees list and add to admins list
        setEmployees((prev) => prev.filter((emp) => emp.email !== email));
        setAdmins((prev) => [...prev, { ...employee, role: "admin" }]);
      } else {
        console.error(
          "Failed to move employee to admin:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error moving employee to admin:", error);
    }
  };

  const menu = (record) => (
    <Menu className="w-[9.5rem]">
      <Menu.Item
        key="1"
        onClick={() => showMoveConfirm(record.email)}
        icon={<FaUserTie />}
      >
        Move to admins
      </Menu.Item>
      <Menu.Item
        key="2"
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
              ? selectedRowKeys.filter((key) => key !== record.email)
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
        <div className="table-row-content flex justify-center items-center text-nowrap">
          {text}
          <Dropdown
            overlay={menu(record)}
            trigger={["click"]}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            overlayStyle={{ zIndex: 1050 }}
            className="action-dropdown action-dropdown-employee hover:bg-[#6768791a] rounded-md px-2 py-0"
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
          placeholder="Search employees by name, email, or team name"
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
            List of employees
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
                Move to Admins
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
        dataSource={filteredEmployees}
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

      {/* Delete Confirmation Modal */}
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

      {/* Move to Admin Confirmation Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ExclamationCircleOutlined
              style={{ color: "orange", marginRight: "8px" }}
            />
            <span>Confirm Move</span>
          </div>
        }
        visible={isMoveModalVisible}
        onOk={handleMove}
        onCancel={handleCancel}
        okText="Move"
        cancelText="Cancel"
        zIndex={1060}
        okButtonProps={{ className: "workspace_addBtn" }} // Applying the custom class to the "Move" button
      >
        <p>
          Admins have access to more features to manage your employees & teams.
        </p>
      </Modal>
    </div>
  );
};

export default EmployeeListItem;
