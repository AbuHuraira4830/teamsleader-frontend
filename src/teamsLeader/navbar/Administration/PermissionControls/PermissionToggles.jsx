import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { IoAdd } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import { SiMicrosoftteams } from "react-icons/si";

// import AdminInvite from "./NewRole/AdminInvite";
// import TeamsList from "./TeamsList";
// import EmployeeInvite from "./EmployeeInvite";
// import ClientInvite from "./ClientInvite";

// import "./adminsInvite.css";
import AdminUsersList from "./AdminUsersList";
import EmployeeUsersList from "./EmployeeUsersList";
import ClientUsersList from "./ClientUsersList";

export default function PermissionToggles() {
  const [alignment, setAlignment] = React.useState("admin");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  let selectedComponent;

  switch (alignment) {
    case "admin":
      selectedComponent = <AdminUsersList />;
      break;
    case "employees":
      selectedComponent = <EmployeeUsersList />;
      break;
    case "clients":
      selectedComponent = <ClientUsersList />;
      break;
    // case "teams":
    //   selectedComponent = <TeamsList />;
    //   break;
    default:
      selectedComponent = <AdminInvite />;
  }

  return (
    <div>
      <div className="flex inviteAdminToggleWrapper justify-center">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="admin" className=" justify-center">
            <div className="flex items-center">
              <IoAdd className="mr-1  mb-[0.1rem] text-xs" />
              <span className="text-xs capitalize	">Admin</span>
            </div>
          </ToggleButton>
          <ToggleButton value="employees" className=" justify-center">
            <div className="flex items-center">
              <PiUsersThree className="mr-1 text-xs mb-[0.1rem]" />
              <span className="text-xs capitalize	">Employees</span>
            </div>
          </ToggleButton>
          <ToggleButton value="clients" className=" justify-center">
            <div className="flex items-center">
              <PiUsersFourLight className="mr-1 text-xs mb-[0.1rem]" />
              <span className="text-xs capitalize	">Clients</span>
            </div>
          </ToggleButton>
          {/* <ToggleButton value="teams" className=" justify-center">
            <div className="flex items-center">
              <SiMicrosoftteams className="mr-1 text-xs mb-[0.1rem]" />
              <span className="text-xs capitalize	">Teams</span>
            </div>
          </ToggleButton> */}
        </ToggleButtonGroup>
        <div></div>{" "}
      </div>

      {selectedComponent}
    </div>
  );
}
