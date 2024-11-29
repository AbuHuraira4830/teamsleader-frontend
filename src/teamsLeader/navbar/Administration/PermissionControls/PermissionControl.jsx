import React from "react";
import PermissionToggles from "./PermissionToggles";

const PermissionControl = () => {
  return (
    <div className="overview ">
      <h2 className="mb-4 text-2xl font-bold">Permissions</h2>

      <PermissionToggles />
    </div>
  );
};

export default PermissionControl;
