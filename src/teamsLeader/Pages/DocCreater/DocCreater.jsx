import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LuCornerUpLeft } from "react-icons/lu";
import { FiCornerUpRight } from "react-icons/fi";
import QuillToolbar, { modules, formats } from "./QuillToolbar";
import "../../../assets/css/DocCreator.css";
import DocSidebar from "./DocSidebar";
import "quill-better-table/dist/quill-better-table.css";
import BetterTable from "quill-better-table";

const DocCreater = () => {
  const quillRef = useRef(null);

  const [editorValue, setEditorValue] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [pageWidth, setPageWidth] = useState("32px 100px 0px 100px");
  const [pageBgColor, setPageBgColor] = useState("#FFFFFF");

  const handleChange = (value) => {
    setEditorValue(value);
  };

  const [styleSidebar, setStyleSidebar] = useState(false);
  const showDrawer = () => {
    setStyleSidebar(true);
  };
  const onClose = () => {
    setStyleSidebar(false);
  };
  const sidebarFamilyChange = (family) => {
    setFontFamily(family);
    const qlContainer = document.querySelector(".ql-container");
    if (qlContainer) {
      qlContainer.style.fontFamily = family;
    }
    console.log({ family, fontFamily });
  };
  const sidebarFontSizeChange = (size) => {
    setFontSize(size);
    const qlContainer = document.querySelector(".ql-container");
    if (qlContainer) {
      const pTags = qlContainer.querySelectorAll("p");
      pTags.forEach((pTag) => {
        pTag.style.fontSize = size;
      });
    }
    console.log({ size, fontSize });
  };
  const pageWidthChange = (spacing) => {
    setPageWidth(spacing);
    const qlContainer = document.querySelector(".ql-container");
    const qlEditor = document.querySelector(".ql-editor");
    qlEditor.style.boxShadow = "none";

    if (qlContainer) {
      qlContainer.style.padding = spacing;
    }
  };
  const pageFrameChange = (shadow) => {
    setPageWidth(shadow);
    const qlEditor = document.querySelector(".ql-editor");
    if (qlEditor) {
      qlEditor.style.boxShadow = shadow;
    }
  };
  const pageBgColorChange = (color) => {
    setPageBgColor(color);
    const qlEditor = document.querySelector(".ql-editor");
    if (qlEditor) {
      qlEditor.style.backgroundColor = color;
    }
  };

  return (
    <div className="docCreater">
      <QuillToolbar showDrawer={showDrawer} quillRef={quillRef} />
      <ReactQuill
        ref={quillRef}
        value={editorValue}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <DocSidebar
        onClose={onClose}
        sidebar={styleSidebar}
        fontFamily={fontFamily}
        fontSize={fontSize}
        pageWidth={pageWidth}
        pageBgColor={pageBgColor}
        changeFontSize={sidebarFontSizeChange}
        changeFontFamily={sidebarFamilyChange}
        changePageWidth={pageWidthChange}
        changePageFrame={pageFrameChange}
        changePageBgColor={pageBgColorChange}
      />
    </div>
  );
};

export default DocCreater;
