import React, { useState } from "react";
import { Button, Popover } from "antd";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { Checkbox, Divider } from "antd";
import {
  plainOptions,
  useKanbanContext,
} from "../../../../../../contexts/KanbanContext";
const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['Due Date', 'Timeline', 'Owner','List','Status','Notes','Budget','Files'];
// const defaultCheckedList = ['Due Date'];
const CheckBoxList = () => {
  // const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const { checkedList, setCheckedList } = useKanbanContext();
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  return (
    <div className="p-2 mb-2">
      <label className="flex items-center justify-between cursor-pointer bgHover p-2 rounded">
        Select all columns
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        />
      </label>
      {plainOptions.map((option) => (
        <div key={option}>
          <label className="flex items-center justify-between cursor-pointer bgHover p-2 rounded">
            {option}
            <Checkbox
              value={option}
              checked={checkedList.includes(option)}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...checkedList, option]
                    : checkedList.filter((item) => item !== option)
                )
              }
            />
          </label>
        </div>
      ))}
    </div>
  );
};

const Content = () => {
  return (
    <div className="h-[500px] w-96 p-2 flex flex-col text-[var(--text-color)]">
      <div className="flex items-center gap-2 text-lg bgHover">
        <SettingsOutlinedIcon />
        <span>Settings</span>
      </div>
      <div className="flex-1 m-2 flex flex-col">
        <div className=" h-10 rounded-t border-t border-l border-r flex items-center p-2 ">
          <span>Kanban</span>
        </div>
        <div className="flex-1 border rounded-b">
          <span className="h-10 flex items-center border-b p-2">
            Card Columns
          </span>
          <CheckBoxList />
        </div>
      </div>
    </div>
  );
};
const Settings = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={<Content />}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
    >
      <div className="px-2 py-1 rounded bgHover cursor-pointer">
        <SettingsOutlinedIcon />
      </div>
    </Popover>
  );
};
export default Settings;
