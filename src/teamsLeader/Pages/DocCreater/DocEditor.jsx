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
} from "./CustomPlugins";
import ClassicEditor from "./ckeditorConfig";
import DocSidebar from "./DocSidebar";
import { useStateContext } from "../../../contexts/ContextProvider";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import "../../../assets/css/DocCreator.css";
import ShareModal from "./ShareModal";
import { postAPI } from "../../../helpers/apis";

const ckEditor = ({ doc }) => {
  const {
    showDocSidebar,
    setShowDocSidebar,
    selectedDocument,
    selectedWorkspace,
    setAllDocuments,
  } = useStateContext();
  const [shareModal, setShareModal] = useState(false);
  const [editorData, setEditorData] = useState(
    doc.data ? doc.data : "<h1><strong>My New Doc</strong></h1>"
  );
  // const editorRef = useRef();

  const [headings, setHeadings] = useState([]);
  const editorRef = useRef(null);

  const getHeadings = (editor) => {
    const headings = [];
    const rootElement = editor.model.document.getRoot();
    let idCounter = 0;
  
    editor.model.change((writer) => {
      for (const value of rootElement.getChildren()) {
        if (value.is("element") && value.name.startsWith("heading")) {
          const headingText = Array.from(value.getChildren())
            .map((child) => child.data)
            .join("");
          const headingId = `heading-${idCounter++}`;
          headings.push({ text: headingText, id: headingId });

          // Set a custom attribute to store the ID
          writer.setAttribute("id", headingId, value);
        }
      }
    });

    return headings;
  };

  // Update the list of headings
  const updateHeadings = () => {
    if (editorRef.current) {
      const newHeadings = getHeadings(editorRef.current);
      setHeadings(newHeadings);
    }
  };

  const handleOutlineClick = (id) => {
    if (editorRef.current) {
      const ckContent = editorRef.current.ui.view.editable.element;
      const targetElement = ckContent.querySelector(`[id="${id}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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

  const onClose = () => {
    setShowDocSidebar(false);
  };

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
    postAPI("/api/doc/update", {
      workspaceID: selectedWorkspace._id,
      name: selectedDocument.name,
      docID: selectedDocument._id,
      data: editorData,
      shadow: selectedDocument.shadow,
      bgColor: selectedDocument.bgColor,
      width: selectedDocument.width,
      fontSize: selectedDocument.fontSize,
      fontFamily: selectedDocument.fontFamily,
    })
      .then((res) => {
        setAllDocuments(res.data.workspace.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyStyle = () => {
    const ckContent = document.querySelector(".ck-content");
    const ckEditorMain = document.querySelector(".ck-editor__main");
    if (ckContent) {
      ckContent.style.fontFamily = selectedDocument.fontFamily;
      ckContent.style.setProperty(
        "background-color",
        selectedDocument.bgColor,
        "important"
      );
      ckContent.style.boxShadow = selectedDocument.shadow;
    }
    if (ckEditorMain) {
      ckEditorMain.style.fontSize = selectedDocument.fontSize;
      ckEditorMain.style.padding = selectedDocument.width;
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
          documentOutline: {
            container: document.querySelector(".document-outline-container"),
          },
        }}
        data={editorData}
        onReady={(editor) => {
          editorRef.current = editor;
          updateHeadings();
          editor.model.document.on("change:data", updateHeadings);

          // Custom conversion to ensure ID is added to the DOM
          editor.conversion.for("upcast").attributeToAttribute({
            model: "id",
            view: "id",
          });

          editor.conversion.for("downcast").attributeToAttribute({
            model: "id",
            view: (modelAttributeValue, viewWriter) => {
              if (!modelAttributeValue) {
                return;
              }

              // Return the view attribute element
              return { key: "id", value: modelAttributeValue };
            },
          });

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
      <div
        className="document-outline-container px-3"
        style={{ position: "absolute", top: "180px" }}
      >
        <ul>
          {headings.map((heading, index) => (
            <li key={index}>
              <button
                style={{ fontWeight: "600" }}
                onClick={() => handleOutlineClick(heading.id)}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DocSidebar
        onClose={onClose}
        sidebar={showDocSidebar}
        doc={doc}
        applyStyle={applyStyle}
      />
      <ShareModal handleClose={hideModal} show={shareModal} />
    </div>
  );
};

export default ckEditor;
