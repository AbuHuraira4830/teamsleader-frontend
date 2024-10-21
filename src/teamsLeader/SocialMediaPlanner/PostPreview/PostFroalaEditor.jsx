import React, { useEffect, useRef, useState } from "react";
import Froalaeditor from "froala-editor";
import FroalaEditor from "react-froala-wysiwyg";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";

const PostFroalaEditor = ({ onContentChange }) => {
  const { postContent } = useStateContext();
  const [isStory, setIsStory] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const postContentRef = useRef(postContent);

  useEffect(() => {
    postContentRef.current = postContent;
  }, [postContent]);

  const handleVideoUpload = async (files) => {
    const currentContent = postContentRef.current;

    const file = files[0];
    const response = await axios.get("/api/s3url");
    const uploadedFileUrl = response.data.data.url.split("?")[0];

    const uploadURL = response.data.data.url;
    await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const newContent = file.type.includes("image")
      ? `     
          <img
            src="${uploadedFileUrl}"    
            style="width: 300px; display: block; vertical-align: top; margin: 5px auto; text-align: center;"
            class="fr-draggable"
          ></img>`
      : file.type.includes("video")
      ? `   
      <span contenteditable="false" draggable="true" class="fr-video fr-dvb fr-draggable fr-active">
      <video src="${uploadedFileUrl}" style="width: 600px;" controls="" class="fr-draggable">Your browser does not support HTML5 video.</video>
      </span>    
      
      `
      : "";
    onContentChange(newContent + currentContent);
    return uploadedFileUrl;
  };
  return (
    <div className="position-relative postFroala">
      <div className="flex justify-between items-center px-2 my-2">
        <FormControlLabel
          control={
            <Switch
              checked={isStory}
              onChange={(event) => setIsStory(event.target.checked)}
              name="isDraft"
              color="success"
              sx={{
                "& .MuiSwitch-switchBase": {
                  padding: 1, // Reduce the padding, making the switch tighter
                },
                "& .MuiSwitch-thumb": {
                  width: 12, // Smaller thumb width
                  height: 12, // Smaller thumb height
                },
                "& .MuiSwitch-track": {
                  borderRadius: 10 / 2, // Half of the new height to maintain a rounded shape
                  opacity: 0.7, // Optional: change the track opacity
                },
              }}
            />
          }
          label={
            <span className="text-[0.8rem] text-[#273333] font-semibold">
              This is a story
            </span>
          }
          labelPlacement="start"
          className="mr-2"
        />
      </div>
      <FroalaEditor
        config={{
          enter: Froalaeditor.ENTER_BR,
          tableStyles: { "no-border": "No border" },
          id: "",
          useClasses: false,
          attribution: false,
          toolbarSticky: false,
          charCounterCount: false,
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          heightMin: 120,
          heightMax: 550,
          linkInsertButtons: [],
          toolbarButtons: [
            "uploadFile",
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "textColor",
            "fontSize",
            "fontFamily",
            "formatOL",
            "formatUL",

            "insertLink",
            "paragraphFormat",
            "align",
            "quote",
            "insertHR",
            "emoticons",
            // "insertFile",
            "insertImage",
            "insertVideo",
            "insertTable",
            "selectAll",
            "clearFormatting",
          ],
          linkList: [],
          events: {
            "image.beforeUpload": function (files) {
              handleVideoUpload(files);
              return false;
            },
            "video.beforeUpload": function (files) {
              handleVideoUpload(files);
              return false;
            },
          },
        }}
        model={postContent}
        onModelChange={onContentChange}
      />
      <div className="flex justify-end items-center px-2 py-2">
        <FormControlLabel
          control={
            <Switch
              checked={isDraft}
              onChange={(event) => setIsDraft(event.target.checked)}
              name="isDraft"
              color="success"
              sx={{
                "& .MuiSwitch-switchBase": {
                  padding: 1, // Reduce the padding, making the switch tighter
                },
                "& .MuiSwitch-thumb": {
                  width: 12, // Smaller thumb width
                  height: 12, // Smaller thumb height
                },
                "& .MuiSwitch-track": {
                  borderRadius: 10 / 2, // Half of the new height to maintain a rounded shape
                  opacity: 0.7, // Optional: change the track opacity
                },
              }}
            />
          }
          label={
            <span className="text-[0.8rem] text-[#273333] font-semibold">
              This is a Draft
            </span>
          }
          labelPlacement="start"
          className="mr-2"
        />
      </div>
    </div>
  );
};

export default PostFroalaEditor;
