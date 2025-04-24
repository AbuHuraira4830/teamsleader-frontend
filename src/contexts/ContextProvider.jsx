import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../assets/images/Images";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import VideoFileOutlinedIcon from "@mui/icons-material/VideoFileOutlined";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { BsArrowUp } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";
import { PiTextTBold } from "react-icons/pi";
import { FiPlus, FiTrash } from "react-icons/fi";
import { getAPI, postAPI } from ".././helpers/api";
import {
  holidayInput,
  userProfile,
} from "../teamsLeader/navbar/profileModal/ManageHolidays";
const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [workspaceID, setWorkspaceID] = useState(null);
  const [teamID, setTeamID] = useState(null);
  const [user, setUser] = useState(null);
  const [issuedDate, setIssuedDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  let userId = 0; // Initial ID

  const createData = (name, email, title, teams, role) => {
    return {
      id: ++userId, // Increment the userId for each new user
      name,
      email,
      title,
      teams,
      role,
    };
  };
  const initialRows = [
    createData(
      "Usman Haider",
      "usmanhaider3610@gmail.com",
      "No title",
      "No teams",
      "admin"
    ),
    createData(
      "Ayesha Ahmed",
      "ayesha.ahmed@example.com",
      "Project Manager",
      "Product Development",
      "member"
    ),
    createData(
      "Mohammad Ali",
      "mohammad.ali@example.com",
      "Senior Developer",
      "Development",
      "member"
    ),
    createData(
      "Sara Khan",
      "sara.khan@example.com",
      "Marketing Specialist",
      "Marketing",
      "member"
    ),
    createData(
      "Ahmed Butt",
      "ahmed.butt@example.com",
      "Sales Associate",
      "Sales",
      "member"
    ),
    createData(
      "Zara Noor",
      "zara.noor@example.com",
      "Designer",
      "Design Team",
      "member"
    ),
  ];

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [manualInvoiceNumber, setManualInvoiceNumber] = useState(
    `2024-${String(invoiceNumber).padStart(3, "0")}`
  );
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State to store the email

  const [teamsTableRow, setTeamsTableRow] = useState(initialRows);
  const [structuredCommunication, setStructuredCommunication] = useState(false);
  const [communicationNumber, setCommunicationNumber] = useState("");
  const [createInvoice, setShowCreateInvoice] = useState(true);
  const [downPayment, setDownPayment] = useState(false);
  const [downPaymentAmount, setDownPaymentAmount] = useState(" 0.00");

  const [showEventModal, setShowEventModal] = useState(false);
  const [showTeamsPage, setShowTeamsPage] = useState(false);

  const [clientDetails, setClientDetails] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedUserTeam, setSelectedUserTeam] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [teamName, setTeamName] = useState("");

  const [selectedColorInvoice, setSelectedColorInvoice] =
    useState("rgb(22, 113, 195)");

  useEffect(() => {
    getAPI("/api/user/get-user-from-token")
      .then((response) => {
        console.log("Get User Toke Resp COntext", response);
        if (response.status === 200) {
          setUserEmail(response.data.emailAddress);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setUser(null);
          return navigate("/login");
        }
        console.log(e.response.data.message);
      });
  }, []);

  const updateTeamUserInformation = (updatedUserInfo) => {
    setTeamsTableRow((currentRows) =>
      currentRows.map((row) =>
        row.id === updatedUserInfo.id ? { ...row, ...updatedUserInfo } : row
      )
    );
  };
  const generateStructuredCommunicationNumber = () => {
    const randomNumbers = () => Math.floor(Math.random() * 9) + 1; // generates a number between 1 and 9
    return `+++${randomNumbers()}${randomNumbers()}${randomNumbers()}/${randomNumbers()}${randomNumbers()}${randomNumbers()}${randomNumbers()}/${randomNumbers()}${randomNumbers()}${randomNumbers()}${randomNumbers()}${randomNumbers()}+++`;
  };

  const renderFileIcon = (file) => {
    if (!file) {
      return null;
    }
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={file.url}
          alt="Uploaded file"
          style={{ maxWidth: "100%", height: "100%" }}
        />
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <video autoPlay style={{ maxWidth: "100%", height: "100%" }}>
          <source src={file.url} type={fileType} />
          Your browser does not support the video tag.
        </video>
        // <VideoFileOutlinedIcon />
      );
    } else if (
      fileType === "text/plain" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#2368C4", color: "white" }}
        >
          W
        </span>
      );
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#237F4C", color: "white" }}
        >
          X
        </span>
      );
    } else if (fileType === "application/pdf") {
      return (
        <embed
          onClick={() => setModalShow({ modalActive: true, file })}
          src={file.url}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{
            height: "-webkit-fill-available",
          }}
        />
        // <span
        //   onClick={() => setModalShow({ modalActive: true, file })}
        //   className="justify-content-center centerIt text-white text-[10px]"
        //   style={{ backgroundColor: "#FA0F00" }}
        // >
        //   PDF
        // </span>
        // <DocViewer
        //   className="mx-4"
        //   pluginRenderers={DocViewerRenderers}
        //   documents={documents}
        // />
      );
    } else if (
      fileType === "application/zip " ||
      "application/x-rar-compressed"
    ) {
      const documents = [{ uri: file.url }];
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#FFCC00", color: "white" }}
        >
          ZIP
          {/* <GiZipper className="fs-1 " /> */}
        </span>
      );
    } else {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#5559DF", color: "white" }}
        >
          <AiOutlineFile className="fs-1 " />
        </span>
      );
    }
  };
  const FileAltIcons = (file) => {
    const fileType = file?.type;

    if (fileType?.startsWith("image/")) {
      return <img src={IMAGES.IMAGE} alt="Uploaded file" />;
    } else if (fileType?.startsWith("video/")) {
      return <img src={IMAGES.VIDEO} alt="Uploaded file" />;
    } else if (
      fileType === "text/plain" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return <img src={IMAGES.WORD} alt="Uploaded file" />;
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <img src={IMAGES.EXCEL} alt="Uploaded file" />;
    } else if (fileType === "application/pdf") {
      return <img src={IMAGES.PDF} alt="Uploaded file" />;
    } else if (
      fileType === "application/zip " ||
      "application/x-rar-compressed"
    ) {
      return <img src={IMAGES.ZIP} alt="Uploaded file" />;
    }
    // else {
    //   return <img src={IMAGES.UNKNOWN} alt="Uploaded file" />;
    // }
  };
  const breakpoint = [
    true,
    "sm-down",
    "md-down",
    "lg-down",
    "xl-down",
    "xxl-down",
  ];
  const [fullscreen, setFullscreen] = useState(true);
  const [labels, setLabels] = useState([
    { text: "Label 1", backgroundColor: "#ACA8C3", id: uuidv4() },
    { text: "Label 2", backgroundColor: "#CDCDCD", id: uuidv4() },
    { text: "Label 3", backgroundColor: "#A9B9C7", id: uuidv4() },
    { text: "Label 3", backgroundColor: "#49A7D1", id: uuidv4() },
  ]);
  const uniqueId = uuidv4();
  const [theme, setTheme] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [fileView, setFileView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [currentlyUploadedFiles, setCurrentlyUploadedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [tableHiddenPassword, setTableHiddenPassword] = useState(true);

  const [modalShow, setModalShow] = React.useState({
    modalActive: false,
    file: {},
  });
  const [replyFilePreview, setReplyFilePreview] = useState({
    replyModalActive: false,
  });
  const defaultState = {
    replyText: "",
    replyGif: "",
    fileData: {},
  };
  const [replyInput, setReplyInput] = useState(defaultState);
  const [labelModalVisible, setLabelModalVisible] = useState(false);
  const [managingOption, setManagingOption] = useState(null);
  const [modalDataCalendar, setModalDataCalendar] = useState([]);
  const [clickedCellInfo, setClickedCellInfo] = useState(null);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedTableData = rows.map((item) => {
      return { ...item, selected: !selectAll };
    });
    setRows(updatedTableData);
  };
  const replaceModalInfo = (data) => {
    setModalDataCalendar(data); // Replaces the list instead of appending
  };
  
  const setModalInfo = (data) => {
    setModalDataCalendar((prevData) => [...prevData, data]);
  };
  const handleSaveNewPassword = (newRow) => {
    setRowsPassword((prevRows) => [...prevRows, newRow]);
  };
  const handleSaveNewCard = (newRow) => {
    setRowsCard((prevRows) => [...prevRows, newRow]);
  };

  const [selectedStatus, setSelectedStatus] = useState("Unpaid"); // State to store selected status

  // ===================================================================================

  const [invoiceColumns, setInvoiceColumns] = useState([
    {
      id: uuidv4(),
      name: "Client Name",
      tempName: "Client Name",
      columnType: "clientName", // Add a type identifier
    },
    // {
    //   id: uuidv4(),
    //   name: "People",
    //   editable: false,
    //   tempName: "People",
    //   columnType: "people",
    // },

    {
      id: uuidv4(),
      name: "Number",
      tempName: "Number",
      editable: false,
      columnType: "number", // Add a type identifier
    },
    {
      id: uuidv4(),
      name: "Date",
      tempName: "Date",
      editable: false,
      columnType: "date", // Add a type identifier
    },
    {
      id: uuidv4(),
      name: "Status",
      tempName: "Status",
      editable: false,
      columnType: "status", // Add a type identifier
    },
    {
      id: uuidv4(),
      name: "Total Amount",
      tempName: "Total Amount", // Use the same key as in newRow object
      editable: false,
      columnType: "totalAmount", // Add a type identifier
    },
  ]);
  const [quoteColumns, setQuoteColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },

    { id: uuidv4(), name: "Client Name" },
    {
      id: uuidv4(),
      name: "People",
    },

    {
      id: uuidv4(),
      name: "Number",
    },
    {
      id: uuidv4(),
      name: "Date",
    },
    {
      id: uuidv4(),
      name: "Status",
    },
    {
      id: uuidv4(),
      name: "Total Amount",
    },
  ]);

  const [passColumns, setPassColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { id: uuidv4(), name: "Item" },

    {
      id: uuidv4(),
      name: "Owner",
    },
    {
      id: uuidv4(),
      name: "People",
    },
    {
      id: uuidv4(),
      name: "Password",
    },
    {
      id: uuidv4(),
      name: "URL",
    },
  ]);
  const [cardColumns, setCardColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    {
      id: uuidv4(),
      name: "Owner",
    },
    {
      id: uuidv4(),
      name: "People",
    },

    {
      id: uuidv4(),
      name: "Card Number",
    },
    {
      id: uuidv4(),
      name: "CVV",
    },
    {
      id: uuidv4(),
      name: "Expiry Date",
    },
    // {
    //   id: uuidv4(),
    //   name: "Tags",
    // },
  ]);
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { id: uuidv4(), name: "Item" },

    {
      id: uuidv4(),
      name: "Owner",
    },
    {
      id: uuidv4(),
      name: "Person",
    },
    {
      id: uuidv4(),
      name: "Tagged People",
    },

    {
      id: uuidv4(),
      name: "Status",
    },
    {
      id: uuidv4(),
      name: "Due Date",
    },
  ]);

  const [teamTasks, setTeamTasks] = useState([]);
  const [passwordTables, setPasswordTables] = useState([]);
  const [rows, setRows] = useState(teamTasks);
  const [rowsPassword, setRowsPassword] = useState([
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: "Dream Media",
    //   password: "password123",
    //   showPassword: false,
    //   url: { text: "Dream Media", link: "https://dream-media.net/" },
    // },
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: "Olympia",
    //   password: "usman123445",
    //   showPassword: false,
    //   url: { text: "Olympia", link: "https://olympia4fb.com/" },
    // },
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: "Teams",
    //   userName: "mujtaba867",
    //   password: "ali43453",
    //   showPassword: false,
    //   url: { text: "Olympia4fb", link: "https://olympia4fb.com/" },
    // },
    // ... other rows
  ]);
  const [rowsInvoices, setRowsInvoices] = useState([
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: "Mike Geerinck",
    //   status: { text: "Not Sent", backgroundColor: "#fdab3d" },
    //   type: "Invoice",
    //   number: "2024-001",
    //   date: "Feb 25,2024",
    //   totalAmount: "400",
    // },
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   task: "Idrees Mahomet ",
    //   status: { text: "Unpaid", backgroundColor: "#e2445c" },
    //   type: "Invoice",
    //   number: "2024-002",
    //   date: "Feb 25,2024",
    //   totalAmount: "600",
    // },
    // {
    //   id: uuidv4().replace(/[^\d]/g, ""),
    //   selected: false,
    //   status: { text: "Paid", backgroundColor: "#00c875" },
    //   task: "Yousaf Chohan",
    //   type: "Invoice",
    //   number: "2024-003",
    //   date: "Feb 25,2024",
    //   totalAmount: "200",
    // },
    // ... other rows
  ]);
  const [thisUser, setThisUser] = useState(null);
  const [days, setDays] = useState([]);
  const [rowsQuotes, setRowsQuotes] = useState([
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,

      task: "Mike Geerinck",
      status: { text: "Not Sent", backgroundColor: "#fdab3d" },

      type: "Invoice",
      number: "2024-001",
      date: "Feb 25,2024",
      totalAmount: "400",
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      task: "Imran Jnr ",
      status: { text: "Unpaid", backgroundColor: "#e2445c" },

      type: "Invoice",
      number: "2024-002",
      date: "Feb 25,2024",
      totalAmount: "600",
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      status: { text: "Paid", backgroundColor: "#00c875" },

      task: "Babar Azam",
      type: "Invoice",
      number: "2024-003",
      date: "Feb 25,2024",
      totalAmount: "200",
    },

    // ... other rows
  ]);
  const [rowsCard, setRowsCard] = useState([
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      fullName: "Usman Yousaf",
      expDate: "02/27",
      cvvCode: "345",
      cardNumber: "1234567891234567",

      showCard: false,
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      fullName: "Falak Sher",
      expDate: "03/29",
      cardNumber: "1234567891234765",
      cvvCode: "453",

      showCard: false,
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      fullName: "Mujtaba Haider",
      expDate: "12/25",
      cvvCode: "455",
      cardNumber: "1234567891234856",
      showCard: false,
    },

    // ... other rows
  ]);
  const [tableTeamName, setTableTeamName] = useState("");
  const [showDocSidebar, setShowDocSidebar] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [taskMode, setTaskMode] = useState("");

  // const setClickedCell = (info) => {
  //   setClickedCellInfo(info);
  // };
  const formattedInvoiceNumber = `2024-${String(invoiceNumber).padStart(
    3,
    "0"
  )}`;
  const rowOptionMenu = [
    {
      icon: (
        <FaUpRightAndDownLeftFromCenter className="me-2 fs-6 align-middle" />
      ),
      option: "Open",
    },
    {
      icon: <BsArrowUp className="me-2 fs-6 align-middle" />,
      option: "Move to top",
    },
    {
      icon: <ImFilesEmpty className="me-2 fs-6 align-middle" />,
      option: "Duplicate",
    },
    {
      icon: <PiTextTBold className="me-2 fs-6 align-middle" />,
      option: "Copy",
    },
    {
      icon: <FiPlus className="me-2 fs-6 align-middle" />,
      option: "Create item below",
    },
    { icon: <FiTrash className="me-2 fs-6 align-middle" />, option: "Delete" },
  ];
  const [selectedTask, setSelectedTask] = useState("");
  const [previewModalFiles, setPreviewModalFiles] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(modalShow?.file);
  const [commentsArray, setCommentsArray] = useState([]);
  const [repliesArray, setRepliesArray] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8888/api/events")
  //   fetch("/api/events")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setModalDataCalendar(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch events:", error);
  //     });
  // }, [modalDataCalendar]);
  
  useEffect(() => {
    console.log("Fetching events...");
  
    const fetchEvents = async () => {
      try {
        const response = await getAPI("/api/events");
        setModalDataCalendar(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
  
    fetchEvents();
  }, []); // ✅ only runs once
  
  
  const [selectedOption, setSelectedOption] = useState("Personal info");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState(null);
  const [employeeSummary, setEmployeeSummary] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  useEffect(() => {
    getAPI("/api/user")
      .then((res) => {
        setDays(res.data.user.workingDaysAndHours);
        setThisUser(res.data.user);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });

    getAPI("/api/single-member/holidays-list")
      .then((res) => {
        setUserHolidays(res.data.holidays.holidays);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });

    // fetch("http://localhost:8888/api/events")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setModalDataCalendar(data);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to fetch events:", error);
    //   });
  }, []);
  const fetchTeamMembersAndHolidays = async () => {
    try {
      const response = await getAPI("/api/workspace/team-members");
      setMembers(response.data);
      console.log(response.data);
      const adminEmails = response.data.admins.map((admin) => admin.email);
      const employeeEmails = response.data.employees.map(
        (employee) => employee.email
      );

      const emails = [...adminEmails, ...employeeEmails];
      const userHolidays = await membersHolidaysList(emails);
      console.log(userHolidays);

      handleUsers(response.data, userHolidays);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    }
  };
  useEffect(() => {
    fetchTeamMembersAndHolidays();
  }, [thisUser]);

  const membersHolidaysList = async (emailAddresses) => {
    // if (!emailAddresses || emailAddresses.length === 0) return [];
    try {
      const res = await postAPI("/api/members/holidays-list", {
        emailAddresses,
      });
      return res.data.holidays;
    } catch (error) {
      console.error("Failed to fetch members holidays:", error);
      return [];
    }
  };
  const fetchHolidayHistory = async (emailAddress) => {
    try {
      const res = await getAPI(
        `/api/user/holiday-history?emailAddress=${encodeURIComponent(
          emailAddress
        )}`
      );
      return res.data.holidayHistory || [];
    } catch (error) {
      console.error("Error fetching holiday history:", error);
      return []; // Fallback to an empty array in case of an error
    }
  };

  const handleUsers = async (data, holidays) => {
    console.log(data, holidays);
    const getUserHolidays = (email) => {
      const userHolidayData = holidays.find(
        (holiday) => holiday.emailAddress === email
      );
      return userHolidayData ? userHolidayData.holidays : [];
    };

    // Use Promise.all to resolve all holiday history promises
    const admins = await Promise.all(
      data.admins.map(async (admin, index) => ({
        key: `${index + 1}`,
        name: admin.name,
        email: admin?.email,
        holidays: getUserHolidays(admin?.email),
        holidayHistory: await fetchHolidayHistory(admin?.email), // Await the result
        user: userProfile(
          admin.name,
          admin?.picture,
          setSelectedOption,
          setSelectedEmployee,
          admin?.email
        ),
        ...mapUserHolidays(getUserHolidays(admin?.email), admin?.email),
      }))
    );

    const employees = await Promise.all(
      data.employees.map(async (employee, index) => ({
        key: `${index + admins.length + 1}`,
        name: employee.name,
        email: employee.email,
        holidays: getUserHolidays(employee?.email),
        holidayHistory: await fetchHolidayHistory(employee?.email), // Await the result
        user: userProfile(
          employee.name,
          employee?.picture,
          setSelectedOption,
          setSelectedEmployee,
          employee?.email
        ),
        ...mapUserHolidays(getUserHolidays(employee?.email), employee?.email),
      }))
    );

    // Once all the promises are resolved, update the state
    console.log([...admins, ...employees]);
    setUsers([...admins, ...employees]);
  };

  const colors = [
    "#395d9b",
    "#0e527e",
    "#357580",
    "#41759d",
    "#0f4f43",
    "#0e7358",
    "#5c7930",
    "#736a3e",
    "#8d751e",
    "#8c653c",
    "#8d4134",
    "#8d6674",
    "#8d4a58",
    "#7f314b",
    "#6b2947",
    "#8d1a62",
    "#8d3c7f",
    "#8b6096",
    "#5f3e8b",
    "#4a3586",
    "#4d2d62",
    "#2e1b67",
    "#383c8d",
    "#1f3866",
    "#42607c",
    "#70717f",
    "#4e505e",
    "#4d3941",
  ];

  const [userHolidays, setUserHolidays] = useState([]);
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  // Function to map userHolidays to user properties
  const mapUserHolidays = (holidays, email) => {
    if (holidays.length === 0) return {};
    return holidays?.reduce((acc, holiday) => {
      const propertyName = toCamelCase(holiday.type);
      acc[propertyName] = holidayInput(
        holiday.value,
        holiday.type,
        email,
        fetchTeamMembersAndHolidays,
        thisUser?.fullName
      );
      return acc;
    }, {});
  };
  // useEffect(() => {
  //   mapUserHolidays();
  // }, [userHolidays]);

  const [holidayRequestsData, setHolidayRequestsData] = useState([]);
  const [selectedPasswordRow, setSelectedPasswordRow] = useState(null);
  const [passwordTableID, setPasswordTableID] = useState(null);

  const [signupData, setSignupData] = useState({
    profileColor: colors[Math.floor(Math.random() * colors.length)],
  });
  const [postContent, setPostContent] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [componentToShow, setComponentToShow] = useState("newTeam");
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [memberInvitationPopup, setMemberInvitationPopup] = useState(false);
  const [isDocumentChange, setIsDocumentChange] = useState(false);
  const [isToggleFontFamily, setIsToggleFontFamily] = useState(false);
  const [isToggleFontSize, setIsToggleFontSize] = useState(false);
  const [currency, setCurrency] = useState({ code: "EUR", symbol: "€" });
  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    const currencySymbols = {
      EUR: "€",
      USD: "$",
      AUD: "$",
      CAD: "$",
      CHF: "CHF",
      CNY: "¥",
      DKK: "kr",
    };

    setCurrency({
      code: selectedCurrency,
      symbol: currencySymbols[selectedCurrency],
    });
  };
  useEffect(() => {
    if (selectedDocument?._id) {
      // Update the states based on the backend response
      setIsToggleFontFamily(
        selectedDocument?.applyFontFamilyToSelectedText || false
      );
      setIsToggleFontSize(
        selectedDocument?.applyFontSizeToSelectedText || false
      );
    }
  }, [selectedDocument?._id]);
  const [holidayHistory, setHolidayHistory] = useState(
    thisUser?.holidayHistory || []
  );
  const [deletemodal, setDeleteModal] = useState(false);
  const [updateRequestModal, setUpdateRequestModal] = useState({});
  const [myHolidayRequests, setMyHolidayRequests] = useState([]);
  const [selectedmember, setSelectedMember] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  return (
    <StateContext.Provider
      value={{
        loginEmail,
        setLoginEmail,
        selectedmember,
        setSelectedMember,
        myHolidayRequests,
        setMyHolidayRequests,
        updateRequestModal,
        setUpdateRequestModal,
        deletemodal,
        setDeleteModal,
        userEmail,
        setUserEmail,
        selectedEmployee,
        setSelectedEmployee,
        employeeSummary,
        setEmployeeSummary,
        fetchTeamMembersAndHolidays,
        setMembers,
        members,
        holidayHistory,
        setHolidayHistory,
        selectedOption,
        setSelectedOption,
        users,
        mapUserHolidays,
        setUsers,
        holidayRequestsData,
        setHolidayRequestsData,
        userHolidays,
        setUserHolidays,
        days,
        setDays,
        memberInvitationPopup,
        setMemberInvitationPopup,
        colors,
        profileModal,
        setProfileModal,
        newTeam,
        setNewTeam,
        workspaces,
        setWorkspaces,
        errorModal,
        setErrorModal,
        successModal,
        setSuccessModal,
        thisUser,
        setThisUser,
        selectedDocument,
        setSelectedDocument,
        allDocuments,
        setAllDocuments,
        componentToShow,
        setComponentToShow,
        videoSrc,
        setVideoSrc,
        imgSrc,
        setImgSrc,
        postContent,
        setPostContent,
        signupData,
        setSignupData,
        passwordTableID,
        setPasswordTableID,
        rowOptionMenu,
        selectedPasswordRow,
        setSelectedPasswordRow,
        passwordTables,
        setPasswordTables,
        repliesArray,
        setRepliesArray,
        commentsArray,
        setCommentsArray,
        currentItemIndex,
        setCurrentItemIndex,
        previewModalFiles,
        setPreviewModalFiles,
        selectedTask,
        setSelectedTask,
        clickedCellInfo,
        setClickedCellInfo,
        modalDataCalendar,
        setModalInfo,
        replaceModalInfo,
        setShowEventModal,
        showEventModal,
        monthIndex,
        setMonthIndex,
        handleSaveNewPassword,
        cardColumns,
        setCardColumns,
        setRowsCard,
        rowsCard,
        rowsPassword,
        setRowsPassword,
        passColumns,
        setPassColumns,
        theme,
        setTheme,
        isSidebarVisible,
        setIsSidebarVisible,
        fileView,
        setFileView,
        searchQuery,
        setSearchQuery,
        uploading,
        setUploading,
        uploadCount,
        setUploadCount,
        currentlyUploadedFiles,
        setCurrentlyUploadedFiles,
        uploadedFiles,
        setUploadedFiles,
        modalShow,
        setModalShow,
        replyFilePreview,
        setReplyFilePreview,
        replyInput,
        setReplyInput,
        defaultState,
        renderFileIcon,
        breakpoint,
        fullscreen,
        setFullscreen,
        FileAltIcons,
        labels,
        setLabels,
        labelModalVisible,
        setLabelModalVisible,
        managingOption,
        setManagingOption,
        rows,
        setRows,
        columns,
        setColumns,
        handleSelectAll,
        selectAll,
        setSelectAll,
        teamName,
        setTeamName,
        handleSaveNewCard,
        showDocSidebar,
        setShowDocSidebar,
        isEmailVerified,
        setIsEmailVerified,
        teamTasks,
        setTeamTasks,
        selectedWorkspace,
        setSelectedWorkspace,
        selectedTeam,
        setSelectedTeam,
        totalVotes,
        setTotalVotes,
        taskMode,
        setTaskMode,
        setInvoiceColumns,
        invoiceColumns,
        setRowsInvoices,
        rowsInvoices,
        rowsQuotes,
        setRowsQuotes,
        setQuoteColumns,
        quoteColumns,
        setShowTeamsPage,
        showTeamsPage,
        setSelectedColorInvoice,
        selectedColorInvoice,
        setClientDetails,
        clientDetails,
        personalDetails,
        setPersonalDetails,
        setInvoiceItems,
        invoiceItems,
        selectedUserTeam,
        setSelectedUserTeam,
        updateTeamUserInformation,
        setTeamsTableRow,
        teamsTableRow,
        setStructuredCommunication,
        structuredCommunication,
        generateStructuredCommunicationNumber,
        setDownPayment,
        downPayment,
        downPaymentAmount,
        setDownPaymentAmount,
        setCommunicationNumber,
        communicationNumber,
        setInvoiceNumber,
        invoiceNumber,
        formattedInvoiceNumber,
        setSelectedStatus,
        selectedStatus,
        tableHiddenPassword,
        setTableHiddenPassword,
        setShowCreateInvoice,
        createInvoice,
        setValidationErrors,
        validationErrors,
        tableTeamName,
        setTableTeamName,
        workspaceID,
        setWorkspaceID,
        setTeamID,
        teamID,
        user,
        setUser,
        isDocumentChange,
        setIsDocumentChange,
        isToggleFontFamily,
        setIsToggleFontFamily,
        isToggleFontSize,
        setIsToggleFontSize,
        isPlanModalOpen,
        setIsPlanModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        handleChange,
        setCurrency,
        currency,
        issuedDate,
        setIssuedDate,
        dueDate,
        setDueDate,
        manualInvoiceNumber,
        setManualInvoiceNumber,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
