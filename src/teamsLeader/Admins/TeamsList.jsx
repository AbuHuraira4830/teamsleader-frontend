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
import { useStateContext } from "../../contexts/ContextProvider";
import { postAPI } from "../../helpers/apis";
import { TimeSheetTable } from "./ProjectTimeSheet";
import { v4 as uuidv4 } from "uuid";
import ProjectSelector from "./ProjectSelector";
const TeamsList = ({ handleChange }) => {
  const {
    selectedWorkspace,
    members,
    selectedTeam,
    setSelectedTeam,
    thisUser,
    setSelectedMember,
  } = useStateContext();
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

  const filteredTeams = teams?.filter((team) => {
    const teamNameMatches = team?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const employeeEmailMatches = team.employees.some((employee) =>
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const clientEmailMatches = team.clients.some((client) =>
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return teamNameMatches || employeeEmailMatches || clientEmailMatches;
  });

  const handleNameClick = (source, data) => {
    console.log("source", source, data);
    handleChange("a", source);
    setSelectedMember(data);
  };

  const employeeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleNameClick("timeSheet", record)}
        >
          {text}
        </span>
      ),
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
    {
      title: "Project Work Time",
      dataIndex: "projectTime",
      key: "projectTime",
      render: (text) => text || "0 hours 6 mins ",
    },
  ];

  const clientColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleNameClick("timeSheet", record)}
        >
          {text}
        </span>
      ),
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
    {
      title: "Project Work Time",
      dataIndex: "projectTime",
      key: "projectTime",
      render: (text) => text || "0 hours 0 mins ",
    },
  ];

  const membersessions = selectedTeam?.projectSessions
    ? selectedTeam?.projectSessions[selectedTeam?.currentProjectId]?.data
    : [];

  const now = new Date();
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = now.toLocaleDateString("en-US", options);
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const time = now.toLocaleTimeString("en-US", timeOptions).replace(":", " : ");

  const handleReset = async () => {
    const notification = `${thisUser.fullName} has reset the project on ${date} at ${time}`;

    try {
      const res = await postAPI("/api/admin/create-new-project", {
        teamId: selectedTeam._id,
        projectId: uuidv4(),
        notification,
      });
      console.log(res.data.team);
      setSelectedTeam(res.data.team);
    } catch (err) {
      console.log(err);
    }
  };

  const convertToMinutes = (timeString) => {
    const timeParts = timeString.match(/(\d+)\s*hrs\s*(\d+)\s*mins/);
    if (timeParts) {
      const hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      return hours * 60 + minutes;
    }
    return 0;
  };

  const convertToHrsMins = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hrs ${mins} mins`;
  };

  const calculateTotalTime = (sessions) => {
    if (!sessions) return "0 hrs 0 mins";
    let totalMinutes = 0;
    sessions?.forEach((session) => {
      totalMinutes += convertToMinutes(session.totalTime);
    });
    return convertToHrsMins(totalMinutes); // Convert total minutes back to hours and minutes
  };

  const totalTimeWorked = calculateTotalTime(membersessions);

  function getProjectWorkTimeByEmail(email) {
    // Filter sessions by the provided email
    const userSessions = membersessions?.filter(
      (session) => session.email === email
    );

    // Initialize total time in minutes
    let totalMinutes = 0;

    // Loop through each session and parse the total time
    userSessions.forEach((session) => {
      const [hours, mins] = session.totalTime
        .match(/(\d+)\s*hrs?\s*(\d+)?\s*mins?/)
        .slice(1, 3)
        .map((num) => parseInt(num || 0, 10)); // Default mins to 0 if undefined
      totalMinutes += hours * 60 + mins;
    });

    // Convert total minutes to hours and minutes
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    // Return the result as a formatted string
    return `${totalHours} hrs ${remainingMinutes} mins`;
  }

  console.log(selectedTeam?.projectSessions);
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

      {filteredTeams?.map((team) => (
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
                  <div className=" pb-4">
                    <div className="flex">
                      <span className="title_border me-2"></span>
                      <p
                        className="mb-0"
                        style={{ fontSize: "18px", fontWeight: 600 }}
                      >
                        List of employees
                      </p>
                    </div>
                    <div className="mt-3 mb-2 centerIt">
                      <p className="me-2">Selected project:</p>{" "}
                      <ProjectSelector date={date} time={time} />
                    </div>
                    <div className=" centerIt">
                      <p>
                        Total project work time:{" "}
                        <strong>{totalTimeWorked}</strong>{" "}
                      </p>{" "}
                      <button
                        onClick={handleReset}
                        className="ms-2 px-2 hover:bg-red-500 rounded-[4px] h-[30px] hover:text-white border-1 border-red-500"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Table
                    dataSource={team?.employees?.map((employee) => ({
                      ...employee,
                      projectTime: getProjectWorkTimeByEmail(employee.email),
                    }))}
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
                    dataSource={team?.clients?.map((client) => ({
                      ...client,
                      projectTime: getProjectWorkTimeByEmail(client.email),
                    }))}
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
            <div className="mt-4 pb-2">
              <p className="fw-bold">Project updates</p>
              <div className="Border p-3 rounded-2 mt-1 w-[80%] pb-5 max-h-[300px] overflow-y-auto">
                {selectedTeam?.projectUpdates?.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex">
                <span className="title_border me-2"></span>
                <p
                  className="mb-0"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  Project time sheet
                </p>
              </div>
              <TimeSheetTable sessions={membersessions} />
            </div>
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
