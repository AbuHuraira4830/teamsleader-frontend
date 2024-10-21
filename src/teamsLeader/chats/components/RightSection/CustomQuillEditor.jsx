import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { useChatsContext } from "../../../../contexts/ChatsContext";
import { UserListPopup } from "./UserListPopup";
import { Button, Popover } from "antd";

const MentionPopover = ({ onSelectUser }) => {
  const content = <UserListPopup onSelectUser={onSelectUser} />;

  return (
    <Popover
      content={content}
      placement="topLeft"
      trigger="click"
      open={true}
    >
      <span />
    </Popover>
  );
};
const CustomQuillEditor = () => {
  const { content, setContent, selectedEmoji, setSelectedEmoji } =
    useChatsContext();
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["link"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "link",
    "mention", // Add your custom format or class here
  ];

  const handleChange = (value) => {
    setContent(value);
  };
  const [editor, setEditor] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    // If an emoji is selected, append it to the existing content
    if (selectedEmoji) {
      // Check if the content ends with a <p> tag
      const lastTagIsParagraph = content.trim().endsWith("</p>");
      console.log({ lastTagIsParagraph, selectedEmoji });
      // Create a new <p> tag with the selected emoji
      // If the last tag is a <p> tag, append the emoji inside it
      // Otherwise, append the emoji without creating a new <p> tag
      const updatedContent = lastTagIsParagraph
        ? `${content.slice(0, -4)}${selectedEmoji}</p>`
        : `${content || ""} ${selectedEmoji}`;

      setContent(updatedContent);
      // Reset selectedEmoji state to avoid adding it again on the next render
      setSelectedEmoji(null);

      // If the editor is available, update its content
      if (editor) {
        editor.focus();
        editor.setText(updatedContent);
      }
    }
  }, [selectedEmoji, content, setContent, editor]);

  useEffect(() => {
    const editor = document.querySelector(".ql-editor");

    if (!editor) return;

    const handleKeyDown = (event) => {
      const isAtSymbolPressed = event.key === "@";
      if (isAtSymbolPressed) {
        // Prevent the "@" character from being inserted
        event.preventDefault();
        setShowPopover(true);
      } else {
        setShowPopover(false);
      }
    };

    editor.addEventListener("keydown", handleKeyDown);

    return () => {
      editor.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectUser = (user) => {
    const lastTagIsParagraph = content.trim().endsWith("</p>");
    const updatedContent = lastTagIsParagraph
      ? `${content.slice(0, -4)}<span 
       style="color: rgb(0, 102, 204); "
    >@${user.name}</span>&nbsp;</p>`
      : `${content || ""}<span 
       style="color: rgb(0, 102, 204); "
    >@${user.name}</span>&nbsp;`;

    setContent(updatedContent);
    setShowPopover(false); // Close the popover after selecting a user
  };

  // const handleSelectUser = (user) => {
  //   const mention = `@${user.name}`;
  //   const mentionWithSpan = `<span

  //   style="color: rgb(0, 102, 204); text-transform:underline"
  //   >${mention}</span>`;
  //   console.log({ mentionWithSpan });
  //   const updatedContent = content
  //     ? content + " " + mentionWithSpan
  //     : mentionWithSpan;
  //   setContent(updatedContent);
  //   setShowPopover(false); // Close the popover after selecting a user
  // };

  return (
    <>
      <ReactQuill
        className=" h-40"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Message"
      />
      {showPopover && <MentionPopover onSelectUser={handleSelectUser} />}
    </>
  );
};

export default CustomQuillEditor;
