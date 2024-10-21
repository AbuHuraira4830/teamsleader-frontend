import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Offcanvas } from "react-bootstrap";
import {
  BiChevronDown,
  BiMessageRoundedAdd,
  BiPlusCircle,
  BiRefresh,
} from "react-icons/bi";
import {
  BsChevronDown,
  BsEmojiSmile,
  BsList,
  BsReply,
  BsThreeDots,
} from "react-icons/bs";
import {
  FiChevronDown,
  FiDownload,
  FiGrid,
  FiPlus,
  FiPlusCircle,
} from "react-icons/fi";
import { HiOutlineChevronDown, HiOutlinePaperClip } from "react-icons/hi";
import { PiAt, PiMicrosoftExcelLogoLight } from "react-icons/pi";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { SlHome } from "react-icons/sl";

import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClockCircle } from "react-icons/ai";
// import FileUploader from "./FileUploader";
import { LuThumbsUp } from "react-icons/lu";
// import EmojiPicker from "emoji-picker-react";
// import GifPicker from "./GifPicker";
import { v4 as uuidv4 } from "uuid";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RiGroup2Fill } from "react-icons/ri";
import ContentEditable from "react-contenteditable";
// import UploadedFileModal from "./UploadedFileModal";
import { useStateContext } from "../../../../../../../contexts/ContextProvider";
// import FileUploader from "../../../FileUploader";
import GifPicker from "../../../GifPicker";
import UploadedFileModal from "../../SubComp/UploadedFileModal";
import FileUploader from "./FileUploader";
import { useKanbanContext } from "../../../../../../../contexts/KanbanContext";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const OffCanvas = () => {
  const {
    searchQuery,
    setSearchQuery,
    fileView,
    setFileView,
    setModalShow,
    modalShow,
    replyInput,
    setReplyInput,
    defaultState,
    setReplyFilePreview,
    replyFilePreview,
    setIsTriggerFiles,
  } = useKanbanContext();
  // useEffect(() => {
  //   setEditorContent(data?.tasks[openTaskId]?.description);
  // }, [openTaskId]);
  const uniqueId = uuidv4();
  // const [mentionInput, setMentionInput] = useState("");
  const [mentionMenuVisible, setMentionMenuVisible] = useState(false); // Mention menu visibility
  const mentionMembers = ["Usman", "Ali"]; // Replace with your member list
  const [commentsArray, setCommentsArray] = useState([]);
  const [mentionSource, setMentionSource] = useState(null);
  const {
    data,
    setData,
    isEditTaskModalOpen,
    isEditData,
    setIsEditData,
    editorContent,
    setEditorContent,
    openTaskId,
  } = useKanbanContext();
  const [isChange, setIsChange] = useState(false);
  const handleContentChange = (content) => {
    setIsChange(true);
    setEditorContent(content);

    if (content.endsWith("@")) {
      setMentionMenuVisible(true);
    } else {
      setMentionMenuVisible(false);
    }
    setMentionSource("editor");
  };
  const contentEditable = useRef(null); // Ref for ContentEditable component

  const handleReplyInputChange = (e) => {
    // Update the state when the content changes
    setReplyInput({ ...replyInput, replyText: e.target.value });
    setMentionSource("input");
    if (e.target.value.endsWith("@")) {
      setMentionMenuVisible(true);
    } else {
      setMentionMenuVisible(false);
    }
  };

  const handleMentionSelect = (mentionedMember) => {
    const mentionHtml = `<a href="#" style="color: #0071d9;text-decration:none;">@${mentionedMember}</a>`;
    let newHtmlContent;

    {
      if (mentionSource === "editor") {
        if (editorContent.endsWith("@")) {
          setEditorContent((prevContent) =>
            prevContent.replace(/@[^@]*$/, mentionHtml)
          );
        } else {
          setEditorContent((prevContent) => prevContent + mentionHtml);
        }
      } else if (mentionSource === "input") {
        if (replyInput.replyText.endsWith("@")) {
          newHtmlContent = replyInput.replyText.replace(/@[^@]*$/, mentionHtml);
        } else {
          newHtmlContent = replyInput.replyText + mentionHtml;
        }
        setReplyInput({ ...replyInput, replyText: newHtmlContent });
      }
    }

    setMentionMenuVisible(false);
    setMentionSource(null);
  };

  // const [attachedFiles, setAttachedFiles] = useState([]);
  // const attachFile = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileLinkHtml = `<a href="#" class="file-link-class" data-file-id="${replyInput?.id}">${file?.name}</a>`;
  //     const fileObject = {
  //       name: file.name,
  //       type: file.type,
  //       url: URL.createObjectURL(file), // Creates a URL for the file
  //     };
  //     const uploadedImg = `<br> <img
          
  //         src=${fileObject.url}
  //         alt="uploaded Img"
  //         class="p-2 w-100"
  //       />`;
  //     setReplyInput({
  //       ...replyInput,
  //       replyText: replyInput?.replyText + fileLinkHtml + uploadedImg,
  //       replyFile: file,
  //       fileData: fileObject,
  //     });
  //   }
  // };
  const attachFile = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("fileBase64[0]", file);

        const response = await fetch(
          "https://coursedashboard.mikegeerinck.com/teamleader/uploadfiles.php",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const returnFiles = await response.json();
          console.log("Upload successful:", returnFiles);

          const fileLinkHtml = `<a href="#" class="file-link-class" data-file-id="${replyInput?.id}">${file?.name}</a>`;
          const fileObject = {
            name: file.name,
            type: file.type,
            url: returnFiles[0]?.url.replace(/ /g, "%20"), // Assuming the API response contains the file URL
          };

          const uploadedImg = `<br> <img
          src=${fileObject.url}
          alt="uploaded Img"
          class="p-2 w-100"
        />`;

          setReplyInput({
            ...replyInput,
            replyText: replyInput?.replyText + fileLinkHtml + uploadedImg,
            replyFile: file,
            fileData: fileObject,
          });
        } else {
          console.error("Upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };


  useEffect(() => {
    const handleFileClick = (e) => {
      // Check if the clicked element is a file link
      if (e.target && e.target.matches(".file-link-class")) {
        e.preventDefault();

        console.log({ commentsArray });
        // Extract the file ID from the data attribute of the clicked anchor tag
        const fileId = e.target.getAttribute("data-file-id");

        // Traverse the commentsArray to find the file data
        for (const comment of commentsArray) {
          for (const reply of comment.replies) {
            if (reply.fileData && reply.id === fileId) {
              setModalShow({ modalActive: true, file: reply.fileData });
              setReplyFilePreview({
                replyModalActive: true,
                file: reply.fileData,
              });
              return; // Stop the search once the file is found
            }
          }
        }
      }
    };
    // console.log({ replyInput });
    // Add event listener to the document
    document.addEventListener("click", handleFileClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleFileClick);
    };
  }, [commentsArray]);

  const [pageView, setPageView] = useState(1);
  const childRef = useRef(null);


  const handleUpdateButtonClick = () => {
    if (editorContent) {
      const newComment = { content: editorContent, id: uniqueId, replies: [] };
      setCommentsArray([newComment, ...commentsArray || []]);
      setEditorContent(""); // Clear the editor content
      // const updatedData = { ...data };
      // const taskToUpdate = updatedData.tasks[openTaskId];
      // if (taskToUpdate) {
      //   taskToUpdate.updates = [newComment, ...commentsArray];
      //   setData(updatedData);
      //   console.log({ updatedData });
      //   setIsEditData(!isEditData);
      // }
    }
  };

  const [commentLike, setCommentLike] = useState(false);
  const [reply, setReply] = useState("");
  const fileInputRef = useRef(null);

  const handleReplyButtonClick = (id) => {
    const commentIdToReplyTo = id;

    commentsArray.map((comment) => {
      if (comment.id === commentIdToReplyTo) {
        comment.replies.push(replyInput);
      }
      return comment;
    });
    setReplyInput(defaultState);
  };
  console.log({ defaultState, commentsArray });

  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const toggleEmojiPicker = (id) => {
    setIsGifPickerVisible(false);
    commentsArray.map((comment) => {
      if (comment.id === id) {
        setIsEmojiPickerVisible(true);
      }
    });
  };

  const handleEmojiClick = (emojiObject) => {
    setReplyInput({
      ...replyInput,
      replyText: replyInput.replyText + emojiObject.native,
    });

    setIsEmojiPickerVisible(false);
  };

  const [isGifPickerVisible, setIsGifPickerVisible] = useState(false);

  const toggleGifPicker = (id) => {
    setIsEmojiPickerVisible(false);
    commentsArray.map((comment) => {
      if (comment.id === id) setIsGifPickerVisible(!isGifPickerVisible);
    });
  };

  const handleGifSelected = (gifUrl) => {
    const selectedGif = `<img
    src=${gifUrl}
    alt="Selected GIF"
    class="p-2 "
  />`;
    setReplyInput({
      ...replyInput,
      replyText: replyInput?.replyText + selectedGif,
    });
    setIsGifPickerVisible(false);
  };

  const toggleDeleteButton = (commentId, replyId, show) => {
    const newData = commentsArray.map((parent) => ({
      ...parent,
      replies: parent.replies.map((reply) =>
        reply.id === replyId ? { ...reply, showDeleteButton: show } : reply
      ),
    }));
    setCommentsArray(newData);
  };
  const handleReplyDelete = (commentId, replyId) => {
    const newData = commentsArray.map((parent) => {
      if (parent.id === commentId) {
        return {
          ...parent,
          replies: parent.replies.filter((reply) => reply.id !== replyId),
        };
      }
      return parent;
    });
    setCommentsArray(newData);
  };

  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyEditValues, setReplyEditValues] = useState({
    replyText: "",
    replyGif: "",
  });
  const handleEditClick = (id, replyText, replyGif) => {
    setEditingReplyId(id);
    // setReplyEditValues({ replyText, replyGif });

    // Set the reply input values
    setReplyInput({
      ...replyInput,
      replyText,
      replyGif,
    });
    // setHtmlContent(replyText);
  };
  const handleSaveClick = (commentId, replyId) => {
    const newData = commentsArray.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              replyText: replyInput.replyText,
              replyGif: replyInput.replyGif,
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    setCommentsArray(newData);
    setEditingReplyId(null);
    setReplyInput(defaultState);
  };

  const handleCancelClick = () => {
    setEditingReplyId(null);
    setReplyInput(defaultState);
  };
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    type: "",
    url: "",
  });

  const handleFileClick = (fileName, fileType, fileUrl) => {
    console.log({ selectedFile });
    setSelectedFile({
      name: fileName,
      type: fileType,
      url: fileUrl,
    });
  };
