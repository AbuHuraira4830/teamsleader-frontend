import React, { useState } from "react";
import { Button, Modal, Radio, Space } from "antd";
import {
  getLocalStorageItem,
  useChatsContext,
} from "../../../../contexts/ChatsContext";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { sendRequest } from "../../../../assets/js/config";
import { getEmailFirstPart } from "../../script";

const colourOptions = [
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
];
const transformResponseToOptions = (response) => {
  if (!Array.isArray(response)) {
    throw new Error("Response must be an array.");
  }
console.log({ takeLook: response });
  return response.map((item) => ({
    value: item._id,
    label: getEmailFirstPart(item?.userId?.email || item?.email),
  }));
};
const NewChannelModal = () => {
  const {
    newChannelModal,
    setNewChannelModal,
    createNewChannelObj,
    setCreateNewChannelObj,
    loginUserChats,
    workspaceIndex,
    refreshData,
    setRefreshData,
  } = useChatsContext();

  const handleInputChange = (fieldName, value) => {
    setCreateNewChannelObj((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("Radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCreateChannel = async () => {
    try {
      const response = await sendRequest(
        `workspaces/${loginUserChats[workspaceIndex]?._id}/createChannel`,
        "POST",
        createNewChannelObj,
        getLocalStorageItem("auth-token")
      );
      if (response?.success) {
        console.log(response);
        setRefreshData(!refreshData);
        setNewChannelModal(false);
      }
    } catch (err) {
      console.error({ error: err });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    // Update the memberIds in createNewChannelObj with the selected user IDs
    const selectedIds = selectedOptions.map((option) => option.value);
    console.log({ selectedIds });
    setCreateNewChannelObj({
      ...createNewChannelObj,
      memberIds: selectedIds,
    });
  };
  return (
    <>
      <Modal
        centered
        open={newChannelModal}
        onOk={() => setNewChannelModal(false)}
        onCancel={() => setNewChannelModal(false)}
        footer={null}
        closeIcon={null}
      >
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Create a channel</span>
              <RxCross1
                onClick={() => setNewChannelModal(false)}
                className="cursor-pointer"
              />
            </div>

            {currentStep === 2 && (
              <span className="-mt-6 flex items-center gap-1 text-gray-500">
                <button disabled>#</button>
                <span>{createNewChannelObj?.channelName}</span>
              </span>
            )}

            {currentStep === 1 && (
              <>
                <span className="font-bold text-lg text-black">Name</span>
                <div>
                  <input
                    type="text"
                    className="px-3 border-2 border-gray-200 w-full rounded h-12 outline-none shadow-none"
                    placeholder="Channel Name"
                    value={createNewChannelObj?.channelName}
                    onChange={(e) =>
                      handleInputChange("channelName", e.target.value)
                    }
                  />
                  <span className="text-gray-500 text-xs ">
                    Channels are where conversations happen around a topic. Use
                    a name that is easy to find and understand.
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Step 1 of 2</span>
                  <button
                    className={`px-3 py-2 rounded ${
                      createNewChannelObj?.channelName
                        ? "bg-green-200"
                        : "bg-gray-100"
                    }`}
                    disabled={!createNewChannelObj?.channelName}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <span className="font-bold">Add people</span>
                <Select
                  isMulti
                  name="colors"
                  options={transformResponseToOptions(
                    loginUserChats[workspaceIndex]?.members
                  )}
                  className="basic-multi-select"
                  classNamePrefix="search"
                  placeholder="Search by name"
                  onChange={handleSelectChange}
                />
                <div className="flex items-center justify-between">
                  <span>Step 2 of 2</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-2 rounded bg-gray-100"
                      disabled={!createNewChannelObj?.channelName}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-green-200"
                      onClick={handleCreateChannel}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewChannelModal;
