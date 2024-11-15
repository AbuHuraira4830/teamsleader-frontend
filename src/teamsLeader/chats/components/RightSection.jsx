import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import CustomQuillEditor from "./RightSection/CustomQuillEditor";
import { IoAddOutline } from "react-icons/io5";
import { Tooltip } from "antd";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { GoMention } from "react-icons/go";
import EmojiPicker from "emoji-picker-react";
import { Button, Popover } from "antd";
import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../contexts/ChatsContext";
import { UserListPopup } from "./RightSection/UserListPopup";
import { FaUserLarge } from "react-icons/fa6";
import ChannelChatList from "./RightSection/ChannelChatList";
import { formatDate, getEmailFirstPart } from "../script";
import FileUpload from "./RightSection/FileUpload";
import FilePreviews from "./RightSection/FilePreviews";
import ChatComments from "./RightSection/ChatComments";
import { sendRequest } from "../../../assets/js/config";
import { useParams } from "react-router-dom";
const UsersList = () => {
  const { openedChannel, workspaceIndex, loginUserChats } = useChatsContext();

  // Function to get email and _id from members array
  const getEmailAndId = (channel, members) => {
    return channel?.members?.map((memberId) => {
      const member = members?.find((m) => m._id === memberId);
      if (!member) {
        return { _id: memberId, email: "Email not found" };
      }
      const email =
        member?.email ||
        (member?.userId && member?.userId?.email) ||
        "Email not available";
      return { _id: member._id, email };
    });
  };

  const users =
    getEmailAndId(openedChannel, loginUserChats[workspaceIndex]?.members) || [];

  console.log({ users });
  return (
    <div className="w-40 h-auto p-2 ">
      <h6 className="font-bold">Users</h6>
      {users?.map((user, index) => (
        <div
          key={index} // Use user.userId._id as the key
          className="hover:bg-gray-100 my-2 p-2 rounded cursor-pointer"
        >
          {console.log({ user })}
          {user?.userId
            ? getEmailFirstPart(user.userId.email)
            : getEmailFirstPart(user.email)}{" "}
          {/* Use user.userId.name to display the user's name */}
        </div>
      ))}
    </div>
  );
};
const RightSection = () => {
  const [open, setOpen] = useState(false);
  const [openMention, setOpenMention] = useState(false);
  const {
    selectedEmoji,
    setSelectedEmoji,
    content,
    setContent,
    openedChannel,
    channels,
    setChannels,
    setOpenedChannel,
    openedPrivateUser,
    loginUserChats,
    workspaceIndex,
    openedChat,
    setRefreshData,
    refreshData,
    uploadedFiles,
    setUploadedFiles,
  } = useChatsContext();

  console.log({ openedPrivateUser });
  const [userListOpen, setUserListOpen] = useState(false);
  console.log({ content });
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleOpenUserListChange = (newOpen) => {
    setUserListOpen(newOpen);
  };
  const handleOpenMention = (newOpenMention) => {
    setOpenMention(newOpenMention);
  };
  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setOpen(false);
    console.log(emojiObject.emoji);
  };

  const handleSelectUser = (user) => {
    const lastTagIsParagraph = content.trim().endsWith("</p>");
    const updatedContent = lastTagIsParagraph
      ? `${content.slice(0, -4)}<span 
       style="color: rgb(0, 102, 204);"
    >@${user.name}</span>&nbsp;</p>`
      : `${content || ""}<span 
       style="color: rgb(0, 102, 204);"
    >@${user.name}</span>&nbsp;`;

    setContent(updatedContent);
    setOpenMention(false); // Close the popover after selecting a user
  };

  // Add new message to the opened channel and update channels array
  const addNewMessage = (channelId, newMessage) => {
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        return {
          ...channel,
          chatList: [...channel.chatList, newMessage],
        };
      }
      return channel;
    });

    setChannels(updatedChannels);
    // Also update the openedChannel if its id matches the channelId
    if (openedChannel.id === channelId) {
      setOpenedChannel({
        ...openedChannel,
        chatList: [...openedChannel.chatList, newMessage],
      });
    }
  };
  const { chat_Id, workspaceId, channel_Id } = useParams();

  const handleAddMessage = async () => {
    const data = {
      message: content,
      files: uploadedFiles,
      workspaceId: loginUserChats[workspaceIndex]?._id,
    };

    try {
      let response;

      if (chat_Id) {
        // Send message to a specific chat
        response = await sendRequest(
          `chats/${chat_Id}/messages`,
          "PUT",
          data,
          getLocalStorageItem("auth-token")
        );
        console.log("Chat message response:", response);
      } else if (channel_Id) {
        // Prepare the new message object
        const newMessage = {
          message: content,
          files: uploadedFiles,
        };
        // Add the new message object to the openedChannel?.messages array
        const updatedMessages = [
          ...(openedChannel?.messages || []),
          newMessage,
        ];

        const data2 = {
          messages: updatedMessages,
        };
        // Update a specific channel in the workspace
        response = await sendRequest(
          `workspaces/${workspaceId}/updateChannel/${channel_Id}`,
          "PUT",
          data2,
          getLocalStorageItem("auth-token")
        );
        console.log("Channel update response:", response);
      } else {
        throw new Error("No valid chat or channel ID provided");
      }

      // Refresh data and clear inputs
      setRefreshData(!refreshData);
      setUploadedFiles([]);
      setContent("");
    } catch (error) {
      // Log error details for debugging
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="flex-1 w-[1000px] rounded-tr-md rounded-br-md p-2">
      <div className="flex flex-col justify-between h-full ">
        <div className="border-b flex items-center justify-between py-2 font-bold">
          <span>
            {Object.keys(openedPrivateUser).length > 0 && (
              <>
                {getEmailFirstPart(
                  openedPrivateUser?.userId?.email || openedPrivateUser?.email
                )}{" "}
                <span className="font-normal text-sm">
                  ({loginUserChats[workspaceIndex]?.name}){" "}
                </span>{" "}
              </>
            )}
            {openedChannel?._id && `#${openedChannel?.name}`}
            {!openedPrivateUser?._id && !openedChannel?._id
              ? loginUserChats[workspaceIndex]?.name
              : ""}
          </span>
          {Object.keys(openedChannel).length !== 0 &&
            Object.keys(openedPrivateUser).length === 0 && (
              <Popover
                content={<UsersList />}
                trigger="click"
                open={userListOpen}
                onOpenChange={handleOpenUserListChange}
                placement="leftTop"
              >
                <Tooltip title={"View All Memebers"} placement="topLeft">
                  <div className="bg-gray-100 px-2 py-1 rounded flex items-center justify-center text-gray-500">
                    <FaUserLarge className="cursor-pointer  p-1 rounded-full text-xl" />
                    <span>{openedChannel?.members?.length}</span>
                  </div>
                </Tooltip>
              </Popover>
            )}
        </div>
        <div className="flex flex-col overflow-y-scroll ">
          <div className="flex flex-col gap-2 h-fit py-10">
            <span className="text-4xl font-bold">
              {(openedPrivateUser?._id && openedPrivateUser?.userId?.name) ||
                getEmailFirstPart(openedPrivateUser?.email)}
              {openedChannel?._id && `#${openedChannel?.name}`}
            </span>
            {openedChannel?._id && (
              <p>
                You created this channel on{" "}
                {formatDate(openedChannel?.createdAt)}. This is the very
                beginning of{" "}
                <span className="font-bold">
                  {/* {openedPrivateUser && openedPrivateUser?.userId?.name} */}
                  {openedChannel?._id && `#${openedChannel?.name}`}
                </span>
                .
              </p>
            )}
            {openedPrivateUser?._id && !openedChannel?._id && (
              <p>
                This conversation is just between
                <span className="font-bold text-blue-500">
                  {openedPrivateUser &&
                    ` @${getEmailFirstPart(
                      openedPrivateUser?.userId?.email ||
                        openedPrivateUser?.email
                    )} `}
                </span>
                and you.
              </p>
            )}
            {Object.keys(openedPrivateUser).length === 0 &&
              Object.keys(openedChannel).length === 0 && (
                <>
                  <p>
                    Welcome to <b>{loginUserChats[workspaceIndex]?.name}</b>{" "}
                    Start collaborating with your team.
                  </p>
                  <p>
                    Create <b>channels</b>, add <b>coworkers</b>, and start
                    conversations with them in a channel or privately.
                  </p>
                </>
              )}

            {openedChannel?._id && (
              <div className="border p-2 flex items-center justify-center w-fit gap-2 rounded text-sm cursor-pointer">
                <FaUserPlus />
                <span>Add Coworkers</span>
              </div>
            )}
            <hr />
          </div>

          <div className="comments-array">
            <ChatComments />
          </div>
          <ChannelChatList />
        </div>
        <div></div>
        {workspaceId &&
          (Object.keys(openedChannel).length !== 0 ||
            Object.keys(openedPrivateUser).length !== 0) && (
            <div className="h-[250px] mt-4  bg-white w-full flex flex-col justify-end chat-textarea-quill sticky bottom-0 z-10">
              <CustomQuillEditor />

              <FilePreviews />
              <div className=" flex items-end pb-2 justify-between gap-2 h-20 border-b border-l border-r border-[#ccc] rounded-bl-[10px] rounded-br-[10px] px-3">
                <div className="flex items-center  gap-2">
                  {/* <IoAddOutline className="cursor-pointer bg-gray-100 p-1 rounded-full text-3xl" /> */}
                  <FileUpload />

                  <Popover
                    content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Tooltip title="Add Emoji">
                      <BsEmojiSmile className="cursor-pointer text-gray-500 p-1 rounded-full text-3xl" />
                    </Tooltip>
                  </Popover>
                  <Popover
                    content={<UserListPopup onSelectUser={handleSelectUser} />}
                    trigger="click"
                    open={openMention}
                    onOpenChange={handleOpenMention}
                  >
                    <Tooltip title={`${openMention ? "" : "Mention someone"}`}>
                      <GoMention className="cursor-pointer text-gray-500 p-1 rounded-full text-3xl" />
                    </Tooltip>
                  </Popover>
                </div>
                <div>
                  <Tooltip title="Send">
                    <MdSend
                      className="cursor-pointer text-[#007a5a] p-1 rounded-full text-3xl"
                      onClick={handleAddMessage}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default RightSection;
