import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EmployeeListItem from "./EmployeeListItem";
import { RxMagnifyingGlass } from "react-icons/rx";
import Tooltip from "@mui/material/Tooltip";
import ClientListItem from "./ClientListItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const TeamsList = () => {
  const teamsData = [
    // ... (previous teams)
    {
      id: 1,
      name: "Development Team",
      isActive: true,
      employees: [
        { id: 101, name: "John Doe", email: "john.doe@example.com" },
        { id: 102, name: "Jane Doe", email: "jane.doe@example.com" },
      ],
      clients: [
        { id: 10001, name: "Client A", email: "clientA@example.com" },
        { id: 10002, name: "Client B", email: "clientB@example.com" },
      ],
    },
    {
      id: 2,
      name: "Design Team",
      isActive: true,
      employees: [
        { id: 201, name: "Bob Smith", email: "bob.smith@example.com" },
        { id: 202, name: "Alice Johnson", email: "alice.johnson@example.com" },
      ],
      clients: [
        { id: 10003, name: "Client C", email: "clientC@example.com" },
        { id: 10004, name: "Client D", email: "clientD@example.com" },
      ],
    },
    {
      id: 3,
      name: "Sales Team",
      isActive: true,
      employees: [
        { id: 401, name: "Grace Davis", email: "grace.davis@example.com" },
        { id: 402, name: "Harry Wilson", email: "harry.wilson@example.com" },
      ],
      clients: [
        { id: 10007, name: "Client G", email: "clientG@example.com" },
        { id: 10008, name: "Client H", email: "clientH@example.com" },
      ],
    },
    {
      id: 4,
      name: "Support Team",
      isActive: true,
      employees: [
        { id: 501, name: "Ivy Robinson", email: "ivy.robinson@example.com" },
        { id: 502, name: "Jack Turner", email: "jack.turner@example.com" },
      ],
      clients: [
        { id: 10009, name: "Client I", email: "clientI@example.com" },
        { id: 10010, name: "Client J", email: "clientJ@example.com" },
      ],
    },
    {
      id: 5,
      name: "Engineering Team",
      isActive: true,
      employees: [
        { id: 601, name: "Karen White", email: "karen.white@example.com" },
        { id: 602, name: "Leo Thompson", email: "leo.thompson@example.com" },
      ],
      clients: [
        { id: 10011, name: "Client K", email: "clientK@example.com" },
        { id: 10012, name: "Client L", email: "clientL@example.com" },
      ],
    },
    {
      id: 6,
      name: "Quality Assurance Team",
      isActive: true,
      employees: [
        { id: 701, name: "Mia Robinson", email: "mia.robinson@example.com" },
        { id: 702, name: "Nathan Scott", email: "nathan.scott@example.com" },
      ],
      clients: [
        { id: 10013, name: "Client M", email: "clientM@example.com" },
        { id: 10014, name: "Client N", email: "clientN@example.com" },
      ],
    },
    {
      id: 7,
      name: "Finance Team",
      isActive: true,
      employees: [
        { id: 801, name: "Olivia Davis", email: "olivia.davis@example.com" },
        { id: 802, name: "Peter Adams", email: "peter.adams@example.com" },
      ],
      clients: [
        { id: 10015, name: "Client O", email: "clientO@example.com" },
        { id: 10016, name: "Client P", email: "clientP@example.com" },
      ],
    },
    // Add more teams as needed
  ];

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [teamToRemoveId, setTeamToRemoveId] = React.useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [teams, setTeams] = useState(teamsData);
  const [expandedTeam, setExpandedTeam] = useState(null);

  const handleTeamExpand = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleDeleteTeam = (teamId) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    setTeams(updatedTeams);
  };

  const handleToggleTeam = (team) => {
    const updatedTeams = teams.map((t) =>
      t.id === team.id ? { ...t, isActive: !t.isActive } : t
    );
    setTeams(updatedTeams);
  };
  const handleCrownClick = (teamId, employeeId) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const updatedEmployees = team.employees.map((employee) =>
          employee.id === employeeId
            ? {
                ...employee,
                showPendingInvitation: !employee.showPendingInvitation,
              }
            : employee
        );
        return { ...team, employees: updatedEmployees };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleRemoveEmployee = (teamId, employeeId) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const updatedEmployees = team.employees.filter(
          (employee) => employee.id !== employeeId
        );
        return { ...team, employees: updatedEmployees };
      }
      return team;
    });
    setTeams(updatedTeams);
  };
  const handleRemoveClient = (teamId, clientId) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const updatedClients = team.clients.filter(
          (client) => client.id !== clientId
        );
        return { ...team, clients: updatedClients };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleResendInvitation = (employee) => {
    // Add logic for resending invitation
    console.log(`Resending invitation for ${employee.name}`);
  };
  const filteredTeams = teams.filter((team) => {
    const teamNameMatches = team.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const employeeEmailMatches = team.employees.some((employee) =>
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const clientEmailMatches = team.clients.some((client) =>
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return teamNameMatches || employeeEmailMatches || clientEmailMatches;
  });
  const handleOpenConfirmationDialog = (teamId) => {
    setTeamToRemoveId(teamId);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmRemoveTeam = () => {
    // Call the handleDeleteTeam callback only if the user confirms
    handleDeleteTeam(teamToRemoveId);
    setOpenConfirmationDialog(false);
  };

  const handleCancelRemoveTeam = () => {
    setTeamToRemoveId(null);
    setOpenConfirmationDialog(false);
  };

  return (
    <div className="my-3" style={{ overflowX: "auto", maxHeight: "400px" }}>
      <div className="addPersonSearch flex items-center w-full">
        <input
          type="text"
          placeholder="Search teams by name or employee email"
          className={`person_searchInput py-[0.4rem] px-2.5`}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-12" />
      </div>
      {filteredTeams.map((team) => (
        <Accordion
          key={team.id}
          expanded={expandedTeam === team.id}
          onChange={() => handleTeamExpand(team.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse", // Change the order of elements
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>{team.name}</Typography>
            </div>
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              <Switch
                color="success"
                checked={team.isActive}
                onChange={() => handleToggleTeam(team)}
              />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <Typography variant="subtitle2">Employees:</Typography>
              {team.employees.map((employee) => (
                <EmployeeListItem
                  key={employee.id}
                  employee={employee}
                  onResendInvitation={(employee) =>
                    handleResendInvitation(employee)
                  }
                  onCrownClick={(employeeId) =>
                    handleCrownClick(team.id, employeeId)
                  }
                  onRemoveEmployee={(employeeId) =>
                    handleRemoveEmployee(team.id, employeeId)
                  }
                />
              ))}
              <Typography variant="subtitle2">Clients:</Typography>
              {team.clients.map((client) => (
                <ClientListItem
                  key={client.id}
                  client={client}
                  onRemoveClient={(clientId) =>
                    handleRemoveClient(team.id, clientId)
                  }
                />
              ))}
            </List>
            <Tooltip title="Delete Team" placement="top">
              <IconButton
                aria-label="delete"
                onClick={() => handleOpenConfirmationDialog(team.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog open={openConfirmationDialog} onClose={handleCancelRemoveTeam}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveTeam} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveTeam} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamsList;
