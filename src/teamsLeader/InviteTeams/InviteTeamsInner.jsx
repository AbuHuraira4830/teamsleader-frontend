import React, { useState, useEffect  } from "react";
import { Box, Typography, Button, Avatar, Divider, Paper } from "@mui/material";
import InviteTeamTopBar from "./InviteTeamTopBar";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import { FaUserPlus, FaUserTie } from "react-icons/fa";

import InviteEmployee from "./InviteEmployee";
import InviteClient from "./InviteClient";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI } from "../../helpers/api";
import { useStateContext as userContext } from "../../contexts/UsersContext";




const InviteTeamsInner = () => {
  const navigate = useNavigate();
  const { workspaceID, teamID } = useParams();

  console.log("teamID",teamID)
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState({ employees: [], clients: [], admins: [] });
  const [selectedOption, setSelectedOption] = useState("");
  const {  setCurrentTeamName } = userContext();

 
  useEffect(() => {
    const fetchTeamData = async () => {
      try {

        // Fetch team details
        const teamResponse = await getAPI(`/api/team/${teamID}`);
        console.log("teamResponse",teamResponse);
        setTeam(teamResponse.data.team);
        setCurrentTeamName(teamResponse.data.team.name)
        // Fetch team members
        const membersResponse = await getAPI(`/api/team/${teamID}/members`);
        setMembers(membersResponse.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [teamID]);
  
  const renderSelectedComponent = () => {
    if (selectedOption) return null;
  
    return (
      <>
        {/* Dropdown for adding members */}
        <div className="flex justify-end mt-2">
          <ButtonGroup className="me-4">
            <Dropdown className="py-0 workspace_addBtn border-0 rounded-1">
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
                <Dropdown.Item
                  className="admin"
                  onClick={() => handleOptionSelect("Admin")}
                >
                  <div className="flex items-center justify-between">
                    <div className="fs_1 flex items-center">
                      <FaUserTie className="pl-[0.7rem] pr-[0.7rem] text-[2rem]" />
                      Admin
                    </div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </div>
  
        {/* Creator Section */}
        <Paper elevation={3} sx={{ p: 2, mt: 4 }} style={{ overflowX: "auto", maxHeight: "400px" }}>
  <Typography variant="h6" fontWeight="bold">
    Creator
  </Typography>
  <Divider sx={{ my: 2, backgroundColor: "#4CAF50", height: "1px" }} />
  <Box display="flex" alignItems="center" gap={2}>
    {/* Avatar for Owner */}
    <Avatar sx={{ bgcolor: "#4CAF50" }}>
      {team?.owner?.[0]?.toUpperCase() || "?"}
    </Avatar>
    {/* Owner Details */}
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {team?.owner || "No Creator Assigned"}
      </Typography>
      {team?.owner && (
        <Typography variant="body2" color="textSecondary">
          Owner Email
        </Typography>
      )}
    </Box>
  </Box>
        </Paper>
  
        {/* Employees Section */}
        <Paper elevation={3} sx={{ p: 2, mt: 4 }} style={{ overflowX: "auto", maxHeight: "400px" }}>
          <Typography variant="h6">Employees</Typography>
          <Divider sx={{ my: 2, backgroundColor: "#4CAF50", height: "1px" }} />
          {members.employees.length > 0 ? (
            members.employees.map((employee) => (
              <TeamMemberEntry key={employee.email} member={employee} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" textAlign="center">
              No employees added yet. Add some to get started!
            </Typography>
          )}
        </Paper>
  
        {/* Clients Section */}
        <Paper elevation={3} sx={{ p: 2, mt: 4, mb: 8 }} style={{ overflowX: "auto", maxHeight: "400px" }}>
          <Typography variant="h6">Clients</Typography>
          <Divider sx={{ my: 2, backgroundColor: "#4CAF50", height: "1px" }} />
          {members.clients.length > 0 ? (
            members.clients.map((client) => (
              <TeamMemberEntry key={client.email} member={client} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" textAlign="center">
              No clients added yet. Add some to get started!
            </Typography>
          )}
        </Paper>
      </>
    );
  };
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const path =
      option === "Employee"
        ? "add-employee"
        : option === "Client"
        ? "add-client"
        : "add-admin";

    navigate(`/workspace/${workspaceID}/team/${teamID}/teams-invites/${path}`);
  };

 

  return (
    <Box p={4} className="inviteTeamInner">
      <InviteTeamTopBar
        teamName={team?.name || "Unnamed Team"}
        onClose={() => console.log("Close")}
      />
      {renderSelectedComponent()}
    </Box>
  );
};

const TeamMemberEntry = ({ member }) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Avatar sx={{ bgcolor: "#4CAF50" }}>{member.name[0]?.toUpperCase()}</Avatar>
    <Box ml={2}>
      <Typography variant="subtitle1" fontWeight="bold">
        {member.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
      </Typography>
      <Typography variant="body2">{member.email}</Typography>
    </Box>
  </Box>
);

export default InviteTeamsInner;
