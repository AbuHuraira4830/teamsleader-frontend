import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useStateContext as userContext } from "../../contexts/UsersContext";
import { postAPI, getAPI } from "../../helpers/apis";
import AdminLimitModal from "./AdminLimitModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InviteAdmin = ({ role }) => {
  const navigate = useNavigate();

  const { workspaceID, teamID } = useParams();
  const { admins, currentTeamName } = userContext();

  const sanitizedWorkspaceID = workspaceID.replace(/^:|:$/g, "");
  const sanitizedTeamID = teamID.replace(/^:|:$/g, "");

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
  const [accessRights, setAccessRights] = useState({
    teams: false,
    invoices: false,
    proposals: false,
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // Upgrade modal control
  const [userPlan, setUserPlan] = useState(null); // Store the user's plan
  const [isLoading, setIsLoading] = useState(false); // Loading state for adding employees

  const adminLimits = {
    trial: 1,
    freelancer: 1,
    business: 25,
    enterprise: Infinity,
  };
  useEffect(() => {
    getAPI("/api/get-current-plan")
      .then((response) => {
        const { userPlan } = response.data;
        setUserPlan(userPlan); // Store the user plan
      })
      .catch((error) => {
        console.error("Error fetching user plan:", error);
      });
  }, []);

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  const handleAccessChange = (event) => {
    setAccessRights({
      ...accessRights,
      [event.target.name]: event.target.checked,
    });
  };
  const selectedItems = Object.keys(accessRights).filter(
    (key) => accessRights[key]
  );
  const handleSendInvitation = async () => {
    if (!userPlan) {
      console.error("User plan not found");
      return;
    }

    const currentAdminCount = admins.length;
    const adminLimit = adminLimits[userPlan?.package];

    if (currentAdminCount >= adminLimit) {
      setShowUpgradeModal(true);

      return;
    }

    setIsLoading(true);
    const allPersons = [
      {
        fullName: emailData.fullName,
        email: emailData.email,
        title: emailData.title,
        personalNote: emailData.personalNote,
        role: role, // Add role here
        accessRights: selectedItems || [], // Add accessRights here
      },
      ...persons.map((person) => ({
        ...person,
        role: role, // Ensure each person has a role
        accessRights: person.accessRights || [], // Ensure each person has accessRights
      })),
    ];

    try {
      for (const person of allPersons) {
      
        const response = await postAPI(
          `/api/team/invite/${workspaceID}/${teamID}`,
          {
            persons: [
              {
                name: person.fullName,
                email: person.email,
                title: person.title,
                notes: person.personalNote,
                role: person.role,
              },
            ],
          }
        );

        // const result = await response.json();
        if (response.status === 200) {
          console.log("Invitation sent:", response.data);
          setSnackbar({
            open: true,
            message: `Invitation sent successfully to ${person.fullName}!`,
            severity: "success",
          });
        } else {
          console.error("Failed to send invitation:", response.data.message);
          setSnackbar({
            open: true,
            message: `Failed to send invitation to ${person.fullName}. Please try again.`,
            severity: "error",
          });
        }
      }
    }catch (error) {
      console.error("Network error:", error);
      // Handle network error
      setSnackbar({
        open: true,
        message: "Network error. Please try again later.",
        severity: "error",
      });
    }
  };
  return (
    <>
      <Box p={4} className="inviteSection">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div className="flex  ">
            <span className="title_border me-2"></span>
            <p className="text-lg font-bold">Add Admin</p>
          </div>
          <IconButton className="mb-3">
            <CloseIcon onClick={() => navigate(-1)} />
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
          <Box mt={2} display="flex" alignItems="center" >
          <Button
    variant="contained"
    color="success"
    onClick={handleAddPerson}
    sx={{ padding: "6px 16px", fontSize: "0.875rem", whiteSpace: "nowrap" }}
  >
    Add Another Person
  </Button>
            <Typography variant="body2" ml={2} mr={2}>
              or
            </Typography>
            {/* Select Option */}
            <>
            <Select
    variant="outlined"
    value={selectedCompany}
    onChange={handleCompanyChange}
    displayEmpty
    inputProps={{ "aria-label": "Select person from company" }}
    size="small"
    sx={{
      minWidth: 150,
      fontSize: "0.875rem",
      "& .MuiSelect-select": {
        padding: "8px",
      },
    }}
  >
    <MenuItem value="" disabled>
      Pick a Person
    </MenuItem>
    <MenuItem value="Company 1">Company 1</MenuItem>
    <MenuItem value="Company 2">Company 2</MenuItem>
    <MenuItem value="Company 3">Company 3</MenuItem>
  </Select>
              <Typography ml={2} mr={1} sx={{ fontSize: "0.875rem", whiteSpace: "nowrap" }}>
    Allow Access to:
  </Typography>
              <Box display="flex">
                {["teams", "invoices", "proposals"].map((key) => (
                  <Box key={key} ml={1} display="flex" alignItems="center"
                  sx={{ flex: "1 1 auto", minWidth: "90px" }}

                  >
        <Typography sx={{ fontSize: "0.875rem", whiteSpace: "nowrap" }}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Switch
                      checked={accessRights[key]}
                      onChange={handleAccessChange}
                      name={key}
                      color="success"
                    />
                  </Box>
                ))}
              </Box>

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
              to the <b>{currentTeamName}</b> and have full access to everything in
              the <b>{currentTeamName}</b>. They’ll receive an email with instructions
              to join the <b>{currentTeamName}</b>.
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
      <AdminLimitModal
        showUpgradeModal={showUpgradeModal}
        setShowUpgradeModal={setShowUpgradeModal}
        userPlan={userPlan}
      />
    </>
  );
};

export default InviteAdmin;
