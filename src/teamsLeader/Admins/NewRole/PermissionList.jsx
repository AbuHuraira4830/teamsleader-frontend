import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PermissionList = () => {
  const permissions = [
    { label: "Teams", id: "teams" },
    { label: "Invoices", id: "invoices" },
    { label: "Proposals", id: "proposals" },
  ];

  const handleSwitchChange = (id) => {
    // Handle switch state changes if needed
    console.log(`Switch for ${id} changed`);
  };

  return (
    <>
      <div className="mt-3">
        <Typography
          gutterBottom
          style={{ marginLeft: "0.5rem", fontSize: ".85rem" }}
        >
          Allow Access to:
        </Typography>

        <List>
          {permissions.map((permission) => (
            <ListItem key={permission.id}>
              <ListItemText
                primary={permission.label}
                style={{ fontSize: "0.5rem !important" }}
              />
              <Switch
                color="success"
                onChange={() => handleSwitchChange(permission.id)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default PermissionList;
