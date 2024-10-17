import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { PiCrownSimple } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import ChatIcon from "@mui/icons-material/Chat";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const EmployeeListItem = ({
  employee,
  onResendInvitation,
  onCrownClick,
  onRemoveEmployee,
}) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleResendInvitationClick = async () => {
    try {
      // Show "Sending Invitation" toast
      const toastId = toast.info("Sending Invitation");

      // Simulate asynchronous action (API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update the content of "Sending Invitation" toast
      toast.update(toastId, {
        render: "Invitation Sent", // Update content
        type: "success", // Update type (optional)
        autoClose: 5000, // Update autoClose (optional)
      });

      // Trigger the provided callback
      onResendInvitation(employee);
    } catch (error) {
      // Handle errors if needed
      console.error("Error:", error);
      // Show an error toast
      toast.error("Error sending invitation");
    }
  };

  const handleRemoveEmployeeClick = () => {
    // Show the confirmation dialog
    setOpenConfirmationDialog(true);
  };

  const handleConfirmRemoveEmployee = () => {
    // Call the onRemoveEmployee callback only if the user confirms
    onRemoveEmployee(employee.id);
    setOpenConfirmationDialog(false);
  };

  const handleCancelRemoveEmployee = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <ListItem key={employee.id}>
      <ListItemAvatar>
        <Avatar>{/* Add your avatar icon here */}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className="flex items-center relative">
            {employee.name}
            <span
              style={{
                // backgroundColor: "#4285F4",
                backgroundColor: "transparent",
                boxShadow: "0 0 40px 40px #7eb6ff inset, 0 0 0 0",
                borderColor: "#7eb6ff",

                padding: "0.15rem 0.5rem",
                borderRadius: "6px", // Use a higher value for rounded corners
                color: "#fff",
                fontSize: ".6rem",
                position: "absolute",
                left: "16%",
              }}
            >
              Employee
            </span>
          </div>
        }
        secondary={
          <div className="flex ">
            {`${employee.email}`}

            <div className="flex mx-auto	 items-center">
              {employee.showPendingInvitation && (
                <div className="  pendingText">Invitation Pending</div>
              )}
            </div>
          </div>
        }
      />

      <div className="flex items-center space-x-2">
        {employee.showPendingInvitation && (
          <Button
            variant="outlined"
            size="small"
            style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}
            onClick={handleResendInvitationClick}
          >
            Resend
          </Button>
        )}
        <Tooltip
          title={
            employee.showPendingInvitation
              ? `Remove ${employee.name} as an owner`
              : `Make ${employee.name} an owner`
          }
          placement="top"
        >
          <IconButton
            aria-label="crown"
            onClick={() => onCrownClick(employee.id)}
          >
            <PiCrownSimple className="text-[1rem]" />
          </IconButton>
        </Tooltip>
        {/* Tooltip for Chat icon */}
        <Tooltip title="Chat" placement="top">
          <IconButton aria-label="chat">
            <ChatIcon />
          </IconButton>
        </Tooltip>
        {/* Tooltip for Close icon */}
        <Tooltip title="Remove" placement="top">
          <IconButton
            aria-label="more options"
            // onClick={() => onRemoveEmployee(employee.id)}
            onClick={handleRemoveEmployeeClick}
          >
            <IoCloseOutline className="text-[1rem]" />
          </IconButton>
        </Tooltip>
      </div>

      <Dialog
        open={openConfirmationDialog}
        onClose={handleCancelRemoveEmployee}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove {employee.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveEmployee} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveEmployee} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default EmployeeListItem;
