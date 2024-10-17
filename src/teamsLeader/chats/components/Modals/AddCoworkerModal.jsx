import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Space } from "antd";
import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../../contexts/ChatsContext";
import { RxCross1 } from "react-icons/rx";
// import { WithContext as ReactTags } from "react-tag-input";
import "./modals.css";
import { extractEmails, isEmailValid } from "../../script";
import { sendRequest } from "../../../../assets/js/config";
import Pusher from "pusher-js";
const pusher = new Pusher("0910daad885705576961", {
  cluster: "ap2",
  encrypted: true,
});
const AddCoworkerModal = () => {
  const {
    addCoworkerModal,
    setAddCoworkerModal,
    loginUserChats,
    workspaceIndex,
    setRefreshData,
    refreshData,
    setLoginUserChats,
  } = useChatsContext();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const delimiters = [",", " ", ";"];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    // Check if the tag already exists
    if (!tags.find((t) => t.text === tag.text)) {
      setTags([...tags, tag]);
    }
  };

  const handleInputChange = (e) => {
    isEmailValid(e);
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleAddition({ id: tags.length + 1, text: inputValue.trim() });
      setInputValue("");
    }
  };
  const allTagsValid = tags.every((tag) => isEmailValid(tag.text));
  const handleSendInvite = async () => {
    console.log({ tags });
    const emails = extractEmails(tags);
    const workspaceId = loginUserChats[workspaceIndex]?._id;
    const data = { emails, workspaceId };

    try {
      const response = await sendRequest(
        `send-invitation`,
        "POST",
        data,
        getLocalStorageItem("auth-token")
      );
      if (response.success) {
        console.log({
          response,
        });
      }
      setRefreshData(!refreshData);
      setAddCoworkerModal(false);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    console.log("useEffect hook triggered");
    const workspaceId = loginUserChats[workspaceIndex]?._id;
    console.log("Workspace ID:", workspaceId);
    const channel = pusher.subscribe(`workspace-${workspaceId}`);
    console.log("Subscribed to channel:", channel);

    channel.bind("add-member", (data) => {
      console.log("Received add-member event data:", data);
      console.log({ data });
      const updatedWorkspace = data.workspace;
      const length = data.length;
     const updatedLoginUserChats = loginUserChats.map((workspace) => {
       if (workspace._id === updatedWorkspace._id) {
         const updatedMembers = [...workspace.members]; // Create a copy of the original members array

         const appendLength = Math.min(length, updatedWorkspace.members.length); // Determine the number of members to append

         updatedMembers.push(...updatedWorkspace.members.slice(-appendLength));

         return {
           ...workspace,
           members: updatedMembers,
         };
       } else {
         return workspace;
       }
     });


      console.log({ updatedLoginUserChats });
      setLoginUserChats(updatedLoginUserChats);

      // Update the UI to reflect the new member added to the workspace
    });

    return () => {
      console.log("Unsubscribing from channel:", channel);
      pusher.unsubscribe(`workspace-${workspaceId}`);
    };
  }, [loginUserChats[workspaceIndex]?._id]);

  return (
    <Modal
      centered
      open={addCoworkerModal}
      onOk={() => setAddCoworkerModal(false)}
      onCancel={() => setAddCoworkerModal(false)}
      footer={null}
      closeIcon={null}
    >
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">
              Invite people to {loginUserChats[workspaceIndex]?.name}
            </span>
            <RxCross1
              onClick={() => setAddCoworkerModal(false)}
              className="cursor-pointer"
            />
          </div>
          <div className="custom-tags-container border border-gray-500 rounded flex flex-wrap p-2 gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`custom-tag flex items-center gap-3 p-2 rounded ${
                  isEmailValid(tag.text) ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {tag.text}
                <span
                  className={`text-xl cursor-pointer ${
                    isEmailValid(tag.text) ? "text-green-500" : "text-red-500"
                  }`}
                  onClick={() => handleDelete(index)}
                >
                  &times;
                </span>
              </span>
            ))}
            <input
              className="outline-none shadow-none p-2 h-10"
              value={inputValue}
              placeholder="name@gmail.com"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <button
            className={`px-3 py-2 rounded font-bold ${
              allTagsValid && tags?.length > 0
                ? "bg-green-200 cursor-pointer"
                : "bg-gray-100"
            }`}
            onClick={() => {
              // Send invitation logic here

              handleSendInvite();
            }}
            disabled={!allTagsValid}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCoworkerModal;
