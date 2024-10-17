import React, { useEffect, useRef } from "react";

const TextFieldBox = ({
  onContentChange,
  index,
  isHovered,
  content,
  // onHeightChange,
  block,
}) => {
  const textareaRef = useRef(null);
  // console.log({ index, content, isHovered });
  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustHeight = () => {
      textarea.style.height = "10px"; // Reset height to auto to calculate the new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight to expand as needed
    };
    // if (textarea) {
    // onHeightChange(index, textarea.getBoundingClientRect().height);
    // }
    // Adjust height on input
    textarea.addEventListener("input", adjustHeight);

    // Adjust height initially in case there's already content
    adjustHeight();

    // Cleanup event listener on unmount
    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, []);

  const handleInputChange = (event) => {
    onContentChange(block.uid, event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      className={`w-full border shadow-none outline-none px-3 py-2 resize-none overflow-hidden ${
        isHovered ? "border-gray-200" : "border-white"
      }`}
      placeholder="Write text here"
      onChange={handleInputChange}
      value={content}
    ></textarea>
  );
};

export default TextFieldBox;

// import React, { useEffect, useRef, useState } from "react";

// const TextFieldBox = ({
//   onContentChange,
//   index,
//   isHovered,
//   content,
//   block,
// }) => {
//   const textareaRef = useRef(null);
//   const [selectedText, setSelectedText] = useState("");
//   const [selectionStart, setSelectionStart] = useState(null);
//   const [selectionEnd, setSelectionEnd] = useState(null);

//   useEffect(() => {
//     const textarea = textareaRef.current;

//     const adjustHeight = () => {
//       textarea.style.height = "10px"; // Reset height to auto to calculate the new height
//       textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight to expand as needed
//     };

//     textarea.addEventListener("input", adjustHeight);
//     adjustHeight();

//     return () => {
//       textarea.removeEventListener("input", adjustHeight);
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     onContentChange(block.uid, event.target.value);
//   };

//   const handleSelectText = () => {
//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     setSelectedText(textarea.value.substring(start, end));
//     setSelectionStart(start);
//     setSelectionEnd(end);
//   };

//   const applyFormatting = (formatType) => {
//     if (!selectedText) return;

//     let formattedText;
//     if (formatType === "bold") {
//       formattedText = `**${selectedText}**`;
//     } else if (formatType === "italic") {
//       formattedText = `*${selectedText}*`;
//     }

//     const newContent =
//       content.substring(0, selectionStart) +
//       formattedText +
//       content.substring(selectionEnd);

//     onContentChange(block.uid, newContent);
//   };

//   return (
//     <div>
//       <textarea
//         ref={textareaRef}
//         className={`w-full border shadow-none outline-none px-3 py-2 resize-none overflow-hidden ${
//           isHovered ? "border-gray-200" : "border-white"
//         }`}
//         placeholder="Write text here"
//         onChange={handleInputChange}
//         onSelect={handleSelectText}
//         value={content}
//       ></textarea>
//       <button onClick={() => applyFormatting("bold")}>Bold</button>
//       <button onClick={() => applyFormatting("italic")}>Italic</button>
//     </div>
//   );
// };

// export default TextFieldBox;
