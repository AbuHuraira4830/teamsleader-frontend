// // import React from "react";
// // import { ActiveTable } from "active-table-react";

// // const TableBox = () => {
// //   return (
// //     <div className="">
// //       <table className="w-full border-collapse">
// //         <tbody>
// //           <tr>
// //             <td className="border border-gray-300 h-10 w-[150px]">
// //               Lorem, ipsum dolor sit amet consectetur adipisicing elit. A,
// //               harum. Accusantium eligendi molestias expedita adipisci iste
// //               repellat voluptatibus! Illum quos quasi harum earum numquam eos
// //               tenetur provident libero molestias quibusdam?
// //             </td>
// //             <td className="border border-gray-300 h-10  w-[150px] align-top">
// //               x
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="border border-gray-300 h-10  w-[150px]"></td>
// //             <td className="border border-gray-300 h-10  w-[150px]"></td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default TableBox;

// import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { AiOutlinePlus } from "react-icons/ai";
// import { Button, Tooltip, Popover } from "antd";
// import {
//   RiInsertRowBottom,
//   RiInsertRowTop,
//   RiInsertColumnRight,
//   RiInsertColumnLeft,
// } from "react-icons/ri";

// const TableBox = () => {
//   const [columnWidths, setColumnWidths] = useState([]);
//   const [columnHeaders, setColumnHeaders] = useState([
//     "Heading 0",
//     "Heading 1",
//   ]);
//   const [rows, setRows] = useState([
//     ["", ""],
//     ["", ""],
//   ]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isPopoverVisible, setIsPopoverVisible] = useState(false);
//   const tableContainerRef = useRef(null);
//   const resizingColumnRef = useRef(null);

//   useEffect(() => {
//     const adjustColumnWidths = () => {
//       if (tableContainerRef.current) {
//         const totalWidth = tableContainerRef.current.clientWidth;
//         const initialColumnCount = rows[0].length;
//         const initialWidth = totalWidth / initialColumnCount;
//         setColumnWidths(Array(initialColumnCount).fill(initialWidth));
//       }
//     };

//     adjustColumnWidths();
//     window.addEventListener("resize", adjustColumnWidths);
//     return () => window.removeEventListener("resize", adjustColumnWidths);
//   }, [rows]);

