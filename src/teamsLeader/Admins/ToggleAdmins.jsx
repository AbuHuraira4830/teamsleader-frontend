import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { IoAdd } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import { SiMicrosoftteams } from "react-icons/si";

import AdminInvite from "./NewRole/AdminInvite";
import ClientList from "./ClientList";
import TeamsList from "./TeamsList";
import EmployeeList from "./EmployeeList";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";

import "./adminsInvite.css";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("admin");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  let selectedComponent;

  switch (alignment) {
    case "admin":
      selectedComponent = <AdminInvite />;
      break;
    case "employees":
      selectedComponent = <EmployeeList />;
      break;
    case "clients":
      selectedComponent = <ClientList />;
      break;
    case "teams":
      selectedComponent = <TeamsList />;
      break;
    default:
      selectedComponent = <AdminInvite />;
  }

  return (
    <div>
      <div className="flex inviteAdminToggleWrapper">
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
          <ToggleButton value="teams" className=" justify-center">
            <div className="flex items-center">
              <SiMicrosoftteams className="mr-1 text-xs mb-[0.1rem]" />
              <span className="text-xs capitalize	">Teams</span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
        <div>
          {/* <ButtonGroup className=" me-4">
            <Dropdown className=" py-0    workspace_addBtn  border-0 rounded-1 rounded-end-1 rounded-1 rounded-start-1  ">
              <Dropdown.Toggle
                style={{
                  background: "none",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="flex items-center  ">
                  <GoPlus className="text-[1.4rem] px-1" />
                  <span className="text-xs">Add New</span>
                </div>
                <FaAngleDown className="mt-[0.2rem] ml-[0.3rem] mb-[0.1rem] text-[0.8rem]" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="border-0 "
                style={{
                  width: "220px",
                  padding: "8px",
                }}
              >
                <Dropdown.Item>
                  <div className="fs_1 flex items-center">
                    <RiAdminLine className="folderIcon " />
                    Admin
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="fs_1 flex items-center">
                    <PiUsersThree className="folderIcon " />
                    Employee
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="fs_1 flex items-center">
                    <PiUsersFourLight className="folderIcon " />
                    Client
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup> */}
        </div>{" "}
      </div>

      {selectedComponent}
    </div>
  );
}
