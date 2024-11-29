import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Table, Button, Checkbox } from "antd";
import axios from "axios";
import { RxMagnifyingGlass } from "react-icons/rx";

const TeamsList = () => {
  const [teams, setTeams] = useState([]); // Initialize as an empty array
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [teamToRemoveId, setTeamToRemoveId] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Define selectedRowKeys for row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedClientKeys, setSelectedClientKeys] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/workspace/team-members");
        const { teams } = response.data;
        setTeams(teams);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamExpand = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await axios.delete(`/api/workspace/team/${teamId}`);
      if (response.data.success) {
        const updatedTeams = teams.filter((team) => team.id !== teamId);
        setTeams(updatedTeams);
      } else {
        console.error("Failed to delete team:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleToggleTeam = (team) => {
    const updatedTeams = teams.map((t) =>
      t.id === team.id ? { ...t, isActive: !t.isActive } : t
    );
    setTeams(updatedTeams);
  };

  const handleOpenConfirmationDialog = (teamId) => {
    setTeamToRemoveId(teamId);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmRemoveTeam = () => {
    handleDeleteTeam(teamToRemoveId);
    setOpenConfirmationDialog(false);
  };

  const handleCancelRemoveTeam = () => {
    setTeamToRemoveId(null);
    setOpenConfirmationDialog(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onClientSelectChange = (newSelectedClientKeys) => {
    setSelectedClientKeys(newSelectedClientKeys);
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

  const employeeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
  ];

  const clientColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
  ];

  return (
    <div className="my-10">
      <div
        className={`admin_searchInput flex items-center w-full mb-4 ${
          isFocused ? "focus" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search teams by name or email"
          className="searchInput py-[0.4rem] px-2.5 flex-grow border-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ outline: "none" }}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] mx-2" />
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>{team.name}</Typography>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Switch
                color="success"
                checked={team.isActive}
                onChange={() => handleToggleTeam(team)}
              />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {team.employees.length > 0 && (
                <>
                  <div className="d-flex justify-between pb-4">
                    <div className="flex">
                      <span className="title_border me-2"></span>
                      <p
                        className="mb-0"
                        style={{ fontSize: "18px", fontWeight: 600 }}
                      >
                        List of employees
                      </p>
                    </div>
                  </div>
                  <Table
                    dataSource={team.employees}
                    columns={employeeColumns}
                    pagination={false}
                    rowKey="email"
                    rowSelection={{
                      selectedRowKeys,
                      onChange: onSelectChange,
                      hideSelectAll: true, // Hide the "Select All" checkbox
                      renderCell: () => null, // Disable default checkbox rendering
                    }}
                  />
                </>
              )}
            </div>
            <div
              style={{ marginTop: team.employees.length > 0 ? "20px" : "0" }}
            >
              {team.clients.length > 0 && (
                <>
                  <div className="d-flex justify-between pb-4">
                    <div className="flex">
                      <span className="title_border me-2"></span>
                      <p
                        className="mb-0"
                        style={{ fontSize: "18px", fontWeight: 600 }}
                      >
                        List of clients
                      </p>
                    </div>
                  </div>
                  <Table
                    dataSource={team.clients}
                    columns={clientColumns}
                    pagination={false}
                    rowKey="email"
                    rowSelection={{
                      selectedRowKeys: selectedClientKeys,
                      onChange: onClientSelectChange,
                      hideSelectAll: true, // Hide the "Select All" checkbox
                      renderCell: () => null, // Disable default checkbox rendering
                    }}
                  />
                </>
              )}
            </div>
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

      <Modal
        title="Confirm Deletion"
        visible={openConfirmationDialog}
        onOk={handleConfirmRemoveTeam}
        onCancel={handleCancelRemoveTeam}
        okText="Delete"
        okType="danger"
        zIndex={1060}
      >
        <p>
          Deleting this team will remove all associated employees and clients.
          This action is irreversible.
        </p>
        <p>Are you sure you want to continue?</p>
      </Modal>
    </div>
  );
};

export default TeamsList;