//   const handleMouseDown = (index, event) => {
//     resizingColumnRef.current = {
//       index,
//       startX: event.clientX,
//       startWidth: columnWidths[index],
//     };
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const handleMouseMove = (event) => {
//     if (!resizingColumnRef.current) return;
//     const { index, startX, startWidth } = resizingColumnRef.current;
//     const deltaX = event.clientX - startX;

//     setColumnWidths((prevWidths) => {
//       const totalWidth = tableContainerRef.current.clientWidth;
//       const newWidths = [...prevWidths];
//       newWidths[index] = startWidth + deltaX;

//       const otherColumns = newWidths.length - 1;
//       const totalDeltaX =
//         newWidths.reduce((acc, width) => acc + width, 0) - totalWidth;

//       newWidths.forEach((width, i) => {
//         if (i !== index) {
//           newWidths[i] = width - totalDeltaX / otherColumns;
//         }
//       });

//       return newWidths;
//     });
//   };

//   const handleMouseUp = () => {
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", handleMouseUp);
//     resizingColumnRef.current = null;
//   };

//   const addColumn = () => {
//     setColumnWidths((prevWidths) => {
//       const totalWidth = tableContainerRef.current.clientWidth;
//       const newColumnCount = prevWidths.length + 1;
//       return Array(newColumnCount).fill(totalWidth / newColumnCount);
//     });
//     setColumnHeaders((prevHeaders) => [
//       ...prevHeaders,
//       `Heading ${prevHeaders.length}`,
//     ]);
//     setRows((prevRows) => prevRows.map((row) => [...row, ""]));
//   };

//   const addRow = () => {
//     setRows((prevRows) => [...prevRows, Array(columnWidths.length).fill("")]);
//   };

//   const addRowAbove = (index) => {
//     setRows((prevRows) => {
//       const newRows = [...prevRows];
//       newRows.splice(index, 0, Array(columnWidths.length).fill(""));
//       return newRows;
//     });
//   };

//   const addRowBelow = (index) => {
//     setRows((prevRows) => {
//       const newRows = [...prevRows];
//       newRows.splice(index + 1, 0, Array(columnWidths.length).fill(""));
//       return newRows;
//     });
//   };

//   const deleteColumn = (colIndex) => {
//     setColumnWidths((prevWidths) =>
//       prevWidths.filter((_, index) => index !== colIndex)
//     );
//     setColumnHeaders((prevHeaders) =>
//       prevHeaders.filter((_, index) => index !== colIndex)
//     );
//     setRows((prevRows) =>
//       prevRows.map((row) => row.filter((_, index) => index !== colIndex))
//     );
//   };

//   const updateHeader = (colIndex, value) => {
//     setColumnHeaders((prevHeaders) => {
//       const newHeaders = [...prevHeaders];
//       newHeaders[colIndex] = value;
//       return newHeaders;
//     });
//   };

//   const handleHeadingClick = (colIndex) => {
//     setEditingIndex(colIndex);
//   };

//   const handleHeadingChange = (colIndex, event) => {
//     updateHeader(colIndex, event.target.value);
//   };

//   const handleHeadingBlur = () => {
//     setEditingIndex(null);
//   };

//   const editorModules = {
//     toolbar: {
//       container: "#toolbar",
//     },
//   };

//   const editorFormats = [
//     "header",
//     "font",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "color",
//     "background",
//     "link",
//     "image",
//     "video",
//     "clean",
//     "list",
//   ];

//   return (
//     <>
//       {/* <Popover
//         content={
//           <div className="min-h-10 flex items-center px-2 gap-2">
//             <Tooltip title="Add row above">
//               <RiInsertRowTop
//                 className="cursor-pointer text-2xl border rounded p-1"
//                 onClick={() => addRowAbove(0)}
//               />
//             </Tooltip>
//             <Tooltip title="Add row below">
//               <RiInsertRowBottom
//                 className="cursor-pointer text-2xl border rounded p-1"
//                 onClick={() => addRowBelow(rows.length - 1)}
//               />
//             </Tooltip>
//             <Tooltip title="Add column to the left">
//               <RiInsertColumnLeft
//                 className="cursor-pointer  text-2xl border rounded p-1"
//                 onClick={() => addColumn(0)}
//               />
//             </Tooltip>
//             <Tooltip title="Add column to the right">
//               <RiInsertColumnRight
//                 className="cursor-pointer text-2xl border rounded p-1"
//                 onClick={addColumn}
//               />
//             </Tooltip>
//           </div>
//         }
//         open={isPopoverVisible}
//         placement="top"
//         overlayStyle={{
//           width: tableContainerRef.current?.clientWidth || "auto",
//         }}
//       > */}
//       <div
//         ref={tableContainerRef}
//         className="table-container w-full px-5"
//         onFocus={() => setIsPopoverVisible(true)}
//         // onBlur={() => setIsPopoverVisible(false)}
//         tabIndex="0"
//       >
//         <table className="w-full border-collapse">
//           <tbody>
//             {rows.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {columnWidths.map((width, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="border border-gray-300 h-auto relative align-top"
//                     style={{ width: `${width}px` }}
//                   >
//                     {rowIndex === 0 ? (
//                       editingIndex === colIndex ? (
//                         <input
//                           type="text"
//                           className="w-full h-8 my-1 px-1 rounded shadow-none outline-none"
//                           value={columnHeaders[colIndex]}
//                           onChange={(e) => handleHeadingChange(colIndex, e)}
//                           onBlur={handleHeadingBlur}
//                           autoFocus
//                         />
//                       ) : (
//                         <p
//                           className="cursor-pointer font-bold h-[42px] flex items-center justify-center"
//                           onClick={() => handleHeadingClick(colIndex)}
//                         >
//                           {columnHeaders[colIndex]}
//                         </p>
//                       )
//                     ) : (
//                       <ReactQuill
//                         modules={editorModules}
//                         formats={editorFormats}
//                       />
//                     )}
//                     <div
//                       className="resize-handle"
//                       onMouseDown={(event) => handleMouseDown(colIndex, event)}
//                     ></div>
//                   </td>
//                 ))}
//                 {/* {rowIndex === 0 && (
//                     <td rowSpan={rows.length + 1} className="align-top">
//                       <Tooltip title="Add Column">
//                         <AiOutlinePlus
//                           className="text-lg cursor-pointer mx-2"
//                           onClick={addColumn}
//                         />
//                       </Tooltip>
//                     </td>
//                   )} */}
//               </tr>
//             ))}
//             {/* <tr>
//                 <td colSpan={columnWidths.length} className="text-center">
//                   <Tooltip title="Add Row">
//                     <AiOutlinePlus
//                       className="text-lg cursor-pointer my-2"
//                       onClick={addRow}
//                     />
//                   </Tooltip>
//                 </td>
//               </tr> */}
//           </tbody>
//         </table>
//       </div>
//       {/* </Popover> */}
//     </>
//   );
// };

// export default TableBox;
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Tooltip, Popover } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  RiInsertRowBottom,
  RiInsertRowTop,
  RiInsertColumnRight,
  RiInsertColumnLeft,
} from "react-icons/ri";
import ClassicEditor from "../../../Pages/DocCreater/ckeditorConfig";
import {
  ActionDropdown,
  AddDropdown,
  MyCustomUploadAdapterPlugin,
  baloonDropdown1,
} from "../../../Pages/DocCreater/CustomPlugins";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { useStateContext } from "../../../../contexts/ContextProvider";

