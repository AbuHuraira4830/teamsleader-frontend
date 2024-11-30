// import React, { useRef, useEffect } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "../../../Pages/DocCreater/ckeditorConfig";
// import { ButtonView } from "@ckeditor/ckeditor5-ui";
// import { useStateContext } from "../../../../contexts/ContextProvider";
// import {
//   ActionDropdown,
//   AddDropdown,
//   MyCustomUploadAdapterPlugin,
//   baloonDropdown1,
// } from "../../../Pages/DocCreater/CustomPlugins";
// import "../../../../assets/css/DocCreator.css";
// import { useProposalsContext } from "../../../../contexts/ProposalsContext"; // Assuming you have this context

// const PriceTable = ({ tableEditor }) => {
//   console.log({ tableEditor });
//   const {
//     showDocSidebar,
//     setShowDocSidebar,
//     selectedDocument,
//     selectedWorkspace,
//     setAllDocuments,
//   } = useStateContext();

//   const { clickedIds, setClickedIds } = useProposalsContext(); // Assuming you have this context
//   console.log({ clickedIds });

//   const editorRef = useRef();

//   const defaultContent = `
//     <table style="width: 100%; border-collapse: collapse;">
//       <tr>
//         <th style="border: 1px solid #000;">Name</th>
//         <th style="border: 1px solid #000;">Price</th>
//         <th style="border: 1px solid #000;">Quantity</th>
//         <th style="border: 1px solid #000;">Subtotal</th>
//       </tr>
//       <tr>
//         <td style="border: 1px solid #000;"></td>
//         <td style="border: 1px solid #000;">$0.00</td>
//         <td style="border: 1px solid #000;">1</td>
//         <td style="border: 1px solid #000;">$0.00</td>
//       </tr>

//     </table>
//   `;

//   function StyleButton(editor) {
//     editor.ui.componentFactory.add("styleButton", (locale) => {
//       const view = new ButtonView(locale);
//       view.set({
//         label: "Style",
//         tooltip: true,
//         withText: true,
//       });
//       view.on("execute", () => {
//         setShowDocSidebar(true);
//         applyStyle();
//       });
//       return view;
//     });
//   }

//   function ShareButton(editor) {
//     editor.ui.componentFactory.add("shareButton", (locale) => {
//       const view = new ButtonView(locale);
//       view.set({
//         icon: "",
//         label: "Share",
//         tooltip: true,
//         withText: true,
//       });
//       view.on("execute", () => {
//         setShareModal(true);
//       });
//       return view;
//     });
//   }

//   const hideModal = () => {
//     setShareModal(false);
//   };

//   const calculateHeight = () => {
//     const ckContent = document.querySelector(".ck-content");
//     return ckContent ? ckContent.getBoundingClientRect().height : 0;
//   };

//   const handleEditorChange = (data) => {
//     const height = calculateHeight();

//     setClickedIds((prevIds) => {
//       const newIds = prevIds.map((item) => ({ ...item }));
//       const indexToUpdate = newIds.findIndex(
//         (item) => item.uid === tableEditor.uid
//       );

//       if (indexToUpdate !== -1) {
//         newIds[indexToUpdate] = {
//           ...newIds[indexToUpdate],
//           content: data || defaultContent,
//           height: height,
//         };
//         // console.log({ contentUpdate: newIds[indexToUpdate] });
//       }

//       return newIds;
//     });
//   };

//   const applyStyle = () => {
//     const ckContent = document.querySelector(".ck-content");
//     const ckEditorMain = document.querySelector(".ck-editor__main");
//     if (ckContent) {
//       // ckContent.style.fontFamily = selectedDocument.fontFamily;
//       // ckContent.style.setProperty(
//       //   "background-color",
//       //   selectedDocument.bgColor,
//       //   "important"
//       // );
//       // ckContent.style.boxShadow = selectedDocument.shadow;
//     }
//     if (ckEditorMain) {
//       // ckEditorMain.style.fontSize = selectedDocument.fontSize;
//       // ckEditorMain.style.padding = selectedDocument.width;
//     }
//   };

//   const tableHeightRef = useRef();
//   useEffect(() => {
//     const newHeight =
//       tableHeightRef.current?.getBoundingClientRect().height || 0;
//     // console.log({ newHeight });
//   }, [tableEditor?.content]);

