import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import { Divider } from "antd";
import AddIcon from "@mui/icons-material/Add";

const getChannelsItems = (panelStyle) => [
  {
    key: "1",
    label: <span className="font-bold">Channels</span>,
    children: (
      <>
        <span className="text-gray-500">Lorem ipsum dolor sit amet.</span>
        <Divider />
        <span className="text-gray-500">Lorem ipsum dolor sit amet.</span>
        <Divider />
        <span className="flex items-center gap-2 font-bold cursor-pointer w-fit">
          <AddIcon /> Add Channel
        </span>
      </>
    ),
    style: panelStyle,
  },
];

const getDirectMessagesItems = (panelStyle) => [
  {
    key: "2",
    label: <span  className="font-bold">Direct Messages</span>,
    children: (
      <>
        <span className="text-gray-500">Lorem ipsum dolor sit amet.</span>
        <Divider />
        <span className="text-gray-500">Lorem ipsum dolor sit amet.</span>
        <Divider />
        <span className="flex items-center gap-2 font-bold cursor-pointer w-fit">
          <AddIcon /> Add Coworkers
        </span>
      </>
    ),
    style: panelStyle,
  },
];

const Leftbar = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div className="bg-green-200 min-h-[90vh] w-72 p-3 rounded-tl-md rounded-bl-md flex flex-col gap-10">
      <h1 className="font-bold text-xl">Workspace Name</h1>

      {/* Channels Section */}
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getChannelsItems(panelStyle)}
      />

      {/* Direct Messages Section */}
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getDirectMessagesItems(panelStyle)}
      />
    </div>
  );
};

export default Leftbar;
