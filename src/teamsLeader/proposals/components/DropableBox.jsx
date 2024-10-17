import React, { useEffect, useRef, useState } from "react";
import { useProposalsContext } from "../../../contexts/ProposalsContext";
import TextFieldBox from "./DropableComponents/TextFieldBox";
import ImageFieldBox from "./DropableComponents/ImageFieldBox";
import VideoFieldBox from "./DropableComponents/VideoFieldBox";
import EditorWrapper from "./DropableComponents/EditorWrapper";
import TableBox from "./DropableComponents/TableBox";
import PriceTable from "./DropableComponents/PriceTable";

const DropableBox = () => {
  const { clickedIds, setClickedIds, activeEditorId, setActiveEditorId } =
    useProposalsContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleContentChange = (uid, newContent) => {
    console.log({ uid, newContent });
    setClickedIds((prevIds) => {
      const newIds = prevIds.map((item) =>
        item.uid === uid ? { ...item, content: newContent } : item
      );
      return newIds;
    });
  };

  const handleFileChange = (uid, blobUrl, type) => {
    setClickedIds((prevIds) => {
      const newIds = prevIds.map((item) => ({ ...item })); // Copy the array of objects

      const indexToUpdate = newIds.findIndex((item) => item.uid === uid); // Find the index of the item to update

      if (indexToUpdate !== -1) {
        // If the item exists in the array
        if (type === "image") {
          newIds[indexToUpdate] = {
            ...newIds[indexToUpdate],
            imageUrl: blobUrl,
          };
          console.log({ imageUpdate: newIds[indexToUpdate] });
        } else if (type === "video") {
          newIds[indexToUpdate] = {
            ...newIds[indexToUpdate],
            videoUrl: blobUrl,
          };
        }
      }

      return newIds;
    });
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const quillRefs = useRef([]);
  const activeQuillRef = useRef(null);
  console.log({ activeEditorId, clickedIds });
  const editorModules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const editorFormats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "link",
    "image",
    "video",
    "clean",
    "list",
    "insertTable",
  ];

  useEffect(() => {
    quillRefs.current = quillRefs.current.slice(0, clickedIds.length);
  }, [clickedIds.length]);

  // const handleChange = (content, id) => {
  //   console.log({ content, id });
  //   setClickedIds((prevStates) =>
  //     prevStates.map((editor) =>
  //       editor.uid === id ? { ...editor, content } : editor
  //     )
  //   );
  // };

  const handleEditorRef = (editor, id) => {
    console.log({ editor, id });
    if (editor && !quillRefs.current[id - 1]) {
      console.log({ valueAt: quillRefs.current[id - 1] });
      quillRefs.current[id - 1] = editor.getEditor();
    }
  };

  const handleFocus = (id) => {
    if (activeEditorId !== id) {
      setActiveEditorId(id);
      activeQuillRef.current = quillRefs.current[id - 1];
      console.log({ focusID: id });
    }
  };

  const renderComponent = (block, index) => {
    switch (block.id) {
      case "1":
        return (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <EditorWrapper
              key={block.uid}
              editor={block}
              activeEditorId={activeEditorId}
              handleFocus={handleFocus}
              handleEditorRef={handleEditorRef}
              // handleChange={handleChange}
              editorModules={editorModules}
              editorFormats={editorFormats}
              isHovered={hoveredIndex === index}
            />
          </div>
        );
      case "2":
        return (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <ImageFieldBox
              index={index}
              onFileChange={(i, url) => handleFileChange(i, url, "image")}
              isHovered={hoveredIndex === index}
              imageUrl={block.imageUrl}
              // onHeightChange={handleHeightChange}
              block={block}
            />
          </div>
        );
      case "3":
        return (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <VideoFieldBox
              index={index}
              onFileChange={(i, url) => handleFileChange(i, url, "video")}
              isHovered={hoveredIndex === index}
              videoUrl={block.videoUrl}
              // onHeightChange={handleHeightChange}
              block={block}
            />
          </div>
        );
      case "4":
        return (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <TableBox tableEditor={block} />
          </div>
        );
      case "5":
        return (
          <div
          // key={index}
          // onMouseEnter={() => handleMouseEnter(index)}
          // onMouseLeave={handleMouseLeave}
          >
            <PriceTable tableEditor={block} />
          </div>
        );
      default:
        return null;
    }
  };

  const parentRef = useRef(null);

  const [pages, setPages] = useState([]);
  console.log({ pages });
  const parentHeight = 1123;

  const gap = 10; // Gap size in pixels

  useEffect(() => {
    const pagesArray = [];
    let currentPage = [];
    let currentHeight = 0;
    clickedIds?.forEach((block) => {
      console.log("Processing block - height:", block.height);

      if (currentHeight + block.height + gap > parentHeight) {
        console.log("New page created");

        pagesArray.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(block);
      console.log({ currentPage });
      currentHeight += block.height + gap;
    });

    if (currentPage.length > 0) {
      console.log("Final page added");
      pagesArray.push(currentPage);
    }

    setPages(pagesArray);
  }, [clickedIds]);

  return (
    <div className="container mx-auto my-5 flex flex-col gap-10  w-[794px]">
      {pages?.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="bg-white flex flex-col p-3  gap-2  w-full"
          style={{ height: `${parentHeight}px` }}
        >
          {page?.map((block, index) => (
            // <div key={index} style={{ height: "auto" }}>
            <div key={index} style={{ height: `${block.height}px` }}>
              {renderComponent(block, index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DropableBox;

// import React, { useState } from "react";

// const DropableBox = () => {
//   const [inputFields, setInputFields] = useState([{ value: "" }]);
//   console.log({ inputFields });
//   const handleAddField = () => {
//     setInputFields([...inputFields, { value: "" }]);
//   };

//   const handleInputChange = (index, event) => {
//     const values = [...inputFields];
//     values[index].value = event.target.value;
//     setInputFields(values);
//   };

//   return (
//     <div>
//       {inputFields.map((inputField, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={inputField.value}
//             onChange={(event) => handleInputChange(index, event)}
//           />
//         </div>
//       ))}
//       <button type="button" onClick={handleAddField}>
//         Add Field
//       </button>
//     </div>
//   );
// };

// export default DropableBox;

// import React, { useState, useEffect } from "react";

// const DropableBox = () => {
//   const innerDivHeights = [
//     { id: 1, height: 40 },
//     { id: 2, height: 40 },
//     { id: 3, height: 80 },
//     { id: 4, height: 80 },
//     { id: 5, height: 40 },
//     { id: 6, height: 40 },
//     { id: 7, height: 80 },
//     { id: 8, height: 80 },
//     { id: 9, height: 40 },
//     { id: 10, height: 80 },
//     { id: 11, height: 40 },
//     { id: 12, height: 80 },
//     { id: 13, height: 40 },
//     { id: 14, height: 40 },
//     { id: 15, height: 40 },
//     { id: 16, height: 80 },
//     { id: 17, height: 80 },
//     { id: 18, height: 40 },
//     { id: 19, height: 80 },
//     { id: 20, height: 40 },
//   ];

//   const parentHeight = 1123;
//   const gap = 8; // Gap size in pixels

//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     const pagesArray = [];
//     let currentPage = [];
//     let currentHeight = 0;
//     innerDivHeights.forEach((height) => {
//       if (currentHeight + height.height + gap > parentHeight) {
//         pagesArray.push(currentPage);
//         currentPage = [];
//         currentHeight = 0;
//       }
//       currentPage.push(height);
//       currentHeight += height.height + gap;
//     });

//     if (currentPage.length > 0) {
//       pagesArray.push(currentPage);
//     }

//     setPages(pagesArray);
//   }, [innerDivHeights]);

//   console.log({ pages });
//   return (
//     <div className="container mx-auto my-5 flex flex-col gap-10  w-[794px]">
//       {pages.map((page, pageIndex) => (
//         <div
//           key={pageIndex}
//           className="bg-white flex flex-col p-3  gap-2  w-full"
//           style={{ height: `${parentHeight}px` }}
//         >
//           {page.map((block, index) => (
//             <div
//               key={index}
//               className="bg-gray-100 border"
//               style={{ height: `${block.height}px` }}
//             >
//               Inner Div {block.id} (Height: {block.height}px)
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DropableBox;
