import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Typography,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RxMagnifyingGlass } from "react-icons/rx"; // Ensure you have this icon package installed
import { useParams } from "react-router-dom"; // Ensure you have react-router-dom installed

const TeamMembersDialog = ({ open, onClose, selectedCompany }) => {
  const [showAlreadyInvitedSection, setShowAlreadyInvitedSection] =
    useState(true);
  const [invitedPeople, setInvitedPeople] = useState([]);
  const [availablePeople, setAvailablePeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [disabledEmails, setDisabledEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddInvitesDisabled, setIsAddInvitesDisabled] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { workspaceID, teamID } = useParams();

  useEffect(() => {
    if (open) {
      fetchPeopleData();
    }
  }, [open]);

  useEffect(() => {
    setIsAddInvitesDisabled(selectedPeople.length === 0);
  }, [selectedPeople]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const consolidateUsers = (users) => {
    const consolidated = [];

    users.forEach((user) => {
      const existingUser = consolidated.find(
        (u) =>
          u.email === user.email && u.name === user.name && u.role === user.role
      );

      if (!existingUser) {
        consolidated.push({
          email: user.email,
          name: user.name,
          role: user.role,
          title: user.title,
        });
      }
    });

    return consolidated;
  };

  const fetchPeopleData = async () => {
    console.log("teamIdWorks", teamID);
    try {
      const response = await axios.get(`/api/users/list/${teamID}`);
      const { specifiedTeamUsers, otherTeamUsers } = response.data;
      console.log(" All Users Data", response.data);

      const invitedPeopleData = consolidateUsers(specifiedTeamUsers);
      const availablePeopleData = consolidateUsers(otherTeamUsers);

      setInvitedPeople(invitedPeopleData);
      setAvailablePeople(availablePeopleData);
    } catch (error) {
      console.error("Error fetching people data:", error);
    }
  };

  const handleCheckboxChange = (person) => {
    const identifier = `${person.email}-${person.name}-${person.role}`;
    setSelectedPeople((prevSelected) => {
      if (prevSelected.includes(identifier)) {
        // Uncheck and enable other users with the same email
        setDisabledEmails((prevDisabled) =>
          prevDisabled.filter((email) => email !== person.email)
        );
        return prevSelected.filter((id) => id !== identifier);
      } else {
        // Check and disable other users with the same email
        setDisabledEmails((prevDisabled) => [...prevDisabled, person.email]);
        return [...prevSelected, identifier];
      }
    });
  };

  const handleSendInvitation = async () => {
    try {
      const personsToInvite = selectedPeople.map((identifier) => {
        const [email, name, role] = identifier.split("-");
        return { email, name, role };
      });

      for (const person of personsToInvite) {
        console.log(person);

        const response = await fetch(
          `http://localhost:8888/api/team/invite/${workspaceID}/${teamID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              persons: [
                {
                  name: person.name,
                  email: person.email,
                  role: person.role,
                  title: "", // Add title if available
                  notes: "", // Add personalNote if available
                },
              ],
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          // Handle success for each person
          console.log("Invitation sent:", result);
          setSnackbar({
            open: true,
            message: `Invitation sent successfully to ${person.name}!`,
            severity: "success",
          });
        } else {
          // Handle error for each person
          console.error(
            "Failed to send invitation to",
            person.name,
            ":",
            result
          );
          setSnackbar({
            open: true,
            message: `Failed to send invitation to ${person.name}. Please try again.`,
            severity: "error",
          });
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setSnackbar({
        open: true,
        message: "Network error. Please try again later.",
        severity: "error",
      });
    }
  };

  const getRoleBackgroundColor = (role) => {
    switch (role.toLowerCase()) {
      case "employee":
        return "#7eb6ff";
      case "client":
        return "#fffacd";
      case "admin":
        return "#d3d3d3";
      default:
        return "transparent";
    }
  };

  const getRoleTextColor = (role) => {
    return role.toLowerCase() === "client" ? "rgb(107 77 77)" : "#fff";
  };

  const handleCloseAlreadyInvitedSection = () => {
    setShowAlreadyInvitedSection(false);
  };

  const filterPeople = (people) => {
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleRoleChange = (identifier, newRole) => {
    const [email, name] = identifier.split("-");
    setAvailablePeople((prevPeople) =>
      prevPeople.map((person) =>
        person.email === email && person.name === name
          ? { ...person, role: newRole }
          : person
      )
    );
    // Also update the selectedPeople to reflect the new role
    setSelectedPeople((prevSelected) =>
      prevSelected.map((id) =>
        id === identifier ? `${email}-${name}-${newRole}` : id
      )
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          height: "700px",
          overflowY: "auto",
        },
      }}
    >
      <DialogActions>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle>
        <Typography variant="h6">
          Pick People from {selectedCompany || "Teams"}
        </Typography>
        <Divider
          sx={{
            my: 2,
            backgroundColor: "#4CAF50",
            height: "1px",
            borderColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      </DialogTitle>
      <div className="addPersonSearch flex items-center w-full">
        <input
          type="text"
          placeholder="Search people by name, role or title"
          className="person_searchInput py-2 px-2.5 my-1 mx-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-12" />
      </div>

      <DialogContent>
        {showAlreadyInvitedSection && (
          <>
            <div className="flex justify-between">
              <Typography variant="h6">Already Invited People</Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseAlreadyInvitedSection}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <Divider
              sx={{
                my: 2,
                backgroundColor: "#4CAF50",
                height: ".5px",
                borderColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
            <List>
              {filterPeople(invitedPeople).map((person) => (
                <ListItem key={`${person.email}-${person.name}-${person.role}`}>
                  <ListItemAvatar>
                    <Avatar alt={person.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div className="flex items-center relative fw-bold">
                        {`${person.name}`}
                        <span
                          style={{
                            backgroundColor: getRoleBackgroundColor(
                              person.role
                            ),
                            color: getRoleTextColor(person.role),
                            borderRadius: "6px",
                            padding: "0.17rem 0.5rem",
                            position: "absolute",
                            left: "18%",
                            fontSize: "11px",
                          }}
                        >
                          {capitalizeFirstLetter(person.role)}
                        </span>
                      </div>
                    }
                    secondary={
                      <span className="text-[0.6rem]">{person.title}</span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {showAlreadyInvitedSection && (
          <Divider
            sx={{
              my: 2,
              backgroundColor: "#4CAF50",
              height: "1px",
              borderColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        )}

        <Typography variant="h6">Select People from the List</Typography>
        <List>
          {filterPeople(availablePeople).map((person) => {
            const identifier = `${person.email}-${person.name}-${person.role}`;
            return (
              <ListItem key={identifier}>
                <ListItemAvatar>
                  <Avatar alt={person.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Tooltip
                      title={`Role: ${person.role}\nTitle: ${person.title}`}
                    >
                      <div className="flex items-center relative fw-bold">
                        {`${person.name}`}
                        <Select
                          value={person.role}
                          onChange={(e) =>
                            handleRoleChange(identifier, e.target.value)
                          }
                          style={{
                            backgroundColor: getRoleBackgroundColor(
                              person.role
                            ),
                            color: getRoleTextColor(person.role),
                            borderRadius: "6px",
                            padding: "0.17rem 0.5rem",
                            position: "absolute",
                            left: "18%",
                            fontSize: "11px",
                            height: "1.5rem",
                            marginLeft: "0.5rem",
                          }}
                        >
                          <MenuItem value="employee">
                            {capitalizeFirstLetter("employee")}
                          </MenuItem>
                          <MenuItem value="client">
                            {capitalizeFirstLetter("client")}
                          </MenuItem>
                          <MenuItem value="admin">
                            {capitalizeFirstLetter("admin")}
                          </MenuItem>
                        </Select>
                      </div>
                    </Tooltip>
                  }
                  secondary={<span className="text-xs">{person.title}</span>}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleCheckboxChange(person)}
                    checked={selectedPeople.includes(identifier)}
                    disabled={
                      selectedPeople.some((id) => id.includes(person.email)) &&
                      !selectedPeople.includes(identifier)
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleSendInvitation}
            variant="contained"
            color="success"
            disabled={isAddInvitesDisabled}
          >
            Add Invites
          </Button>
          <Button onClick={onClose} color="inherit">
            Never Mind
          </Button>
        </DialogActions>
      </DialogContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default TeamMembersDialog;
