import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const ChatsContext = ({ children }) => {
  const [openChatsModal, setOpenChatsModal] = useState(false);
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState();
  const mentionUsers = [
    {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 102,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: 103,
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
  ];

  const [channels, setChannels] = useState([
    {
      id: 1,
      title: "Channel 1",
      users: [101, 102], // Add user IDs for Channel 1
      chatList: [
        { sender: 101, message: "Hello, Jane!" },
        { sender: 102, message: "Hi, John!" },
        { sender: 101, message: "How are you?" },
        { sender: 102, message: "I'm doing well, thanks!" },
      ],
    },
    {
      id: 2,
      title: "Channel 2",
      users: [102, 103], // Add user IDs for Channel 2
      chatList: [
        { sender: 102, message: "Hey there, Jane!" },
        { sender: 103, message: "Hi, Bob!" },
        { sender: 102, message: "What's up?" },
        { sender: 103, message: "Not much, just chilling." },
      ],
    },
    {
      id: 3,
      title: "Channel 3",
      users: [101, 103], // Add user IDs for Channel 3
      chatList: [
        { sender: 101, message: "Hey Jane, how's it going?" },
        { sender: 103, message: "Hi, John! I'm doing great, thanks!" },
        { sender: 101, message: "That's good to hear!" },
      ],
    },
    {
      id: 4,
      title: "Channel 4",
      users: [101, 102, 103], // Add user IDs for Channel 4
      chatList: [
        { sender: 101, message: "Hello everyone!" },
        { sender: 102, message: "Hi, John!" },
        { sender: 103, message: "Hey there!" },
        { sender: 101, message: "Let's get started with our discussion." },
      ],
    },
    // Add more channels as needed
  ]);

  const [loginUserChats, setLoginUserChats] = useState([]);
  const [workspaceIndex, setWorkspaceIndex] = useState(0);
  const [openedChannel, setOpenedChannel] = useState(
    loginUserChats[workspaceIndex]?.channels[0] || {}
  ); // State variable to store the details of the opened channel
  const [openWorkspaceList, setOpenWorkspaceList] = useState(false);

  const [newChannelModal, setNewChannelModal] = useState(false);
  const [createNewChannelObj, setCreateNewChannelObj] = useState({
    channelName: "",
    description: "",
    memberIds: [],
  });
  const [refreshData, setRefreshData] = useState(false);
  const [addCoworkerModal, setAddCoworkerModal] = useState();
  const [openedPrivateUser, setOpenedPrivateUser] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loginUserId, setLoginUserId] = useState("");
  const [openedChat, setOpenedChat] = useState({});
  return (
    <StateContext.Provider
      value={{
        openChatsModal,
        setOpenChatsModal,
        content,
        setContent,
        selectedEmoji,
        setSelectedEmoji,
        mentionUsers,
        openedChannel,
        setOpenedChannel,
        channels,
        setChannels,
        loginUserChats,
        setLoginUserChats,
        workspaceIndex,
        setWorkspaceIndex,
        openWorkspaceList,
        setOpenWorkspaceList,
        newChannelModal,
        setNewChannelModal,
        createNewChannelObj,
        setCreateNewChannelObj,
        refreshData,
        setRefreshData,
        addCoworkerModal,
        setAddCoworkerModal,
        openedPrivateUser,
        setOpenedPrivateUser,
        selectedFiles,
        setSelectedFiles,
        uploadingProgress,
        setUploadingProgress,
        uploadedFiles,
        setUploadedFiles,
        loginUserId,
        setLoginUserId,
        openedChat,
        setOpenedChat,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useChatsContext = () => useContext(StateContext);
