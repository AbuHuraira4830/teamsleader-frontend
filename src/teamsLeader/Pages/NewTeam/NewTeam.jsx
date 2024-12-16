import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import {
  BiChevronDown,
  BiHide,
  BiMessageRoundedAdd,
  BiSortAlt2,
} from "react-icons/bi";
import { RxAvatar, RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import "../../../assets/css/newTeam.css";
import { CiLock } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import {
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
  BsColumnsGap,
  BsMenuButtonFill,
  BsTable,
  BsThreeDots,
} from "react-icons/bs";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaAngleDown, FaCheck, FaWpforms } from "react-icons/fa";
import { PiFunnel, PiSidebarSimpleBold, PiTextTBold } from "react-icons/pi";
import { SlHome } from "react-icons/sl";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { ImFilesEmpty } from "react-icons/im";
import { RiNodeTree } from "react-icons/ri";
import { VscTable } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineShare,
  HiOutlineStar,
} from "react-icons/hi";
import { GoCheck, GoPencil } from "react-icons/go";
import OffcanvasComponent from "./Components/Ofcanvas";
// import AddColumnModal from "./Components/addColumnModal";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LiaFileUploadSolid } from "react-icons/lia";
import TableFileUploader from "./Components/TableFileUploader";
import ReactDateRangePicker from "./Components/ReactDateRangePicker";
import { format, parseISO, set } from "date-fns";
import dayjs from "dayjs";
import LabelSelectionModal from "./Components/LabelSelectionModal";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Popover } from "antd";
import { ChromePicker } from "react-color";
import { IoIosStar } from "react-icons/io";
import LinkCell from "./Components/Table components/LinkCell";
import EmailCell from "./Components/Table components/EmailCell";
import CountryCell from "./Components/Table components/CountryCell";
import RatingCell from "./Components/Table components/RatingCell";
import PhoneCell from "./Components/Table components/PhoneCell";
import PeopleCell from "./Components/Table components/PeopleCell";
import WorldClockCell from "./Components/Table components/WorldClockCell";
import LastUpdatedCell from "./Components/Table components/LastUpdatedCell";
import LocationCell from "./Components/Table components/LocationCell";
import TimelineCell from "./Components/Table components/TimelineCell";
import TagsCell from "./Components/Table components/TagsCell";
import VoteCell from "./Components/Table components/VoteCell";
import NewTable from "./NewTable";
import WeekCell from "./Components/Table components/WeekCell";
import NewTablePassword from "./NewTablePassword";
import NewTableCard from "./NewTableCard";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import CalendarWrapper from "../../Calendar/CalendarWrapper";
import { getAPI, postAPI } from "../../../helpers/apis";
import ColorPicker from "./Components/Table components/ColorPicker";
import LabelCell from "./Components/Table components/LabelCell";
import PriorityCell from "./Components/Table components/PriorityCell";
import TextCell from "./Components/Table components/TextCell";
import NumberCell from "./Components/Table components/NumberCell";
import Gallery from "../fileGallery/Gallery";
import { BiCalendar } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import SocialButtons from "../../SocialMediaPlanner/PlannerHeader/SocialButtons";
import PlannerWrapper from "../../SocialMediaPlanner/PlannerWrapper";
import Main from "./Components/Kanban Components/Main";
import ProjectTimer from "./ProjectTimer";

// import DatePicker from "react-multi-date-picker";

