import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useChatsContext } from "../../contexts/ChatsContext";
import Leftbar from "./components/Leftbar";
import RightSection from "./components/RightSection";
import "./chat.css";
const ChatModule = ({ getLoginUserChatDetail }) => {
  return (
    <div className="mt-14 bg-white h-[700px]  rounded-tl-md rounded-bl-md">
      <div className="flex h-full">
        <Leftbar getLoginUserChatDetail={getLoginUserChatDetail} />
        <RightSection />
      </div>
    </div>
  );
};
export default ChatModule;