//   return (
//     <div ref={tableHeightRef}>
//       <style jsx>{`
//         .ck-editor__editable_inline {
//           // padding: 0 !important;
//           // margin: 0 !important;
//           border: none !important;
//           box-shadow: none !important;
//         }
//         .ck-editor__top {
//           display: none !important;
//         }
//         .ck-widget__selection-handle,
//         .ck-widget__type-around__button {
//           display: none !important;
//         }
//       `}</style>
//       <CKEditor
//         editor={ClassicEditor}
//         config={{
//           extraPlugins: [
//             MyCustomUploadAdapterPlugin,
//             StyleButton,
//             AddDropdown,
//             baloonDropdown1,
//             ActionDropdown,
//             ShareButton,
//           ],
//           toolbar: [], // This removes the toolbar
//           mediaEmbed: {
//             previewsInData: true,
//           },
//         }}
//         data={tableEditor.content || defaultContent}
//         onReady={(editor) => {
//           editorRef.current = { editor };
//           applyStyle();
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           handleEditorChange(data);
//           applyStyle();
//         }}
//         onBlur={(event, editor) => {
//           const data = editor.getData();
//           handleEditorChange(data);
//         }}
//         onFocus={applyStyle}
//       />
//       <table style={{ width: "50%" }} className="float-right mr-2">
//         <tr>
//           <th>Subtotal</th>
//           <td>0</td>
//         </tr>
//         <tr>
//           <th>Discount</th>
//           <td>0</td>
//         </tr>
//         <tr>
//           <th>Tax</th>
//           <td>0</td>
//         </tr>
//         <tr>
//           <th>Total</th>
//           <td>0</td>
//         </tr>
//       </table>
//     </div>
//   );
// };

// export default PriceTable;

import React, { useRef, useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Dropdown } from "antd";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { useProposalsContext } from "../../../../contexts/ProposalsContext";
import "../../../../assets/css/DocCreator.css";
import { FaPlus } from "react-icons/fa6";

const items = [
  {
    label: "Percent %",
    key: "0",
  },
  {
    label: "Flat $",
    key: "1",
  },
];

