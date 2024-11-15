import { Drawer } from "antd";
import React, { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { IoImageOutline, IoReorderFourOutline } from "react-icons/io5";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { CgMenuBoxed } from "react-icons/cg";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { RiFontMono } from "react-icons/ri";
import { RiFontSansSerif } from "react-icons/ri";
import { RxFontFamily } from "react-icons/rx";
import { TiImage } from "react-icons/ti";
import { PiTextTBold } from "react-icons/pi";
import { CiSquareAlert } from "react-icons/ci";
import { LuTextQuote } from "react-icons/lu";

const DocSidebar = ({ sidebar, onClose }) => {
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [pageWidth, setPageWidth] = useState("32px 100px 0px 100px");
  const [pageBgColor, setPageBgColor] = useState("#FFFFFF");

  const sidebarFamilyChange = (family) => {
    setFontFamily(family);
    const editorMain = document.querySelector(".ck-content");
    if (editorMain) {
      editorMain.style.fontFamily = family;
    }
    console.log({ family, fontFamily });
  };
  const sidebarFontSizeChange = (size) => {
    setFontSize(size);
    const editorMain = document.querySelector(".ck-editor__main");
    if (editorMain) {
      const pTags = editorMain.querySelectorAll("p");
      pTags.forEach((pTag) => {
        pTag.style.fontSize = size;
      });
    }
    console.log({ size, fontSize });
  };
  const pageWidthChange = (spacing) => {
    setPageWidth(spacing);
    const editorMain = document.querySelector(".ck-editor__main");
    const editorContent = document.querySelector(".ck-content");
    editorContent.style.boxShadow = "none"; 

    if (editorMain) {
      editorMain.style.padding = spacing;
    }
  };
  const pageFrameChange = (shadow) => {
    setPageWidth(shadow);
    const editorContent = document.querySelector(".ck-content");
    if (editorContent) {
      editorContent.style.boxShadow = shadow;
    }
  };
  const pageBgColorChange = (color) => {
    setPageBgColor(color);
    const editorContent = document.querySelector(".ck-content");
    if (editorContent) {
      editorContent.style.backgroundColor = color;
    }
  };

  return (
    <div className="position-relative">
      <Offcanvas
        show={sidebar}
        onHide={onClose}
        scroll={true}
        backdrop={false}
        placement={"end"}
        className="doc-sidebar"
        style={{ width: "450px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Doc style </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="mb-2">Doc Layout</p>
          <div className="cursor_pointer d-flex ">
            <div
              className={`text-center pt-3 pb-1  selector rounded-start  ${
                pageWidth === "32px 100px 0px 100px" ? "activeBtn" : "border"
              }`}
              onClick={() => pageWidthChange("32px 100px 0px 100px")}
            >
              <TfiLayoutMenuV className="fs-3" />
              <p className="m-0 mt-2 ">Narrow</p>
            </div>
            <div
              className={`text-center pt-3 pb-1  selector   ${
                pageWidth === "32px 30px 0px 30px" ? "activeBtn" : "border"
              }`}
              onClick={() => pageWidthChange("32px 30px 0px 30px")}
            >
              <MdOutlineFormatAlignJustify className="fs-3" />
              <p className="m-0 mt-2">Wide</p>
            </div>
            <div
              className={`text-center pt-3 pb-1  selector rounded-end  ${
                pageWidth === "0 4px 40px rgba(0, 0, 0, 0.08)"
                  ? "activeBtn"
                  : "border"
              }`}
              onClick={() => pageFrameChange("0 4px 40px rgba(0, 0, 0, 0.08)")}
            >
              <CgMenuBoxed className="fs-3" />
              <p className="m-0 mt-2">Frame</p>
            </div>
          </div>

          <p className="mb-2 mt-4">Font Style</p>
          <div className="cursor_pointer flex ">
            <div
              className={`text-center py-2 rounded-start selector ${
                fontFamily === "" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFamilyChange("")}
            >
              <RiFontMono className="fs-3" />
              <p className="m-0 mt-1 ">Default</p>
            </div>
            <div
              className={`text-center py-2  selector ${
                fontFamily === "'Source Serif 4', serif"
                  ? "activeBtn"
                  : "border"
              }`}
              onClick={() => sidebarFamilyChange(`'Source Serif 4', serif`)}
            >
              <RiFontSansSerif className="fs-3" />

              <p className="m-0 mt-1">Serif</p>
            </div>
            <div
              className={`text-center py-2 rounded-end selector ${
                fontFamily === "monospace" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFamilyChange("monospace")}
            >
              <RxFontFamily className="fs-3" />

              <p className="m-0 mt-1">Mono</p>
            </div>
          </div>

          <p className="mb-2 mt-4">Font Size</p>
          <div className="cursor_pointer d-flex ">
            <div
              className={`text-center  py-2 selector rounded-start   ${
                fontSize === "14px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange("14px")}
            >
              <p className="m-0  ">Small</p>
            </div>
            <div
              className={`text-center  py-2 selector    ${
                fontSize === "16px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange("16px")}
            >
              <p className="m-0">Normal</p>
            </div>
            <div
              className={`text-center py-2 selector rounded-end   ${
                fontSize === "20px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange("20px")}
            >
              <p className="m-0 ">Large</p>
            </div>
          </div>

          <div className=" justify-content-between centerIt my-4  pb-4 ">
            <span>Background</span>
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={pageBgColor}
              title="Choose your color"
              // className="darkShadow"
              onChange={(e) => pageBgColorChange(e.target.value)}
            />
          </div>
          {/* <div>
            <p className="fw-bold mb-3">Header</p>

            <div className="centerIt justify-content-between mb-3">
              <span className="centerIt ">
                <TiImage className="fs-4 me-2" />
                Cover image
              </span>
              <span className="centerIt">
                <span className="pt-1 me-2">Off </span>
                <Form.Check type="switch" className="Doc-switch" />
                <span className="pt-1 ms-2">On</span>
              </span>
            </div>
            <div className="centerIt justify-content-between mb-3">
              <span className="centerIt ">
                <PiTextTBold className="fs-4 me-2" />
                Title
              </span>
              <span className="centerIt">
                <span className="pt-1 me-2">Off </span>
                <Form.Check type="switch" className="Doc-switch" />
                <span className="pt-1 ms-2">On</span>
              </span>
            </div>
            <div className="centerIt justify-content-between mb-3">
              <span className="centerIt ">
                <LuTextQuote className="fs-4 me-2" />
                Table of content
              </span>
              <span className="centerIt">
                <span className="pt-1 me-2">Off </span>
                <Form.Check type="switch" className="Doc-switch" />
                <span className="pt-1 ms-2">On</span>
              </span>
            </div>
            <div className="centerIt justify-content-between mb-3">
              <span className="centerIt ">
                <CiSquareAlert className="fs-4 me-2" />
                Doc info
              </span>
              <span className="centerIt">
                <span className="pt-1 me-2">Off </span>
                <Form.Check type="switch" className="Doc-switch" />
                <span className="pt-1 ms-2">On</span>
              </span>
            </div>
          </div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DocSidebar;
