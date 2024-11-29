import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

const TeamMemberEntry = ({ member }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      mb={2}
      sx={{ position: "relative" }}
    >
      <Avatar
        src={`/images/avatars/${member.name
          .replace(/\s+/g, "")
          .toLowerCase()}.png`}
        alt={`${member.name}'s Avatar`}
      />
      <Box ml={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {member.name}
        </Typography>
        <Typography variant="body2">{member.email}</Typography>
        <Typography variant="body2">{member.team}</Typography>
        {member.role === "Client" && (
          <Box
            component="span"
            sx={{
              backgroundColor: "#fffacd",
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
              color: "rgb(107 77 77)",
              fontSize: ".65rem",
              position: "absolute",
              right: "0%",
              transform: "translateX(100%)", // Corrects positioning relative to the parent
            }}
          >
            Client
          </Box>
        )}
        {member.role === "Employee" && (
          <Box
            component="span"
            sx={{
              backgroundColor: "transparent",
              boxShadow: "0 0 40px 40px #7eb6ff inset, 0 0 0 0",
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
              color: "#fff",
              fontSize: ".6rem",
              position: "absolute",
              right: "0%",
              transform: "translateX(100%)", // Adjusts the position to be flush with the right side
            }}
          >
            Employee
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TeamMemberEntry;
