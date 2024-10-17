import React from "react";
import { Drawer } from "antd";
import { MdOutlineTextFields } from "react-icons/md";
import { IoMdImage } from "react-icons/io";
import { GoVideo } from "react-icons/go";
import { useProposalsContext } from "../../../contexts/ProposalsContext";
import AddContentBlock from "./DraggableComponents/AddContentBlock";

const DraggerBox = () => {
  const { openDraggerBox, setOpenDraggerBox, handleBlockClick } =
    useProposalsContext();

  const onClose = () => {
    setOpenDraggerBox(false);
  };

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
        { id: "32", name: "Height", type: "height" },
      ],
    },
    {
      id: "4",
      title: "Table",
      icon: <GoVideo />,
      height: 80,
      elements: [
        { id: "41", name: "Width", type: "width" },
        { id: "42", name: "Height", type: "height" },
      ],
    },
  ];

  return (
    <Drawer title="Content" onClose={onClose} open={openDraggerBox} width={700}>
      <span className="text-gray-500">Blocks</span>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {contentBlocks.map((block) => (
          <div
            key={block.id}
            onClick={() => handleBlockClick(block.id, block.height)}
            className="cursor-pointer"
          >
            <AddContentBlock title={block.title} icon={block.icon} />
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default DraggerBox;
