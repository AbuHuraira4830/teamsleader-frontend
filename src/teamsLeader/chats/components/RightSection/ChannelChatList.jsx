import React from "react";
import { useChatsContext } from "../../../../contexts/ChatsContext";

const ChatListItem = ({ senderId, message, mentionUsers }) => {
  // Find the user details based on senderId
  const sender = mentionUsers?.find((user) => user.id === senderId);
  console.log({ sender, senderId });

  if (!sender) {
    // Handle case where sender details are not found
    return null;
  }

  // Extracting first letters of first and last name
  const initials = sender.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  // Formatting message timestamp (just a placeholder for demonstration)
  const timestamp = "02:30pm";
const renderHTMLContent = (htmlContent) => {
  return { __html: htmlContent };
};
  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 bg-blue-900 text-white rounded flex items-center justify-center">
        {initials}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-end gap-1">
          <span className="font-bold">{sender.name}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <div dangerouslySetInnerHTML={renderHTMLContent(message)}></div>
      </div>
    </div>
  );
};

const ChatList = ({ chatList, mentionUsers }) => {
  return (
    <div className="comments flex flex-col gap-3 flex-1 ">
      {chatList?.map((chat, index) => (
        <ChatListItem
          key={index}
          senderId={chat.sender}
          message={chat.message}
          mentionUsers={mentionUsers}
        />
      ))}
    </div>
  );
};

const ChannelChatList = () => {
  // Assuming channels is available in the component's props or context
  const { openedChannel, loginUserChats, workspaceIndex } = useChatsContext();

  const channelChatList = openedChannel.chatList; // Extracting chatList

  return (
    <ChatList
      chatList={channelChatList}
      mentionUsers={loginUserChats[workspaceIndex]?.members}
    />
  );
};

export default ChannelChatList;
