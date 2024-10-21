import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { RxMagnifyingGlass } from "react-icons/rx";

import CloseIcon from "@mui/icons-material/Close";

const TeamMembersDialog = ({ open, onClose, selectedCompany }) => {
  console.log("selectedCompany", selectedCompany);
  const [showAlreadyInvitedSection, setShowAlreadyInvitedSection] =
    useState(true);

  const invitedPeople = [
    { id: 3, name: "Mike Geerinck", role: "Admin", title: "CTO", avatar: "C" },
    {
      id: 1,
      name: "John Doe",
      role: "Employee",
      title: "Developer",
      avatar: "A",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Client",
      title: "Marketing Manager",
      avatar: "B",
    },
  ];

  const availablePeople = [
    { id: 8, name: "Usman Yousaf", role: "Admin", title: "CEO", avatar: "H" },
    {
      id: 4,
      name: "Alice Johnson",
      role: "Employee",
      title: "Copywriter",
      avatar: "D",
    },
    {
      id: 5,
      name: "Bob Williams",
      role: "Client",
      title: "Project Manager",
      avatar: "E",
    },
    {
      id: 6,
      name: "Another Employee",
      role: "Employee",
      title: "UX Designer",
      avatar: "F",
    },
    {
      id: 7,
      name: "Client User",
      role: "Client",
      title: "Product Owner",
      avatar: "G",
    },
  ];

  // ... (your other code)

  const [selectedPeople, setSelectedPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (personId) => {
    setSelectedPeople((prevSelected) => {
      if (prevSelected.includes(personId)) {
        return prevSelected.filter((id) => id !== personId);
      } else {
        return [...prevSelected, personId];
      }
    });
  };

  // Function to handle adding invites
  const handleAddInvites = () => {
    // Implement your logic for adding invites here
    console.log("Selected People:", selectedPeople);
    // Close the dialog
    onClose();
  };
  const getRoleBackgroundColor = (role) => {
    switch (role) {
      case "Employee":
        return "#7eb6ff"; // Soft Blue color
      case "Client":
        return "#fffacd"; // Soft Yellow color (Lemon Chiffon)
      case "Admin":
        return "#d3d3d3"; // Soft Gray color
      // Add more cases as needed
      default:
        return "transparent";
    }
  };

  const getRoleTextColor = (role) => {
    return role === "Client" ? "rgb(107 77 77)" : "#fff"; // Black for 'Client', White for others
  };
  const handleCloseAlreadyInvitedSection = () => {
    setShowAlreadyInvitedSection(false);
  };
  const filterPeople = (people) => {
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.title &&
          person.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          height: "700px", // Change this value to set your desired fixed height
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
            backgroundColor: "#4CAF50", // Green color
            height: "1px",
            borderColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      </DialogTitle>
      <div className="addPersonSearch flex items-center w-full">
        <input
          type="text"
          placeholder="Search people by name,role or title"
          className={`person_searchInput py-[0.4rem] px-2.5 my-[-11px] mx-[17px]`}
          onChange={(e) => setSearchTerm(e.target.value)}

          // onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-12" />
      </div>

      {/* Already Invited People */}
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
                backgroundColor: "#4CAF50", // Green color
                height: ".5px",
                borderColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
            <List>
              {filterPeople(invitedPeople).map((person) => (
                <ListItem key={person.id}>
                  <ListItemAvatar>
                    <Avatar src={person.avatarUrl} alt={person.name} />
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
                          {person.role}
                        </span>
                      </div>
                    }
                    secondary={
                      <span className="text-[0.6rem]">{person.title}</span>
                    }
                  />

                  <ListItemSecondaryAction>
                    {/* Add more details or actions as needed */}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {showAlreadyInvitedSection && (
          <Divider
            sx={{
              my: 2,
              backgroundColor: "#4CAF50", // Green color
              height: "1px",
              borderColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        )}

        {/* Select People from the List */}
        <Typography variant="h6">Select People from the List</Typography>
        <List>
          {filterPeople(availablePeople).map((person) => (
            <ListItem key={person.id}>
              <ListItemAvatar>
                <Avatar src={person.avatarUrl} alt={person.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className="flex items-center relative fw-bold">
                    {`${person.name}`}
                    <span
                      style={{
                        backgroundColor: getRoleBackgroundColor(person.role),
                        color: getRoleTextColor(person.role),
                        borderRadius: "6px",
                        padding: "0.17rem 0.5rem",
                        position: "absolute",
                        left: "18%",
                        fontSize: "11px",
                      }}
                    >
                      {person.role}
                    </span>
                  </div>
                }
                secondary={
                  <span className="text-[0.6rem]">{person.title}</span>
                }
              />

              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={() => handleCheckboxChange(person.id)}
                  checked={selectedPeople.includes(person.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Add Invites or Cancel */}
        <DialogActions>
          <Button
            onClick={handleAddInvites}
            variant="contained"
            color="success"
          >
            Add Invites
          </Button>
          <Button onClick={onClose} color="inherit">
            Never Mind
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMembersDialog;
