import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import { IoCloseOutline } from "react-icons/io5";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ClientListItem = ({ client, onRemoveClient }) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);

  const handleRemoveClientClick = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmRemoveClient = () => {
    // Call the onRemoveClient callback only if the user confirms
    onRemoveClient(client.id);
    setOpenConfirmationDialog(false);
  };

  const handleCancelRemoveClient = () => {
    setOpenConfirmationDialog(false);
  };
  return (
    <ListItem key={client.id}>
      <ListItemAvatar>
        <Avatar>{/* Add your avatar icon here */}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className="flex items-center relative">
            {client.name}
            <span
              style={{
                backgroundColor: "#fffacd",
                padding: "0.15rem 0.5rem",
                borderRadius: "6px",
                color: "rgb(107 77 77)",
                fontSize: ".65rem",
                position: "absolute",
                left: "16%",
              }}
            >
              Client
            </span>
          </div>
        }
        secondary={
          <div className="flex">
            {`${client.email}`}
            <div className="flex mx-auto items-center">
              {client.showPendingInvitation && (
                <div className="pendingText">Invitation Pending</div>
              )}
            </div>
          </div>
        }
      />

      <div className="flex items-center space-x-2">
        <Tooltip title="Chat" placement="top">
          <IconButton aria-label="chat">
            <ChatIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Remove" placement="top">
          <IconButton
            aria-label="more options"
            // onClick={() => onRemoveClient(client.id)}
            onClick={() => handleRemoveClientClick(client.id)}
          >
            <IoCloseOutline className="text-[1rem]" />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog open={openConfirmationDialog} onClose={handleCancelRemoveClient}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove {client.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveClient} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveClient} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default ClientListItem;
