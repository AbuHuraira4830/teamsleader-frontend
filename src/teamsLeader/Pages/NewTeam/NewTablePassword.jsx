import React, { useEffect, useRef, useState } from "react";
import OfCanvasPassword from "./Components/OfCanvasPassword";
import {
  Table,
  Form,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import {
  BiMessageRoundedAdd,
  BiChevronDown,
  BiSolidColorFill,
} from "react-icons/bi";
import AddColumnModal from "./Components/addColumnModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";
import { MdContentCopy } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import { LuExternalLink, LuTrash } from "react-icons/lu";
import { Popover } from "antd";
import { GoPencil } from "react-icons/go";
import { ChromePicker } from "react-color";
import { getAPI, postAPI } from "../../../helpers/apis";
import MemberInvitationPopup from "./MemberInvitationPopup";

const NewTablePassword = ({
  // handleDeleteRow,
  // moveRowToTop,
  // duplicateRow,
  // editedItemId,
  // newItemInput,
  // setNewItemInput,
  // handleKeyPress,
  // handleClose,
  // addColumn,
  // rows,
  // passColumns,
  hoveredRow,
  setHoveredRow,
  table,
  handleDeleteRow,
  moveRowToTop,
  duplicateRow,
  CreateRowBelow,
}) => {
  const {
    rowsPassword,
    setRowsPassword,
    setPasswordTables,
    // selectAll,
    // handleSelectAll,
    rowOptionMenu,
    passColumns,
    setPasswordTableID,
    selectedPasswordRow,
    setSelectedPasswordRow,
    setMemberInvitationPopup,
  } = useStateContext();
  const [editedItemId, setEditedItemId] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState("");
  const [tableHiddenPassword, setTableHiddenPassword] = useState(true);
  const [iconRotationPassword, setIconRotationPassword] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [tableShadow, setTableShadow] = useState(table?.color);
  const [tableTitleInput, setTableTitleInput] = useState(table?.name);
  const [tableTitle, setTableTitle] = useState(false);

  const [editingName, setEditingName] = useState(null);
  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [inputTypes, setInputTypes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addButton, setAddButton] = useState(false);
  const [totalMembers, setTotalMembers] = useState(false);
  const handleCheckboxChange = (rowId) => {
    console.log(selectedRows);
    const newSelectedRows = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];
    setSelectedRows(newSelectedRows);
    setSelectAll(false); // Uncheck select all when any row is unchecked
  };

  const handleSelectAllChange = () => {
    if (!selectAll) {
      const allTaskIds = table.rows.map((row) => row._id);
      setSelectedRows(allTaskIds);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  const togglePasswordVisibility = (id) => {
    setPasswordVisible({
      ...passwordVisible,
      [id]: !passwordVisible[id],
    });
    setInputTypes({
      ...inputTypes,
      [id]: passwordVisible[id] ? "password" : "text",
    });
  };
  const closeCanvasPassword = () => {
    setSelectedPasswordRow(null);
    setShowCanvasPassword(false);
  };
  const [editingRow, setEditingRow] = useState(null);
  const toggleCanvasPassword = (row) => {
    setSelectedPasswordRow(row);
    setShowCanvasPassword(true);
  };
  const [open, setOpen] = useState(false);
  const colorPopoverChange = (newOpen) => {
    setOpen(newOpen);
  };
  const onColorClick = (e) => {
    e.stopPropagation(); // This prevents the click event from bubbling up to the dropdown and closing it
  };
  const labelModalRef = useRef();
  const tableborder = {
    "--table-shadow-color": tableShadow,
    "--table-border-color": tableShadow,
    "--input-color": tableShadow,
    // border: `1px solid ${tableShadow}!important`,
  };
  const [tablePasswordData, setTablePasswordData] = useState([
    {
      item: "Project1",
      person: 30,
      status: "Services",
      date: "",
      id: "1",
      selected: false,
    },
    {
      item: "Project2",
      person: 30,
      status: "Soft",
      date: "",
      id: "2",
      selected: false,
    },
    {
      item: "Project3",
      person: 30,
      status: "Projects",
      date: "",
      id: "3",
      selected: false,
    },
  ]);

  const handleToggleTablePassword = () => {
    setTableHiddenPassword(!tableHiddenPassword);
    setIconRotationPassword(iconRotationPassword === 0 ? 270 : 0);
  };

  const togglePassword = (id) => {
    setRowsPassword((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, showPassword: !row.showPassword } : row
      )
    );
  };

  const copyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
        setPasswordCopied(true);

        // Reset the copied status after a few seconds
        setTimeout(() => {
          setPasswordCopied(false);
        }, 1000); // Adjust the duration as needed
      })
      .catch((err) => {
        console.error("Unable to copy password", err);
      });
  };
  const iconStylePassword = {
    transform: `rotate(${iconRotationPassword}deg)`,
  };

  const handleRowSelectPassword = (id) => {
    const updatedTableData = rowsPassword.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setRowsPassword(updatedTableData);
  };

  function focusInput() {
    document.getElementById("titleInput").focus();
  }
  const changeShadow = (color) => {
    setTableShadow(color.hex);
    postAPI(`/api/password-table/update/${table._id}`, {
      color: color.hex,
      name: tableTitleInput,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleTableDelete = () => {
    // e.stopPropagation();
    postAPI(`/api/password-table/delete`, {
      id: table._id,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateRowcanvas = (row) => {
    setShowCanvasPassword(true);
    setSelectedPasswordRow(row);
  };
  const toggleCanvas = (id) => {
    setShowCanvasPassword(true);
    setPasswordTableID(id);
  };
  const handleNameChange = async (id, data) => {
    setEditingName(null);
    await postAPI(`/api/password-row/update/${id}`, { name: editedItemValue })
      .then((res) => {
        setEditedItemValue("");
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const focusNameInput = (data, id) => {
    setEditedItemValue(data);
    setEditingName(id);
  };
  const handleTableName = () => {
    postAPI(`/api/password-table/update/${table._id}`, {
      // color: color.hex,
      name: tableTitleInput,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Initialize inputTypes state with "password" type for each row ID
    const initialInputTypes = {};
    table.rows.forEach((row) => {
      initialInputTypes[row._id] = "password";
    });
    setInputTypes(initialInputTypes);
  }, [table.rows]);

  // Rest of your component code...
  const handleDeleteSelected = () => {
    postAPI(`/api/password-table/delete-selected-row`, {
      selectedIds: selectedRows,
    }) // Assuming teamTasks contains the team ID
      .then((res) => {
        setPasswordTables(res.data.tables);
        setSelectedRows([]);
        setSelectAll(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const inviteMember = (email, row) => {
    postAPI(`/api/invite-to-password`, {
      tableID: table._id,
      email,
      rowID: row._id,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
        console.log(res.data);
        setMemberInvitationPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleActiveMember = (email, row) => {
    postAPI("/api/password-table/set-member-active", { rowId: row._id, email })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDectiveMember = (email, row) => {
    postAPI("/api/password-table/set-member-deactive", {
      rowId: row._id,
      email,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {tableHiddenPassword && (
        <div
          className="centerIt mb-3 ms-2 ps-4 position-relative mt-5"
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
                onClick={handleTableDelete}
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
              onClick={handleToggleTablePassword}
              style={iconStylePassword}
              className="fs-4 cursor_pointer"
            />
            <Form.Control
              className="workspace_searchInput bg-transparent shadow-none fw-bold  table-title py-0"
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
        {!tableHiddenPassword && (
          <div className="px-4 mt-5">
            <Table responsive bordered hover className="newTeam-table">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="text-center px-1">
                    <div className="text-start ms-2 centerIt">
                      <h6
                        onClick={handleToggleTablePassword}
                        className="fw-bold m-0 centerIt"
                        style={{
                          color: tableShadow,
                          cursor: "pointer",
                        }}
                      >
                        <BiChevronDown
                          style={iconStylePassword}
                          className="fs-4"
                        />
                        {tableTitleInput}
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14" style>
                        {table.rows.length} passwords
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHiddenPassword && (
          <div className="px-4 position-relative table-radius">
            <Table
              responsive
              bordered
              hover
              className="border-bottom-0 newTeam-table"
            >
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th
                    className={`table-shadow table-shadow-important table-border-color `}
                    style={tableborder}
                  ></th>
                  <th className="checkBox-cell centerIt justify-content-center px-2">
                    <Form.Check
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th colSpan={2}>Project</th>

                  {passColumns.slice(2).map((column) => (
                    <th key={column.id}>{column.name}</th>
                  ))}
                  {/* <th className="text-center ">
                    <Button
                      className="px-1 py-0 workspace_menuBtn bgHover  text-center mx-1"
                      style={{
                        width: "25px",
                        height: "25px",
                        verticalAlign: "middle",
                      }}
                      onClick={handleShow}
                    >
                      <FiPlus className=" fs-6 mt-1 " />
                    </Button>
                  </th> */}
                </tr>
              </thead>

              <tbody className="rounded-end rounded-2 overflow-hidden">
                {table?.rows?.map((row) => (
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
                            className={` ${
                              hoveredRow === row._id ? "" : "disply_none"
                            } px-1 py-0 workspace_menuBtn bgHover  text-center mx-1 focusClass`}
                            style={{
                              width: "25px",
                              height: "25px",
                              verticalAlign: "middle",
                            }}
                          >
                            <BsThreeDots className=" fs-6 align-middle " />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="tr_optionDropdown border-0">
                            {rowOptionMenu.map((item, index) => (
                              <Dropdown.Item key={index} href="#" className="">
                                <Button
                                  onClick={() => {
                                    if (item.option === "Delete") {
                                      handleDeleteRow([hoveredRow]);
                                    } else if (item.option === "Move to top") {
                                      moveRowToTop(hoveredRow, table._id);
                                    } else if (item.option === "Duplicate") {
                                      duplicateRow(hoveredRow, table._id);
                                    } else if (
                                      item.option === "Create item below"
                                    ) {
                                      CreateRowBelow(hoveredRow, table._id);
                                    }
                                    setHoveredRow(null);
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
                      className="text-center checkBox-cell"
                      key={passColumns[0].id}
                      style={{ width: "50px" }}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </td>
                    <td key={passColumns[1].id} className="text-center">
                      {editingName === row._id ? (
                        <Form.Control
                          type="text"
                          value={editedItemValue}
                          onChange={(e) => setEditedItemValue(e.target.value)}
                          onBlur={() => handleNameChange(row._id)}
                          className=" py-1 shadow-none workspace_searchInput add_itemInput transparent_bg  w-100 text-center first"
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          value={row?.name}
                          onFocus={() => focusNameInput(row.name, row._id)}
                          className=" py-1 shadow-none workspace_searchInput add_itemInput transparent_bg  w-100 text-center second"
                        />
                      )}
                    </td>
                    <td key={passColumns[2].id}>
                      <BiMessageRoundedAdd
                        onClick={() => updateRowcanvas(row)}
                        className="align-bottom m-auto"
                      />
                    </td>

                    {/* =======================Password Column======================== */}

                    <td
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
                          {row?.owner[0]?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td
                      className="text-center"
                      style={{ width: "65px", padding: "7px 30px 7px 3px" }}
                      onMouseEnter={() => {
                        setAddButton(row._id), setTotalMembers(true);
                      }}
                      onMouseLeave={() => {
                        setAddButton(null), setTotalMembers(false);
                      }}
                    >
                      {" "}
                      <MemberInvitationPopup
                        totalMembers={totalMembers}
                        inviteMember={inviteMember}
                        handleActiveMember={handleActiveMember}
                        handleDectiveMember={handleDectiveMember}
                        task={row}
                        addButton={addButton}
                        setAddButton={setAddButton}
                      />
                    </td>

                    <td key={passColumns[3].id} style={{ width: "50%" }}>
                      <div
                        key={row._id}
                        className="password-wrapper"
                        style={{ width: "50%" }}
                      >
                        <Form.Control
                          type={inputTypes[row._id]}
                          value={row.password}
                          readOnly
                          className="password-input workspace_searchInput py-1"
                          style={{
                            border: "none !important",
                            outline: "none !important",
                            fontSize: "0.875rem",
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          }}
                        />
                        <div className="password-icon-wrappper flex items-center ">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`eye-tooltip-${row._id}`}>
                                Toggle Password
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => togglePasswordVisibility(row._id)}
                            >
                              {passwordVisible[row._id] ? (
                                <FaEyeSlash className="passIcon fs-6" />
                              ) : (
                                <FaEye className="passIcon fs-6" />
                              )}
                            </span>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`copy-tooltip-${row._id}`}>
                                {passwordCopied
                                  ? "Password Copied!"
                                  : "Copy Password"}
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => copyPassword(row.password)}
                            >
                              <MdContentCopy className="passIcon fs-6" />
                            </span>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </td>

                    <td key={passColumns[4].id}>
                      <div
                        key={row._id}
                        className="password_url w-100 flex justify-center items-center"
                      >
                        <a href={row?.url} target="_blank" className="">
                          {/* {row.url.text} */}
                          <LuExternalLink className="password_link fs-6 text-color" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <th
                    className="table-shadow table-shadow-important table-border-color"
                    style={tableborder}
                  ></th>
                  <td className="text-center checkBox-cell">
                    <Form.Check type="checkbox" disabled />
                  </td>
                  <td colSpan="40" className=" py-1">
                    <Form.Control
                      type="text"
                      onClick={() => toggleCanvas(table?._id)}
                      placeholder="+ Add Project"
                      className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <OfCanvasPassword
        tableID={table?._id}
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
      />
    </>
  );
};

export default NewTablePassword;
