import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { IoAdd } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import { SiMicrosoftteams } from "react-icons/si";
import BillingOverview from "./BillingOverview";
import InvoiceManagement from "./InvoiceManagement";
export default function ToggleBillingOptions() {
  const [alignment, setAlignment] = useState("overview");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  let selectedComponent;

  switch (alignment) {
    case "overview":
      selectedComponent = <BillingOverview />;
      break;
    case "employees":
      //   selectedComponent = <EmployeeList />;
      break;
    case "clients":
      //   selectedComponent = <ClientList />;
      break;
    case "invoices":
        selectedComponent = <InvoiceManagement />;
      break;
    default:
    //   selectedComponent = <AdminInvite />;
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
          <ToggleButton value="overview" className=" justify-center">
            <div className="flex items-center">
              {/* <IoAdd className="mr-1  mb-[0.1rem] text-xs" /> */}
              <span className="text-xs capitalize	">Overview</span>
            </div>
          </ToggleButton>
          <ToggleButton value="employees" className=" justify-center">
            <div className="flex items-center">
              {/* <PiUsersThree className="mr-1 text-xs mb-[0.1rem]" /> */}
              <span className="text-xs capitalize	">Settings</span>
            </div>
          </ToggleButton>
          <ToggleButton value="invoices" className=" justify-center">
            <div className="flex items-center">
              {/* <PiUsersFourLight className="mr-1 text-xs mb-[0.1rem]" /> */}
              <span className="text-xs capitalize	">Invoices</span>
            </div>
          </ToggleButton>
          <ToggleButton value="teams" className=" justify-center">
            <div className="flex items-center">
              {/* <SiMicrosoftteams className="mr-1 text-xs mb-[0.1rem]" /> */}
              <span className="text-xs capitalize	">Payment Method</span>
            </div>
          </ToggleButton>
          <ToggleButton value="contacts" className=" justify-center">
            <div className="flex items-center">
              {/* <SiMicrosoftteams className="mr-1 text-xs mb-[0.1rem]" /> */}
              <span className="text-xs capitalize	">Billing Contacts</span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
        <div></div>{" "}
      </div>

      {selectedComponent}
    </div>
  );
}
