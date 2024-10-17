import { Drawer, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { CgMenuBoxed } from "react-icons/cg";
import { RiFontMono, RiFontSansSerif } from "react-icons/ri";
import { RxFontFamily } from "react-icons/rx";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import { IoIosArrowDown } from "react-icons/io";

const DocSidebar = ({ sidebar, onClose, doc, applyStyle }) => {
  const {
    selectedDocument,
    setSelectedDocument,
    selectedWorkspace,
    setAllDocuments,
    colors,
  } = useStateContext();
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const [fontFamily, setFontFamily] = useState(doc.fontFamily || "");
  const [fontSize, setFontSize] = useState(doc.fontSize || "16px");
  const [pageWidth, setPageWidth] = useState(
    doc.width || "32px 100px 0px 100px"
  );
  const [shadow, setShadow] = useState(doc.shadow || "none");
  const [pageBgColor, setPageBgColor] = useState(doc.bgColor || "#FFFFFF");

  const ckContent = document.querySelector(".ck-content");
  const ckEditorMain = document.querySelector(".ck-editor__main");
  useEffect(() => {
    // applyStyle();
    updateEditor();
  }, [fontFamily, fontSize, pageWidth, pageBgColor, shadow]);

  const updateEditor = (Data) => {
    const data = {
      data: selectedDocument.data,
      name: selectedDocument.name,
      fontFamily: fontFamily,
      fontSize: fontSize,
      width: pageWidth,
      bgColor: pageBgColor,
      shadow: shadow,
      docID: selectedDocument._id,
      workspaceID: selectedWorkspace._id,
    };
    postAPI("/api/doc/update", data)
      .then((res) => {
        setAllDocuments(res.data.workspace.documents);
        const document = res.data.workspace.documents.find(
          (Doc) => Doc._id === doc._id
        );
        setSelectedDocument(document);

        ckContent.style.fontFamily = document.fontFamily;
        ckContent.style.setProperty(
          "background-color",
          document.bgColor,
          "important"
        );
        ckContent.style.boxShadow = document.boxShadow;
        ckEditorMain.style.fontSize = document.fontSize;
        ckEditorMain.style.padding = document.pageWidth;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sidebarFamilyChange = (data) => {
    // ckContent.style.fontFamily = data.fontFamily;
    setFontFamily(data.fontFamily);
  };

  const sidebarFontSizeChange = (data) => {
    // ckEditorMain.style.fontSize = data.fontSize;
    setFontSize(data.fontSize);
  };

  const pageWidthChange = (data) => {
    // ckEditorMain.style.padding = data.width;
    setPageWidth(data.width);
    setShadow("none");
  };

  const pageFrameChange = (data) => {
    // ckContent.style.boxShadow = data.shadow;
    setShadow(data.shadow);
  };

  const pageBgColorChange = (data) => {
    // ckContent.style.setProperty("background-color", data.bgColor, "important");
    setPageBgColor(data.bgColor);
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
          <Offcanvas.Title>Customize Your Doc</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="mb-2">Doc Layout</p>
          <div className="cursor_pointer d-flex">
            <div
              className={`text-center pt-3 pb-1 selector rounded-start ${
                pageWidth === "0.1px" ? "activeBtn" : "border"
              }`}
              onClick={() => pageWidthChange({ width: "0.1px" })}
            >
              <TfiLayoutMenuV className="fs-3" />
              <p className="m-0 mt-2">Narrow</p>
            </div>
            <div
              className={`text-center pt-3 pb-1 selector ${
                pageWidth === "0px" ? "activeBtn" : "border"
              }`}
              onClick={() => pageWidthChange({ width: "0px" })}
            >
              <MdOutlineFormatAlignJustify className="fs-3" />
              <p className="m-0 mt-2">Wide</p>
            </div>
            <div
              className={`text-center pt-3 pb-1 selector rounded-end ${
                pageWidth === "32px 100px 0px 170px" ? "activeBtn" : "border"
                // shadow === "0 4px 40px rgba(0, 0, 0, 0.08)"
                //   ? "activeBtn"
                //   : "border"
              }`}
              onClick={() => {
                pageFrameChange({ shadow: "0 4px 40px rgba(0, 0, 0, 0.08)" }),
                  pageWidthChange({ width: "32px 100px 0px 170px" });
              }}
            >
              <CgMenuBoxed className="fs-3" />
              <p className="m-0 mt-2">Frame</p>
            </div>
          </div>

          <p className="mb-2 mt-4">Font Style</p>
          <div className="cursor_pointer flex">
            <div
              className={`text-center py-2 rounded-start selector ${
                fontFamily === "none" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFamilyChange({ fontFamily: "none" })}
            >
              <RiFontMono className="fs-3" />
              <p className="m-0 mt-1">Default</p>
            </div>
            <div
              className={`text-center py-2 selector ${
                fontFamily === "'Source Serif 4', serif"
                  ? "activeBtn"
                  : "border"
              }`}
              onClick={() =>
                sidebarFamilyChange({ fontFamily: `'Source Serif 4', serif` })
              }
            >
              <RiFontSansSerif className="fs-3" />
              <p className="m-0 mt-1">Serif</p>
            </div>
            <div
              className={`text-center py-2 rounded-end selector ${
                fontFamily === "monospace" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFamilyChange({ fontFamily: "monospace" })}
            >
              <RxFontFamily className="fs-3" />
              <p className="m-0 mt-1">Mono</p>
            </div>
          </div>

          <p className="mb-2 mt-4">Font Size</p>
          <div className="cursor_pointer d-flex">
            <div
              className={`text-center py-2 selector rounded-start ${
                fontSize === "14px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange({ fontSize: "14px" })}
            >
              <p className="m-0">Small</p>
            </div>
            <div
              className={`text-center py-2 selector ${
                fontSize === "16px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange({ fontSize: "16px" })}
            >
              <p className="m-0">Normal</p>
            </div>
            <div
              className={`text-center py-2 selector rounded-end ${
                fontSize === "20px" ? "activeBtn" : "border"
              }`}
              onClick={() => sidebarFontSizeChange({ fontSize: "20px" })}
            >
              <p className="m-0">Large</p>
            </div>
          </div>

          <div className="justify-content-between centerIt my-4 pb-4">
            <span>Background</span>
            <Popover
              content={
                <div
                  className="rounded-2 py-2.5 px-2.5"
                  style={{ width: "200px" }}
                >
                  <div className="centerIt justify-content-between mb-2">
                    <p style={{ fontWeight: "500" }}>Colors</p>{" "}
                    <div
                      className="fs_14 bgHover rounded-1 cursor_pointer"
                      style={{
                        padding: "4px 8px",
                        border: "1px solid var(--border-color)",
                      }}
                      onClick={() =>
                        pageBgColorChange({
                          bgColor: "var(--dropdown-bgColor)",
                        })
                      }
                    >
                      Default
                    </div>
                  </div>
                  {colors.map((color) => (
                    <div
                      className="colorSection rounded-2 mx-1"
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "inline-flex",
                        backgroundColor: `${color}`,
                      }}
                      onClick={() => pageBgColorChange({ bgColor: color })}
                    ></div>
                  ))}
                </div>
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              className="docBGcolorPopup rounded-2"
            >
              <div className="centerIt cursor_pointer  backgroundPartP px-2">
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="backgroundPart rounded-1 me-3"
                ></div>
                <IoIosArrowDown />
              </div>
            </Popover>
            {/* <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={pageBgColor}
              title="Choose your color"
              onChange={(e) => pageBgColorChange({ bgColor: e.target.value })}
            /> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DocSidebar;
