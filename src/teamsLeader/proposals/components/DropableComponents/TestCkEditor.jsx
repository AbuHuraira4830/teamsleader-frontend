import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  MyCustomUploadAdapterPlugin,
  AddDropdown,
  baloonDropdown1,
  ActionDropdown,
} from "../../../Pages/DocCreater/CustomPlugins";
// import ClassicEditor from "./ckeditorConfig";
// import DocSidebar from "./DocSidebar";
// import { useStateContext } from "../../../contexts/ContextProvider";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
// import "../../../assets/css/DocCreator.css";
import "../../../../assets/css/DocCreator.css";
import ShareModal from "../../../Pages/DocCreater/ShareModal";
import { useStateContext } from "../../../../contexts/ContextProvider";
import ClassicEditor from "../../../Pages/DocCreater/ckeditorConfig";
import DocSidebar from "../../../Pages/DocCreater/DocSidebar";
import { postAPI } from "../../../../helpers/apis";
// import ShareModal from "./ShareModal";
// import { postAPI } from "../../../helpers/apis";

const TestCkEditor = ({ doc }) => {
  const {
    showDocSidebar,
    setShowDocSidebar,
    selectedDocument,
    selectedWorkspace,
    setAllDocuments,
  } = useStateContext();
  const [shareModal, setShareModal] = useState(false);
  const [editorData, setEditorData] = useState(`
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid #000;">Cell 1</td>
        <td style="border: 1px solid #000;">Cell 2</td>
      </tr>
    </table>
  `);

  const editorRef = useRef();

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

  const hideModal = () => {
    setShareModal(false);
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

  const addTable = () => {
    const editorInstance = editorRef.current.editor;
    editorInstance.model.change((writer) => {
      const table = writer.createElement("table");
      const row = writer.createElement("tableRow");
      const cell1 = writer.createElement("tableCell");
      const cell2 = writer.createElement("tableCell");

      writer.insertText("Cell 1", cell1);
      writer.insertText("Cell 2", cell2);

      writer.append(cell1, row);
      writer.append(cell2, row);
      writer.append(row, table);

      editorInstance.model.insertContent(
        table,
        editorInstance.model.document.selection
      );
    });
  };
  console.log({ editorData });
  return (
    <div className="docCreater">
      <button onClick={addTable} className="px-2 py-2 bg-red-500 text-white">
        Add Table
      </button>
      {/* <style jsx>{`
        .ck-editor__editable_inline {
          // padding: 0 !important;
          // margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }
        .ck-editor__top {
          display: none !important;
        }
        .ck-widget__selection-handle,
        .ck-widget__type-around__button {
          display: none !important;
        }
      `}</style> */}
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
          // toolbar: [], // This removes the toolbar
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
          console.log({ data });
          setEditorData(data);
          applyStyle();
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();
          handleEditorChange(data);
        }}
        onFocus={applyStyle}
      />
      {/* <DocSidebar
        onClose={onClose}
        sidebar={showDocSidebar}
        doc={doc}
        applyStyle={applyStyle}
      /> */}
      <ShareModal handleClose={hideModal} show={shareModal} />
    </div>
  );
};

export default TestCkEditor;
