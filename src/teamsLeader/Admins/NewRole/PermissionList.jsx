import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const PermissionList = ({ permissions, onToggle }) => {
  return (
    <div className="mt-4">
      <Typography
        gutterBottom
        style={{ marginLeft: "0.5rem", fontSize: ".85rem" }}
      >
        Allow Access to:
      </Typography>

      <List>
        {/* {Object.keys(permissions).map((id) => (
          <ListItem key={id}>
            <ListItemText primary={id.charAt(0).toUpperCase() + id.slice(1)} />
            <Switch
              color="success"
              checked={permissions[id]}
              onChange={() => onToggle(id)}
            />
          </ListItem>
        ))} */}
      </List>
    </div>
  );
};

export default PermissionList;
