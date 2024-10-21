import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { MdOutlineTextFields } from "react-icons/md";
import { IoMdImage } from "react-icons/io";
import { GoVideo } from "react-icons/go";
import { FaTable } from "react-icons/fa6";
import { useProposalsContext } from "../../../contexts/ProposalsContext";
import AddContentBlock from "./DraggableComponents/AddContentBlock";
import { FaDollarSign } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { LuClipboardSignature } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";

const contentBlocks = [
  {
    id: "1",
    title: "Text",
    icon: <MdOutlineTextFields />,
    height: 40,
    elements: [
      { id: "11", name: "Font Size", type: "fontSize" },
      { id: "12", name: "Font Style", type: "fontStyle" },
    ],
  },
  {
    id: "2",
    title: "Image",
    icon: <IoMdImage />,
    height: 80,
    elements: [
      { id: "21", name: "Width", type: "width" },
      { id: "22", name: "Height", type: "height" },
    ],
  },
  {
    id: "3",
    title: "Video",
    icon: <GoVideo />,
    height: 80,
    elements: [
      { id: "31", name: "Width", type: "width" },
      { id: "32", name: "Height" },
    ],
  },
  {
    id: "4",
    title: "Table",
    icon: <FaTable />,
    height: 80,
    elements: [
      { id: "41", name: "Width", type: "width" },
      { id: "42", name: "Height", type: "height" },
    ],
  },
  {
    id: "5",
    title: "Pricing Table",
    icon: (
      <div className="flex items-center justify-center">
        <FaDollarSign /> <VscThreeBars />
      </div>
    ),
    height: 80,
    elements: [
      { id: "41", name: "Width", type: "width" },
      { id: "42", name: "Height", type: "height" },
    ],
  },
  {
    id: "6",
    title: "Date",
    icon: <MdOutlineDateRange />,
    height: 80,
    elements: [
      { id: "41", name: "Width", type: "width" },
      { id: "42", name: "Height", type: "height" },
    ],
  },
  {
    id: "7",
    title: "Signature",
    icon: <LuClipboardSignature />,
    height: 80,
    elements: [
      { id: "41", name: "Width", type: "width" },
      { id: "42", name: "Height", type: "height" },
    ],
  },
];
const DraggableSidebar = ({ sidebar, onClose }) => {
  const [activeBlock, setActiveBlock] = useState(null);
  const { handleBlockClick } = useProposalsContext();
  const handleClick = (blockId, height) => {
    handleBlockClick(blockId, height);
    setActiveBlock(blockId);
  };
  const getBorderClasses = (index) => {
    if (index % 3 === 0) return "rounded-start";
    if ((index + 1) % 3 === 0) return "rounded-end";
    return "";
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
          <Offcanvas.Title>Content</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="mb-2">Blocks</p>
          <div className="d-flex flex-wrap">
            {contentBlocks.map((block, index) => (
              <div
                key={block.id}
                onClick={() => {
                  handleClick(block.id, block.height);
                  onClose();
                }}
                className={`cursor-pointer text-center pt-3 pb-1 selector ${
                  activeBlock === block.id ? "activeBtn" : "border"
                } ${getBorderClasses(index)}`}
                style={{
                  width: "33.33%",
                  marginTop: index >= 3 ? "10px" : "0",
                }}
              >
                <AddContentBlock title={block.title} icon={block.icon} />
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DraggableSidebar;