const PriceTable = ({ tableEditor }) => {
  const { setShowDocSidebar } = useStateContext();
  const { clickedIds, setClickedIds } = useProposalsContext();

  const [tableData, setTableData] = useState([
    { name: "", price: 0, quantity: 1, discount: 0, subtotal: 0 },
  ]);

  const [columnHeaders, setColumnHeaders] = useState([
    "Name",
    "Price",
    "Quantity",
    "Discount (%)",
    "Subtotal",
  ]);

  const [showDropdowns, setShowDropdowns] = useState(false);
  const [isRowPlusIconHovered, setIsRowPlusIconHovered] = useState(false);
  const [isColumnPlusIconHovered, setIsColumnPlusIconHovered] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setShowDropdowns(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableRef]);

  const handleTableClick = () => {
    setShowDropdowns(true);
  };

  const handleEditorChange = (data) => {
    const ckContent = document.querySelector(".ck-content");
    const height = ckContent ? ckContent.getBoundingClientRect().height : 0;

    setClickedIds((prevIds) => {
      const newIds = prevIds.map((item) => ({ ...item }));
      const indexToUpdate = newIds.findIndex(
        (item) => item.uid === tableEditor.uid
      );

      if (indexToUpdate !== -1) {
        newIds[indexToUpdate] = {
          ...newIds[indexToUpdate],
          content: data || defaultContent,
          height: height,
        };
      }

      return newIds;
    });
  };

  const handleInputChange = (rowIndex, columnIndex, value) => {
    setTableData((prevData) =>
      prevData.map((row, i) => {
        if (i === rowIndex) {
          const newRow = { ...row };
          newRow[columnHeaders[columnIndex]] =
            columnIndex === 0 ? value : parseFloat(value) || 0;

          if (
            ["Price", "Quantity", "Discount (%)"].includes(
              columnHeaders[columnIndex]
            )
          ) {
            const price = newRow["Price"] || 0;
            const quantity = newRow["Quantity"] || 0;
            const discount = newRow["Discount (%)"] || 0;
            newRow["Subtotal"] = price * quantity * (1 - discount / 100);
          }

          return newRow;
        }
        return row;
      })
    );
  };

  const calculateTotal = () => {
    return tableData.reduce((acc, row) => acc + (row["Subtotal"] || 0), 0);
  };

  const addNewRow = () => {
    setTableData((prevData) => [
      ...prevData,
      { name: "", price: 0, quantity: 1, discount: 0, subtotal: 0 },
    ]);
  };

  const addNewColumn = () => {
    setColumnHeaders((prevHeaders) => [
      ...prevHeaders,
      `Heading ${prevHeaders.length - 4}`,
    ]);

    setTableData((prevData) =>
      prevData.map((row) => ({
        ...row,
        [`Heading ${columnHeaders.length - 4}`]: "",
      }))
    );
  };

  return (
    <div className="mx-2.5" ref={tableRef} onClick={handleTableClick}>
      <div className="flex items-center justify-center relative">
        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
            className="flex-1 hover:outline hover:outline-4 hover:outline-[#ffc83d]"
          >
            <thead>
              <tr className="h-10">
                {columnHeaders.map((header, index) => (
                  <th
                    key={index}
                    style={{ border: "1px solid gray" }}
                    className="px-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="h-10">
                  {columnHeaders.map((header, columnIndex) => (
                    <td key={columnIndex} style={{ border: "1px solid gray" }}>
                      <input
                        type="text"
                        className="w-full border-none outline-none shadow-none text-center"
                        value={row[header] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            columnIndex,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {showDropdowns && (
            <>
              <div
                className={`h-3 w-full ${
                  isRowPlusIconHovered ? "bg-green-700" : ""
                }`}
              ></div>
              <div
                className="-mt-2 mb-2 w-10 cursor-pointer flex items-center justify-center shadow-md shadow-gray-300 bg-white  py-0.5 rounded mx-auto"
                onMouseEnter={() => setIsRowPlusIconHovered(true)}
                onMouseLeave={() => setIsRowPlusIconHovered(false)}
                onClick={addNewRow}
              >
                <FaPlus className="text-gray-500 text-xs text-lg" />
              </div>
            </>
          )}
        </div>

        {showDropdowns && (
          <div
            className={`addColumn flex items-center w-3 justify-center absolute -right-2 top-0 h-full ${
              isColumnPlusIconHovered ? "bg-green-700" : ""
            }`}
          >
            <div
              className="cursor-pointer flex h-8 items-center justify-center shadow-md shadow-gray-300 bg-white  px-0.5 rounded ml-3"
              onMouseEnter={() => setIsColumnPlusIconHovered(true)}
              onMouseLeave={() => setIsColumnPlusIconHovered(false)}
              onClick={addNewColumn}
            >
              <FaPlus className="text-gray-500 text-xs text-lg" />
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="flex-1"></div>
        <table style={{ width: "40%", float: "right", marginTop: "10px" }}>
          <div className="flex flex-col">
            <div className="flex">
              <div
                className={`flex items-left font-bold w-32 p-1 ${
                  showDropdowns ? "border" : ""
                }`}
              >
                Subtotal
              </div>
              <div
                className={`w-44 text-break text-center ${
                  showDropdowns ? "border-r border-y" : ""
                }`}
              >
                {calculateTotal().toFixed(2)}
              </div>
            </div>
            <div className="flex">
              <div
                className={`flex items-left font-bold w-32 p-1 ${
                  showDropdowns ? "border-x border-b" : ""
                }`}
              >
                Discount
              </div>
              <div
                className={`w-44 text-break text-center ${
                  showDropdowns ? "border-r border-b" : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <div
                      className="w-full flex items-center justify-center"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="w-11/12">Percent</span>
                      <IoMdArrowDropdown />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="flex">
              <div
                className={`flex items-left font-bold w-32 p-1 ${
                  showDropdowns ? "border-x border-b" : ""
                }`}
              >
                Tax
              </div>
              <div
                className={`w-44 text-break text-center ${
                  showDropdowns ? "border-r border-b" : ""
                }`}
              >
                0
              </div>
            </div>
            <div className="flex">
              <div
                className={`flex items-left font-bold w-32 p-1 ${
                  showDropdowns ? "border-x border-b" : ""
                }`}
              >
                Total
              </div>
              <div
                className={`w-44 text-break text-center ${
                  showDropdowns ? "border-r border-b" : ""
                }`}
              >
                {calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
