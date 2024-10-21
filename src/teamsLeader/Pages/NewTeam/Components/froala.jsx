// import React, { useState } from "react";
// import FroalaEditor from "react-froala-wysiwyg";
// import Froalaeditor from "froala-editor";
// import GifPicker from "./GifPicker";
// import { BsEmojiSmile } from "react-icons/bs";
// import { HiOutlinePaperClip } from "react-icons/hi";
// import { PiAt } from "react-icons/pi";
// import { Button } from "react-bootstrap";

// const Froalaa = () => {
//   const [gifPickerOpen, setGifPickerOpen] = useState(false);

//   const insertGifIntoEditor = (selectedGifUrl) => {
//     alert("ghe")
//     const editor = new Froalaeditor("#your-editor-id"); // Replace with your editor's ID
//     editor.html.insert(`<img src="${selectedGifUrl}" alt="GIF" />`);
//   };

//   const toggleGifPicker = () => {
//     setGifPickerOpen(!gifPickerOpen);
//   };

//   return (
//     <div className="p-5">
//       <FroalaEditor
//         id="your-editor-id" // Replace with your editor's ID
//         config={{
//           enter: Froalaeditor.ENTER_BR,
//           tableStyles: {
//             "no-border": "No border",
//           },
//           useClasses: false,
//           attribution: false,
//           toolbarSticky: false,
//           charCounterCount: false,
//           fontFamilySelection: true,
//           fontSizeSelection: true,
//           paragraphFormatSelection: true,
//           heightMin: 120,
//           heightMax: 550,
//           linkInsertButtons: [],
//           toolbarButtons: [
//             "bold",
//             "italic",
//             "underline",
//             "strikeThrough",
//             "textColor",
//             "fontSize",
//             "fontFamily",
//             "formatOL",
//             "formatUL",
//             "insertTable",
//             "insertLink",
//             "paragraphFormat",
//             "align",
//             "quote",
//             "insertHR",
//             "emoticons",
//             "insertImage",
//             "selectAll",
//             "clearFormatting",
//           ],
//           linkList: [],
//         }}
//       />

//       {gifPickerOpen && <GifPicker onGifSelect={insertGifIntoEditor} />}

//       <div className="mt-2 ps-5 flex justify-content-between position-relative">
//         <span>
//           <Button className="workspace-dropdown-button workspace-dropdownBtn align-self-center text-start py-1 px-2">
//             <HiOutlinePaperClip className="me-2 " />
//             Add Files
//           </Button>
//           <Button
//             className="workspace-dropdown-button workspace-dropdownBtn align-self-center text-start py-1 px-2"
//             onClick={toggleGifPicker}
//           >
//             GIF
//           </Button>
//           <Button
//             className="workspace-dropdown-button workspace-dropdownBtn align-self-center text-start py-1 px-2"
//             // onClick={() => toggleEmojiPicker(index)}
//           >
//             <BsEmojiSmile className="me-2 " />
//             Emoji
//           </Button>
//           <Button className="workspace-dropdown-button workspace-dropdownBtn align-self-center text-start py-1 px-2">
//             <PiAt className="me-2 " />
//             Mention
//           </Button>
//         </span>
//         <span>
//           <Button
//             type="button"
//             className="px-2 py-1 workspace_addBtn border-0"
//             style={{
//               backgroundColor: "#025231",
//               fontSize: "14px",
//             }}
//           >
//             Reply
//           </Button>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Froalaa;
import React, { useState, useRef, useEffect } from "react";

function EditableDiv() {
  const [content, setContent] = useState("This is an editable div!");
  const editableDivRef = useRef(null); // Ref to the editable div

  useEffect(() => {
    // Move the cursor to the end if the content changes
    moveCursorToEnd();
  }, [content]);

  const moveCursorToEnd = () => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(editableDivRef.current);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleContentChange = (event) => {
    setContent(event.target.innerText);
  };

  return (
    <div
      contentEditable
      ref={editableDivRef}
      onInput={handleContentChange}
      onBlur={handleContentChange} // Update content when user leaves the div (optional)
      suppressContentEditableWarning={true} // To suppress the warning for contentEditable without onChange
      style={{ border: "1px solid black", minHeight: "20px", padding: "5px" }}
    >
      {content}
    </div>
  );
}

export default EditableDiv;
