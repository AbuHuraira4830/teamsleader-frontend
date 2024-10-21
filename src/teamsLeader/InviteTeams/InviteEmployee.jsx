import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import TeamMembersDialog from "./TeamMembersDialog";
import EmailTemplateDialog from "./EmailTemplateDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InviteEmployee = ({ onClose }) => {
  const [persons, setPersons] = useState([]);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const [sectionVisible, setSectionVisible] = useState(true);
  const [isTeamMembersDialogOpen, setTeamMembersDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [emailData, setEmailData] = useState({
    fullName: "",
    email: "",
    title: "",
    personalNote: "",
  });

  const handleCompanyChange = (event) => {
    const companyValue = event.target.value;
    console.log("companyValue", companyValue);

    setSelectedCompany(companyValue);

    // Open the dialog when a company is selected
    if (companyValue !== "") {
      setTeamMembersDialogOpen(true);
    } else {
      // Close the dialog if no company is selected
      setTeamMembersDialogOpen(false);
    }
  };

  const handleAddPerson = () => {
    setPersons((prevPersons) => [
      ...prevPersons,
      {
        id: sectionVisible ? prevPersons.length + 2 : prevPersons.length + 1,
        inputFieldsVisible: true,
      },
    ]);
  };

  const handleToggleSection = () => {
    setSectionVisible(false);
  };
  const handleToggleInputFieldsDefault = () => {
    setSectionVisible(false);
  };

  const handleToggleInputFields = (id) => {
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person.id !== id)
    );
  };

  const handleInputChange = (field, value, personId) => {
    if (personId) {
      // Update specific person's input
      setPersons((prevPersons) =>
        prevPersons.map((person) =>
          person.id === personId ? { ...person, [field]: value } : person
        )
      );
    } else {
      // Update main emailData
      setEmailData((prevEmailData) => ({
        ...prevEmailData,
        [field]: value,
      }));
    }
  };
  const handleSendInvitation = async () => {
    try {
      // Combine the first person with the dynamic persons
      const allPersons = [
        {
          fullName: emailData.fullName,
          email: emailData.email,
          title: emailData.title,
          personalNote: emailData.personalNote,
        },
        ...persons,
      ];

      // Iterate over each person
      for (const person of allPersons) {
        console.log(person);
        const response = await fetch("http://localhost:8888/api/team/invite", {
          // Use your backend server's address here
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: person.fullName,
            email: person.email,
            title: person.title,
            personalNote: person.personalNote,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          // Handle success for each person
          console.log("Invitation sent:", result);
          setSnackbar({
            open: true,
            message: `Invitation sent successfully to ${person.fullName}!`,
            severity: "success",
          });
          // Maybe close the dialog or show a success message
        } else {
          // Handle error for each person
          console.error(
            "Failed to send invitation to",
            person.fullName,
            ":",
            result
          );
          setSnackbar({
            open: true,
            message: `Failed to send invitation to ${person.fullName}. Please try again.`,
            severity: "error",
          });
          // Show an error message
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network error
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div className="flex  ">
            <span className="title_border me-2"></span>
            <p className="text-lg font-bold">Add Employee</p>
          </div>
          <IconButton className="mb-3">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Entire Section */}
        {/* {sectionVisible && ( */}
        <>
          {sectionVisible && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Person1</Typography>
                <IconButton>
                  <CloseIcon onClick={handleToggleInputFieldsDefault} />
                </IconButton>
              </Box>
              {/* Default Section */}

              <form>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="success"
                  required
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="success"
                  required
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <TextField
                  label="Title (Optional)"
                  variant="outlined"
                  fullWidth
                  color="success"
                  margin="normal"
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </form>
            </>
          )}

          {/* Dynamic Sections */}
          {persons.map((person) => (
            <Box key={person.id} mt={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Person {person.id}</Typography>
                {person.inputFieldsVisible && (
                  <IconButton
                    onClick={() => handleToggleInputFields(person.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>

              {person.inputFieldsVisible && (
                <form>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    color="success"
                    required
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value, person.id)
                    }
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    color="success"
                    required
                    onChange={(e) =>
                      handleInputChange("email", e.target.value, person.id)
                    }
                  />
                  <TextField
                    label="Title (Optional)"
                    variant="outlined"
                    fullWidth
                    color="success"
                    margin="normal"
                    onChange={(e) =>
                      handleInputChange("title", e.target.value, person.id)
                    }
                  />
                </form>
              )}
            </Box>
          ))}

          {/* Add Another Person Button */}
          <Box mt={2} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleAddPerson}
            >
              Add another person
            </Button>
            <Typography variant="body2" ml={2} mr={2}>
              or
            </Typography>
            {/* Select Option */}
            <>
              <Select
                variant="outlined"
                value={selectedCompany} // Add your state for the selected value here
                onChange={handleCompanyChange}
                displayEmpty
                inputProps={{ "aria-label": "Select person from company" }}
                style={{ minWidth: 150 }}
                size="small"
              >
                <MenuItem value="" disabled>
                  Pick a person
                </MenuItem>
                <MenuItem value="Company 1">Company 1</MenuItem>
                <MenuItem value="Company 2">Company 2</MenuItem>
                <MenuItem value="Company 3">Company 3</MenuItem>
                {/* Add more options as needed */}
              </Select>
              <TeamMembersDialog
                open={isTeamMembersDialogOpen}
                onClose={() => setTeamMembersDialogOpen(false)}
                selectedCompany={selectedCompany}
              />
            </>
          </Box>
        </>
        {/* )} */}
        {/* Second Heading and Input Box */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" mt={2}>
          2. Add a personal note to the invitation email (optional)
        </Typography>
        <TextField
          label="Add a personal note to the email "
          variant="outlined"
          fullWidth
          color="success"
          margin="normal"
          onChange={(e) => handleInputChange("personalNote", e.target.value)}
        />
        {/* Third Heading and Buttons */}
        <Typography variant="h6" mt={2}>
          3. Preview and send email
        </Typography>
        <Box mt={2} display="flex ">
          <Button
            variant="contained"
            color="success"
            startIcon={<SearchIcon />}
            style={{ marginRight: 16 }}
            onClick={() => setPreviewOpen(true)}
          >
            Preview this email
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SendIcon />}
            onClick={handleSendInvitation} // Add the onClick handler here
          >
            Send Now
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" paragraph={true}>
            <p className=" text-sm">
              <b>What happens next?</b> Everyone above will be immediately added
              to the <b>Mike Team 1</b> and have full access to everything in
              the <b>Mike Team 1</b>. They’ll receive an email with instructions
              to join the <b>Mike Team 1</b>.
            </p>
          </Typography>
        </Box>
      </Box>
      <EmailTemplateDialog
        setPreviewOpen={setPreviewOpen}
        isPreviewOpen={isPreviewOpen}
        emailData={emailData}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InviteEmployee;
