import React, { useEffect, useRef, useState } from "react";
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

const SlateEditor = () => {
  const { showDocSidebar, setShowDocSidebar } = useStateContext();
  const [shareModal, setShareModal] = useState(false);
  const [editorData, setEditorData] = useState(
    "<h1 ><strong >My New Doc</Strong></h1>"
  );
  // const [editors, setEditors] = useState(null);
  // let editor = editors;
  function StyleButton(editor) {
    editor.ui.componentFactory.add("styleButton", (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: "Style",
        tooltip: true,
        withText: true,
      });
      view.on("execute", () => {
        // console.log("happy birth day");
        setShowDocSidebar(true);
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
  return (
    <div className="docCreater">
      {/* <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      /> */}
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
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      {/* {videoUrl && <video controls src={videoUrl} />} */}
      <DocSidebar onClose={onClose} sidebar={showDocSidebar} />
      <ShareModal handleClose={hideModal} show={shareModal} />
    </div>
  );
};

export default SlateEditor;
