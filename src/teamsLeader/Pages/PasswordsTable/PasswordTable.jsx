import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import NewTablePassword from "../NewTeam/NewTablePassword";
import { Button, Dropdown } from "react-bootstrap";
import { getAPI, postAPI } from "../../../helpers/apis";
import { CiCreditCard1, CiLock } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import CardTable from "../CardTable/CardTable";

const PasswordTable = () => {
  const { passwordTables, setPasswordTables } = useStateContext();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tableHidden, setTableHidden] = useState(true);
  const [iconRotation, setIconRotation] = useState(0);

  const handleAddPasswordsClick = (type) => {
    // setPasswordComponentCount((prevCount) => prevCount + 1);
    const data = {
      name: type,
      color: "#00854d",
      type,
    };
    postAPI(`/api/password-table/store`, data)
      .then((response) => {
        setPasswordTables(response.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAPI(`/api/password-table/list`)
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteRow = (id) => {
    postAPI(`/api/password-table/delete-selected-row`, { selectedIds: id })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const moveRowToTop = (id, tableID) => {
    postAPI(`/api/password-row/move-to-top`, {
      tableID: tableID,
      rowID: id,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const duplicateRow = (id, tableID) => {
    postAPI(`/api/password-row/duplicate`, {
      tableID: tableID,
      rowID: id,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const CreateRowBelow = (id, tableID) => {
    postAPI(`/api/password-row/create-below`, {
      tableID: tableID,
      rowID: id,
    })
      .then((res) => {
        setPasswordTables(res.data.tables);
      })
      .catch((error) => {
        // Handle error
        console.error("Error duplicating task:", error);
        // Show error message or perform any other necessary actions
      });
  };
  const iconStyle = {
    transform: `rotate(${iconRotation}deg)`,
  };
  const handleToggleTable = () => {
    setTableHidden(!tableHidden);
    setIconRotation(iconRotation === 0 ? 270 : 0);
  };
  return (
    <div className="px-4 pt-5">
      {/* <h3>Usman</h3> */}

      {/* <Button
        className="workspace_addBtn fs_14 border-0 rounded-1 mt-3"
        style={{
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleAddPasswordsClick}
      >
        Add Table
      </Button> */}
      <Dropdown
        style={{ width: "fit-content" }}
        className=" py-0  
         workspace_addBtn  border-0 rounded-1"
      >
        <Dropdown.Toggle
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          New Item <FaAngleDown className="mt-[0.2rem] ml-2 mb-[0.1rem]" />
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="border-0 "
          style={{
            width: "220px",
            padding: "8px",
          }}
        >
          <Dropdown.Item>
            <div
              className="fs_1 centerIt"
              onClick={() => handleAddPasswordsClick("Passwords")}
            >
              <CiLock className="folderIcon " />
              Add Passwords
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div
              className="fs_1 centerIt"
              onClick={() => handleAddPasswordsClick("Cards")}
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
      {passwordTables?.map((table) => {
        if (table.type === "Passwords") {
          return (
            <NewTablePassword
              key={table?._id}
              table={table}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              handleDeleteRow={handleDeleteRow}
              moveRowToTop={moveRowToTop}
              duplicateRow={duplicateRow}
              CreateRowBelow={CreateRowBelow}
              tableHidden={tableHidden}
              iconStyle={iconStyle}
              handleToggleTable={handleToggleTable}
            />
          );
        }
      })}
      {passwordTables?.map((table) => {
        if (table.type === "Cards") {
          return (
            <CardTable
              key={table?._id}
              table={table}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              handleDeleteRow={handleDeleteRow}
              moveRowToTop={moveRowToTop}
              duplicateRow={duplicateRow}
              CreateRowBelow={CreateRowBelow}
                tableHidden={tableHidden}
                iconStyle={iconStyle}
                handleToggleTable={handleToggleTable}
            />
          );
        }
      })}
    </div>
  );
};

export default PasswordTable;