const [isPrevUseEffect, setIsPrevUseEffect] = useState(false)
  useEffect(() => {
    // if (isChange) {
      if (isPrevUseEffect) {
        const updatedData = { ...data };
        const taskToUpdate = updatedData.tasks[openTaskId];
        if (taskToUpdate) {
          taskToUpdate.updates = commentsArray;
          setData(updatedData);
          setIsEditData(!isEditData);
        }
      }
    // }
  }, [commentsArray]);
  useEffect(() => {
    const updatedData = { ...data };
    const taskToUpdate = updatedData.tasks[openTaskId];
    if (taskToUpdate) {
      setCommentsArray(taskToUpdate?.updates);
      setIsPrevUseEffect(true)
    }
  }, [openTaskId]);
  // useEffect(() => {
  //   setEditorContent(data?.tasks[openTaskId]?.description);
  // }, [openTaskId]);

  //  const fileUploaderRef = useRef(null);

   const handleButtonClick = () => {
    setIsTriggerFiles(true)
    //   console.log("fileUploaderRef.current:", fileUploaderRef.current);

    //  // Call handleAddFiles from FileUploader component
    // if (fileUploaderRef.current && fileUploaderRef.current.handleAddFiles) {
    //   fileUploaderRef.current.handleAddFiles();
    // }
   };

