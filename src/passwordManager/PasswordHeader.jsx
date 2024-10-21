import React, { useState } from "react";
import "./password.css";
import { GoPlus } from "react-icons/go";
import {
  Button,
  Dropdown,
  Modal,
  Form,
  Accordion,
  Table,
} from "react-bootstrap";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiFolderOpen } from "react-icons/ti";
import { PiUserCircleThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { TbUserPlus } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Folders from "./Folders";
import { CiLock } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import AddCardInfoForm from "./AddCardInfoForm";
import PasswordFolders from "./PasswordFolders";

import AddPasswordForm from "./AddPasswordForm";
const PasswordHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [currentView, setCurrentView] = useState("EmptyVault");
  const [formData, setFormData] = useState(null);
  const [templates, setTemplates] = useState([]);

  const handleSavePassword = (templateData) => {
    // setFormData(data);
    setCurrentView("PasswordFolders");
    setTemplates((prevTemplates) => [...prevTemplates, templateData]);
  };

  const handleBackButtonClick = () => {
    setCurrentView("EmptyVault");
  };

  const handleDropdownToggleItems = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleAddPasswordClick = () => {
    setCurrentView("AddPasswordForm");
  };
  const handleAddCardInfoClick = () => {
    setCurrentView("AddCardInfoForm");
  };

  return (
    <>
      <div className="flex  justify-content-between align-items-center  mb-1 font-weight-bold vault_container">
        <div className="password_heading">Usman's Vault</div>

        <div className="flex justify-content-center align-items-center ">
          <div>
            <div>
              <Button
                type="button"
                className="px-3 py-1 workspace_addBtn border-0 rounded-1 rounded-end-1"
                style={{ backgroundColor: "#025231", fontSize: "1rem" }}
              >
                <div className="flex justify-content-center align-items-center">
                  {/* <GoPlus style={{ fontSize: "1.3rem" }} /> */}
                  Add Items
                  <div
                    className="password_circle mx-1"
                    onClick={handleDropdownToggleItems}
                  >
                    <HiDotsHorizontal />
                  </div>
                </div>
              </Button>
            </div>
            <Dropdown
              show={showDropdown}
              align="end"
              onClose={handleDropdownClose}
              className="mt-2 password_dropdown "
              style={{
                border: "none",
                backgroundColor: "none",
                paddding: "4rem 0",
              }}
            >
              <Dropdown.Menu>
                <div className="my-2">
                  <div className="flex flex-column ">
                    <div>
                      <Dropdown.Item
                        onClick={handleDropdownClose}
                        className="fs_1"
                      >
                        <div
                          className="flex justify-content-center align-items-center "
                          onClick={handleAddPasswordClick}
                        >
                          <CiLock className="folderIcon " />
                          Password
                        </div>
                      </Dropdown.Item>
                    </div>
                    <Dropdown.Item
                      onClick={handleDropdownClose}
                      className="fs_1"
                    >
                      <div
                        onClick={handleAddCardInfoClick}
                        className="flex justify-content-center align-items-center"
                      >
                        <CiCreditCard1 className=" folderIcon" />
                        Card Info
                      </div>
                    </Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* Add Password Modal */}
      </div>
      <div className="password_heading vault_container_inner flex  align-items-center">
        <div className="invite_user">
          <TbUserPlus />
        </div>
        <p className="fs_1 shared_link_text" style={{ marginBottom: 0 }}>
          No Shared Links, <span className="admin_text">Admin</span>
        </p>
      </div>
      <hr />
      <>
        {currentView === "AddPasswordForm" && (
          <AddPasswordForm
            handleSavePassword={handleSavePassword}
            handleBackButtonClick={handleBackButtonClick}
          />
        )}
        {currentView === "AddCardInfoForm" && (
          <AddCardInfoForm
            handleSaveCardInfo={handleSavePassword}
            handleBackButtonClick={handleBackButtonClick}
          />
        )}
        {currentView === "PasswordFolders" && (
          <PasswordFolders formData={templates} />
        )}
        {currentView === "EmptyVault" && (
          <div className="flex flex-column align-items-center justify-content-center vault_empty">
            <div className="addPassword_icon my-1">
              <GoPlus />
            </div>
            <div className="vault_empty_text my-2">This vault is empty</div>
            <div className="firstPass_text my-1">
              Add your first password or invite a teammate.
            </div>
          </div>
        )}
        {/* {showAddPasswordForm ? (
          <AddPasswordForm handleBackButtonClick={handleBackButtonClick} />
        ) : showAddCardInfoForm ? (
          <AddCardInfoForm handleBackButtonClick={handleBackButtonClick} />
        ) : (
          <div className="flex flex-column align-items-center justify-content-center vault_empty">
            <div className="addPassword_icon my-1">
              <GoPlus />
            </div>
            <div className="vault_empty_text my-2">This vault is empty</div>
            <div className="firstPass_text my-1">
              Add your first password or invite a teammate.
            </div>
          </div>
        )} */}
      </>
    </>
  );
};

export default PasswordHeader;
