import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useStateContext } from "../../contexts/ContextProvider";

export default function InvoiceStatus() {
  const { setSelectedStatus, selectedStatus } = useStateContext();

  const handleChange = (event, newStatus) => {
    setSelectedStatus(newStatus); // Update the selected status in the context
  };
  console.log("selectedStatus", selectedStatus);
  return (
    <div>
      <div className="flex inviteAdminToggleWrapper ">
        <ToggleButtonGroup
          color="primary"
          value={selectedStatus}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          className="w-full justify-center"
        >
          <ToggleButton value="Not Sent" className=" justify-center ">
            <div className="flex items-center">
              <span className="text-xs capitalize	text-nowrap	">Not Sent</span>
            </div>
          </ToggleButton>
          <ToggleButton value="Unpaid" className=" justify-center ">
            <div className="flex items-center 	px-3">
              <span className="text-xs capitalize text-nowrap	">Sent But Not Paid</span>
            </div>
          </ToggleButton>
          <ToggleButton value="Paid" className=" justify-center ">
            <div className="flex items-center px-3">
              <span className="text-xs capitalize	text-nowrap	">Paid</span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
        <div></div>{" "}
      </div>
    </div>
  );
}
