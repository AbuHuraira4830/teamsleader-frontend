import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Offcanvas } from "react-bootstrap";
import {
  FiChevronDown,
  FiDownload,
  FiGrid,
  FiPlus,
  FiPlusCircle,
} from "react-icons/fi";
import { RxAvatar, RxCross2, RxMagnifyingGlass } from "react-icons/rx";
import {
  BsChevronDown,
  BsEmojiSmile,
  BsList,
  BsReply,
  BsThreeDots,
} from "react-icons/bs";
import AddPasswordForm from "../../../../passwordManager/AddPasswordForm";
import AddCardInfoForm from "../../../../passwordManager/AddCardInfoForm";

const OfCanvasCard = ({ show, handleClose }) => {
  const [pageView, setPageView] = useState(1);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas"
      style={{ borderLeft: "1px solid var(--border-color) !important" }}
    >
      <Offcanvas.Header>
        <button
          type="button"
          class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 ms-0 me-auto"
          onClick={handleClose}
           aria-label="Close"
          style={{
            width: "24px",
            height: "24px",
            // position: "absolute",
            // top: "10px",
            // right: "10px",
          }}
        >
          <RxCross2 className="fs-5 text-color" />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-4">
          <h5 className="mt-1 me-2">Cards</h5>
          <span className="align-items-center flex">
            <RxAvatar className="fs-5" />
            <div className="vr ms-2 me-1 nav_splitter align-self-center pb-1"></div>
            <Button className=" px-1 fs-4 workspace_menuBtn bgHover align-middle">
              <BsThreeDots className=" fs-5 " />
            </Button>
          </span>
        </div>

        <div className=" main_tableBtnDiv mb-3 flex justify-content-between mb-4">
          <span>
            <span className={`${pageView === 1 ? "green_borderBottom" : ""}`}>
              <Button
                className="workspace-dropdown-button d-flex items-center align-self-center  text-start py-1  px-2"
                onClick={() => setPageView(1)}
              >
                <FiPlus className="me-2 " />
                Add New Card
              </Button>
            </span>
          </span>
        </div>
        {/* Add Password */}
        <AddCardInfoForm handleClose={handleClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OfCanvasCard;