const TableBox = () => {
  const [columnWidths, setColumnWidths] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([
    "Heading 0",
    "Heading 1",
  ]);
  const [rows, setRows] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const tableContainerRef = useRef(null);
  const resizingColumnRef = useRef(null);
  const {
    showDocSidebar,
    setShowDocSidebar,
    selectedDocument,
    selectedWorkspace,
    setAllDocuments,
  } = useStateContext();
  function StyleButton(editor) {
    editor.ui.componentFactory.add("styleButton", (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: "Style",
        tooltip: true,
        withText: true,
      });
      view.on("execute", () => {
        setShowDocSidebar(true);
        applyStyle();
      });
      return view;
    });
  }
  function ShareButton(editor) {
    editor.ui.componentFactory.add("shareButton", (locale) => {
      const view = new ButtonView(locale);
      view.set({
        icon: "",
        label: "Share",
        tooltip: true,
        withText: true,
      });
      view.on("execute", () => {
        setShareModal(true);
      });
      return view;
    });
  }
  useEffect(() => {
    const adjustColumnWidths = () => {
      if (tableContainerRef.current) {
        const totalWidth = tableContainerRef.current.clientWidth;
        const initialColumnCount = rows[0].length;
        const initialWidth = totalWidth / initialColumnCount;
        setColumnWidths(Array(initialColumnCount).fill(initialWidth));
      }
    };

    adjustColumnWidths();
    window.addEventListener("resize", adjustColumnWidths);
    return () => window.removeEventListener("resize", adjustColumnWidths);
  }, [rows]);

  const handleMouseDown = (index, event) => {
    resizingColumnRef.current = {
      index,
      startX: event.clientX,
      startWidth: columnWidths[index],
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!resizingColumnRef.current) return;
    const { index, startX, startWidth } = resizingColumnRef.current;
    const deltaX = event.clientX - startX;

    setColumnWidths((prevWidths) => {
      const totalWidth = tableContainerRef.current.clientWidth;
      const newWidths = [...prevWidths];
      newWidths[index] = startWidth + deltaX;

      const otherColumns = newWidths.length - 1;
      const totalDeltaX =
        newWidths.reduce((acc, width) => acc + width, 0) - totalWidth;

      newWidths.forEach((width, i) => {
        if (i !== index) {
          newWidths[i] = width - totalDeltaX / otherColumns;
        }
      });

      return newWidths;
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    resizingColumnRef.current = null;
  };

  const addColumn = () => {
    setColumnWidths((prevWidths) => {
      const totalWidth = tableContainerRef.current.clientWidth;
      const newColumnCount = prevWidths.length + 1;
      return Array(newColumnCount).fill(totalWidth / newColumnCount);
    });
    setColumnHeaders((prevHeaders) => [
      ...prevHeaders,
      `Heading ${prevHeaders.length}`,
    ]);
    setRows((prevRows) => prevRows.map((row) => [...row, ""]));
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, Array(columnWidths.length).fill("")]);
  };

  const addRowAbove = (index) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.splice(index, 0, Array(columnWidths.length).fill(""));
      return newRows;
    });
  };

  const addRowBelow = (index) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.splice(index + 1, 0, Array(columnWidths.length).fill(""));
      return newRows;
    });
  };

  const deleteColumn = (colIndex) => {
    setColumnWidths((prevWidths) =>
      prevWidths.filter((_, index) => index !== colIndex)
    );
    setColumnHeaders((prevHeaders) =>
      prevHeaders.filter((_, index) => index !== colIndex)
    );
    setRows((prevRows) =>
      prevRows.map((row) => row.filter((_, index) => index !== colIndex))
    );
  };

  const updateHeader = (colIndex, value) => {
    setColumnHeaders((prevHeaders) => {
      const newHeaders = [...prevHeaders];
      newHeaders[colIndex] = value;
      return newHeaders;
    });
  };

  const handleHeadingClick = (colIndex) => {
    setEditingIndex(colIndex);
  };

  const handleHeadingChange = (colIndex, event) => {
    updateHeader(colIndex, event.target.value);
  };

  const handleHeadingBlur = () => {
    setEditingIndex(null);
  };

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
  ];
  const [editorData, setEditorData] = useState();
  const editorRef = useRef();
  const applyStyle = () => {
    const ckContent = document.querySelector(".ck-content");
    const ckEditorMain = document.querySelector(".ck-editor__main");
    if (ckContent) {
      // ckContent.style.fontFamily = selectedDocument.fontFamily;
      // ckContent.style.setProperty(
      //   "background-color",
      //   selectedDocument.bgColor,
      //   "important"
      // );
      // ckContent.style.boxShadow = selectedDocument.shadow;
    }
    if (ckEditorMain) {
      // ckEditorMain.style.fontSize = selectedDocument.fontSize;
      // ckEditorMain.style.padding = selectedDocument.width;
    }
  };
  const handleEditorChange = (data) => {
    setEditorData(data);
    // postAPI("/api/doc/update", {
    //   workspaceID: selectedWorkspace._id,
    //   name: selectedDocument.name,
    //   docID: selectedDocument._id,
    //   data: editorData,
    //   shadow: selectedDocument.shadow,
    //   bgColor: selectedDocument.bgColor,
    //   width: selectedDocument.width,
    //   fontSize: selectedDocument.fontSize,
    //   fontFamily: selectedDocument.fontFamily,
    // })
    //   .then((res) => {
    //     setAllDocuments(res.data.workspace.documents);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <>
      {/* <Popover
        content={
          <div className="min-h-10 flex items-center px-2 gap-2">
            <Tooltip title="Add row above">
              <RiInsertRowTop
                className="cursor-pointer text-2xl border rounded p-1"
                onClick={() => addRowAbove(0)}
              />
            </Tooltip>
            <Tooltip title="Add row below">
              <RiInsertRowBottom
                className="cursor-pointer text-2xl border rounded p-1"
                onClick={() => addRowBelow(rows.length - 1)}
              />
            </Tooltip>
            <Tooltip title="Add column to the left">
              <RiInsertColumnLeft
                className="cursor-pointer  text-2xl border rounded p-1"
                onClick={() => addColumn(0)}
              />
            </Tooltip>
            <Tooltip title="Add column to the right">
              <RiInsertColumnRight
                className="cursor-pointer text-2xl border rounded p-1"
                onClick={addColumn}
              />
            </Tooltip>
          </div>
        }
        open={isPopoverVisible}
        placement="top"
        overlayStyle={{
          width: tableContainerRef.current?.clientWidth || "auto",
        }}
      > */}

      <div
        ref={tableContainerRef}
        className="table-container w-full px-5"
        onFocus={() => setIsPopoverVisible(true)}
        // onBlur={() => setIsPopoverVisible(false)}
        tabIndex="0"
      >
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columnWidths.map((width, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 h-auto relative align-top"
                    style={{ width: `${width}px` }}
                  >
                    {rowIndex === 0 ? (
                      editingIndex === colIndex ? (
                        <input
                          type="text"
                          className="w-full h-8 my-1 px-1 rounded shadow-none outline-none"
                          value={columnHeaders[colIndex]}
                          onChange={(e) => handleHeadingChange(colIndex, e)}
                          onBlur={handleHeadingBlur}
                          autoFocus
                        />
                      ) : (
                        <p
                          className="cursor-pointer font-bold h-[42px] flex items-center justify-center"
                          onClick={() => handleHeadingClick(colIndex)}
                        >
                          {columnHeaders[colIndex]}
                        </p>
                      )
                    ) : (
                      // <ReactQuill
                      //   modules={editorModules}
                      //   formats={editorFormats}
                      // />
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          extraPlugins: [
                            MyCustomUploadAdapterPlugin,
                            StyleButton,
                            AddDropdown,
                            baloonDropdown1,
                            ActionDropdown,
                            ShareButton,
                          ],
                          mediaEmbed: {
                            previewsInData: true,
                          },
                        }}
                        data={editorData}
                        onReady={(editor) => {
                          editorRef.current = { editor };
                          applyStyle();
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorData(data);
                          applyStyle();
                        }}
                        onBlur={(event, editor) => {
                          const data = editor.getData();
                          handleEditorChange(data);
                        }}
                        onFocus={applyStyle}
                      />
                    )}
                    <div
                      className="resize-handle"
                      onMouseDown={(event) => handleMouseDown(colIndex, event)}
                    ></div>
                  </td>
                ))}
                {/* {rowIndex === 0 && (
                    <td rowSpan={rows.length + 1} className="align-top">
                      <Tooltip title="Add Column">
                        <AiOutlinePlus
                          className="text-lg cursor-pointer mx-2"
                          onClick={addColumn}
                        />
                      </Tooltip>
                    </td>
                  )} */}
              </tr>
            ))}
            {/* <tr>
                <td colSpan={columnWidths.length} className="text-center">
                  <Tooltip title="Add Row">
                    <AiOutlinePlus
                      className="text-lg cursor-pointer my-2"
                      onClick={addRow}
                    />
                  </Tooltip>
                </td>
              </tr> */}
          </tbody>
        </table>
      </div>
      {/* </Popover> */}
    </>
  );
};

export default TableBox;
