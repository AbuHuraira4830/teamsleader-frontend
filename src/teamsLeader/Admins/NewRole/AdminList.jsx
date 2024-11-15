import React, { useState } from "react";
import List from "@mui/material/List";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Button, Modal } from "antd";
import { FaTrash, FaUserTie } from "react-icons/fa";
import AdminListItem from "./AdminListItem";
import { useStateContext } from "../../../contexts/UsersContext";

const AdminList = () => {
  const { admins, moveToEmployees, setAdmins } = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveAdmin = (id) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  const onSelectChange = (id) => {
    const isSelected = selectedRowKeys.includes(id);
    const newSelectedRowKeys = isSelected
      ? selectedRowKeys.filter((key) => key !== id)
      : [...selectedRowKeys, id];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleBulkMove = () => {
    Modal.confirm({
      title: "Confirm Move",
      content: (
        <>
          <p>
            Employees have access to limited features. Would you like to
            continue?
          </p>
        </>
      ),
      okText: "Move",
      okButtonProps: {
        style: { backgroundColor: "#00854d", borderColor: "green" },
      },
      onOk: () => {
        selectedRowKeys.forEach((key) => moveToEmployees(key));
        setSelectedRowKeys([]); // Clear the selection after moving
      },
    });
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: (
        <>
          <p>
            Any user you remove from your company will have their access revoked
            and this action is irreversible.
          </p>
          <p>Are you sure you want to continue?</p>
        </>
      ),
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        selectedRowKeys.forEach((key) => handleRemoveAdmin(key));
        setSelectedRowKeys([]); // Clear the selection after deletion
      },
    });
  };

  return (
    <>
      <div className="my-6 mb-6">
        <div
          className={`admin_searchInput flex items-center w-full mb-4 ${
            isFocused ? "focus" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search admins by name or email"
            className="searchInput py-[0.4rem] px-2.5 flex-grow border-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ outline: "none" }}
          />
          <RxMagnifyingGlass className="text-base text-[#c3c6d4] mx-2" />
        </div>

        <div className="flex justify-end mt-2">
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
            onClick={showDeleteConfirm}
            disabled={selectedRowKeys.length === 0}
            icon={<FaTrash />}
            className="flex items-center justify-center"
          >
            Delete
          </Button>
        </div>

        <List>
          {filteredAdmins.map((admin) => (
            <AdminListItem
              key={admin.id}
              admin={admin}
              onResendInvitation={() =>
                console.log(`Resending invitation for ${admin.name}`)
              }
              onCrownClick={() => console.log(`Crowning ${admin.name}`)}
              onRemoveAdmin={() => handleRemoveAdmin(admin.id)}
              onCheckboxChange={onSelectChange}
              selected={selectedRowKeys.includes(admin.id)}
            />
          ))}
        </List>
      </div>
    </>
  );
};

export default AdminList;
