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
import { useParams } from "react-router-dom";

// Helper function to transform response data into options for the Select component
// Helper function to transform response data into options for the Select component
const transformResponseToOptions = (response, existingMembers) => {
  if (!Array.isArray(response)) {
    throw new Error("Response must be an array.");
  }

  // Get existing member IDs
  const existingIds = existingMembers.map((id) => id);

  return response
    .filter((item) => !existingIds.includes(item._id))
    .map((item) => ({
      value: item._id,
      label: getEmailFirstPart(item?.userId?.email || item?.email),
    }));
};

console.log({ transformResponseToOptions });
const AddMembersInChannel = () => {
  const {
    addMembersInChannel,
    setAddMembersInChannel,
    createNewChannelObj,
    setCreateNewChannelObj,
    loginUserChats,
    workspaceIndex,
    refreshData,
    setRefreshData,
    openedChannel,
  } = useChatsContext();
  const { workspaceId, channel_Id } = useParams();
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
    const [selectedOptions, setSelectedOptions] = useState([]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
 
  const handleSelectChange = (options) => {
    setSelectedOptions(options);

  };


    const handleAddMembersInChannel = async () => {
      // Update the memberIds with the selected user IDs and existing member IDs
      const selectedIds = selectedOptions?.map((option) => option.value);
      const existingMemberIds =
        openedChannel?.members?.map((member) => member) || [];
      const memberIds = [...new Set([...selectedIds, ...existingMemberIds])];

      const data = {
        memberIds,
      };

      try {
        // Update a specific channel in the workspace
        const response = await sendRequest(
          `workspaces/${workspaceId}/updateChannel/${channel_Id}`,
          "PUT",
          data,
          getLocalStorageItem("auth-token")
        );
        console.log("Channel update response:", response);
        setRefreshData(!refreshData);
        setAddMembersInChannel(false);
        setSelectedOptions([]); // Clear the selected options
      } catch (err) {
        console.error({ error: err });
      }
    };
  return (
    <>
      <Modal
        centered
        open={addMembersInChannel}
        onOk={() => setAddMembersInChannel(false)}
        onCancel={() => setAddMembersInChannel(false)}
        footer={null}
        closeIcon={null}
      >
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Add Members</span>
              <RxCross1
                onClick={() => setAddMembersInChannel(false)}
                className="cursor-pointer"
              />
            </div>

            <>
              <Select
                isMulti
                name="colors"
                options={transformResponseToOptions(
                  loginUserChats[workspaceIndex]?.members || [],
                  openedChannel?.members || []
                )}
                className="basic-multi-select"
                classNamePrefix="search"
                placeholder="Search by name"
                onChange={handleSelectChange}
                value={selectedOptions}
              />
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-2 rounded bg-green-200"
                    onClick={handleAddMembersInChannel}
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddMembersInChannel;
