import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Offcanvas } from "react-bootstrap";
import {
  FiChevronDown,
  FiDownload,
  FiGrid,
  FiPlus,
  FiPlusCircle,
} from "react-icons/fi";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import {
  BsChevronDown,
  BsEmojiSmile,
  BsList,
  BsReply,
  BsThreeDots,
} from "react-icons/bs";
// import AddPasswordForm from "../../../../passwordManager/AddPasswordForm";
import { GoPlus } from "react-icons/go"; // Importing Plus icon from react-icons

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiSolidEditAlt } from "react-icons/bi";
import StatusPreview from "./StatusPreview";
import CurrencyPreview from "./CurrencyPreview";
import AdditionalInfoPreview from "./AdditionalInfoPreview";
import { IoIosAdd } from "react-icons/io"; // This import is based on your usage of react-icons v5

const OfCanvasPreview = ({ show, handleClose }) => {
  const [pageView, setPageView] = useState(1);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className=" newTeam_ofcanvas"
      style={{
        width: "35%",
      }}
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-2 flex-col">
          {/* <h5 className="mt-1 me-2">Invoice 2024-001</h5> */}
          <h5 className="text-xl font-semibold">
            Invoice <span className="text-[#00854d]">2024-001</span>
          </h5>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2">
              <Button className="d-flex item-center bg-transparent border-0 p-0 ">
                <FiEyeOff className="text-[#00854d] mt-1" />
                <span className="ml-2 text-[#00854d]"> Hide Preview </span>
              </Button>
              <span className=".text-primary-invoice">/</span>
              <span className="flex gap-1 text-primary-invoice font-semibold">
                € 4,770.00 incl.VAT
              </span>
              <span className="flex  text-primary-invoice font-semibold"></span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="d-flex item-center bg-transparent border-0 p-0 mb-3">
              <BiSolidEditAlt className="text-[#00854d] mt-1 text-[1.1rem]" />
            </Button>
            <Button className="d-flex item-center bg-transparent border-0 p-0 mb-3">
              <HiOutlineDuplicate className="text-[#00854d] mt-1 text-[1rem]" />
            </Button>
          </div>
        </div>
        <div className=" main_tableBtnDiv  mb-4"></div>
        <StatusPreview />
        <CurrencyPreview />
        <div className=" main_tableBtnDiv  mt-3"></div>
        <AdditionalInfoPreview />
        <div className=" main_tableBtnDiv  mt-3"></div>

        <div className="flex items-center  mt-4">
          <div className="rounded-full bg-green-600 ">
            <IoIosAdd className="text-white text-sm" />
          </div>
          <span className="ml-2 text-xs text-gray-600">
            Created on monday on Mar 25, 2024
          </span>
        </div>

        <div className="flex justify-content-end pt-12">
          <Button
            className="workspace-dropdown-button fw-normal rounded-1 py-1 me-3 px-3 "
            style={{
              height: "34px",
            }}
            // onClick={handleClose}
          >
            Delete
          </Button>
          <Button
            type="submit"
            className="py-1 px-3  workspace_addBtn rounded-1 border-0"
            style={{ height: "34px" }}
            // disabled={!isSaveButtonEnabled}
            // onClick={savePersonalDetails}
          >
            Save
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OfCanvasPreview;
