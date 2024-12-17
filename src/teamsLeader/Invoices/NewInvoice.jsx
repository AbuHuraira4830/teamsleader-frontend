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
import "../../assets/css/newTeam.css";
import { CiLock } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { BsArrowUp, BsChevronDown, BsThreeDots } from "react-icons/bs";
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
import OffcanvasComponent from "../Pages/NewTeam/Components/Ofcanvas";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableFileUploader from "../Pages/NewTeam/Components/TableFileUploader";
import LabelSelectionModal from "../Pages/NewTeam/Components/LabelSelectionModal";
import { useStateContext } from "../../contexts/ContextProvider";
import { Popover } from "antd";
import { ChromePicker } from "react-color";
import LinkCell from "../Pages/NewTeam/Components/Table components/LinkCell";
import EmailCell from "../Pages/NewTeam/Components/Table components/EmailCell";
import CountryCell from "../Pages/NewTeam/Components/Table components/CountryCell";
import RatingCell from "../Pages/NewTeam/Components/Table components/RatingCell";
import PhoneCell from "../Pages/NewTeam/Components/Table components/PhoneCell";
import PeopleCell from "../Pages/NewTeam/Components/Table components/PeopleCell";
import WorldClockCell from "../Pages/NewTeam/Components/Table components/WorldClockCell";
import LocationCell from "../Pages/NewTeam/Components/Table components/LocationCell";
import TimelineCell from "../Pages/NewTeam/Components/Table components/TimelineCell";
import TagsCell from "../Pages/NewTeam/Components/Table components/TagsCell";
import VoteCell from "../Pages/NewTeam/Components/Table components/VoteCell";
import NewTable from "../Pages/NewTeam/NewTable";
import WeekCell from "../Pages/NewTeam/Components/Table components/WeekCell";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import CalendarWrapper from "../Calendar/CalendarWrapper";
import { TbFileInvoice } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { CgQuoteO } from "react-icons/cg";
import InvoiceTable from "./InvoiceTable";
import RevenueWrapper from "./RevenueWrapper";
import QuoteTable from "./QuoteTable";
import { PiUsersThreeLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import "../../assets/css/newTeam.css";
export const NewInvoice = () => {
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
    rowsInvoices,
    setRowsInvoices,
  } = useStateContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const [hoveredRow, setHoveredRow] = useState(null);
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

  const handleAddPasswordsClick = () => {
    setPasswordComponentCount((prevCount) => prevCount + 1);
  };
  const handleAddCardsClick = () => {
    setCardComponentCount((prevCount) => prevCount + 1);
  };

  const [tableData, setTableData] = useState([
    {
      item: "Item 1",
      person: 30,
      status: "Not Sent",
      date: "",
      id: "1",
      selected: false,
    },
    {
      item: "Item 2",
      person: 30,
      status: "Unpaid",
      date: "",
      id: "2",
      selected: false,
    },
    {
      item: "Item 3",
      person: 30,
      status: "Paid",
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
      icon: <RiNodeTree className="me-2 fs-6 align-middle" />,
      option: "Add subitem",
    },
    {
      icon: <FiPlus className="me-2 fs-6 align-middle" />,
      option: "Create item below",
    },
    { icon: <FiTrash className="me-2 fs-6 align-middle" />, option: "Delete" },
  ];
  // add new item
  const [newItemInput, setNewItemInput] = useState("");
  const handleAddNewRow = () => {
    const newRow = {
      id: uuidv4(),
      selected: false,
      status: "", // You can set the initial status as needed
      task: newItemInput,
      // data: {
      //   [columns[1].id]: ,
      // },
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setNewItemInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddNewRow();
    }
  };
  // delete item
  const handleDeleteRow = (id) => {
    const updatedTableData = rows.filter((item) => item.id !== id);
    setRows(updatedTableData);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [mainTbl_addBtn_menu, setMainTbl_addBtn_menu] = useState([
    {
      icon: <VscTable className="me-2 mt-1 fs-6 align-middle" />,
      option: "Table",
      id: Math.random().toString(),
    },
    {
      icon: <AiOutlineCalendar className="me-2 mt-1 fs-6 align-middle" />,
      option: "Calendar",
      id: Math.random().toString(),
    },
    {
      icon: <GrGallery className="me-2 mt-1 fs-6 align-middle" />,
      option: "Files Gallery",
      id: Math.random().toString(),
    },
    {
      icon: <FaWpforms className="me-2 mt-1 fs-6 align-middle" />,
      option: "Form",
      id: Math.random().toString(),
    },
    {
      icon: <ViewKanbanOutlinedIcon className="me-2 mt-1 fs-6 align-middle" />,
      option: "Kanban",
      id: Math.random().toString(),
    },
    {
      icon: <MdCheckBoxOutlineBlank className="me-2 mt-1 fs-6 align-middle" />,
      option: "Blank View",
      id: Math.random().toString(),
    },
  ]);
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
  const deleteBtn = (id) => {
    // console.log(id, "deleting item");
    // debugger
    const updatedTableData = selectedDropdownOption.filter(
      (item) => item.id !== id
    );

    // console.log(updatedTableData, "updatedTableData");
    setSelectedDropdownOption(updatedTableData);
  };
  const handleDropdownSelect = (item) => {
    setSelectedDropdownOption([...selectedDropdownOption, item]);
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
  const handleItemEditEnd = () => {
    if (editedItemValue.trim() !== "") {
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

  const addColumn = (columnName) => {
    const newColumn = { id: uuidv4(), name: columnName }; // Generate a UUID for the new column
    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setRows((prevRows) => {
      return prevRows.map((row) => {
        return {
          ...row,
          data: {
            ...row.data,
            [newColumn.id]: "", // Use column ID as the key
          },
        };
      });
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
  const [selectedTimelineDates, setSelectedTimelineDates] = useState([]);

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
  const [status, setStatus] = useState([
    { text: "Not Sent", backgroundColor: "#fdab3d", id: uuidv4() },
    { text: "Unpaid", backgroundColor: "#e2445c", id: uuidv4() },
    { text: "Paid", backgroundColor: "#00c875", id: uuidv4() },
  ]);

  const handleStatusSelection = (newStatus) => {
    const clickedStatus = status.find((status) => status.id === newStatus.id);
    if (clickedStatus) {
      setRows((prevRows) => {
        return prevRows.map((row) => {
          if (row.id === selectedLabelCellId.rowId) {
            return {
              ...row,
              status: {
                text: clickedStatus.text,
                backgroundColor: clickedStatus.backgroundColor,
              },
            };
          }
          return row;
        });
      });
    }
  };
  const [statusModal, setStatusModal] = useState(false);

  const handleOpenChange = (rowId, columnId, newOpen) => {
    setStatusModal(newOpen);
    setSelectedLabelCellId({ rowId, columnId });
  };

  const [priortyModalVisible, setPriortyModalVisible] = useState(false);
  const [priority, setPriority] = useState([
    { text: "Critical ⚠️️", backgroundColor: "#5C5C5C", id: uuidv4() },
    { text: "High", backgroundColor: "#6645A9", id: uuidv4() },
    { text: "Medium", backgroundColor: "#777AE5", id: uuidv4() },
    { text: "Low", backgroundColor: "#6E9CE3", id: uuidv4() },
  ]);
  const handlePrioritySelection = (newPriority) => {
    const clickedPriority = priority.find(
      (label) => label.id === newPriority.id
    );
    console.log({ clickedPriority });
    if (clickedPriority) {
      setRows((prevRows) => {
        return prevRows.map((row) => {
          if (row.id === selectedLabelCellId.rowId) {
            return {
              ...row,
              priority: {
                text: clickedPriority.text,
                backgroundColor: clickedPriority.backgroundColor,
              },
            };
          }
          return row;
        });
      });
    }
    closeLabelModal();
  };

  const [tableColorPicker, setTableColorPicker] = useState(false);
  const handleColorPicker = (rowId, columnId, newOpen) => {
    setTableColorPicker(newOpen);
  };
  const handleColorPickerColumn = (id, color) =>
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, colorPicker: color.hex } : row
      )
    );
  const clearColorPickerCell = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, colorPicker: "" } : row))
    );
  };

  let autoNumberCounter = 0;
  const handelAutoNumber = () => {
    autoNumberCounter += 1;
    return autoNumberCounter;
  };

  const renderComponentForColumn = (columnId, rowId, rowBackgroundColor) => {
    const column = columns.find((c) => c.id === columnId);
    const timelineValue = rows.find((row) => row.id === rowId)?.data.timeline;
    const backgroundColor =
      rows.find((row) => row.id === rowId)?.data?.backgroundColor || "#BCBDBE";
    const colorPicker = rows.find((row) => row.id === rowId)?.colorPicker;
    if (!column) {
      return null;
    }
    return column.name === "Numbers" ? (
      <Form.Control
        className="rounded-1 py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100"
        type="number"
      />
    ) : column.name === "Text" ? (
      <Form.Control
        className="rounded-1 py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100"
        type="text"
      />
    ) : column.name === "Files" ? (
      <TableFileUploader
        files={column.files ? column.files[rowId] : undefined}
        onFileUpload={(file) => handleFileUpload(column.id, rowId, file)}
        onFileDelete={() => handleFileDelete(column.id, rowId)}
      />
    ) : column.name === "Date" ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    ) : column.name === "Label" ? (
      labelModalVisible ? (
        <Popover
          content={
            <LabelSelectionModal
              labels={labels}
              setLabels={setLabels}
              labelModalRef={labelModalRef}
              handleSelection={handleLabelSelection}
            />
          }
          trigger="click"
          open={
            selectedLabelCellId &&
            selectedLabelCellId.rowId === rowId &&
            selectedLabelCellId.columnId === columnId
          }
        >
          <span
            className="flex justify-content-center statusSpan"
            onClick={() => handleCellClick(rowId, columnId)}
            style={{
              backgroundColor: backgroundColor,
              position: "relative",
            }}
          >
            {rows.find((row) => row.id === rowId)?.data.text}
          </span>
        </Popover>
      ) : (
        <span
          className="flex justify-content-center statusSpan"
          onClick={() => handleCellClick(rowId, columnId)}
          style={{
            backgroundColor: backgroundColor,
            position: "relative",
          }}
        >
          {rows.find((row) => row.id === rowId)?.data.text}
        </span>
      )
    ) : column.name === "Timeline" ? (
      <TimelineCell />
    ) : column.name === "Button" ? (
      <Button
        className="primary"
        size="sm"
        style={{ backgroundColor: "#579BFC", border: "none" }}
      >
        Click me
      </Button>
    ) : column.name === "Link" ? (
      <LinkCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Email" ? (
      <EmailCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Country" ? (
      <CountryCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Phone" ? (
      <PhoneCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "People" ? (
      <PeopleCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "World Clock" ? (
      <WorldClockCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Location" ? (
      <LocationCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Tags" ? (
      <TagsCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Vote" ? (
      <VoteCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Week" ? (
      <WeekCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : // ""
    column.name === "Last Updated" ? (
      // <LastUpdatedCell rowId={rowId} rows={rows} setRows={setRows} />
      ""
    ) : column.name === "Rating" ? (
      <RatingCell rowId={rowId} rows={rows} setRows={setRows} />
    ) : column.name === "Auto Number" ? (
      <p>{handelAutoNumber()}</p>
    ) : column.name === "Priority" ? (
      <Popover
        content={
          <LabelSelectionModal
            labels={priority}
            setLabels={setPriority}
            labelModalRef={labelModalRef}
            handleSelection={handlePrioritySelection}
          />
        }
        trigger="click"
        open={
          selectedLabelCellId &&
          selectedLabelCellId.rowId === rowId &&
          selectedLabelCellId.columnId === columnId
        }
      >
        <span
          className="flex justify-content-center  statusSpan"
          onClick={() => handleCellClick(rowId, columnId)}
          style={{
            backgroundColor:
              rows?.find((row) => row.id === rowId)?.priority
                ?.backgroundColor || "#BCBDBE",
            position: "relative",
          }}
        >
          {rows?.find((row) => row.id === rowId)?.priority?.text}
        </span>
      </Popover>
    ) : column.name === "Item ID" ? (
      <span>
        <p className="m-0">
          {rowId.length > 10 ? `${rowId.substring(0, 10)}...` : rowId}
        </p>
      </span>
    ) : column.name === "Color Picker" ? (
      <>
        <Popover
          content={
            <ChromePicker
              color={colorPicker}
              onChange={(color) => handleColorPickerColumn(rowId, color)}
            />
          }
          trigger="click"
          open={tableColorPicker[rowId]}
          onOpenChange={(newOpen) =>
            handleColorPicker(rowId, columnId, newOpen)
          }
        >
          <span className="flex align-items-center justify-content-center">
            <span
              className="rounded-circle"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: colorPicker,
              }}
            ></span>
            <p className="m-0 ms-2">{colorPicker}</p>
            {colorPicker && (
              <button
                className="px-0 py-0 file_deleteBtn flex ms-3 close-icon"
                onClick={(event) => {
                  // Prevent the color picker from triggering
                  event.stopPropagation();
                  // Handle close icon click
                  clearColorPickerCell(rowId);
                }}
              >
                <RxCross2
                  className=""
                  style={{
                    width: "14px",
                    height: "auto",
                  }}
                />
              </button>
            )}
          </span>
        </Popover>
      </>
    ) : column.name === "Checkbox" ? (
      <span
        className="flex justify-content-center"
        onClick={() => handleCheckboxClick(rowId, columnId)}
        style={{ cursor: "pointer", height: "27px" }}
      >
        {rows.find((row) => row.id === rowId)?.data[columnId] ? (
          <GoCheck style={{ color: "#05CB74" }} />
        ) : null}
      </span>
    ) : null;
  };

  const [activeTab, setActiveTab] = useState("");
  const handleClickTab = (item) => {
    // alert("hello");
    console.log({ item });
    setActiveTab(item?.option);
    console.log({ activeTab });
  };
  const handleDeleteSelected = () => {
    // Filter out rows that are not selected
    const updatedRows = rowsInvoices.filter((row) => !row.selected);
    setRowsInvoices(updatedRows); // Update the state with the filtered rows
  };

  return (
    <div className="px-4 pt-3 newTeam mb-[5rem] w-[88%] overflow-auto" style={{ height: "auto" }}>
      <div className="flex mb-2 items-center justify-between">
        <h3>Usman</h3>
        {/* <Button className="ms-1 px-1 fs-4 workspace_menuBtn bgHover align-middle">
          <BiChevronDown />
        </Button> */}
        {/* ==================Invite Employee/Client============= */}
        <div className="flex">
          <Link
            to="/workspace/:workspaceID/team/:teamID/teams-invites"
            className=" no-underline	"
          >
            <button
              className=" teamInvite_btn bgHover align-middle me-1 text-color"
              onClick={showModal}
            >
              <FaRegUser className="text-base mx-2  " />
              <span className="text-sm mt-1 "> Invite </span>
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
      <div className=" main_tableBtnDiv  flex items-center mb-3">
        <span
          className=" flex"
          // style={{ borderBottom: "2px solid #00854d", marginBottom: "-3px" }}
        >
          <Button
            className=" workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TbFileInvoice className="me-2 " />
            Invoices
          </Button>
          <div className="vr mx-1 nav_splitter align-self-center"></div>
        </span>

        {selectedDropdownOption.map((item) => (
          <span
            key={item.id}
            className=" flex"
            // style={{marginBottom: "-3px" }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleClickTab(item);
            }}
            style={{ borderBottom: "2px solid #00854d", marginBottom: "-3px" }}
          >
            <Button
              className="flex workspace-dropdown-button workspace-dropdownBtn align-self-center py-1  px-2 "
              style={{ display: "flex" }}
            >
              {/* <Button className="workspace-dropdown-button workspace-dropdownBtn align-self-center py-1  px-2 flex"> */}
              {/* {item.icon} */}
              {item.option}
              <Dropdown
                style={{
                  height: "25px",
                }}
              >
                <Dropdown.Toggle
                  className={` ${
                    hoveredRow === item.id ? "" : "disply_none"
                  } px-1 py-0 workspace_menuBtn  menuBtn text-center mx-1 focusClass menuBg `}
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <BsThreeDots className=" fs-6 align-middle mt-1" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="tr_optionDropdown">
                  {mainTbl_btn_optionMenu.map((item, index) => (
                    <Dropdown.Item key={index} href="#" className="">
                      <Button
                        onClick={() => {
                          if (item.option === "Delete") {
                            deleteBtn(hoveredRow);
                          }
                        }}
                        // handleMouseLeave)
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                        // onClick= {}
                      >
                        <span>
                          {item.icon}
                          {item.option}
                        </span>
                      </Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Button>
            <div className="vr mx-1 nav_splitter align-self-center"></div>
          </span>
        ))}
        <span>
          <Dropdown>
            <Dropdown.Toggle className="p-2 workspace_menuBtn bgHover align-middle">
              <FiPlus />
            </Dropdown.Toggle>
            <Dropdown.Menu className="">
              {mainTbl_addBtn_menu.map((item, index) => (
                <Dropdown.Item key={index} href="#" className="">
                  <Button
                    className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                    style={{
                      height: "34px",
                    }}
                    onClick={() => handleDropdownSelect(item)}
                  >
                    <div className="flex items-center">
                      <span>{item.icon}</span>
                      <span className="pt-1">{item.option}</span>
                    </div>
                  </Button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </span>
        {/* =========================Integration======================== */}
      </div>
      {activeTab !== "Calendar" && (
        <>
          <div className="flex items-center mb-5 relative">
            <div className="flex items-center newTeam_nav ">
              <ButtonGroup className=" me-4">
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
                    className="border-0 newInvoiceBtn"
                    style={{
                      width: "220px",
                      padding: "8px",
                    }}
                  >
                    {/* Add your dropdown menu items here */}
                    <Dropdown.Item>
                      <Link
                        to="/invoices/create"
                        className=" no-underline	fs_1 flex items-center "
                      >
                        <HiOutlineDocumentPlus className="folderIcon " />
                        <span className="h-[1.4em]	">Create an invoice</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="invoices/create "
                        className=" no-underline	fs_1 flex items-center "
                      >
                        <CgQuoteO
                          className="folderIcon "
                          style={{ marginTop: "5px" }}
                        />
                        <span className="h-[1em]">Create a quote</span>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </div>
            {/*================================ Revenue Top Section======================== */}
            {/* <RevenueWrapper /> */}
          </div>
        </>
      )}

      <OffcanvasComponent show={showCanvas} handleClose={closeCanvas} />
      {/* ===============================Usman Yousaf Code====================================== */}
      {activeTab === "Calendar" ? (
        <>
          <CalendarWrapper />
        </>
      ) : (
        <InvoiceTable
          //   key={`newTablePassword-${index}`}
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
          toggleCanvas={toggleCanvas}
          status={status}
          setStatus={setStatus}
          statusModal={statusModal}
          handleOpenChange={handleOpenChange}
          renderComponentForColumn={renderComponentForColumn}
          newItemInput={newItemInput}
          setNewItemInput={setNewItemInput}
          handleKeyPress={handleKeyPress}
          show={show}
          handleClose={handleClose}
          setSelectedButton={setSelectedButton}
          addColumn={addColumn}
          rows={rows}
          handleStatusSelection={handleStatusSelection}
          passColumns={passColumns}
          setPassColumns={setPassColumns}
          setRows={setRows}
        />
      )}
      {Array.from({ length: passwordComponentCount }).map((_, index) => (
        <QuoteTable
          key={`newTablePassword-${index}`}
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
          toggleCanvas={toggleCanvas}
          status={status}
          setStatus={setStatus}
          statusModal={statusModal}
          handleOpenChange={handleOpenChange}
          renderComponentForColumn={renderComponentForColumn}
          newItemInput={newItemInput}
          setNewItemInput={setNewItemInput}
          handleKeyPress={handleKeyPress}
          show={show}
          handleClose={handleClose}
          setSelectedButton={setSelectedButton}
          addColumn={addColumn}
          rows={rows}
          handleStatusSelection={handleStatusSelection}
          passColumns={passColumns}
          setPassColumns={setPassColumns}
          setRows={setRows}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default NewInvoice;
