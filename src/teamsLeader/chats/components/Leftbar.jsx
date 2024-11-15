import React, { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { FiPlus, FiPlusCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "antd";
import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../contexts/ChatsContext";
import { sendRequest } from "../../../assets/js/config";
import NewChannelModal from "./Modals/NewChannelModal";
import AddCoworkerModal from "./Modals/AddCoworkerModal";
import { getEmailFirstPart } from "../script";
import { useNavigate, useParams } from "react-router-dom";
import Pusher from "pusher-js";

const pusher = new Pusher("0910daad885705576961", {
  cluster: "ap2",
  encrypted: true,
});

const Leftbar = () => {
  const [showChannels, setShowChannels] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [hoveredChannel, setHoveredChannel] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const navigate = useNavigate();
  const { user_Id, workspaceId } = useParams();

  const {
    openedChannel,
    setOpenedChannel,
    loginUserChats,
    workspaceIndex,
    setWorkspaceIndex,
    openWorkspaceList,
    setOpenWorkspaceList,
    setNewChannelModal,
    refreshData,
    setRefreshData,
    setAddCoworkerModal,
    setOpenedPrivateUser,
    loginUserId,
    setOpenedChat,
    openedPrivateUser,
    openedChat,
  } = useChatsContext();

  const toggleChannels = () => {
    setShowChannels(!showChannels);
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  const handleCreateNewChannel = async () => {
    setNewChannelModal(true);
  };
  const handleDeleteChannel = async (workspaceId, channelId) => {
    try {
      const response = await sendRequest(
        `workspaces/${workspaceId}/channels/${channelId}`,
        "DELETE",
        "",
        getLocalStorageItem("auth-token")
      );
      if (response?.success) {
        console.log({ response });
        setRefreshData(!refreshData);
      }
    } catch (err) {
      console.error({ success: false, error: err });
    }
  };
  const handleDeleteUserFromWorkspace = async (
    workspaceId,
    memberIdOrEmail
  ) => {
    try {
      const response = await sendRequest(
        `workspaces/${workspaceId}/deleteMember/${memberIdOrEmail}`,
        "DELETE",
        "",
        getLocalStorageItem("auth-token")
      );
      if (response?.success) {
        console.log({ response });
        setRefreshData(!refreshData);
      }
    } catch (err) {
      console.error({ success: false, error: err });
    }
  };

  // start chats or create a chat
  const handleStartChat = async (receiverId, shouldNavigate = true) => {
    console.log({ receiverId });
    try {
      const data = {
        receiverId,
        workspaceId: loginUserChats[workspaceIndex]?._id || workspaceId,
        messages: [],
      };
      const response = await sendRequest(
        "chats/member",
        "POST",
        data,
        getLocalStorageItem("auth-token")
      );
      console.log({ chat_response: response });
      setOpenedChat(response?.chat);
      if (shouldNavigate) {
        navigate(
          `/inbox/${loginUserChats[workspaceIndex]?._id}/${receiverId}/${response?.chat?._id}`
        );
      }
      setRefreshData(!refreshData);
    } catch (err) {
      console.error({ error: err });
    }
  };
  useEffect(() => {
    console.log("find ...");
    if (user_Id) {
      console.log("not find ...");
      handleStartChat(user_Id, false);
    }
  }, [user_Id]);
  console.log({ user_Id, openedChat });
  return (
    <>
      <div className="bg-green-200 h-full w-72 p-3 rounded-tl-md rounded-bl-md flex flex-col gap-3 overflow-y-scroll">
        <NewChannelModal />
        <AddCoworkerModal />

        <div
          className=" flex items-center gap-1 font-bold cursor-pointer"
          // className="mt-10 flex items-center gap-1 font-bold cursor-pointer"
          onClick={toggleChannels}
        >
          {showChannels ? (
            <IoMdArrowDropdown className="text-xl" />
          ) : (
            <IoMdArrowDropright className="text-xl" />
          )}
          <span>Channels</span>
        </div>
        {showChannels && (
          <div className="channelList flex flex-col gap-1 ml-3">
            {loginUserChats?.length > 0 &&
              loginUserChats[workspaceIndex]?.channels?.map(
                (channel, index) => (
                  <div
                    key={channel.id}
                    className={`flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer ${
                      openedChannel && openedChannel._id === channel._id
                        ? "font-bold"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredChannel(index)}
                    onMouseLeave={() => setHoveredChannel(null)}
                    onClick={() => {
                      setOpenedChannel(channel);
                      setOpenedPrivateUser({});

                      navigate(
                        `/inbox/${loginUserChats[workspaceIndex]?._id}/${channel?._id}`
                      );
                    }} // Set the opened channel when clicked
                  >
                    <div className="flex items-center">
                      <FiPlus className="w-10 " />
                      <span className="text-clip text-sm flex-1">
                        {channel.name}
                      </span>{" "}
                    </div>
                    {hoveredChannel === index && (
                      <Tooltip title="Delete Channel">
                        <MdDeleteOutline
                          className="text-lg w-10 "
                          onClick={() => {
                            handleDeleteChannel(
                              loginUserChats[workspaceIndex]?._id,
                              channel?._id
                            );
                          }}
                        />
                      </Tooltip>
                    )}
                  </div>
                )
              )}
            <div
              className={`flex justify-between hover:bg-gray-100 items-center  rounded  px-3 py-2  cursor-pointer`}
            >
              <div
                className="flex items-center gap-2 "
                onClick={handleCreateNewChannel}
              >
                <FiPlusCircle />
                <span>Create New Channel</span>{" "}
              </div>
            </div>
          </div>
        )}

        {/* Users Section */}
        <div className="userList flex flex-col gap-1 ">
          <div
            className="flex items-center gap-1 font-bold cursor-pointer"
            onClick={toggleUsers}
          >
            {showUsers ? (
              <IoMdArrowDropdown className="text-xl" />
            ) : (
              <IoMdArrowDropright className="text-xl" />
            )}
            <span>Direct messages</span>
          </div>
          {showUsers && (
            <div className="flex flex-col gap-1 ml-3">
              {loginUserChats[workspaceIndex]?.members?.map((user, index) => {
                const isCurrentUser = user?.userId?._id === loginUserId; // Assuming loginUser is your current user object

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                    onMouseEnter={() => setHoveredUser(index)}
                    onMouseLeave={() => setHoveredUser(null)}
                    onClick={() => {
                      setOpenedPrivateUser(user);
                      setOpenedChannel({});
                      handleStartChat(user?._id);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <FiPlus />
                      <span>
                        {getEmailFirstPart(
                          user?.userId ? user?.userId?.email : user?.email
                        )}
                      </span>{" "}
                      {isCurrentUser && (
                        <span className="text-gray-500 text-sm">you</span>
                      )}
                    </div>
                    {!isCurrentUser && hoveredUser === index && (
                      <Tooltip title="Delete User">
                        <MdDeleteOutline
                          className="text-lg"
                          onClick={() => {
                            handleDeleteUserFromWorkspace(
                              loginUserChats[workspaceIndex]?._id,
                              user?.userId ? user?.userId?._id : user?.email
                            );
                          }}
                        />
                      </Tooltip>
                    )}
                  </div>
                );
              })}

              <div
                className={`flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded  cursor-pointer`}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={() => setAddCoworkerModal(true)}
                >
                  <FiPlusCircle />
                  <span>Add Coworkers</span>{" "}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Leftbar;
