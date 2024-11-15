import { Divider } from "antd";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiCornerUpRight } from "react-icons/fi";
import {
  LuCornerUpLeft,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuTableProperties,
} from "react-icons/lu";
import {
  PiArrowBendUpLeft,
  PiArrowBendUpLeftBold,
  PiArrowBendUpRightBold,
  PiTextTBold,
} from "react-icons/pi";
import { TbLayoutSidebar } from "react-icons/tb";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DocSidebar from "./DocSidebar";
import { Dropdown } from "react-bootstrap";
import { TiImage } from "react-icons/ti";
import { FaList, FaRegCheckSquare } from "react-icons/fa";
import { RiFontMono } from "react-icons/ri";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  //   <svg viewBox="0 0 18 18">
  //     <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
  //     <path
  //       className="ql-stroke"
  //       d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
  //     />
  //   </svg>
  <PiArrowBendUpLeftBold />
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  //   <svg viewBox="0 0 18 18">
  //     <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
  //     <path
  //       className="ql-stroke"
  //       d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
  //     />
  //   </svg>
  <PiArrowBendUpRightBold />
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = ({ showDrawer }) => {
  return (
    <div id="toolbar">
      <span className="ql-formats me-0">
        {/* <button className="ql-add text-nowrap w-100 centerIt">
          <AiOutlinePlus className="me-2" />
          Add
        </button> */}
        <Dropdown>
          <Dropdown.Toggle className="ql-add text-nowrap w-100 centerIt text-dark bg-transparent">
            <AiOutlinePlus className="me-2" />
            Add{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 py-3 fs_14">
            <Dropdown.Item href="#" className="mb-1">
              <RiFontMono className="me-2 fs-5" /> Normal text
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1">
              <LuHeading2 className="me-2 fs-5" /> Medium title
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1">
              <FaList className="me-2 fs-5" /> Bulleted list
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1">
              <FaRegCheckSquare className="me-2 fs-5" /> Checklist
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1">
              <LuTableProperties className="me-2 fs-5" /> Table
            </Dropdown.Item>
            <Dropdown.Item href="#">
              <TiImage className="me-2 fs-5" /> Image
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0">
        <select className="ql-header" defaultValue="3">
          <option value="0" className="d-flex">
            {/* <PiTextTBold /> */}
            Normal text
          </option>
          <option value="1">
            {/* <LuHeading1 /> */}
            Large title
          </option>
          <option value="2">
            {/* <LuHeading2 /> */}
            Medium title
          </option>
          <option value="3">
            {/* <LuHeading3 /> */}
            Small title
          </option>
        </select>
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0 ">
        <select className="ql-align" />
      </span>
      <span className="ql-formats me-0 ">
        <button className="ql-add centerIt w-100">
          <TbLayoutSidebar className="fs-3" />
        </button>
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="check" />
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0 ">
        <button className="ql-style centerIt w-100" onClick={showDrawer}>
          Style
        </button>
      </span>
      <Divider type="vertical" />
      <span className="ql-formats me-0 ">
        <button className="ql-mention centerIt w-100">@</button>
      </span>
    </div>
  );
};

export default QuillToolbar;
