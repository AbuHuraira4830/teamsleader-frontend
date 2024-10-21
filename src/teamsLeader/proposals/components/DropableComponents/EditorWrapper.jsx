import React, { useRef, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import { useProposalsContext } from "../../../../contexts/ProposalsContext";

const EditorWrapper = ({
  editor,
  activeEditorId,
  handleFocus,
  handleEditorRef,
  editorModules,
  editorFormats,
  isHovered,
}) => {
  const { setClickedIds } = useProposalsContext();
  const quillRef = useRef(null);
  const contentRef = useRef(editor.content);

  useEffect(() => {
    if (quillRef.current && editor.uid === activeEditorId) {
      handleEditorRef(quillRef.current, editor.uid);
    }
  }, [activeEditorId, editor.uid, handleEditorRef]);

  const handleChange = (content, id) => {
    contentRef.current = content;
    // setClickedIds((prevStates) =>
    //   prevStates.map((ed) => (ed.uid === id ? { ...ed, content } : ed))
    // );
    const editorContent = quillRef.current.getEditor().root;
    // setEditorHeight(editorContent.scrollHeight);
    const newHeight = editorContent.scrollHeight;

    setClickedIds((prevStates) =>
      prevStates.map((ed) =>
        ed.uid === id ? { ...ed, content, height: newHeight } : ed
      )
    );
    console.log({ id, height: editorContent.scrollHeight });
  };

  return (
    <div key={editor.uid} onClick={() => handleFocus(editor.uid)}>
      {activeEditorId === editor.uid ? (
        <ReactQuill
          ref={(el) => {
            quillRef.current = el;
            handleEditorRef(el, editor.uid);
          }}
          value={contentRef.current}
          onChange={(content) => handleChange(content, editor.uid)}
          modules={editorModules}
          formats={editorFormats}
          placeholder="Write text here..."
        />
      ) : (
        <div
          className={`preview border  p-2 text-break border text-[13px]  ${
            isHovered ? "border-gray-200" : "border-white"
          } `}
          style={{ minHeight: "42px" }}
          dangerouslySetInnerHTML={{ __html: editor.content }}
        ></div>
      )}
    </div>
  );
};

export default EditorWrapper;
