import React, { useEffect, useRef, useState } from "react";

import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FiPlus, FiTrash, FiTrash2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import {
  BiMessageRoundedAdd,
  BiChevronDown,
  BiSolidColorFill,
} from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
// import { DatePicker } from "antd";

import { Popover } from "antd";
import LabelSelectionModal from "./Components/LabelSelectionModal";
import AddColumnModal from "./Components/addColumnModal";
import { getAPI, postAPI } from "../../../helpers/apis";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Diversity2TwoTone } from "@mui/icons-material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
// import { Popover } from "antd";
import { ChromePicker } from "react-color";

import TableShadow from "./TableShadow";
import { GoPencil } from "react-icons/go";
import { LuTrash } from "react-icons/lu";
import { id } from "date-fns/locale";
import MemberInvitationPopup from "./MemberInvitationPopup";
const NewTable = ({
  tableHidden,
  handleToggleTable,
  tableData,
  columns,
  // selectAll,
  // handleSelectAll,
  handleShow,
  // hoveredRow,
  handleMouseEnter,
  handleMouseLeave,
  rowOptionMenu,
  // handleDeleteRow,
  // moveRowToTop,
  // duplicateRow,
  handleRowSelect,
  editedItemId,
  editedItemValue,
  setEditedItemValue,
  handleItemEditEnd,
  handleItemEditStart,
  setShowCanvas,
  status,
  setStatus,
  renderComponentForColumn,
  newItemInput,
  handleNewItemInputChange,
  handleKeyPress,
  show,
  handleClose,
  setSelectedButton,
  addColumn,
  iconStyle,
  rows,
  setRows,
  setTableData,
  handleStatusSelection,
  tasks,
  table,
  statusModal,
  setStatusModal,
}) => {
  const {
    teamTasks,
    totalVotes,
    setTaskMode,
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setSelectedTeam,
    setTeamTasks,
    setUploadedFiles,
    setSelectedTask,
    setCommentsArray,
    setRepliesArray,
    thisUser,
    colors,
    setMemberInvitationPopup,
  } = useStateContext();

  const [dueDate, setDueDate] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tableShadow, setTableShadow] = useState(table?.color);
  const [tableTitle, setTableTitle] = useState(false);
  const [tableTitleInput, setTableTitleInput] = useState(table?.name);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const [taskTitleValue, setTaskTitleValue] = useState("");
  const [EditingTaskTitle, setEditingTaskTitle] = useState(null);
  const [addButton, setAddButton] = useState(false);
  const [totalMembers, setTotalMembers] = useState(false);
  let columnsArray = [];
  if (tasks?.length > 0) {
    tasks[0]?.columns?.map((column) => {
      columnsArray.push({
        _id: column._id,
        name: column.name,
        type: column.type,
      });
    });
  }
  const deleteColumn = (type) => {
    postAPI(`/api/task-columns/delete/`, {
      tableID: table._id,
      type: type,
      teamID: teamTasks._id,
    })
      .then((res) => {
        console.log(res.data.team);
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeTaskTitle = (row) => {
    setEditingTaskTitle(null);
    postAPI(`/api/tasks/update/${row._id}`, {
      endDate: row.endDate,
      title: taskTitleValue,
      teamID: teamTasks._id,
    })
      .then((res) => {
        console.log(res);
        setTaskTitleValue("");
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const focusTaskTitle = (value, id) => {
    setTaskTitleValue(value);
    setEditingTaskTitle(id);
  };

  const dueDateHandler = (row, dateString) => {
    postAPI(`/api/tasks/update/${row._id}`, {
      endDate: dateString,
      title: row.title,
      teamID: teamTasks._id,
    })
      .then((response) => {})
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleDeleteRow = (id) => {
    const teamID = teamTasks._id;
    getAPI(`/api/task/delete/${id}?teamID=${teamID}`)
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const duplicateRow = (id) => {
    postAPI(`/api/task/duplicate/${id}`, {
      tableID: table._id,
      teamID: teamTasks._id,
    }) // Assuming teamTasks contains the team ID
      .then((res) => {
        setTeamTasks(res.data.team);
        console.log(res.data.team);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const CreateTaskBelow = (id) => {
    postAPI(`/api/task/create-task-below/${id}`, {
      teamID: teamTasks._id,
      tableID: table._id,
    }) // Assuming teamTasks contains the team ID
      .then((res) => {
        setTeamTasks(res.data.team);
        console.log(res.data.team);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };

  // Function to move a task to the top
  const moveRowToTop = (id) => {
    postAPI(`/api/task/move-to-top/${id}`, {
      tableID: table._id,
      teamID: teamTasks._id,
    }) // Assuming teamTasks contains the team ID
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((error) => {
        // Handle error
        console.error("Error moving task to top:", error);
        // Show error message or perform any other necessary actions
      });
  };

  const tableborder = {
    "--table-shadow-color": tableShadow,
    "--table-border-color": tableShadow,
    "--input-color": tableShadow,
    // border: `1px solid ${tableShadow}!important`,
  };

  const [open, setOpen] = useState(false);
  const colorPopoverChange = (newOpen) => {
    setOpen(newOpen);
  };
  const changeShadow = (color) => {
    setTableShadow(color.hex);
    postAPI(`/api/table/update/${table._id}`, {
      color: color.hex,
      name: table?.name,
      teamID: teamTasks._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const onColorClick = (e) => {
    e.stopPropagation(); // This prevents the click event from bubbling up to the dropdown and closing it
  };
  const handleTableDelete = () => {
    // e.stopPropagation();
    postAPI(`/api/table/delete/${table._id}`, {
      teamID: teamTasks._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
    handleShow();
  };

  const handleTableName = () => {
    postAPI(`/api/table/update/${table._id}`, {
      color: table?.color,
      name: tableTitleInput,
      teamID: teamTasks._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function focusInput() {
    document.getElementById("titleInput").focus();
  }

  const handleCheckboxChange = (taskId) => {
    console.log(selectedRows);
    const newSelectedRows = selectedRows.includes(taskId)
      ? selectedRows.filter((id) => id !== taskId)
      : [...selectedRows, taskId];
    setSelectedRows(newSelectedRows);
    setSelectAll(false); // Uncheck select all when any row is unchecked
  };

  const handleSelectAllChange = () => {
    if (!selectAll) {
      const allTaskIds = tasks.map((task) => task._id); // Replace this with an array of all task IDs
      setSelectedRows(allTaskIds);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };
  const handleDeleteSelected = () => {
    postAPI(`/api/tasks/delete-selected`, {
      selectedIds: selectedRows,
      teamID: teamTasks._id,
    }) // Assuming teamTasks contains the team ID
      .then((res) => {
        setTeamTasks(res.data.team);
        setSelectedRows([]);
        setSelectAll(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const handleFetchFiles = (id) => {
    setShowCanvas(true);
    setSelectedTask(id);
    getAPI(`/api/files/list?refID=${id}`).then((res) => {
      try {
        setUploadedFiles(res.data.files);
      } catch (err) {
        console.log(err);
      }
    });
    getAPI(`/api/comments/list/${id}`).then((res) => {
      try {
        setCommentsArray(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    });
    getAPI(`/api/replies/list/${id}`).then((res) => {
      try {
        setRepliesArray(res.data.replies);
      } catch (err) {
        console.log(err);
      }
    });
  };
  // console.log(teamTasks)
  const inviteMember = (email, task) => {
    postAPI(`/api/invite-to-task`, {
      email,
      userName: thisUser.fullName,
      profileColor: colors[Math.floor(Math.random() * colors.length)],
      task: task.title,
      workspaceID: selectedWorkspace._id,
      teamID: selectedTeam._id,
      tableID: table._id,
      taskID: task._id,
    })
      .then((res) => {
        setMemberInvitationPopup(false);
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleActiveMember = (email, task) => {
    postAPI("/api/set-task-member-active", {
      email,
      taskId: task._id,
      teamID: selectedTeam._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDectiveMember = (email, task) => {
    postAPI("/api/set-task-member-deactive", {
      email,
      taskId: task._id,
      teamID: selectedTeam._id,
    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(tasks);
  return (
    <>
      {tableHidden && (
        <div
          className="centerIt mb-3 ms-2 ps-4 position-relative"
          onMouseEnter={() => setTableTitle(true)}
          onMouseLeave={() => setTableTitle(false)}
        >
          <Dropdown className="position-absolute" style={{ left: "-23px" }}>
            <Dropdown.Toggle
              className={` ${
                tableTitle ? "" : "disply_none"
              } px-1 py-0 workspace_menuBtn bgHover  text-center mx-1 focusClass   `}
              style={{
                width: "25px",
                height: "25px",
                verticalAlign: "middle",
              }}
            >
              <BsThreeDots className=" fs-6 align-middle " />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className=" border-0 fs_14 p-2"
              style={{ width: "220px" }}
            >
              <Dropdown.Item
                href="#"
                className="py-1  centerIt"
                onClick={focusInput}
              >
                <GoPencil className="me-2" />
                Rename table
              </Dropdown.Item>

              <Popover
                content={
                  <ChromePicker
                    color={tableShadow}
                    onChange={(color) => changeShadow(color)}
                  />
                }
                trigger="click"
                open={open}
                onOpenChange={colorPopoverChange}
              >
                <Dropdown.Item
                  className="py-1 centerIt"
                  onClick={(e) => onColorClick(e)}
                >
                  <BiSolidColorFill className="me-2 fs-6" /> Change table color
                </Dropdown.Item>
              </Popover>
              <Dropdown.Item
                href="#"
                className="py-1 centerIt"
                onClick={(e) => handleTableDelete(e)}
              >
                <LuTrash className="me-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {selectedRows.length > 0 && (
            <span
              className=" cursor_pointer centerIt justify-content-center"
              style={{
                opacity: selectedRows.length > 0 && 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <FiTrash2
                onClick={handleDeleteSelected}
                className="me-3 text-danger"
                style={{ marginLeft: "14px" }}
              />
            </span>
          )}
          <h6
            className="fw-bold mb-0"
            style={{
              color: tableShadow,

              display: "flex",
              alignItems: "center",
            }}
          >
            <BiChevronDown
              onClick={handleToggleTable}
              style={iconStyle}
              className="fs-4 cursor_pointer"
            />
            <Form.Control
              className="workspace_searchInput shadow-none bg-transparent fw-bold  table-title py-0"
              value={tableTitleInput}
              onChange={(e) => setTableTitleInput(e.target.value)}
              onBlur={handleTableName}
              style={tableborder}
              id="titleInput"
            />
            &nbsp;{" "}
          </h6>
          {/* <TableShadow
            tableShadow={tableShadow}
            setTableShadow={setTableShadow}
          /> */}
        </div>
      )}

      <div>
        {!tableHidden && (
          <div className="px-4">
            <Table responsive bordered hover className=" ">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="text-center px-1">
                    <div
                      className="text-start ms-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h6
                        onClick={handleToggleTable}
                        className="fw-bold m-0 "
                        style={{
                          color: tableShadow,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BiChevronDown style={iconStyle} className="fs-4" />{" "}
                        Group Title
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {tasks.length} Items
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHidden && (
          <div className="px-4 position-relative table-radius ">
            <Table
              responsive
              bordered
              // hover
              className="border-bottom-0 newTeam-table"
            >
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th
                    className={`table-shadow table-shadow-important table-border-color `}
                    style={tableborder}
                  ></th>
                  {/* <th className="table-shadow table-shadow-important" style={tableborderStyle}></th> */}

                  {/* <th className="table-shadow bg-[#FF0000]" ></th> */}
                  <th
                    className="checkBox-cell centerIt justify-content-center px-2"
                    style={{ padding: "11px" }}
                  >
                    <Form.Check
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th colSpan={2}>Items</th>

                  <th>Owner</th>
                  <th>Person</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  {columnsArray.map((column) => {
                    return (
                      <th
                        key={column._id}
                        onMouseEnter={() => setHoveredHeader(column._id)}
                        onMouseLeave={() => setHoveredHeader(null)}
                      >
                        <span className="centerIt justify-content-center">
                          {column.name}
                          <span style={{ width: "25px", height: "25px  " }}>
                            {hoveredHeader === column._id && (
                              <Dropdown className="border-0">
                                <Dropdown.Toggle
                                  className="ms-1 p-0 centerIt justify-content-center text-color fs-4 border-0 text bg-transparent bgHover "
                                  style={{
                                    display: "flex",
                                    width: "25px",
                                    height: "25px  ",
                                  }}
                                >
                                  <BsThreeDots className=" fs-5 " />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="border-0">
                                  <Dropdown.Item
                                    className="centerIt"
                                    onClick={() => deleteColumn(column.type)}
                                  >
                                    <FiTrash className="fs-6 me-2" /> Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            )}
                          </span>
                        </span>
                      </th>
                    );
                  })}
                  <th className="text-center ">
                    <Button
                      className="px-1 py-0 workspace_menuBtn bgHover centerIt  mx-1"
                      style={{
                        width: "25px",
                        height: "25px",
                        verticalAlign: "middle",
                      }}
                      onClick={() => handleShow(table._id)}
                    >
                      <FiPlus className=" fs-6 mt-1 " />
                    </Button>
                  </th>
                </tr>
              </thead>

              <tbody className="rounded-end rounded-2 overflow-hidden newTable-body">
                {tasks?.map((row) => (
                  <tr
                    key={row._id}
                    onMouseEnter={() => setHoveredRow(row._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <th
                      className="table-shadow table-shadow-important table-border-color position-static"
                      style={tableborder}
                    >
                      <span
                        className="position-absolute tr_optionBtn p-2 "
                        style={{
                          width: "49px",
                          height: "41px",
                        }}
                      >
                        <Dropdown>
                          <Dropdown.Toggle
                            className={`${
                              hoveredRow === row._id ? "" : "disply_none"
                            }  px-1 py-0 workspace_menuBtn bgHover  text-center mx-1 focusClass`}
                            style={{
                              width: "25px",
                              height: "25px",
                              verticalAlign: "middle",
                            }}
                          >
                            <BsThreeDots className={`fs-6 align-middle `} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="tr_optionDropdown border-0">
                            {rowOptionMenu.map((item, index) => (
                              <Dropdown.Item key={index} href="#" className="">
                                <Button
                                  onClick={() => {
                                    if (item.option === "Delete") {
                                      handleDeleteRow(hoveredRow);
                                    } else if (item.option === "Move to top") {
                                      moveRowToTop(hoveredRow);
                                    } else if (item.option === "Duplicate") {
                                      duplicateRow(hoveredRow);
                                    } else if (
                                      item.option === "Create item below"
                                    ) {
                                      CreateTaskBelow(hoveredRow);
                                    }
                                    handleMouseLeave();
                                  }}
                                  className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                                  style={{
                                    height: "34px",
                                  }}
                                >
                                  <span className="centerIt">
                                    {item.icon}
                                    {item.option}
                                  </span>
                                </Button>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
                    </th>
                    <td
                      className="text-center checkBox-cell "
                      key={columns[0].id}
                      style={{ width: "50px" }}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </td>
                    <td
                      key={columns[1].id}
                      className="text-start"
                      style={{ width: "25%" }}
                    >
                      {/* <div
                        style={{
                          outline: "none",
                        }}
                        contentEditable={true}
                        onBlur={(e) =>
                          changeTaskTitle(row._id, e.target.innerHTML)
                        }
                        onKeyUp={(e) =>
                          e.key === "Enter"
                            ? changeTaskTitle(row._id, e.target.innerHTML)
                            : null
                        }
                        className=" py-1 rounded-1 shadow-none workspace_searchInput add_itemInput transparent_bg widthFit "
                      >
                        {row.title}
                      </div> */}
                      {EditingTaskTitle === row._id ? (
                        <Form.Control
                          type="text"
                          value={taskTitleValue}
                          onChange={(e) => setTaskTitleValue(e.target.value)}
                          onBlur={() => changeTaskTitle(row)}
                          className=" py-1 shadow-none workspace_searchInput add_itemInput transparent_bg  w-100 text-center "
                          style={{
                            minWidth: "220px",
                            maxWidth: "270px",
                          }}
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          value={row?.title}
                          onFocus={() => focusTaskTitle(row.title, row._id)}
                          className=" py-1 shadow-none workspace_searchInput add_itemInput transparent_bg  w-100 text-center "
                          style={{
                            minWidth: "220px",
                            maxWidth: "270px",
                          }}
                        />
                      )}
                      {/* {editedItemId === row._id ? (   
                        <div style={{ marginLeft: "11px" }}>
                          <Form.Control
                            type="text"
                            value={editedItemValue}
                            onChange={(e) => setEditedItemValue(e.target.value)}
                            onBlur={handleItemEditEnd}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleItemEditEnd(e);
                              }
                            }}
                            className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                          />
                        </div>
                      ) : (
                        <div
                          onMouseEnter={() =>
                            handleItemEditStart(row._id, row.title)
                          }
                          className="editable-item ps-4 pt-1"
                        >
                          {row.title}
                        </div>
                      )} */}
                    </td>
                    <td
                      key={columns[2].id}
                      className="px-3"
                      style={{ width: "50px" }}
                    >
                      <BiMessageRoundedAdd
                        onClick={() => handleFetchFiles(row._id)}
                        className="align-bottom "
                      />
                    </td>

                    <td
                      key={columns[3].id}
                      style={{ width: "65px", padding: "7px 20px" }}
                      className="text-center "
                    >
                      {row.ownerPicture ? (
                        <div style={{ width: "30px", height: "30px" }}>
                          <img
                            src={row.ownerPicture}
                            alt=""
                            className="rounded-circle h-100 w-100"
                          />
                        </div>
                      ) : (
                        <div
                          className="centerIt justify-content-center rounded-circle"
                          style={{
                            width: "30px",
                            height: "30px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: row.ownerColor,
                          }}
                        >
                          {row.owner[0].toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td
                      key={columns[4].id}
                      style={{ width: "65px", padding: "7px 30px 7px 3px" }}
                      className=" "
                      onMouseEnter={() => {
                        setAddButton(row._id), setTotalMembers(true);
                      }}
                      onMouseLeave={() => {
                        setAddButton(null), setTotalMembers(false);
                      }}
                    >
                      {/* {!row.members.includes(row.owner)&&  <RxAvatar />}   */}

                      <MemberInvitationPopup
                        totalMembers={totalMembers}
                        inviteMember={inviteMember}
                        handleDectiveMember={handleDectiveMember}
                        handleActiveMember={handleActiveMember}
                        task={row}
                        addButton={addButton}
                        setAddButton={setAddButton}
                      />
                    </td>

                    <Popover
                      key={row._id}
                      content={
                        <LabelSelectionModal
                          labels={status}
                          taskId={row._id}
                          setLabels={setStatus}
                          handleSelection={handleStatusSelection}
                        />
                      }
                      trigger="click"
                      open={statusModal === row._id}
                      onOpenChange={(newOpen) =>
                        setStatusModal(newOpen ? row._id : null)
                      }
                    >
                      <td
                        key={columns[6].id}
                        className="text-center p-0 flex "
                        style={{ minWidth: "160px" }}
                      >
                        <span
                          onClick={() => setTaskMode("status")}
                          className="statusSpan w-100"
                          style={{
                            backgroundColor: row?.status?.color,
                          }}
                        >
                          {row?.status?.text}
                        </span>
                      </td>
                    </Popover>
                    <td key={columns[7]?.id} style={{ width: "150px" }}>
                      {/* <DatePicker onChange={(_, dateString)=>dueDateHandler(row._id, dateString)} value={row?.endDate?.substring(0, 10)} /> */}

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          // label="Select Date"
                          inputFormat="MM/dd/yyyy"
                          value={dayjs(row?.endDate)}
                          onChange={(value) => dueDateHandler(row, value)}
                        />
                      </LocalizationProvider>
                    </td>

                    {row?.columns?.map((column, index) => {
                      return (
                        <td
                          key={column._id}
                          className={`${
                            column.name === "Priority" ||
                            column.name === "Label" ||
                            column.name === "Link" ||
                            column.name === "Email" ||
                            column.name === "Color Picker" ||
                            column.name === "World Clock"
                              ? "p-0"
                              : ""
                          } ${
                            column.name === "Text" ||
                            column.name === "Label" ||
                            column.name === "Numbers" ||
                            column.name === "Priority" ||
                            column.name === "Week" ||
                            column.name === "Link" ||
                            column.name === "Color Picker" ||
                            column.name === "Email"
                              ? "textCell_width"
                              : ""
                          }`}
                        >
                          {renderComponentForColumn(
                            column._id,
                            column.name,
                            column.data,
                            row._id,
                            table
                          )}
                        </td>
                      );
                    })}
                    <td></td>
                  </tr>
                ))}

                <tr>
                  <th
                    className="table-shadow table-shadow-important table-border-color"
                    style={tableborder}
                  ></th>
                  <td className="text-center checkBox-cell px-0">
                    <Form.Check type="checkbox" disabled />
                  </td>
                  <td colSpan="40" className=" py-1">
                    <Form.Control
                      type="text"
                      value={newItemInput || ""} // Use input value specific to each table
                      onChange={(e) =>
                        handleNewItemInputChange(e.target.value, table._id)
                      }
                      onKeyPress={(event) =>
                        handleKeyPress(
                          event,
                          table._id,
                          newItemInput,
                          tasks[0]?._id
                        )
                      }
                      placeholder="+ Add item"
                      className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                    />
                  </td>
                </tr>
                <tr
                  className="border-bottom-0 action_tr "
                  style={{ height: "36px" }}
                >
                  <th
                    className="transparent_border bg-transparent p-0 right-border "
                    colSpan={4}
                  ></th>
                  <th className="dynamic-border "></th>
                  <th className="dynamic-border "></th>
                  <th className="dynamic-border "></th>
                  <th className="dynamic-border "></th>
                  {columnsArray.map((column) => (
                    <th
                      key={column.id}
                      className="dynamic-border"
                      style={{ height: "36px" }}
                    >
                      {column.name === "Vote" ? (
                        <p className="m-0 fw-bold">Total votes: {totalVotes}</p>
                      ) : (
                        ""
                      )}
                    </th>
                  ))}
                  <th className="dynamic-border"></th>
                </tr>
              </tbody>
            </Table>

            {show === table?._id && (
              <AddColumnModal
                handleClose={handleClose}
                setSelectedButton={setSelectedButton}
                show={show}
                tableID={table._id}
                addColumn={addColumn}
                tasks={tasks}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NewTable;
