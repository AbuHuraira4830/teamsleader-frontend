import React, { useEffect, useRef, useState } from "react";
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
import AddColumnModal from "../Pages/NewTeam/Components/AddColumnModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdContentCopy } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import OfCanvasPassword from "../Pages/NewTeam/Components/OfCanvasPassword";
import { Popover } from "antd";
import LabelSelectionModal from "../Pages/NewTeam/Components/LabelSelectionModal";
import LabelSelectionModalInvoices from "./LabelSelectionModalInvoices";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoPencil } from "react-icons/go";

const QuoteTable = ({
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
  editedItemId,
  editedItemValue,
  setEditedItemValue,
  handleItemEditEnd,
  handleItemEditStart,
  newItemInput,
  setNewItemInput,
  handleKeyPress,
  show,
  status,
  setStatus,
  handleStatusSelection,
  handleClose,
  setSelectedButton,
  addColumn,
  statusModal,
  handleOpenChange,
}) => {
  const {
    rowsQuotes,

    quoteColumns,
    setRowsQuotes,
  } = useStateContext();

  const [tableHiddenPassword, setTableHiddenPassword] = useState(true);
  const [iconRotationPassword, setIconRotationPassword] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);

  const labelModalRef = useRef();

  const [tablePasswordData, setTablePasswordData] = useState([
    {
      item: "Project1",
      person: 30,
      //   status: "Services",
      status: "Not Sent",

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

  const iconStylePassword = {
    transform: `rotate(${iconRotationPassword}deg)`,
  };

  const handleRowSelectPassword = (id) => {
    const updatedTableData = rowsQuotes.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setRowsQuotes(updatedTableData);
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
            <BiChevronDown style={iconStylePassword} className="fs-4" /> Quotes
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
                        Quotes
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {tablePasswordData.length} Client Name
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
                  <th colSpan={2}>Client Name</th>

                  {quoteColumns.slice(3).map((column) => (
                    <th key={column.id}>{column.name}</th>
                  ))}
                  <th className="text-center ">
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
                  </th>
                </tr>
              </thead>

              <tbody className="rounded-end rounded-2 overflow-hidden">
                {rowsQuotes.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="text-center " key={quoteColumns[0].id}>
                      <span className="position-absolute tr_optionBtn p-2 ">
                        <Dropdown>
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
                      />
                    </td>
                    <td key={quoteColumns[1].id} className="text-center">
                      {editedItemId === row.id ? (
                        <div style={{ marginLeft: "11px" }}>
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
                            className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100 text-center"
                          />
                        </div>
                      ) : (
                        <div
                          onMouseEnter={() =>
                            handleItemEditStart(row.id, row.task)
                          }
                          className="editable-item ps-4 pt-1 text-center"
                        >
                          {row.task}
                        </div>
                      )}
                    </td>
                    <td key={quoteColumns[2].id}>
                      <HiOutlinePencilSquare
                        onClick={toggleCanvasPassword}
                        className=" text-[1.1rem] m-auto"
                      />
                    </td>

                    {/* <td key={quoteColumns[3].id}>
                      <div className="bg-green-300 text-green-900 border-green-200 px-3 py-1 rounded-[6.25rem]">
                        <span className="text-xs">{row.type}</span>
                      </div>
                    </td> */}
                    <td
                      key={quoteColumns[3].id}
                      //   style={{ width: "50%" }}
                    >
                      <span className="text-primary-700 text-xs">
                        {row.number}
                      </span>
                    </td>
                    <td key={quoteColumns[4].id}>
                      <span className="text-[#666] text-xs">{row.date}</span>
                    </td>
                    <Popover
                      key={row.id}
                      content={
                        <LabelSelectionModalInvoices
                          labels={status}
                          setLabels={setStatus}
                          labelModalRef={labelModalRef}
                          handleSelection={handleStatusSelection}
                        />
                      }
                      trigger="click"
                      open={statusModal[row.id]}
                      onOpenChange={(newOpen) =>
                        handleOpenChange(row.id, quoteColumns[4].id, newOpen)
                      }
                    >
                      <td
                        key={quoteColumns[5].id}
                        className="text-center p-0 flex "
                      >
                        <span
                          className="statusSpan w-100 px-3"
                          style={{
                            backgroundColor: row.status.backgroundColor,
                          }}
                        >
                          {row.status.text}
                        </span>
                      </td>
                    </Popover>

                    <td key={quoteColumns[6].id}>
                      <span className="font-semibold">€{row.totalAmount}</span>
                      <span className="font-normal">.00</span>
                    </td>
                  </tr>
                ))}
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
      <OfCanvasPassword
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
      />
    </>
  );
};

export default QuoteTable;
