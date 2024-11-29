import { Divider } from "antd";
import React, { useEffect, useState } from "react";
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
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
// import * as QuillTableUI from "quill-table-ui";
// import 'quill-better-table/dist/quill-better-table.css';
// import QuillBetterTable from "quill-better-table";

// Quill.register(
//   {
//     "modules/better-table": QuillBetterTable,
//   },
//   true
// );

const CustomUndo = () => <PiArrowBendUpLeftBold />;
const CustomRedo = () => <PiArrowBendUpRightBold />;

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

async function suggestPeople(searchTerm) {
  const allPeople = [
    {
      id: 1,
      value: "Usman Haider",
    },
    {
      id: 2,
      value: "Patrik Sjölin",
    },
  ];
  return allPeople.filter((person) =>
    person.value.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export const modules = {
  // table: true,
  // tableUI: true,
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: async function (searchTerm, renderList) {
      const matchedPeople = await suggestPeople(searchTerm);
      renderList(matchedPeople);
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  // betterTable: {
  //   operationMenu: {
  //     items: {
  //       unmergeCells: {
  //         text: "Unmerge",
  //         icon: {
  //           type: "svg",
  //           value: <PiArrowBendUpRightBold />,
  //         },
  //         onClick: function (selected) {
  //           this.quill.getModule("better-table").table.unmergeCells(selected);
  //         },
  //       },
  //     },
  //   },
  // },
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
  "mention",

  // "table",
];

// Quill Toolbar component
export const QuillToolbar = ({ showDrawer, quillRef }) => {
  return (
    <div id="toolbar">
      <span className="ql-formats me-0">
        <Dropdown>
          <Dropdown.Toggle className="ql-add text-nowrap w-100 centerIt text-dark bg-transparent">
            <AiOutlinePlus className="me-2" />
            Add{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 py-3 fs_14">
            <Dropdown.Item href="#" className="mb-1 d-flex">
              <RiFontMono className="me-2 fs-5" /> Normal text
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1 d-flex">
              <LuHeading2 className="me-2 fs-5" /> Medium title
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1 d-flex">
              <FaList className="me-2 fs-5" /> Bulleted list
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1 d-flex">
              <FaRegCheckSquare className="me-2 fs-5" /> Checklist
            </Dropdown.Item>
            <Dropdown.Item href="#" className="mb-1 d-flex">
              <LuTableProperties className="me-2 fs-5" /> Table
            </Dropdown.Item>
            <Dropdown.Item href="#" className="d-flex">
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
        <button className="ql-image centerIt w-100">
          <TiImage className=" fs-5" />
        </button>
      </span>
    </div>
  );
};

export default QuillToolbar;