const downloadFilesAsZip = async () => {
  const zip = new JSZip();
  const promises = [];

  const taskToUpdate = data.tasks[openTaskId];

  // Check if the task exists and has files
  if (taskToUpdate && taskToUpdate.files && taskToUpdate.files.length > 0) {
    taskToUpdate.files.forEach((file, index) => {
      const filePath = `${index + 1}_${file.name}`;

      // Fetch file content as Blob
      const promise = fetch(file.url, { mode: "no-cors" })
        .then((response) => response.blob())
        .then((blob) => {
          // Add file to the zip
          zip.file(filePath, blob);
        });

      promises.push(promise);
    });

    // Wait for all fetches to complete
    await Promise.all(promises);

    // Generate a zip file and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip");
    });
  } else {
    // Handle case where the task or files do not exist
    console.error("Task or files not found.");
  }
};


  return (
    <div className="custom-scrollbar p-2">
      <div className=" main_tableBtnDiv mb-3 flex justify-between mb-4">
        <span className="flex items-center ">
          <span className={`${pageView === 1 ? "green_borderBottom" : ""}`}>
            <div
              className="workspace-dropdown-button  flex items-center gap-1  text-start py-1  px-2"
              onClick={() => setPageView(1)}
            >
              <SlHome className="me-2 " />
              <span>Updates</span>
            </div>
          </span>
          <div className="vr mx-1 nav_splitter align-self-center"></div>
          <span className={`${pageView === 2 ? "green_borderBottom" : ""}`}>
            <Button
              className="workspace-dropdown-button  align-self-center  text-start py-1  px-2"
              onClick={() => setPageView(2)}
            >
              Files
            </Button>
          </span>

          <div className="vr mx-1 nav_splitter align-self-center"></div>
        </span>
      </div>

      {pageView === 1 ? (
        <div className="h-[500px] overflow-y-scroll">
          <div>
            <FroalaEditor
              config={{
                enter: Froalaeditor.ENTER_BR,
                tableStyles: {
                  "no-border": "No border",
                },
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
                  "insertTable",
                  "insertLink",
                  "paragraphFormat",
                  "align",
                  "quote",
                  "insertHR",
                  "emoticons",
                  "insertFile",
                  "insertImage",
                  "insertVideo",
                  "selectAll",
                  "clearFormatting",
                ],
                linkList: [],
              }}
              model={editorContent}
              onModelChange={handleContentChange}
            />
          </div>

          <div className="mt-2 flex justify-content-between">
            <span>
              <Button
                className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2"
                onClick={() => {
                  setMentionMenuVisible(!mentionMenuVisible),
                    setMentionSource("editor");
                }}
              >
                <PiAt className="me-2 " />
                Mention
              </Button>
            </span>
            <span>
              <Button
                type="button"
                className=" px-2 py-1   workspace_addBtn   border-0"
                style={{ backgroundColor: "#025231", fontSize: "14px" }}
                onClick={handleUpdateButtonClick}
              >
                Update
              </Button>
            </span>
          </div>
          {mentionMenuVisible && (
            <div className="mention-menu border rounded-3  flex flex-column p-3 ">
              <p className="fw-bolder mb-2">People</p>
              {mentionMembers.map((member) => (
                <Button
                  key={member}
                  onClick={() => handleMentionSelect(member)}
                  className="workspace-dropdown-button workspace-dropdownBtn text-start py-1 mb-2 px-2 "
                >
                  <span
                    className="nav-avatar rounded-circle align-self-center px-1  border-0 me-2"
                    style={{ fontSize: "13px" }}
                  >
                    UH
                  </span>
                  {member}
                </Button>
              ))}
              <p className="fw-bolder mb-2">Teams</p>
              <Button
                onClick={() => handleMentionSelect("Everyone in team")}
                className="workspace-dropdown-button workspace-dropdownBtn text-start py-1 mb-2 px-2 "
              >
                <RiGroup2Fill className="fs-3 me-2" />
                Everyone in team
              </Button>
              <Button
                onClick={() => handleMentionSelect("Everyone on workspace")}
                className="workspace-dropdown-button workspace-dropdownBtn text-start py-1 mb-2 px-2 "
              >
                <RiGroup2Fill className="fs-3 me-2" />
                Everyone on workspace
              </Button>
            </div>
          )}
          {commentsArray?.map((comment) => (
            <div className="border rounded-3 mt-3 comments " key={comment.id}>
              <div className="flex justify-content-between pt-3 px-3">
                <span>
                  <span className="nav-avatar rounded-circle align-self-center px-1  border-0 me-2">
                    UH
                  </span>
                  Usman
                </span>
                <span className="flex align-items-center">
                  <AiOutlineClockCircle className="me-1" /> 6h
                  <Button
                    type="button"
                    className="ms-1 px-2 py-1 workspace-dropdown-button"
                    style={{ fontSize: "14px" }}
                  >
                    <BsThreeDots />
                  </Button>
                </span>
              </div>

              <div
                className="fs_14 m-0 pt-4 pb-4 px-3"
                dangerouslySetInnerHTML={{ __html: comment.content }}
                onClick={(e) => {
                  const isFile = e.target.getAttribute("data-name");
                  if (isFile) {
                    const fileName = e.target.getAttribute("data-name");
                    const fileType = e.target.getAttribute("data-type");
                    const fileUrl = e.target.href;
                    e.preventDefault(); // Prevent the default link behavior
                    handleFileClick(fileName, fileType, fileUrl);
                  }
                }}
              ></div>

              {commentLike && <p className="fs_14 px-3 pb-2">👍 1</p>}
              <div className="w-100 h-14 border-top border-bottom flex justify-content-evenly">
                <div className="flex-fill p-1">
                  <Button
                    type="button"
                    className=" py-1 workspace-dropdown-button text-nowrap w-100 h-full"
                    style={{ fontSize: "15px" }}
                    onClick={() => setCommentLike((current) => !current)}
                  >
                    {commentLike ? (
                      "👍"
                    ) : (
                      <span className="flex items-center">
                        <LuThumbsUp className="me-2" />

                        <span>Like</span>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="border-start flex-fill p-1 ">
                  <Button
                    type="button"
                    className="py-1 workspace-dropdown-button text-nowrap w-100 h-full "
                    style={{ fontSize: "15px" }}
                    onClick={() => setReply(comment.id)}
                  >
                    <span className="flex items-center justify-center h-full">
                      <BsReply className="me-2" />
                      <span>Reply</span>
                    </span>
                  </Button>
                </div>
              </div>
              <UploadedFileModal replyFilePreview={replyFilePreview} />
              {comment.replies.map((reply) => (
                <div
                  className="mt-3 me-3 mb-3 ps-3 flex justify-content-between"
                  key={reply?.id}
                  onMouseEnter={() =>
                    toggleDeleteButton(parent.id, reply.id, true)
                  }
                  onMouseLeave={() =>
                    toggleDeleteButton(parent.id, reply.id, false)
                  }
                >
                  <span className="flex position-relative">
                    <span className="nav-avatar rounded-circle align-self-start px-1 py-1  border-0 me-2">
                      UH
                    </span>
                    <div className="rounded-4 w-100 py-2 me-2 px-3 flex align-items-center flex-column reply ">
                      <p
                        className="m-0 fs_14 text-start w-100"
                        style={{ color: " #00854D" }}
                      >
                        usman{" "}
                      </p>

                      <>
                        {/* {reply.replyFile && (
                            <a
                              href="#"
                              onClick={handleFileClick}
                              style={{ color: "#0071d9" }}
                            >
                              {reply.fileData.name}
                            </a>
                          )} */}
                        {/* <ContentEditable
                              html={reply.replyText}
                              disabled={false}
                              tagName="p" // Use a div, p, or any other HTML element
                              className="m-0 text-start w-100"
                            /> */}
                        <p
                          className="m-0 text-start w-100"
                          dangerouslySetInnerHTML={{
                            __html: reply?.replyText,
                          }}
                        ></p>
                        {/* {reply.fileData.type.startsWith("image/") && (
                            <img
                              width={200}
                              src={reply.fileData.url}
                              alt="Selected GIF"
                              className="p-2"
                            />
                          )} */}
                        {/* {reply.fileData.type.startsWith("video/") && (
                            <video width={300} autoPlay controls>
                              <source
                                src={reply.fileData.url}
                                // type={reply.fileData.type}
                              />
                              Your browser does not support the video tag.
                            </video>
                          )} */}
                      </>
                      {/* )} */}
                    </div>
                    <div
                      style={{ width: "40px" }}
                      className="flex align-item-center"
                    >
                      {reply?.showDeleteButton && (
                        <div className="flex reply_btns ">
                          <Dropdown className="align-self-center">
                            <Dropdown.Toggle className="reply_actionBtn  ">
                              <BsThreeDots />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleEditClick(
                                    reply.id,
                                    reply.replyText,
                                    reply.replyGif
                                  )
                                }
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleReplyDelete(comment.id, reply.id)
                                }
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  </span>
                </div>
              ))}
              {reply == comment.id && (
                <div className="p-3">
                  <div className="flex position-relative">
                    <span className="nav-avatar rounded-circle align-self-start px-1 py-1  border-0 me-2">
                      UH
                    </span>

                    <div className="flex flex-column w-100 rounded border">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef} // You should define this ref
                        onChange={attachFile}
                      />
                      {/* {replyInput.replyGif && (
                          <img
                            src={replyInput.replyGif}
                            alt="Selected GIF"
                            className="p-2 w-50 "
                          />
                        )} */}
                      {/* {replyInput.replyFile && (
                          <a href="#" style={{ color: "#0071d9" }}>
                            {replyInput.replyFile.name}
                          </a>
                        )} */}

                      <ContentEditable
                        innerRef={contentEditable}
                        html={replyInput?.replyText || ""}
                        disabled={false}
                        onChange={handleReplyInputChange}
                        tagName="div" // Use a div, p, or any other HTML element
                        className="reply-input-editable py-1 border-0 shadow-none transparent_bg"
                        // style={{ height: "33px", overflow: "auto" }}
                      />
                    </div>
                  </div>
                  {/* <p className="m-0">
                            {replyInput.replyGif && (
                              <img
                                src={replyInput.replyGif}
                                alt="Selected GIF"
                                className="p-2 w-50 "
                              />
                            )}
                          </p>
                          <Form.Control
                            type="text"
                            onBlur={() => setReply(false)}
                            ref={replyInputRef}
                            value={replyInput.replyText}
                            onChange={handleReplyInputChange}
                            className="py-1 border-0 shadow-none  transparent_bg"
                            style={{ height: "33px" }}
                          /> */}
                  <div className="mt-2 ps-5 flex justify-content-between position-relative pickers_btns">
                    <span>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2"
                        onClick={() =>
                          fileInputRef.current && fileInputRef.current.click()
                        }
                      >
                        <span className="flex items-center">
                          <HiOutlinePaperClip className="me-2 " />
                          <span>Add Files</span>
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2"
                        onClick={() => toggleGifPicker(comment.id)}
                      >
                        GIF
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2 "
                        onClick={() => toggleEmojiPicker(comment.id)}
                      >
                        <span className="flex items-center">
                          <BsEmojiSmile className="me-2 " />
                          <span>Emoji</span>
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2"
                        onClick={() => {
                          setMentionMenuVisible(true),
                            setMentionSource("input");
                        }}
                      >
                        <span className="flex items-center">
                          <PiAt className="me-2 " />
                          Mention
                        </span>
                      </Button>
                    </span>
                    {isGifPickerVisible && (
                      <GifPicker
                        // ref={gifPickerRef}
                        // onBlur={handleGifBlur}
                        onGifSelected={handleGifSelected}
                      />
                    )}
                    {isEmojiPickerVisible && (
                      <div
                        className="position-absolute left-0"
                        style={{ top: "30px" }}
                      >
                        <Picker
                          data={data}
                          theme={"light"}
                          onEmojiSelect={(emoji) => handleEmojiClick(emoji)}
                        />
                      </div>
                    )}
                    <span>
                      {editingReplyId ? (
                        <>
                          <Button
                            type="button"
                            className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2 me-2"
                            style={{
                              backgroundColor: "#d32f2f",
                              fontSize: "14px",
                            }}
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="px-2 py-1 workspace_addBtn border-0"
                            style={{
                              backgroundColor: "#025231",
                              fontSize: "14px",
                            }}
                            onClick={() =>
                              handleSaveClick(comment.id, editingReplyId)
                            }
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          className=" px-2 py-1   workspace_addBtn   border-0"
                          style={{
                            backgroundColor: "#025231",
                            fontSize: "14px",
                          }}
                          onClick={() => handleReplyButtonClick(comment.id)}
                        >
                          Reply
                        </Button>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {commentsArray == "" ? (
            <div className=" text-center flex flex-column justify-content-center mt-5 mb-2">
              <h4>No updates yet for this item</h4>
              <p className="w-75 align-self-center ">
                Be the first one to update about progress, mention someone or
                upload files to share with your team members
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : pageView === 2 ? (
        <div>
          <div className="flex justify-content-between">
            <span className="flex gap-2">
              <div className="flex justify-content-center">
                <Button
                  type="button"
                  className=" border text-black"
                  style={{
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleButtonClick}
                >
                  <FiPlus className="me-2" />

                  <span>Add files</span>
                </Button>
              </div>
              <span className="flex position-relative align-items-center me-2 search_inputDiv w-50">
                <RxMagnifyingGlass className="position-absolute end-0 me-2" />
                <Form.Control
                  type="text"
                  placeholder="Search for files"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-1 shadow-none workspace_searchInput transparent_bg  "
                />
              </span>
            </span>
            <span>
              <Button
                className="p-2 workspace_menuBtn bgHover align-middle border"
                onClick={() => setFileView(true)}
              >
                <FiGrid />
              </Button>
              <Button
                className="p-2 me-1 workspace_menuBtn bgHover align-middle border"
                onClick={() => setFileView(false)}
              >
                <BsList />
              </Button>
              <Button
                className="p-2 workspace_menuBtn bgHover align-middle"
                onClick={downloadFilesAsZip}
              >
                <FiDownload />
              </Button>
            </span>
          </div>
          <FileUploader
            ref={childRef}
            // handleClose={handleClose}
            fileView={fileView}
            setFileView={setFileView}
            searchQuery={searchQuery}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default OffCanvas;
