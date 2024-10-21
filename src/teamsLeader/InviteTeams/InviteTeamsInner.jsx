import React, { useState } from "react";
import { Box, Typography, Button, Avatar, Divider, Paper } from "@mui/material";
import InviteTeamTopBar from "./InviteTeamTopBar";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import InviteEmployee from "./InviteEmployee";
import InviteClient from "./InviteClient";
import { useParams } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    team: "Team A",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Employee",
    team: "Team A",
  },
  {
    id: 3,
    name: "Ahmad Ansari",
    email: "clientA@example.com",
    role: "Client",
    team: "Team A",
  },

  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Employee",
    team: "Team A",
  },

  {
    id: 3,
    name: "Mujtaba Yousaf",
    email: "clientA@example.com",
    role: "Client",
    team: "Team A",
  },

  // Add more team members as needed
];

const InviteTeamsInner = () => {
  const [selectedOption, setSelectedOption] = useState("Owner");
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "Employee":
        return <InviteEmployee />;
      case "Client":
        return <InviteClient />;
      default:
        return (
          <>
            <div className="flex justify-end mt-2">
              <ButtonGroup className="me-4">
                <Dropdown className="py-0 workspace_addBtn border-0 rounded-1 rounded-end-1 rounded-1 rounded-start-1">
                  <Dropdown.Toggle
                    style={{
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center">
                      <GoPlus className="text-[1.4rem] px-1" />
                      <span className="text-xs">Add New</span>
                    </div>
                    <FaAngleDown className="mt-[0.2rem] ml-[0.3rem] mb-[0.1rem] text-[0.8rem]" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="border-0"
                    style={{
                      width: "220px",
                      padding: "8px",
                    }}
                  >
                    <Dropdown.Item
                      className="employee"
                      onClick={() => handleOptionSelect("Employee")}
                    >
                      <div className="fs_1 flex items-center">
                        <PiUsersThree className="folderIcon" />
                        <div>Employee</div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="client"
                      onClick={() => handleOptionSelect("Client")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="fs_1 flex items-center">
                          <PiUsersFourLight className="folderIcon" />
                          Client
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </div>

            {/* Owners Section */}
            <Paper
              elevation={3}
              sx={{ p: 2, mt: 4 }}
              style={{ overflowX: "auto", maxHeight: "400px" }}
            >
              <Typography variant="h6">Creator</Typography>
              <Divider
                sx={{
                  my: 2,
                  backgroundColor: "#4CAF50", // Green color
                  height: "1px",
                  borderColor: "rgba(0, 0, 0, 0.4)",
                }}
              />
              {teamMembers
                .filter((member) => member.role === "Owner")
                .map((owner) => (
                  <TeamMemberEntry key={owner.id} member={owner} />
                ))}
            </Paper>

            {/* Employees Section */}
            <Paper
              elevation={3}
              sx={{ p: 2, mt: 4 }}
              style={{ overflowX: "auto", maxHeight: "400px" }}
            >
              <Typography variant="h6">Employees</Typography>
              <Divider
                sx={{
                  my: 2,
                  backgroundColor: "#4CAF50", // Green color
                  height: "1px",
                  borderColor: "rgba(0, 0, 0, 0.4)",
                }}
              />
              {teamMembers
                .filter((member) => member.role === "Employee")
                .map((employee) => (
                  <TeamMemberEntry key={employee.id} member={employee} />
                ))}
            </Paper>

            {/* Clients Section */}
            <Paper
              elevation={3}
              sx={{ p: 2, mt: 4, mb: 8 }}
              style={{ overflowX: "auto", maxHeight: "400px" }}
            >
              <Typography variant="h6">Clients</Typography>
              <Divider
                sx={{
                  my: 2,
                  backgroundColor: "#4CAF50", // Green color
                  height: "1px",
                  borderColor: "rgba(0, 0, 0, 0.4)",
                }}
              />
              {teamMembers
                .filter((member) => member.role === "Client")
                .map((client) => (
                  <TeamMemberEntry key={client.id} member={client} />
                ))}
            </Paper>
          </>
        );
    }
  };

  return (
    <Box p={4} className="inviteTeamInner">
      <InviteTeamTopBar
        teamName="MikeTeam 1"
        onClose={() => console.log("Close")}
      />
      {renderSelectedComponent()}
    </Box>
  );
};

const TeamMemberEntry = ({ member }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar src={`avatar-url-for-${member.role}`} />
      <Box ml={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {member.name}
          {member.role === "Client" && (
            <span
              style={{
                backgroundColor: "#fffacd",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                color: "rgb(107 77 77)",
                fontSize: ".65rem",
                position: "absolute",
                left: "19%",
              }}
            >
              Client
            </span>
          )}
          {member.role === "Employee" && (
            <span
              style={{
                backgroundColor: "transparent",
                boxShadow: "0 0 40px 40px #7eb6ff inset, 0 0 0 0",
                borderColor: "#7eb6ff",

                padding: "0.2rem 0.5rem",
                borderRadius: "6px", // Use a higher value for rounded corners
                color: "#fff",
                fontSize: ".6rem",
                position: "absolute",
                left: "18%",
              }}
            >
              Employee
            </span>
          )}
        </Typography>
        <Typography variant="body2">{member.team}</Typography>
        <Typography variant="body2">{member.email}</Typography>
      </Box>
    </Box>
  );
};

export default InviteTeamsInner;
