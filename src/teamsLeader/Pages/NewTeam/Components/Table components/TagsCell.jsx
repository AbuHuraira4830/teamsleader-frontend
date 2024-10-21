import { Button, Popover } from "antd";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";
import { postAPI } from "../../../../../helpers/apis";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { RxCross2 } from "react-icons/rx";
import { hover } from "@testing-library/user-event/dist/cjs/convenience/hover.js";

const TagsCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();
  let cellData = JSON.parse(columnData);

  const [inputText, setInputText] = useState(cellData?.text);
  const [isInputActive, setIsInputActive] = useState(false);
  const [hovered, setIsHovered] = useState(false);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Check if the value already starts with #
    if (!value.startsWith("#")) {
      value = `#${value}`;
    }
    setInputText(value);
    setInputText(value);
  };

  const handleFocus = () => {
    setIsInputActive(true);
    if (cellData) {
      setInputText(cellData?.text || "");
    }
    setIsInputActive(true);
  };

  const handleSaveClick = () => {
    console.log("save clicked");
    const randomColor = getRandomColor();

    const data = JSON.stringify({ text: inputText, color: randomColor });
    const postData = {
      data,
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/update/${columnID}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setIsInputActive(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearCell = (id) => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        // console.log(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setInputText("");
        // console.log({team});
      })
      .catch((err) => {
        console.log(err);
        setInputText("");
      });
  };
  return (
    <>
      <div
        style={{ maxWidth: "100%" }}
        className="d-flex justify-content-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <InputGroup
          style={{
            height: "27px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "173.76px",
          }}
        >
          <input
            style={{
              color: cellData?.color,
              width: "130px",
            }}
            value={inputText}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder=" "
            className={`py-1  shadow-none  text-center tag_input transparent_bg h-100 rounded-start-2 fw-normal 
          
            `}
          />

          {hovered && (
            <InputGroup.Text
              onClick={handleSaveClick}
              style={{
                height: "27px",
                backgroundColor: "#00854d",
                padding: "8px 8px 9px",
                color: "white",
                border: "1px solid #00854d",
                cursor: "pointer",
              }}
              className=""
            >
              +
            </InputGroup.Text>
          )}
          <span style={{ width: "14px", marginLeft: "3px" }}>
            {inputText && hovered && (
              <button
                className="px-0 py-0  file_deleteBtn flex  close-icon"
                onClick={() => clearCell(columnID)}
              >
                <RxCross2
                  className=""
                  style={{
                    width: "14px",
                    height: "auto",
                  }}
                />
              </button>
            )}
          </span>
        </InputGroup>
      </div>
    </>
  );
};

export default TagsCell;

{
  /* {rows.find((row) => row.id === rowId)?.tag && (
          <p style={{ color: "#0086C0", cursor: "pointer", margin: 0 }}>
            {rows.find((row) => row.id === rowId)?.tag}
          </p>
        )} */
}

{
  /* <p className="mt-3 mb-0 fw-bold">Tags</p>
      {tags.map((tag) => (
        <Button
          onClick={() => handleSelectTag(tag.text)}
          style={{ color: "#0086C0" }}
          className="fs_14 ps-2  border-0 w-100 tagBtn text-start removeFocus"
        >
          {tag.text}
        </Button>
      ))} */
}

// setDisplayText(updatedText);
// const newTag = { text: updatedText, id: uuidv4() };
// setTags([...tags, newTag]);

// setInputText("");

// const [tags, setTags] = useState([
//   { text: "#task", id: uuidv4() },
//   { text: "#new", id: uuidv4() },
//   { text: "#abc", id: uuidv4() },
// ]);
// const [open, setOpen] = useState(false);

// const handleOpenChange = (newOpen) => {
//   setOpen({ ...open, [rowId]: newOpen });
// };
// const handleSelectTag = (tagText) => {
//   setRows((prevRows) =>
//     prevRows.map((row) => (row.id === rowId ? { ...row, tag: tagText } : row))
//   );
//   setOpen(false);
// };
{
  /* <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex align-items-center justify-content-center "
        style={{ height: "25px" }}
      >
        {!rows.find((row) => row.id === rowId)?.tag && (
          <span
            className="flex align-items-center "
            style={{
              width: "39px",
              maxWidth: "100%",
            }}
          >
            {isHovered && (
              <>
                <button
                  className="px-0 py-0  file_deleteBtn file_addBtn  "
                  style={{}}
                >
                  <AiOutlinePlus
                    className="mb-1"
                    style={{
                      width: "14px",
                      height: "auto",
                    }}
                  />
                </button>
                <HiOutlineHashtag className="text-secondary fs-5" />
              </>
            )}
          </span>
        )}
      </div> */
}