// import DateRangePicker from "@wojtekmaj/react-daterange-picker";
// import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
// import "react-calendar/dist/Calendar.css";
export const NewTeam = () => {
  const {
    labels,
    setLabels,
    labelModalVisible,
    setLabelModalVisible,
    rows,
    setRows,
    columns,
    setColumns,
    selectAll,
    handleSelectAll,
    setSelectAll,
    passColumns,
    setPassColumns,
    cardColumns,
    setCardColumns,
    teamTasks,
    setTeamTasks,
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    selectedTask,
    setSelectedTask,
    passwordTables,
    setPasswordTables,
    rowOptionMenu,
    // workspaceID,
    // teamID,
    user,
    thisUser,
  } = useStateContext();
  const { workspaceID, teamID } = useParams();

  const [hoveredRow, setHoveredRow] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userPlan, setUserPlan] = useState(null); // Store the user's plan

  const showModal = () => {
    setModalVisible(true);
  };
  const handleMouseEnter = (item) => {
    // console.log(item, "item");
    setHoveredRow(item);
  };
  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [passwordComponentCount, setPasswordComponentCount] = useState(0);
  const [cardComponentCount, setCardComponentCount] = useState(0);
  const [galleryCounter, setGalleryCounter] = useState(1);
  const [galleryComponents, setGalleryComponents] = useState([]);
  const [actionMenu, setActionMenu] = useState(false);
  const [tabEditing, setTabEditing] = useState(null);
  const [tabRenameInput, setTabRenameInput] = useState("");
  const [statusModal, setStatusModal] = useState(false);

  const renameTab = (item) => {
    // console.log(id);
    setTabRenameInput(item.option);
    setTabEditing(item._id);
    setActionMenu(false);
  };
  const revokeTabEditing = (e, item) => {
    console.log("revoke");
    setTabEditing(null);
    const data = {
      tabID: item._id,
      active: item.option,
      name: e.target.value,
    };
    postAPI("/api/home-tabs/update", { data })
      .then((response) => {
        console.log(response.data);
        setSelectedDropdownOption(response.data.tabs);
        setTabRenameInput("");
      })
      .catch((err) => {
        console.log(err);
      });
    setActiveTab(item?.key);
  };

  useEffect(() => {
    getAPI("/api/password-table/list")
      .then((response) => {
        setPasswordTables(response.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  const handleAddPasswordsClick = () => {
    setPasswordComponentCount((prevCount) => prevCount + 1);
    const data = {
      name: "Group Title",
      color: "#00854d",
    };
    // console.log(data)
    postAPI(`/api/password-table/store`, data)
      .then((response) => {
        setPasswordTables(response.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddCardsClick = () => {
    // setCardComponentCount((prevCount) => prevCount + 1);
  };

  const [tableData, setTableData] = useState([
    {
      item: "Item 1",
      person: 30,
      status: "Working on it",
      date: "",
      id: "1",
      selected: false,
    },
    {
      item: "Item 2",
      person: 30,
      status: "Done",
      date: "",
      id: "2",
      selected: false,
    },
    {
      item: "Item 3",
      person: 30,
      status: "Stuck",
      date: "",
      id: "3",
      selected: false,
    },
  ]);

  const handleRowSelect = (id) => {
    const updatedTableData = rows.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setRows(updatedTableData);
  };

  const [tableHidden, setTableHidden] = useState(true);
  const [iconRotation, setIconRotation] = useState(0);
  const handleToggleTable = () => {
    setTableHidden(!tableHidden);
    setIconRotation(iconRotation === 0 ? 270 : 0);
  };
  const iconStyle = {
    transform: `rotate(${iconRotation}deg)`,
  };
  // add new item
  const [newItemInput, setNewItemInput] = useState({});
  const handleNewItemInputChange = (tableId, value) => {
    setNewItemInput((prevInputs) => ({
      ...prevInputs,
      [tableId]: value,
    }));
  };

  // const handleAddNewRow = () => {
  //   const newRow = {
  //     id: uuidv4(),
  //     selected: false,
  //     status: "", // You can set the initial status as needed
  //     task: newItemInput,
  //     // data: {
  //     //   [columns[1].id]: ,
  //     // },
  //   };
  //   setRows((prevRows) => [...prevRows, newRow]);
  //   setNewItemInput("");
  // };

  const handleKeyPress = (event, id, newItemInput, firstTask) => {
    if (event.key === "Enter") {
      let data = {
        teamID: teamTasks._id,
        title: newItemInput,
        tableID: id,
        firstTaskID: firstTask,
        ownerColor: thisUser.profileColor,
        ownerPicture: thisUser.picture,
      };
      postAPI("/api/tasks/store", data)
        .then((response) => {
          if (response.status === 200) {
            setTeamTasks(response.data.teamData);
            console.log(response);
            setNewItemInput("");

            // handleAddNewRow();
          } else {
            console.log(response.data);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            return window.location.replace("/login");
          }
          console.log("Unexpected error: ", err);
        });
    }
  };
  // delete item
  const handleDeleteRow = (id) => {
    const updatedTableData = rows.filter((item) => item.id !== id);
    setRows(updatedTableData);
  };

  const [show, setShow] = useState(null);
  const handleClose = () => {
    setShow(null);
  };
  const handleShow = (id) => setShow(id);

  const [mainTbl_addBtn_menu, setMainTbl_addBtn_menu] = useState([
    {
      icon: <VscTable className="me-2 mt-1 fs-6 align-middle" />,
      option: "Table",
      key: "Table",
      id: Math.random().toString(),
    },
    {
      icon: <AiOutlineCalendar className="me-2 mt-1 fs-6 align-middle" />,
      option: "Calendar",
      key: "Calendar",
      id: Math.random().toString(),
    },

    {
      icon: <GrGallery className="me-2 mt-1 fs-6 align-middle" />,
      option: "Files Gallery",
      key: "Files Gallery",
      id: Math.random().toString(),
    },
    // {
    //   icon: <FaWpforms className="me-2 mt-1 fs-6 align-middle" />,
    //   option: "Form",
    //   id: Math.random().toString(),
    // },
    {
      icon: <ViewKanbanOutlinedIcon className="me-2 mt-1 fs-6 align-middle" />,
      option: "Kanban",
      key: "Kanban",
      id: Math.random().toString(),
    },
    // {
    //   icon: <BiCalendar className="me-2 mt-1 fs-6 align-middle" />,
    //   option: "Social Planner",
    //   key: "Social Planner",
    //   id: Math.random().toString(),
    // },

    // {
    //   icon: <MdCheckBoxOutlineBlank className="me-2 mt-1 fs-6 align-middle" />,
    //   option: "Blank View",
    //   id: Math.random().toString(),
    // },
  ]);

  const filteredMenu = mainTbl_addBtn_menu.filter(
    (item) =>
      !(userPlan?.package === "trial" && item.option === "Social Planner")
  );
  const mainTbl_btn_optionMenu = [
    {
      icon: <HiOutlineStar className="me-2 mt-1 fs-6 align-middle" />,
      option: "Add to my favourites",
    },
    {
      icon: <SlHome className="me-2 mt-1 fs-6 align-middle" />,
      option: "Set as board default",
    },
    {
      icon: <GoPencil className="me-2 mt-1 fs-6 align-middle" />,
      option: "Rename",
    },
    {
      icon: (
        <HiOutlineDocumentDuplicate className="me-2 mt-1 fs-6 align-middle" />
      ),
      option: "Duplicate",
    },
    {
      icon: <HiOutlineShare className="me-2 mt-1 fs-6 align-middle" />,
      option: "Share",
    },
    {
      icon: <FiTrash className="me-2 mt-1 fs-6 align-middle" />,
      option: "Delete",
    },
  ];
  const [selectedDropdownOption, setSelectedDropdownOption] = useState([]);
  useEffect(() => {
    getAPI("/api/home-tabs/list")
      .then((response) => {
        setSelectedDropdownOption(response.data.tabs);
        const tab = response.data.tabs.find((tab) => tab.active === tab.key);
        setActiveTab(tab?.active);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBtn = (id) => {
    postAPI("/api/home-tabs/delete", { id })
      .then((response) => {
        if (response.data?.tabs?.length) {
          const tab = response.data.tabs.find((tab) => tab.active === tab.key);
          setSelectedDropdownOption(response.data.tabs);
          setActiveTab(tab?.active);
        } else {
          setActiveTab("Main Table");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // const updatedTableData = selectedDropdownOption.filter(
    //   (item) => item.id !== id
    // );

    // // console.log(updatedTableData, "updatedTableData");
    // setSelectedDropdownOption(updatedTableData);
  };

  const handleAddGallery = () => {
    postAPI(`/api/gallery/store`, {
      name: "File Gallery",
      teamID: selectedTeam?._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropdownSelect = (item) => {
    const data = { name: item.option, active: item.option, key: item.option };

    console.log(data);
    postAPI("/api/home-tabs/store", { data })
      .then((response) => {
        setSelectedDropdownOption(response.data.tabs);
        setActiveTab(item.option);
        if (
          item.option === "Files Gallery" &&
          !selectedDropdownOption.some(
            (item) => item.option === "Files Gallery"
          )
        )
          handleAddGallery();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [editedItemId, setEditedItemId] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState("");

  const updateItemValue = (itemId, newValue) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === itemId) {
          return {
            ...row,
            task: newValue,
            // data: {
            //   ...row.data,
            //   [columns[1].id]: newValue,
            // },
          };
        }
        return row;
      })
    );
  };
  const handleItemEditStart = (id, item) => {
    setEditedItemId(id);
    setEditedItemValue(item);
  };
  const handleItemEditEnd = (e) => {
    console.log(e.target.value);
    if (editedItemValue?.trim() !== "") {
      updateItemValue(editedItemId, editedItemValue);
    }
    setEditedItemId(null);
    setEditedItemValue("");
  };
  const moveRowToTop = (id) => {
    const updatedTableData = rows.slice();
    const index = updatedTableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      const movedItem = updatedTableData.splice(index, 1)[0];
      updatedTableData.unshift(movedItem);
      setRows(updatedTableData);
    }
  };

  const duplicateRow = (id) => {
    const updatedTableData = rows.slice();
    const index = updatedTableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      const duplicatedItem = {
        ...updatedTableData[index],
        id: uuidv4(),
      };
      updatedTableData.splice(index + 1, 0, duplicatedItem);
      setRows(updatedTableData);
    }
  };
  const [showCanvas, setShowCanvas] = useState(false);
  const closeCanvas = () => setShowCanvas(false);
  const toggleCanvas = () => setShowCanvas((s) => !s);

  const addColumn = (columnName, tableID) => {
    const currentMaxSequence = teamTasks?.tasks[0]?.columns.reduce(
      (max, column) => {
        return column.sequence > max ? column.sequence : max;
      },
      0
    );

    // New column's sequence number is one more than the current maximum
    const newColumnSequence = currentMaxSequence + 1;
    console.log(newColumnSequence, newColumnSequence);

    let data = {
      name: columnName,
      teamID: teamTasks._id,
      workspaceID: selectedWorkspace._id,
      sequence: newColumnSequence,
      tableID: tableID,
    };

    postAPI("/api/task-columns/store", data)
      .then((response) => {
        if (response.status === 200) {
          // setSelectedWorkspace(response.data.workspace);
          // const team = response.data.workspace.teams.find(
          //   (team) => team._id === selectedTeam._id
          // );
          setTeamTasks(response.data.team);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpload = (columnId, rowId, file) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const column = newColumns.find((c) => c.id === columnId);
      const fileData = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      };
      if (column && column.name === "Files") {
        const files = { ...column.files };

        // Ensure the 'files' property is initialized for the rowId
        if (!files[rowId]) {
          files[rowId] = {};
        }

        files[rowId] = fileData;
        column.files = files;
      }

      return newColumns;
    });
  };
  const handleFileDelete = (columnId, rowId) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const column = newColumns.find((c) => c.id === columnId);
      if (column) {
        const files = { ...column.files };
        delete files[rowId];
        column.files = files;
      }
      return newColumns;
    });
  };
  const [selectedButton, setSelectedButton] = useState();
  const handleCheckboxClick = (rowId, columnId) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            data: {
              ...row.data,
              [columnId]: !row.data[columnId], // Toggle checkbox value
            },
          };
        }
        return row;
      });
    });
  };

  const [selectedLabelCellId, setSelectedLabelCellId] = useState(null);
  const handleLabelSelection = (newLabel) => {
    const clickedLabel = labels.find((label) => label.id === newLabel.id);
    if (clickedLabel) {
      setRows((prevRows) => {
        return prevRows.map((row) => {
          if (row.id === selectedLabelCellId.rowId) {
            return {
              ...row,
              data: {
                ...row.data,
                text: clickedLabel.text,
                backgroundColor: clickedLabel.backgroundColor,
              },
            };
          }
          return row;
        });
      });
    }
    closeLabelModal();
  };

  const handleCellClick = (rowId, columnId) => {
    setSelectedLabelCellId({ rowId, columnId });
    setLabelModalVisible(true);
  };
  const closeLabelModal = () => {
    setSelectedLabelCellId(null);
  };
  const labelModalRef = useRef();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!status) {
      getAPI("/api/task-status/list")
        .then((response) => {
          setStatus(response.data.taskStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  const handleStatusSelection = (statusID, taskId) => {
    // const clickedStatus = status.find((status) => status.id === statusID);
    // if (clickedStatus) {
    postAPI(`/api/tasks/status-update/${taskId}`, {
      statusID: statusID,
      teamID: teamTasks._id,
    })
      .then((response) => {
        setStatusModal(false);
        setTeamTasks(response.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let autoNumberCounter = 0;
  const handelAutoNumber = () => {
    autoNumberCounter += 1;
    return autoNumberCounter;
  };

  const renderComponentForColumn = (
    columnId,
    columnName,
    columnData,
    rowId,
    table
  ) => {
    // const column = columns.find((c) => c.id === columnId);
    // const timelineValue = rows.find((row) => row.id === rowId)?.data.timeline;
    const backgroundColor = "#BCBDBE";
    // rows.find((row) => row.id === rowId)?.data?.backgroundColor || "#BCBDBE";
    // const colorPicker = rows.find((row) => row.id === rowId)?.colorPicker;
    // if (!column) {
    // return null;
    // }
    return columnName === "Numbers" ? (
      <NumberCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Text" ? (
      <TextCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Files" ? (
      <TableFileUploader
        columnID={columnId}
        columnData={columnData}
        // files={column.files ? column.files[rowId] : undefined}
        // onFileUpload={(file) => handleFileUpload(column.id, rowId, file)}
        // onFileDelete={() => handleFileDelete(column.id, rowId)}
      />
    ) : columnName === "Date" ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    ) : columnName === "Label" ? (
      <LabelCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Timeline" ? (
      <TimelineCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Button" ? (
      <Button
        className="primary"
        size="sm"
        style={{ backgroundColor: "#579BFC", border: "none" }}
      >
        Click me
      </Button>
    ) : columnName === "Link" ? (
      <LinkCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Email" ? (
      <EmailCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Country" ? (
      <CountryCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Phone" ? (
      <PhoneCell columnID={columnId} columnData={columnData} />
    ) : columnName === "People" ? (
      <PeopleCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : columnName === "World Clock" ? (
      <WorldClockCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Location" ? (
      <LocationCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Tags" ? (
      <TagsCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Vote" ? (
      <VoteCell columnID={columnId} table={table} columnData={columnData} />
    ) : columnName === "Week" ? (
      <WeekCell columnID={columnId} columnData={columnData} />
    ) : // ""
    columnName === "Last Updated" ? (
      <LastUpdatedCell
        rowId={rowId}
        columnID={columnId}
        columnData={columnData}
      />
    ) : columnName === "Rating" ? (
      <RatingCell columnID={columnId} columnData={columnData} />
    ) : columnName === "Auto Number" ? (
      <p>{handelAutoNumber()}</p>
    ) : columnName === "Priority" ? (
      <PriorityCell columnID={columnId} columnData={columnData} />
    ) : // ""
    columnName === "Item ID" ? (
      <span>
        <p className="m-0">
          {rowId.length > 10 ? `${rowId.substring(0, 10)}...` : rowId}
        </p>
      </span>
    ) : columnName === "Color Picker" ? (
      <ColorPicker columnID={columnId} columnData={columnData} />
    ) : columnName === "Checkbox" ? (
      <span
        className="d-flex justify-content-center"
        onClick={() => handleCheckboxClick(rowId, columnId)}
        style={{ cursor: "pointer", height: "27px" }}
      >
        {rows.find((row) => row.id === rowId)?.data[columnId] ? (
          <GoCheck style={{ color: "#05CB74" }} />
        ) : null}
      </span>
    ) : null;
  };

  // const commonTdProps = {
  //   key: columns[4].id,
  //   className: "text-center",
  //   style: {
  //     backgroundColor: row.status.backgroundColor,
  //   },
  //   onClick: () => handleCellClick(columns[4].id, row.id),
  // };

  // from falak
  const [activeTab, setActiveTab] = useState("Main Table");
  const handleClickTab = (item) => {
    console.log(item);
    const data = { tabID: item._id, active: item.key, key: item.key };
    postAPI("/api/home-tabs/update", { data })
      .then((response) => {
        setSelectedDropdownOption(response.data.tabs);
      })
      .catch((err) => {
        console.log(err);
      });
    setActiveTab(item?.key);
  };

  useEffect(() => {
    if (selectedTeam)
      getAPI(`/api/tables/list?teamID=${selectedTeam?._id}`).then((res) => {
        setTeamTasks(res.data.team);
        // console.log({ res });
      });
  }, []);
  const addTodoList = () => {
    const data = {
      name: "Group Title",
      color: "#00854d",
      teamID: teamTasks._id,
    };
    // console.log(data)
    postAPI(`/api/tables/store`, data)
      .then((response) => {
        setTeamTasks(response.data.team);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <div className="px-4 pt-3 newTeam " style={{ height: "100vh" }}>
    // <div className="px-4 pt-3 newTeam mb-[5rem]  ">
    <div
      className="px-4 pt-3 newTeam mb-[5rem]  overflow-auto"
      style={{ height: "auto" }}
    >
      <div className="flex mb-2 items-center justify-between">
        <h3
          style={{ color: "var(--text-color)" }}
          className="text-[24px] font-semibold"
        >
          {selectedTeam?.name}
        </h3>
        {/* <Button className="ms-1 px-1 fs-4 workspace_menuBtn bgHover align-middle">
            <BiChevronDown />
          </Button> */}
        {/* ==================Invite Employee/Client============= */}
        <div className="centerIt">
          <ProjectTimer />
          <Link
            to={`/workspace/${workspaceID}/team/${teamID}/teams-invites`}
            className=" no-underline	"
          >
            <button
              className=" teamInvite_btn bgHover align-middle me-1 text-color"
              onClick={showModal}
            >
              <FaRegUser className="text-base mx-2  " />
              <span className="text-sm mt-1 "> Invite / 1</span>
            </button>
          </Link>
          {/* <Button
            className="ms-1 px-1 fs-4 workspace_menuBtn bgHover align-middle"
            style={{ display: "flex" }}
          >
            <BsThreeDots className=" fs-5 " />
          </Button> */}
        </div>
      </div>
      <div className=" main_tableBtnDiv mb-3 d-flex">
        <span className=" d-flex" onClick={() => setActiveTab("Main Table")}>
          <span
            style={{
              borderBottom:
                !selectedDropdownOption.length ||
                (activeTab === "Main Table" && "2px solid #00854d"),
              marginBottom:
                activeTab === "Main Table" ||
                (!selectedDropdownOption.length && "-3px"),
            }}
          >
            {/* <Button
              className=" workspace-dropdown-button  align-self-center  text-start py-1  px-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SlHome className="me-2 " />
              Main Table12
            </Button> */}
          </span>
          {/* <div className="vr mx-1 nav_splitter align-self-center"></div> */}
        </span>

        {selectedDropdownOption?.map((option) => (
          <span
            key={option._id}
            className="d-flex"
            // style={{marginBottom: "-3px" }}
            onMouseEnter={() => handleMouseEnter(option._id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleClickTab(option);
            }}
          >
            <span
              style={{
                borderBottom:
                  option.active === activeTab && "2px solid #00854d",
                marginBottom: option.active === activeTab && "-3px",
              }}
            >
              <Button
                className="d-flex workspace-dropdown-button align-self-center py-1  px-2 "
                style={{ display: "flex", height: "33px" }}
              >
                {/* <Button className="workspace-dropdown-button workspace-dropdownBtn align-self-center py-1  px-2 flex"> */}
                {/* {option.icon} */}
                {tabEditing === option._id ? (
                  <Form.Control
                    style={{ width: "150px" }}
                    type="text"
                    autoFocus
                    value={tabRenameInput}
                    onChange={(e) => setTabRenameInput(e.target.value)}
                    onBlur={(e) => revokeTabEditing(e, option)}
                    className=" py-0 shadow-none workspace_searchInput  rounded-0   text-start "
                  />
                ) : (
                  option.option
                )}

                <Popover
                  content={
                    <div
                      className="d-block rounded-2 p-2"
                      style={{ width: "220px" }}
                    >
                      {mainTbl_btn_optionMenu.map((item, index) => (
                        <Button
                          key={index}
                          onClick={() => {
                            item.option === "Delete"
                              ? deleteBtn(option._id)
                              : item.option === "Rename"
                              ? renameTab(option)
                              : "";
                          }}
                          // handleMouseLeave)
                          className="workspace-dropdown-button  fw-normal text-start py-1 w-100 px-2"
                          style={{
                            height: "34px",
                          }}
                          // onClick= {}
                        >
                          <span className="centerIt">
                            {item.icon}
                            {item.option}
                          </span>
                        </Button>
                      ))}
                    </div>
                  }
                  open={actionMenu === option._id}
                  onOpenChange={(newOpen) =>
                    setActionMenu(newOpen ? option._id : null)
                  }
                  trigger="click"
                  placement="bottom"
                >
                  {!tabEditing && (
                    <Button
                      className={` ${
                        hoveredRow === option._id ? "" : "disply_none"
                      }
                      ${option.key === "Main Table" && "disply_none"}
                        px-1 py-0 workspace_menuBtn  menuBtn text-center mx-1 focusClass menuBg `}
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    >
                      <BsThreeDots className=" fs-6 align-middle mt-1" />
                    </Button>
                  )}
                </Popover>
              </Button>
            </span>
            <div className="vr mx-1 nav_splitter align-self-center"></div>
          </span>
        ))}
        <span>
          <Dropdown>
            <Dropdown.Toggle className="p-2 workspace_menuBtn bgHover align-middle">
              <FiPlus />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filteredMenu.map((item, index) => (
                <Dropdown.Item key={index} href="#" className="">
                  <Button
                    className="workspace-dropdown-button workspace-dropdownBtn fw-normal align-self-center w-100 text-start py-1 px-2"
                    style={{
                      height: "34px",
                    }}
                    onClick={() => handleDropdownSelect(item)}
                  >
                    <div className="d-flex items-center">
                      <span>{item.icon}</span>
                      <span className="pt-1">{item.option}</span>
                    </div>
                  </Button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </div>
      {activeTab !== "Calendar" &&
        activeTab !== "Social Planner" &&
        activeTab !== "Kanban" && (
          <>
            <div className="d-flex items-center newTeam_nav mb-5">
              <Button
                onClick={addTodoList}
                type="button"
                className=" px-2 py-1   workspace_addBtn border-0 rounded-1   "
                style={{ backgroundColor: "#025231", fontSize: "14px" }}
              >
                New Item
              </Button>
              {/* <ButtonGroup className=" me-4">
              <Button className=" py-0    workspace_addBtn  border-0 rounded-1   ">
                Add Table
              </Button>
              <Dropdown className=" py-0    workspace_addBtn  border-0 rounded-1 rounded-end-1 rounded-1 rounded-start-1  ">
                <Dropdown.Toggle
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  New Item{" "}
                  <FaAngleDown className="mt-[0.2rem] ml-2 mb-[0.1rem]" />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="border-0 "
                  style={{
                    width: "220px",
                    padding: "8px",
                  }}
                >
                  <Dropdown.Item>
                    <div className="fs_1 centerIt" onClick={addTodoList}>
                      <BsTable className="folderIcon " />
                      Add Todo List
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div
                      className="fs_1 centerIt"
                      onClick={handleAddPasswordsClick}
                    >
                      <CiLock className="folderIcon " />
                      Add Passwords
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div
                      className="fs_1 centerIt"
                      onClick={handleAddCardsClick}
                    >
                      <CiCreditCard1
                        className="folderIcon "
                        style={{ marginTop: "" }}
                      />
                      Add Cards
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup> */}

              {/* <Button
              className=" fs-6 workspace-dropdown-button workspace-dropdownBtn align-middle  text-start py-1 me-2 px-2"
              style={{ display: "flex" }}
            >
              <RxMagnifyingGlass className="me-1 fs-5 " />
              Search
            </Button>
            <Button
              className=" fs-6 workspace-dropdown-button workspace-dropdownBtn align-middle  text-start py-1 me-2 px-2"
              style={{ display: "flex" }}
            >
              <RxAvatar className="me-1 fs-5 " />
              Person
            </Button>

            <ButtonGroup className="filtr_btn me-2">
              <Button
                type="button"
                className=" px-2 py-1 workspace-dropdown-button workspace-dropdownBtn border-0 rounded-1 rounded-end-0  
            "
                style={{ display: "flex" }}

                // style={{ backgroundColor: "#025231", fontSize: "14px" }}
              >
                <PiFunnel className="me-1 fs-5 " />
                Filter
              </Button>
              <Button
                className=" px-0 py-0  workspace_menuBtn bgHover rounded-1 rounded-start-0  border-0  border-bottom-0 border-end-0 border-top-0"
                style={{
                  backgroundColor: "#025231",
                  borderLeft: "1px solid #ffffff",
                }}
              >
                <BsChevronDown className="mt-1" />
              </Button>
            </ButtonGroup>

            <Button
              className="fs-6 workspace-dropdown-button workspace-dropdownBtn align-middle  text-start py-1 me-2 px-2"
              style={{ display: "flex" }}
            >
              <BiSortAlt2 className="me-1 fs-5 " />
              Sort
            </Button>
            <Button
              className="fs-6 workspace-dropdown-button workspace-dropdownBtn align-middle  text-start py-1 me-2 px-2"
              style={{ display: "flex" }}
            >
              <BiHide className="me-1 fs-5 " />
              Hide
            </Button>
            <Button
              className="fs-6 workspace-dropdown-button workspace-dropdownBtn align-middle  text-start py-1 me-2 px-2"
              style={{ display: "flex" }}
            >
              <PiSidebarSimpleBold className="me-1 fs-5 " />
              Group by
            </Button>
            <Button
              className="ms-1 px-1 fs-4 workspace_menuBtn bgHover align-middle"
              style={{ display: "flex" }}
            >
              <BsThreeDots className=" fs-5 " />
            </Button> */}
            </div>
          </>
        )}

      <OffcanvasComponent show={showCanvas} handleClose={closeCanvas} />

      {activeTab === "Calendar" ? (
        <CalendarWrapper />
      ) : activeTab === "Table" ||
        activeTab === "Main Table" ||
        !selectedDropdownOption.length ? (
        teamTasks?.tables?.map((table) => (
          <NewTable
            key={table._id}
            setSelectedTask={setSelectedTask}
            table={table}
            tasks={table.tasks}
            tableHidden={tableHidden}
            iconStyle={iconStyle}
            handleToggleTable={handleToggleTable}
            tableData={tableData}
            columns={columns}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleShow={handleShow}
            hoveredRow={hoveredRow}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            rowOptionMenu={rowOptionMenu}
            handleDeleteRow={handleDeleteRow}
            moveRowToTop={moveRowToTop}
            duplicateRow={duplicateRow}
            handleRowSelect={handleRowSelect}
            editedItemId={editedItemId}
            editedItemValue={editedItemValue}
            setEditedItemValue={setEditedItemValue}
            handleItemEditEnd={handleItemEditEnd}
            handleItemEditStart={handleItemEditStart}
            setShowCanvas={setShowCanvas}
            status={status}
            setStatus={setStatus}
            renderComponentForColumn={renderComponentForColumn}
            newItemInput={newItemInput[table._id] || ""} // Use input value specific to each table
            handleNewItemInputChange={(value) =>
              handleNewItemInputChange(table._id, value)
            }
            handleKeyPress={handleKeyPress}
            show={show}
            handleClose={handleClose}
            setSelectedButton={setSelectedButton}
            addColumn={addColumn}
            rows={rows}
            setRows={setRows}
            handleStatusSelection={handleStatusSelection}
            statusModal={statusModal}
            setStatusModal={setStatusModal}
            setTableData={setTableData}
          />
        ))
      ) : activeTab === "Social Planner" ? (
        <PlannerWrapper />
      ) : activeTab === "Files Gallery" ? (
        <Gallery
          galleryComponents={galleryComponents}
          setGalleryComponents={setGalleryComponents}
          galleryCounter={galleryCounter}
        />
      ) : activeTab === "Kanban" ? (
        <Main />
      ) : (
        ""
      )}

      {/* falak code  */}

      {/* {activeTab === "Kanban" ? (
        <>
          <PlannerWrapper />
        </>
      ) : (
        <>
          {/* <Gallery
            galleryComponents={galleryComponents}
            setGalleryComponents={setGalleryComponents}
            galleryCounter={galleryCounter}
          /> */}

      {/* </> */}
      {/* )} */}
    </div>
  );
};
