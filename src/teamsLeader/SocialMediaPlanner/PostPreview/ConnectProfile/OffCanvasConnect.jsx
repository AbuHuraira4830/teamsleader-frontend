import React from "react";
import { IoMdClose } from "react-icons/io";
import ProfileConnectionCards from "./ProfileConnectionCards";
import {
  BsChevronDown,
  BsEmojiSmile,
  BsList,
  BsReply,
  BsThreeDots,
} from "react-icons/bs";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { Button, Dropdown, Form, Offcanvas } from "react-bootstrap";
const OffCanvasConnect = ({
  show,
  handleClose,
  addLinkedAccount,
  setShowChannelsCanvas,
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="planner_offCanvasWidth newTeam_ofcanvas"
    >
      <Offcanvas.Header>
        <button className="custom_closeCanvasBtn " onClick={handleClose}>
          <IoMdClose className="text-2xl " />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-0">
          <h5 className="mt-1 me-1 font-semibold">Connect a Profile</h5>
          <span className="align-items-center flex">
            {/* Icons and Buttons */}
          </span>
        </div>
        <div className="main_tableBtnDiv mb-4"></div>
        <ProfileConnectionCards
          handleCloseCanvas={handleClose}
          addLinkedAccount={addLinkedAccount}
          setShowChannelsCanvas={setShowChannelsCanvas}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasConnect;
