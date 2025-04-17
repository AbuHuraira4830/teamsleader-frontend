import React, { useEffect, useRef, useState } from "react";
import OfCanvasPassword from "./Components/OfCanvasPassword";
import OfCanvasCard from "./Components/OffCanvasCard";
import {
  Table,
  Form,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRoundedAdd, BiChevronDown } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Popover } from "antd";
import LabelSelectionModal from "./Components/LabelSelectionModal";
import AddColumnModal from "./Components/AddColumnModal";
// ... (existing imports)
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";
import { MdContentCopy } from "react-icons/md";

// import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const NewTableCard = ({
  tableHidden,
  handleToggleTable,
  columns,
  selectAll,
  handleSelectAll,
  handleShow,
  hoveredRow,
  handleMouseEnter,
  handleMouseLeave,
  rowOptionMenu,
  handleDeleteRow,
  moveRowToTop,
  duplicateRow,
  handleRowSelect,
  editedItemId,
  editedItemValue,
  setEditedItemValue,
  handleItemEditEnd,
  handleItemEditStart,
  toggleCanvas,
  status,
  setStatus,
  statusModal,
  handleOpenChange,
  renderComponentForColumn,
  newItemInput,
  setNewItemInput,
  handleKeyPress,
  show,
  handleClose,
  setSelectedButton,
  addColumn,
  rows,
  handleStatusSelection,
  setCardColumns,
  cardColumns,
  passColumns,
  // setPassColumns,
  // tablePasswordData,
  // setTablePasswordData,
  // setRows,
}) => {
  // const { rowsPassword, setRowsPassword } = useStateContext();
  const { rowsCard, setRowsCard } = useStateContext();

  const [tableHiddenPassword, setTableHiddenPassword] = useState(true);
  const [iconRotationPassword, setIconRotationPassword] = useState(0);
  const [cardCopied, setCardCopied] = useState(false);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);

  const labelModalRef = useRef();

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

  const toggleCardVisibility = (id) => {
    setRowsCard((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, showCard: !row.showCard } : row 
      )
    );
  };

  //   navigator.clipboard
  //     .writeText(password)
  //     .then(() => {
  //       console.log("Password copied to clipboard");
  //       setPasswordCopied(true);

  //       // Reset the copied status after a few seconds
  //       setTimeout(() => {
  //         setPasswordCopied(false);
  //       }, 1000); // Adjust the duration as needed
  //     })
  //     .catch((err) => {
  //       console.error("Unable to copy password", err);
  //     });
  // };
  // };
  const copyCardNumber = (card) => {
    navigator.clipboard
      .writeText(card)
      .then(() => {
        console.log("Card Number copied to clipboard");
        setCardCopied(true);

        // Reset the copied status after a few seconds
        setTimeout(() => {
          setCardCopied(false);
        }, 1000); // Adjust the duration as needed
      })
      .catch((err) => {
        console.error("Unable to copy card number", err);
      });
  };

  const iconStylePassword = {
    transform: `rotate(${iconRotationPassword}deg)`,
  };

  const handleRowSelectPassword = (id) => {
    const updatedTableData = rowsCard.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setRowsCard(updatedTableData);
  };
  return (
    <>
      {tableHiddenPassword && (
        <div className="flex ms-2 ps-4">
          <h6
            onClick={handleToggleTablePassword}
            className="fw-bold flex items-center"
            style={{ color: "rgb(87, 155, 252)", cursor: "pointer" }}
          >
            <BiChevronDown style={iconStylePassword} className="fs-4" /> Cards
          </h6>
        </div>
      )}
      <div>
        {!tableHiddenPassword && (
          <div className="px-4">
            <Table responsive bordered hover className="">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="text-center px-1">
                    <div className="text-start ms-2">
                      <h6
                        onClick={handleToggleTablePassword}
                        className="fw-bold m-0 flex items-center"
                        style={{
                          color: "rgb(87, 155, 252)",
                          cursor: "pointer",
                        }}
                      >
                        <BiChevronDown
                          style={iconStylePassword}
                          className="fs-4"
                        />
                        Cards
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {tablePasswordData.length} Users
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHiddenPassword && (
          <div className="px-4 position-relative ">
            <Table responsive bordered hover className="border-bottom-0">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>New Card</th>

                  {cardColumns.slice(2).map((column) => (
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

              {/* ================================================================ */}
              <tbody className="rounded-end rounded-2 overflow-hidden">
                {rowsCard.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td key={cardColumns[0].id}>
                      <span className="position-absolute tr_optionBtn p-2 ">
                        <Dropdown className="pt-2">
                          <Dropdown.Toggle
                            className={` ${
                              hoveredRow === row.id ? "" : "disply_none"
                            } px-1 py-0 workspace_menuBtn bgHover  text-center mx-1 focusClass`}
                            style={{
                              width: "25px",
                              height: "25px",
                              verticalAlign: "middle",
                            }}
                          >
                            <BsThreeDots className=" fs-6 align-middle " />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="tr_optionDropdown">
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
                                    }
                                    handleMouseLeave();
                                  }}
                                  className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                                  style={{
                                    height: "34px",
                                  }}
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
                      </span>
                      <Form.Check
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleRowSelectPassword(row.id)}
                        className="pt-2"
                        // style={{
                        //   paddingLeft: "10px",
                        //   paddingRight: "10px",
                        // }}
                      />
                    </td>
                    {/* <td key={cardColumns[1].id}>
                      {editedItemId === row.id ? (
                        <div className="pt-2">
                          <Form.Control
                            type="text"
                            value={editedItemValue}
                            onChange={(e) => setEditedItemValue(e.target.value)}
                            onBlur={handleItemEditEnd}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleItemEditEnd();
                              }
                            }}
                            className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100 text-center "
                          />
                        </div>
                      ) : (
                        <div
                          onMouseEnter={() =>
                            handleItemEditStart(row.id, row.userName)
                          }
                          className="editable-item ps-4 pt-2 text-center"
                        >
                          {row.userName}
                        </div>
                      )}
                    </td> */}
                    <td key={cardColumns[1].id}>
                      <BiMessageRoundedAdd
                        onClick={toggleCanvasPassword}
                        style={{
                          fontSize: "30px",
                          paddingTop: ".2rem",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </td>

                    <td key={cardColumns[2].id} className="text-center">
                      <div key={row.id} className="password_url w-100 pt-2">
                        <span className="card_fullName">{row.fullName}</span>
                      </div>
                    </td>
                    {/* =======================Card Number Column======================== */}
                    <td key={cardColumns[3].id} style={{ width: "50%" }}>
                      <div
                        key={row.id}
                        className="password-wrapper "
                        style={{ width: "40%" }}
                      >
                        <Form.Control
                          // type={row.showCard ? "text" : "password"}
                          type="text"
                          value={
                            row.showCard
                              ? row.cardNumber // Show the full card number when showCard is true
                              : `************${row.cardNumber.slice(-4)}` // Show last 4 digits by default
                          }
                          readOnly
                          className="password-input"
                          style={{
                            border: "none !important",
                            outline: "none !important",
                            fontSize: "0.7rem",
                          }}
                        />
                        <div className="password-icon-wrappper flex items-center">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`eye-tooltip-${row.id}`}>
                                Toggle Card
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => toggleCardVisibility(row.id)}
                            >
                              {row.showCard ? (
                                <FaEyeSlash className="passIcon" />
                              ) : (
                                <FaEye className="passIcon" />
                              )}
                            </span>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`copy-tooltip-${row._id}`}>
                                {cardCopied
                                  ? "Card Number Copied!"
                                  : "Copy Card Number"}
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => copyCardNumber(row.cardNumber)}
                            >
                              <MdContentCopy className="passIcon" />
                            </span>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </td>
                    <td key={cardColumns[4].id}>
                      <div key={row.id} className="password_url w-100 pt-2">
                        <span className="card_cvvCode">{row.cvvCode}</span>
                      </div>
                    </td>
                    <td key={cardColumns[5].id}>
                      <div key={row.id} className="password_url w-100 pt-2">
                        <span className="card_expDate">{row.expDate}</span>
                      </div>
                    </td>
                    {/* </td> */}
                  </tr>
                ))}

                <tr>
                  <td className="text-center">
                    <Form.Check type="checkbox" disabled />
                  </td>
                  <td colSpan="40" className=" py-1 text-center">
                    <Form.Control
                      type="text"
                      value={newItemInput}
                      onChange={(e) => setNewItemInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="+ Add Card"
                      className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                    />
                  </td>
                </tr>
                {/* <tr className="border-bottom-0 action_tr">
                  <td className="transparent_border"></td>
                  <td className="transparent_border"></td>
                  <td className="transparent_border border-end"></td>
                  {cardColumns.slice(2).map((column) => (
                    <td
                      key={column.id}
                      className="border"
                      style={{ height: "36px" }}
                    >
                      {column.name === "Vote" ? (
                        <p className="m-0 fw-bold">
                          Total votes:{" "}
                          {rows.filter((row) => row.vote === true).length}
                        </p>
                      ) : (
                        ""
                      )}
                    </td>
                  ))}
                  <td className="border"></td>
                </tr> */}
              </tbody>
            </Table>
            {show && (
              <AddColumnModal
                handleClose={handleClose}
                setSelectedButton={setSelectedButton}
                show={show}
                addColumn={addColumn}
              />
            )}
          </div>
        )}
      </div>
      <OfCanvasCard
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
      />
    </>
  );
};
export default NewTableCard;
