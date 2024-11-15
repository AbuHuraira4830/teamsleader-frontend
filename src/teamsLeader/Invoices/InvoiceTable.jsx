import React, { useEffect, useRef, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRoundedAdd, BiChevronDown } from "react-icons/bi";
import AddColumnModal from "../Pages/NewTeam/Components/addColumnModal";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const InvoiceTable = ({
  handleMouseEnter,
  handleMouseLeave,
  status,
  setStatus,
  handleStatusSelection,
  statusModal,
  handleOpenChange,
}) => {
  const {
    rowsInvoices,
    invoiceColumns,
    setInvoiceColumns,
    setRowsInvoices,
    tableHiddenPassword,
    setTableHiddenPassword,
    createInvoice,
    setShowCreateInvoice,
  } = useStateContext();

  const [iconRotationPassword, setIconRotationPassword] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  // const [showCanvasPassword, setShowCanvasPassword] = useState(true);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const labelModalRef = useRef();

  const handleToggleTablePassword = () => {
    setTableHiddenPassword(!tableHiddenPassword);
    setIconRotationPassword(iconRotationPassword === 0 ? 270 : 0);
  };

  const iconStylePassword = {
    transform: `rotate(${iconRotationPassword}deg)`,
  };

  const handleRowSelectPassword = (rowId) => {
    const updatedRows = rowsInvoices.map((row) => {
      if (row.id === rowId) {
        // Toggle the 'selected' property
        return { ...row, selected: !row.selected };
      }
      return row;
    });
    setRowsInvoices(updatedRows);
  };
  const handleSelectAll = (event) => {
    const newSelectAll = event.target.checked;
    setSelectAllChecked(newSelectAll); // Update the state to reflect the change
    const updatedRows = rowsInvoices.map((row) => {
      // Set 'selected' to the new 'selectAll' value for all rows
      return { ...row, selected: newSelectAll };
    });
    setRowsInvoices(updatedRows);
  };

  const handleToggleEdit = (columnId) => {
    setInvoiceColumns(
      invoiceColumns.map((column) => {
        if (column.id === columnId) {
          return { ...column, editable: !column.editable };
        }
        return column;
      })
    );
  };

  const handleColumnNameChange = (columnId, newName) => {
    setInvoiceColumns(
      invoiceColumns.map((column) =>
        column.id === columnId ? { ...column, tempName: newName } : column
      )
    );
  };

  const handleColumnNameUpdate = (columnId) => {
    setInvoiceColumns(
      invoiceColumns.map((column) =>
        column.id === columnId
          ? { ...column, name: column.tempName, editable: false }
          : column
      )
    );
  };
  const handleDeleteSelected = () => {
    if (selectAllChecked) {
      // Only setTableHiddenPassword(false) if selectAllChecked is true
      setTableHiddenPassword(true);
    }

    const updatedRows = rowsInvoices.filter((row) => !row.selected);
    setRowsInvoices(updatedRows); // Update the state with the filtered rows
    setShowCreateInvoice(false);
  }; // Filter out rows that are not selected

  return (
    <>
      {!tableHiddenPassword && (
        <div className="relative w-full  mb-1 ">
          <div className="flex ms-2 ps-4">
            <h6
              onClick={handleToggleTablePassword}
              className="fw-bold flex items-center"
              style={{ color: "rgb(87, 155, 252)", cursor: "pointer" }}
            >
              <BiChevronDown style={iconStylePassword} className="fs-4" />{" "}
              Invoices
            </h6>
          </div>
          {rowsInvoices.some((row) => row.selected) && (
            // <div className="absolute right-[5%] ">
            <div className="absolute  bottom-[5%] right-[0%]">
              <Button
                type="text"
                className={`px-2 d-flex items-center  border-0  bg-red-500 opacity-80 mr-5`}
                // bg-[#025231]
                style={{
                  height: "30px",
                  fontSize: ".8rem",
                  backgroundColor: "#f34234 ",
                }}
                onClick={handleDeleteSelected}
              >
                <AiOutlineDelete className="text-[.9rem] mr-1 mb-[0.15rem]" />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </div>
      )}
      <div>
        {tableHiddenPassword && rowsInvoices.length !== 0 && (
          <div className="px-4">
            <Table responsive bordered className="">
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
                        Invoices
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {rowsInvoices.length} Invoices
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHiddenPassword && (
          <div className="empty-table-message text-center p-10">
            <div className="shadow-lg p-8 rounded-2xl inline-block bg-white">
              <div className="flex justify-center mb-4">
                <div className="bg-[#00854d] p-2 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 001.85-1.75L19 14V7a2 2 0 00-1.85-2H6a2 2 0 00-2 2v7l.15 0.25A2 2 0 005 16h2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-800 text-lg font-semibold mb-2">
                Create New Invoice
              </h3>
              <p className="text-gray-600 mb-4">
                Create invoices in seconds, in your own style. You can also
                import invoices and credit notes.
              </p>
              <Link to="/invoices/create">
                <button className="bg-[#00854d] hover:bg-[#006837] text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">
                  Create Invoice
                </button>
              </Link>
            </div>
          </div>
        )}

        {!tableHiddenPassword && (
          <div className="px-4 position-relative ">
            <Table responsive bordered className="border-bottom-0">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="table-shadow"></th>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={selectAllChecked}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {invoiceColumns.map((column, index) => {
                    // Skip rendering the "People" column
                    if (column.columnType === "people") {
                      return null;
                    }
                    // When rendering the "Client Name", apply colSpan and skip the next "People" column
                    if (column.columnType === "clientName") {
                      return (
                        <th key={column.id} colSpan={2} className="th-fixed">
                          {column.editable ? (
                            <input
                              type="text"
                              value={column.tempName}
                              className="editInputHead"
                              onChange={(e) =>
                                handleColumnNameChange(
                                  column.id,
                                  e.target.value
                                )
                              }
                              onBlur={() => handleColumnNameUpdate(column.id)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleColumnNameUpdate(column.id);
                                }
                              }}
                              autoFocus
                              id={`header-${column.id}`}
                            />
                          ) : (
                            <span
                              onClick={() => handleToggleEdit(column.id)}
                              className="editable-header"
                            >
                              {column.tempName}
                            </span>
                          )}
                        </th>
                      );
                    }
                    // Render other columns as normal
                    return column.editable ? (
                      <th key={column.id} className="th-fixed">
                        <input
                          type="text"
                          value={column.tempName}
                          className="editInputHead"
                          onChange={(e) =>
                            handleColumnNameChange(column.id, e.target.value)
                          }
                          onBlur={() => handleColumnNameUpdate(column.id)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleColumnNameUpdate(column.id);
                            }
                          }}
                          autoFocus
                        />
                      </th>
                    ) : (
                      <th
                        key={column.id}
                        className="th-fixed "
                        // onClick={() => handleToggleEdit(column.id)}
                      >
                        <span
                          onClick={() => handleToggleEdit(column.id)}
                          className="editable-header"
                        >
                          {column.tempName}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="rounded-end rounded-2 overflow-hidden">
                {rowsInvoices.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <th className="table-shadow"></th>
                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleRowSelectPassword(row.id)}
                      />
                    </td>
                    {/* Directly render Client Name and pencil icon */}
                    <td className="text-center">
                      {row.task}{" "}
                      {/* Assuming 'task' corresponds to Client Name */}
                    </td>
                    <td>
                      <HiOutlinePencilSquare
                        onClick={toggleCanvasPassword}
                        className=" text-[1.1rem] m-auto"
                      />
                    </td>

                    {/* Map over the other columns for data */}
                    {invoiceColumns.map((column) => {
                      if (
                        ["clientName", "people", "totalAmount"].includes(
                          column.columnType
                        )
                      ) {
                        // Skip rendering this column's cells in rows as it's handled differently
                        return null;
                      }
                      let cellData =
                        row[
                          column.columnType.replace(/\s+/g, "").toLowerCase()
                        ];

                      if (column.columnType === "status") {
                        // Render Popover for status
                        return (
                          <Popover
                            key={column.id}
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
                              handleOpenChange(row.id, column.id, newOpen)
                            }
                          >
                            <td className="text-center p-0 flex ">
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
                        );
                      }
                      return <td key={column.id}>{cellData}</td>;
                    })}
                    <td>
                      <span className="font-semibold">
                        {row.totalAmount ? `${row.totalAmount}` : "€ 0.00"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceTable;
