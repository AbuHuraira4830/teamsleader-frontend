import React, { useState, useEffect } from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { Checkbox, Button } from "antd";
import "antd/dist/reset.css";
import AdminPermissionsList from "./Admin/AdminPermissionsList";

const AdminUsersList = () => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [permissions, setPermissions] = useState({
    teams: false,
    invoices: false,
    proposals: false,
  });
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);

  const handleUserSelection = (isSelected) => {
    setIsUserSelected(isSelected);
  };

  const handlePermissionChange = (permission, isChecked) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: isChecked,
    }));
  };

  useEffect(() => {
    const anyPermissionChecked = Object.values(permissions).some(Boolean);
    setAreButtonsDisabled(!anyPermissionChecked);
  }, [permissions]);

  return (
    <>
      <div className="newRole_container">
        <div className="w-[75%] mb-10">
          <AdminPermissionsList onUserSelect={handleUserSelection} />
        </div>

        <hr className="role_divider" />

        <div className="w-[12%]">
          <div className="flex items-center mb-4">
            <span className="me-1">
              <MdOutlineSecurity className="text-xl text-[#00854d]" />
            </span>
            <p
              className="mb-0 text-nowrap"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              Admin Permissions
            </p>
          </div>
          <div className="space-y-6 mt-10">
            <Checkbox
              style={{ color: "#00854d" }}
              onChange={(e) =>
                handlePermissionChange("teams", e.target.checked)
              }
              disabled={!isUserSelected}
            >
              Teams
            </Checkbox>
            <Checkbox
              style={{ color: "#00854d" }}
              onChange={(e) =>
                handlePermissionChange("invoices", e.target.checked)
              }
              disabled={!isUserSelected}
            >
              Invoices
            </Checkbox>
            <Checkbox
              style={{ color: "#00854d" }}
              onChange={(e) =>
                handlePermissionChange("proposals", e.target.checked)
              }
              disabled={!isUserSelected}
            >
              Proposals
            </Checkbox>
          </div>
          <div className="mt-[12rem] flex items-center ml-[3rem]">
            <Button
              className="workspace_addBtn border-none"
              disabled={areButtonsDisabled}
            >
              Cancel
            </Button>
            <Button
              className="ml-[1rem] workspace_addBtn border-none"
              disabled={areButtonsDisabled}
            >
              Grant
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsersList;
