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
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import IMAGES from "../../../../assets/images/Images";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClockCircle } from "react-icons/ai";
import FileUploader from "./FileUploader";
import { LuThumbsUp, LuTrash2 } from "react-icons/lu";
// import EmojiPicker from "emoji-picker-react";
import GifPicker from "./GifPicker";
import { v4 as uuidv4 } from "uuid";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RiGroup2Fill } from "react-icons/ri";
import { useStateContext } from "../../../../contexts/ContextProvider";
import ContentEditable from "react-contenteditable";
import UploadedFileModal from "./UploadedFileModal";
import { FaListUl } from "react-icons/fa6";
import JSZip from "jszip";
import { getAPI, postAPI } from "../../../../helpers/apis";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { Popover } from "antd";
const OffcanvasComponent = ({ show, handleClose }) => {
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
    uploadedFiles,
    commentsArray,
    setCommentsArray,
    selectedTask,
    repliesArray,
    setRepliesArray,
  } = useStateContext();
  const uniqueId = uuidv4();
  // const [mentionInput, setMentionInput] = useState("");
  const [mentionMenuVisible, setMentionMenuVisible] = useState(false); // Mention menu visibility
  const mentionMembers = ["Usman", "Ali"]; // Replace with your member list
  const [replyActionBtn, setReplyActionBtn] = useState("");
  const [open, setOpen] = useState(false);
  const [openGif, setOpenGif] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState({});

  // const handleMention = (mentionedMember) => {
  //   setMentionInput(""); // Clear the mention input
  //   setMentionMenuVisible(false);
  //   if (editorContent.includes("@")) {
  //     setEditorContent((prevContent) =>
  //       prevContent.replace(
  //         /@[^@]*$/,
  //         `<span class="mention-member" style="color: #0071d9;">@${mentionedMember}</span>&#xFEFF;&nbsp;&#xFEFF;`
  //       )
  //     );
  //   }
  // };
  // const handleMentionSelect = (mentionedMember) => {
  //   // For Froala editor
  //   if (editorContent.includes("@")) {
  //     setEditorContent((prevContent) =>
  //       prevContent.replace(
  //         /@[^@]*$/,
  //         `<span class="mention-member" style="color: #0071d9;">@${mentionedMember}</span>&#xFEFF;&nbsp;&#xFEFF;`
  //       )
  //     );
  //   }
  //   // For reply input
  //   if (replyInput.replyText.includes("@")) {
  //     setReplyInput({
  //       ...replyInput,
  //       replyText: replyInput.replyText.replace(
  //         /@[^@]*$/,
  //         `<span class="mention-member" style="color: #0071d9;">@${mentionedMember}</span>&#xFEFF;&nbsp;&#xFEFF;`
  //       ),
  //     });
  //   }

  //   setMentionMenuVisible(false);
  // };

  // const handleReplyInputChange = (event) => {
  //   const newText = event.target.value;
  //   setReplyInput({
  //     ...replyInput,
  //     replyText: newText,
  //   });
  //   if (newText.endsWith("@")) {
  //     setMentionMenuVisible(true);
  //   } else {
  //     setMentionMenuVisible(false);
  //   }
  // };
  useEffect(() => {
    const updateElapsedTime = () => {
      const updatedTimes = {};
      commentsArray.forEach((comment) => {
        updatedTimes[comment._id] = calculateTimeDifference(comment.updatedAt);
      });
      setTimeElapsed(updatedTimes);
    };

    updateElapsedTime();

    // Update every minute to reflect time changes
    const interval = setInterval(updateElapsedTime, 60000);

    return () => clearInterval(interval);
  }, [commentsArray]);
  const [mentionSource, setMentionSource] = useState(null);
  const handleContentChange = (content) => {
    setEditorContent(content);
    // if (content.endsWith("@")) {
    //   setMentionMenuVisible(true);
    // } else {
    //   setMentionMenuVisible(false);
    // }
    setMentionSource("editor");
  };
  const editorRef = useRef(null); // Ref for ContentEditable component
  const froalaRef = useRef(null);
  const handleReplyInputChange = (e) => {
    const inputValue = e.target.value;
    // Update the state when the content changes
    setReplyInput({
      ...replyInput,
      replyText: inputValue,
    });
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
  const attachFile = async (event) => {
    const file = event.target.files[0];
    const res = await getAPI("api/s3url");

    // Perform the upload
    await fetch(res.data.data.url, {
      method: "PUT",
      headers: {
        "Content-Type": file?.type,
      },
      body: file,
    });
    const URL = res.data.data.url.split("?")[0];
    if (URL) {
      const fileObject = {
        name: file.name,
        type: file.type,
        key: res.data.data.key,
        url: URL,
      };
      const uploadedImg = file.type.includes("image")
        ? `<br> <img
          
          src=${fileObject.url}
          alt="uploaded Img"
          class="p-2 "
        />`
        : file.type.includes("video")
        ? `<video width="100%" class="p-1 controls><source src=${fileObject.url} type=${file.type} /></video>`
        : "";
      setReplyInput({
        ...replyInput,
        replyText: replyInput.replyText + uploadedImg,
        // replyFile: file,
        // fileData: fileObject,
      });
    }
  };
  // const attachFile = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file, "hiiiiiiiiiiiii");
  //   if (file) {
  //     const fileURL = URL.createObjectURL(file);
  //     const fileId = uuidv4();
  //     const fileLinkHtml = `<a href="#" class="file-link-class" data-file-id="${fileId}">${file.name}</a>`;
  //     const uploadedImg = file.type.startsWith('image/')
  //       ? `<br> <img src= "${fileURL}" alt="${file.name}" class="p-2 w-100" />`
  //       : '';
  //     const fileObject = {
  //       name: file.name,
  //       type: file.type,
  //       size: file.size,
  //       lastModified: file.lastModified,
  //       lastModifiedDate: file.lastModifiedDate,
  //       url: fileURL,
  //       id: fileId
  //     };

  //     setReplyInput({
  //       ...replyInput,
  //       replyText: replyInput.replyText + fileLinkHtml + uploadedImg,
  //       replyFile: file,
  //       fileData: fileObject,
  //     });

  //     setAttachedFiles(prevFiles => [...prevFiles, fileObject]);

  //     const newComment = {
  //       content: replyInput.replyText + fileLinkHtml + uploadedImg,
  //       id: uniqueId,
  //       replies: [],
  //       fileData: fileObject
  //     };
  //     setCommentsArray([newComment, ...commentsArray]);

  //     console.log({ commentsArray });
  //   }
  // };

  useEffect(() => {
    const handleFileClick = (e) => {
      // Check if the clicked element is a file link
      if (e.target && e.target.matches(".file-link-class")) {
        e.preventDefault();

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
              // console.log(replyFilePreview, "{ lkjhgfdkjhg }");
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
  // const childRef = useRef(null);
  // const childRef = useRef(null);

  const [editorContent, setEditorContent] = useState("");
  // const handleUpdateButtonClick = () => {
  //   if (editorContent) {
  //     const newComment = {
  //       content: editorContent,
  //       id: uniqueId,
  //       replies: []
  //     };
  // console.log("newComment",newComment);
  //     setCommentsArray([newComment, ...commentsArray]);
  //     setEditorContent("");
  //     const blobUrls = editorContent.match(/blob:http:\/\/localhost:5173\/\w+/g);
  //     const fileDetails = attachedFiles.find(file => blobUrls && blobUrls.includes(file.url));
  //     console.log("File Details", commentsArray);
  //     console.log("File blobUrls", blobUrls);

  //   }
  // };

  const handleUpdateButtonClick = () => {
    const comment = { taskID: selectedTask, data: editorContent };
    if (editorContent) {
      postAPI("/api/comment/store", comment)
        .then((res) => {
          console.log(res);
          setCommentsArray(res.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });

      // const newComment = { content: editorContent, id: uniqueId, replies: [] };
      setEditorContent(""); // Clear the editor content
    }
  };

  // const handleParentButtonClick = () => {
  //   if (childRef.current) {
  //     childRef.current.fireClick();
  //   }
  // };

  const [commentLike, setCommentLike] = useState(false);
  const [reply, setReply] = useState("");
  // const [selectedReplyGif, setSelectedReplyGif] = useState("");
  const fileInputRef = useRef(null);
  // useEffect(() => {
  //   if (reply && replyInputRef.current) {
  //     replyInputRef.current.focus();
  //   }
  // }, [reply]);

  // const handleReplyInput = (event) => {
  //   const newText = event.target.value;
  //   setReplyInput({
  //     ...replyInput,
  //     replyText: newText,
  //   });
  // };

  const handleReplyButtonClick = (id) => {
    const { replyText, replyGif, fileData } = replyInput;
    const data = {
      taskID: selectedTask,
      commentID: id,
      replyText,
      replyGif,
      fileData,
    };
    postAPI("/api/reply/store", data)
      .then((res) => {
        console.log(res);
        setRepliesArray(res.data.replies);
      })
      .catch((err) => {
        console.log(err);
      });
    // comment.replies.push(replyInput);

    setReplyInput(defaultState);
  };

  const handleEmojiClick = (emojiObject) => {
    setReplyInput({
      ...replyInput,
      replyText: replyInput.replyText + emojiObject.native,
    });

    setOpen(false);
  };

  const [isGifPickerVisible, setIsGifPickerVisible] = useState(false);

  const toggleGifPicker = (id) => {
    commentsArray.map((comment) => {
      if (comment._id === id) setIsGifPickerVisible(!isGifPickerVisible);
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
      replyText: replyInput.replyText + selectedGif,
    });
    setIsGifPickerVisible(false);
  };

  const handleReplyDelete = (replyId) => {
    const data = {
      taskID: selectedTask,
      replyID: replyId,
    };
    postAPI("/api/reply/delete", data)
      .then((res) => {
        console.log(res);
        setRepliesArray(res.data.replies);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const gifPickerRef = useRef(null);
  // const handleGifBlur = () => {
  //   if (!gifPickerRef.current) {
  //     return;
  //   }
  //   setIsGifPickerVisible(false);

  // };

  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyEditValues, setReplyEditValues] = useState({
    replyText: "",
    replyGif: "",
  });
  const handleEditClick = (commentId, replyId, replyText) => {
    setEditingReplyId(replyId);
    // setReplyEditValues({ replyText, replyGif });
    setReply(commentId);
    // Set the reply input values

    setReplyInput({
      ...replyInput,
      id: replyId,
      replyText,
    });

    // setHtmlContent(replyText);
  };
  const handleSaveClick = () => {
    const data = {
      taskID: selectedTask,
      replyText: replyInput.replyText,
    };
    postAPI(`/api/reply/update/${editingReplyId}`, data)
      .then((res) => {
        console.log(res);
        setRepliesArray(res.data.replies);
      })
      .catch((err) => {
        console.log(err);
      });
    // setCommentsArray(newData);
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
    setSelectedFile({
      name: fileName,
      type: fileType,
      url: fileUrl,
    });
  };
  const fireClick = () => {
    document.getElementById("clickFire").click();
  };

  // const downloadFiles = async (urls) => {
  //   const zip = new JSZip();

  //   try {
  //     // Loop through the uploadedFiles and add each file to the zip
  //     for (const url of urls) {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error(`Failed to download file: ${url}`);
  //       }
  //       const blob = await response.blob();
  //       zip.file(url, blob);
  //     }

  //     // Generate the zip file asynchronously
  //     const content = await zip.generateAsync({ type: "blob" });

  //     // Save the zip file
  //     saveAs(content, "downloadedFiles.zip");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDownload = async () => {
    if (uploadedFiles.length === 0) {
      // alert("No files to download");
      return;
    }

    const keys = uploadedFiles.map((file) => file.key);
    await getAPI(`/api/download-multiple-files-s3?keys=${keys.join(",")}`)
      .then((res) => {
        // downloadFiles(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //   const keysQueryParam = encodeURIComponent(keys.join(","));

    //   try {
    //     const response = await fetch(`/api/download-multiple-files-s3?keys=${keysQueryParam}`, {
    //       method: 'GET',
    //       // Include headers if needed, e.g., for authentication
    //       // headers: {
    //       //   'Authorization': 'Bearer yourAuthToken',
    //       // },
    //     });

    //     // if (!response.ok) {
    //     //   throw new Error(Error: ${response.statusText});
    //     // }

    //     // const blob = await response.blob();
    //     const blob = new Blob([await response.arrayBuffer()], { type: 'application/zip' });
    //     const downloadUrl = window.URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.style.display = "none";
    //     a.href = downloadUrl;
    //     const contentDisposition = response.headers.get("Content-Disposition");
    //     const suggestedFilename = contentDisposition && /filename[^;=\n]=((['"]).?\2|[^;\n]*)/.exec(contentDisposition)[1];
    //     const fileName = suggestedFilename ? suggestedFilename.trim().replace(/"/g, '') : "download.zip";
    //     a.download = fileName;
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(downloadUrl);
    //     document.body.removeChild(a);
    //   } catch (error) {
    //     console.error("Error downloading file:", error);
    // }
  };
  //   useEffect(() => {
  //     // Function to fetch comments by taskID
  //     const fetchReplies = async () => {
  //       postAPI("/api/reply/store", data)
  //       .then((res) => {
  //         console.log(res);
  //         setRepliesArray(res.data.replies);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     };

  //     fetchReplies();
  // }, [selectedTask]);
  const handleCommentDelete = (id) => {
    const data = {
      taskID: selectedTask,
      commentID: id,
    };
    postAPI("/api/comment/delete", data)
      .then((res) => {
        console.log(res);
        setCommentsArray(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editComment = (id, data) => {
    setEditingCommentId(id);
    setIsCommentEditing(true);
    setEditorContent(data);
  };
  const clearEditor = () => {
    setEditingCommentId(null);
    setIsCommentEditing(false);
    setEditorContent("");
  };
  const updateComment = () => {
    const comment = {
      taskID: selectedTask,
      commentID: editingCommentId,
      data: editorContent,
    };
    postAPI("/api/comment/update", comment)
      .then((res) => {
        console.log(res);
        setCommentsArray(res.data.comments);
        clearEditor();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVideoUpload = async (files) => {
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
    return uploadedFileUrl;
  };
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="d-flex justify-content-between mb-4">
          <h5 className="mt-1 me-2">Item 1</h5>
          <span className="align-items-center flex">
            <RxAvatar className="fs-5" />
            <div className="vr ms-2 me-1 nav_splitter align-self-center pb-1"></div>
            <Button className=" px-1 fs-4 workspace_menuBtn bgHover align-middle">
              <BsThreeDots className=" fs-5 " />
            </Button>
          </span>
        </div>

        <div className=" main_tableBtnDiv mb-3 d-flex justify-content-between mb-4">
          <span className="d-flex">
            <span className={`${pageView === 1 ? "green_borderBottom" : ""}`}>
              <Button
                className="workspace-dropdown-button centerIt  text-start py-1  px-2"
                onClick={() => setPageView(1)}
              >
                <SlHome className="me-2 " />
                Updates
              </Button>
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
            <span className={`${pageView === 3 ? "green_borderBottom" : ""}`}>
              <Button
                className="workspace-dropdown-button  align-self-center  text-start py-1  px-2"
                onClick={() => setPageView(3)}
              >
                Activity Log
              </Button>
            </span>
            <div className="vr mx-1 nav_splitter align-self-center"></div>
          </span>
          <span>
            <Button className="p-2 workspace_menuBtn bgHover align-middle">
              <FiPlus />
            </Button>
          </span>
        </div>

        {pageView === 1 ? (
          <div>
            <div>
              <FroalaEditor
                ref={froalaRef}
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
                  events: {
                    "image.beforeUpload": function (files) {
                      handleVideoUpload(files)
                        .then((url) => {
                          this.html.insert(
                            `
                            <img src="${url}" style="width: 300px; display: block; vertical-align: top; margin: 5px auto; text-align: center;" class="fr-draggable">
                            
                            `
                          );
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                      return false;
                    },
                    "video.beforeUpload": function (files) {
                      handleVideoUpload(files)
                        .then((url) => {
                          this.html.insert(
                            `
                            <span contenteditable="false" draggable="true" class="fr-video fr-dvb fr-draggable fr-active">
                            <video src="${url}" style="width: 600px;" controls="" class="fr-draggable">Your browser does not support HTML5 video.</video>
                            </span>
                            
                            `
                          );
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                      return false;
                    },
                  },
                }}
                model={editorContent}
                onModelChange={handleContentChange}
              />
            </div>

            <div className="mt-2 d-flex justify-content-between">
              <span>
                <Button
                  className="workspace-dropdown-button workspace-dropdownBtn centerIt  text-start py-1  px-2"
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
                {isCommentEditing ? (
                  <>
                    <Button
                      type="button"
                      className="workspace-dropdown-button workspace-dropdownBtn align-self-center  text-start py-1  px-2 me-2"
                      style={{
                        backgroundColor: "#d32f2f",
                        fontSize: "14px",
                      }}
                      onClick={clearEditor}
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
                      onClick={updateComment}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    className=" px-2 py-1   workspace_addBtn   border-0"
                    style={{ backgroundColor: "#025231", fontSize: "14px" }}
                    onClick={handleUpdateButtonClick}
                  >
                    Update
                  </Button>
                )}
              </span>
            </div>
            {/* {mentionMenuVisible && (
            
            )} */}
            {commentsArray?.map((comment) => (
              <div
                className="border rounded-3 mt-3 comments "
                key={comment._id}
              >
                <div className="d-flex justify-content-between pt-3 px-3">
                  <span>
                    <span className="nav-avatar rounded-circle align-self-center px-1  border-0 me-2">
                      UH
                    </span>
                    Usman
                  </span>
                  <span className="d-flex align-items-center">
                    <AiOutlineClockCircle className="me-1" />{" "}
                    {timeElapsed[comment._id]}
                    <Dropdown className="align-self-center">
                      <Dropdown.Toggle
                        className="ms-1 px-2 py-2 workspace-dropdown-button"
                        style={{ fontSize: "14px" }}
                      >
                        <BsThreeDots />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="border-0">
                        <Dropdown.Item
                          className="centerIt "
                          onClick={() => editComment(comment._id, comment.data)}
                        >
                          <TbEdit className="fs-5 me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleCommentDelete(comment._id)}
                          className="centerIt"
                        >
                          <LuTrash2 className="fs-5 me-2" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </div>

                <div
                  className="fs_14 m-0 pt-4 pb-4 px-3"
                  dangerouslySetInnerHTML={{ __html: comment.data }}
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
                <div className="w-100 border-top border-bottom d-flex justify-content-evenly">
                  <div className="flex-fill p-1">
                    <Button
                      type="button"
                      className=" py-1 workspace-dropdown-button text-nowrap w-100  "
                      style={{ fontSize: "15px" }}
                      onClick={() => setCommentLike((current) => !current)}
                    >
                      {commentLike ? (
                        "👍"
                      ) : (
                        <span className="centerIt justify-content-center">
                          <LuThumbsUp className="me-2" /> Like
                        </span>
                      )}
                    </Button>
                  </div>
                  <div className="border-start flex-fill p-1 ">
                    <Button
                      type="button"
                      className="py-1 workspace-dropdown-button text-nowrap w-100 centerIt  justify-content-center"
                      style={{ fontSize: "15px" }}
                      onClick={() => setReply(comment._id)}
                    >
                      <BsReply className="me-2" />
                      Reply
                    </Button>
                  </div>
                </div>
                <UploadedFileModal replyFilePreview={replyFilePreview} />
                {repliesArray?.map((reply) => {
                  return (
                    reply.commentID === comment._id && (
                      <div
                        className="mt-3 me-3 mb-3 ps-3 d-flex justify-content-between"
                        key={reply._id}
                        onMouseEnter={() => setReplyActionBtn(reply._id)}
                        onMouseLeave={() => setReplyActionBtn("")}
                      >
                        <span className="d-flex position-relative">
                          <span className="nav-avatar rounded-circle align-self-start px-1 py-1  border-0 me-2">
                            UH
                          </span>
                          <div className="rounded-4 w-100 py-2 me-2 px-3 d-flex align-items-center flex-column reply ">
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
                                  __html: reply.replyText,
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
                            className="d-flex align-item-center"
                          >
                            {replyActionBtn === reply._id && (
                              <div className="d-flex reply_btns ">
                                <Dropdown className="align-self-center">
                                  <Dropdown.Toggle className="reply_actionBtn  ">
                                    <BsThreeDots />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="border-0">
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleEditClick(
                                          comment._id,
                                          reply._id,
                                          reply.replyText
                                        )
                                      }
                                      className="centerIt "
                                    >
                                      <TbEdit className="fs-5 me-2" />
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleReplyDelete(reply._id)
                                      }
                                      className="centerIt"
                                    >
                                      <LuTrash2 className="fs-5 me-2" />
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            )}
                          </div>
                        </span>
                      </div>
                    )
                  );
                })}
                <div className="p-3">
                  <div className="d-flex position-relative">
                    <span className="nav-avatar rounded-circle align-self-start px-1 py-1  border-0 me-2">
                      UH
                    </span>

                    <div className="d-flex flex-column w-100 rounded border">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef} // You should define this ref
                        onChange={attachFile}
                      />
                      {reply === comment._id ? (
                        <ContentEditable
                          innerRef={editorRef}
                          html={replyInput.replyText}
                          disabled={false}
                          onFocus={() => setReply(comment._id)}
                          onChange={handleReplyInputChange}
                          tagName="div" // Use a div, p, or any other HTML element
                          className="reply-input-editable py-1 border-0 shadow-none transparent_bg px-3"
                          // style={{ height: "33px", overflow: "auto" }}
                          placeholder="Write a reply..."
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          placeholder="Write a reply..."
                          className="reply-input-editable py-1 border-0 shadow-none transparent_bg"
                          style={{ height: "32px" }}
                          onClick={() => setReply(comment._id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 ps-5 d-flex justify-content-between position-relative pickers_btns">
                    {reply == comment._id && (
                      <span className="d-flex">
                        <Button
                          className="workspace-dropdown-button workspace-dropdownBtn centerIt  text-start py-1  px-2"
                          onClick={() =>
                            fileInputRef.current && fileInputRef.current.click()
                          }
                        >
                          <HiOutlinePaperClip className="me-2 " />
                          Add Files
                        </Button>

                        <Popover
                          content={
                            <GifPicker onGifSelected={handleGifSelected} setOpenGif={setOpenGif} />
                          }
                          open={openGif}
                          onOpenChange={(open) => setOpenGif(open)}
                          trigger="click"
                          placement="bottom"
                        >
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn centerIt  text-start py-1  px-2"
                            // onClick={() => toggleGifPicker(comment._id)}
                          >
                            GIF
                          </Button>
                        </Popover>
                        <Popover
                          content={
                            <Picker
                              data={data}
                              theme={"light"}
                              onEmojiSelect={(emoji) => handleEmojiClick(emoji)}
                            />
                          }
                          open={open}
                          onOpenChange={(open) => setOpen(open)}
                          trigger="click"
                          placement="bottom"
                        >
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn centerIt  text-start py-1  px-2"
                            // onClick={() => toggleEmojiPicker(comment._id)}
                          >
                            <BsEmojiSmile className="me-2 " />
                            Emoji
                          </Button>
                        </Popover>
                        <Popover
                          content={
                            <div className="mention-menu border rounded-3  d-flex flex-column p-3 ">
                              <p className="fw-bolder mb-2">People</p>
                              {mentionMembers.map((member) => (
                                <Button
                                  key={member}
                                  onClick={() => handleMentionSelect(member)}
                                  className="workspace-dropdown-button workspace-dropdownBtn centerIt text-start py-1 mb-2 px-2 "
                                >
                                  <span
                                    className="nav-avatar rounded-circle centerIt justify-content-center  border-0 me-2"
                                    style={{
                                      fontSize: "13px",
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  >
                                    UH
                                  </span>
                                  {member}
                                </Button>
                              ))}
                              <p className="fw-bolder mb-2">Teams</p>
                              <Button
                                onClick={() =>
                                  handleMentionSelect("Everyone in team")
                                }
                                className="workspace-dropdown-button workspace-dropdownBtn centerIt text-start py-1 mb-2 px-2 "
                              >
                                <RiGroup2Fill className="fs-3 me-2" />
                                Everyone in team
                              </Button>
                              <Button
                                onClick={() =>
                                  handleMentionSelect("Everyone on workspace")
                                }
                                className="workspace-dropdown-button workspace-dropdownBtn centerIt text-start py-1 mb-2 px-2 "
                              >
                                <RiGroup2Fill className="fs-3 me-2" />
                                Everyone on workspace
                              </Button>
                            </div>
                          }
                          open={mentionMenuVisible}
                          onOpenChange={(open) => setMentionMenuVisible(open)}
                          trigger="click"
                          placement="bottom"
                        >
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn centerIt  text-start py-1  px-2"
                            onClick={() => {
                              // setMentionMenuVisible(true),
                              setMentionSource("input");
                            }}
                          >
                            <PiAt className="me-2 " />
                            Mention
                          </Button>
                        </Popover>
                      </span>
                    )}
                    {/* {isGifPickerVisible && (
                      <GifPicker
                        onGifSelected={handleGifSelected}
                      />
                    )} */}
                    {/* {isEmojiPickerVisible && (
                        <div
                          className="position-absolute left-0"
                          style={{ top: "30px" }}
                        >
                          
                        </div>
                      )} */}
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
                            onClick={handleSaveClick}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        reply == comment._id && (
                          <Button
                            type="button"
                            className=" px-2 py-1   workspace_addBtn   border-0"
                            style={{
                              backgroundColor: "#025231",
                              fontSize: "14px",
                            }}
                            onClick={() => handleReplyButtonClick(comment._id)}
                          >
                            Reply
                          </Button>
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {commentsArray == "" ? (
              <div className=" text-center d-flex flex-column justify-content-center mt-5 mb-2">
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
            <div className="d-flex justify-content-between">
              <span className="flex">
                <Button
                  className="workspace-dropdown-button d-flex align-items-center border py-1 me-3 fs_14"
                  onClick={fireClick}
                >
                  <FiPlus className="me-2" /> Add files
                </Button>
                <span className="d-flex position-relative align-items-center me-2 search_inputDiv w-50">
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
              <span className="d-flex">
                <Button
                  className={`px-2 py-1 bgHover actionBtns btn_grid ${
                    fileView ? "activeBtn" : ""
                  }`}
                  onClick={() => setFileView(true)}
                >
                  <FiGrid />
                </Button>
                <Button
                  className={`px-2 py-1  bgHover actionBtns btn_list ${
                    !fileView ? "activeBtn" : ""
                  }`}
                  onClick={() => setFileView(false)}
                >
                  <FaListUl />
                </Button>
                <Button
                  className="p-2 ms-2 workspace_menuBtn bgHover align-middle"
                  onClick={handleDownload}
                >
                  <FiDownload />
                </Button>
              </span>
              {/* <span>
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
                <Button className="p-2 workspace_menuBtn bgHover align-middle">
                  <FiDownload />
                </Button>
              </span> */}
            </div>
            {/* <div>
                <p> Showing </p>
              </div> */}
            {/* <div className="justify-content-center  d-flex mt-5">
                <img src={IMAGES.BGIMG1} alt="" style={{ width: "290px" }} />
              </div> */}
            <FileUploader
              fireClick={fireClick}
              handleClose={handleClose}
              fileView={fileView}
              setFileView={setFileView}
              searchQuery={searchQuery}
            />
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center justify-content-between other_activityBg fs_14 py-3 px-4">
              <p className="m-0 ">Other activities</p>
              <span>
                <Button
                  type="button"
                  className=" px-3 py-1  simple-button primary_green  border-0"
                  style={{ fontSize: "14px", color: " #00854D" }}
                >
                  Integrations Activity
                </Button>
                <Button
                  type="button"
                  className=" px-3 py-1  simple-button   border-0"
                  style={{
                    fontSize: "14px",
                    color: "#00854d",
                  }}
                >
                  Automation Activity
                </Button>
              </span>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <span className="flex">
                <Button
                  type="button"
                  className="me-1 px-2 py-1 d-flex align-items-center  workspace_addBtn   border-0"
                  style={{ backgroundColor: "#025231", fontSize: "14px" }}
                >
                  Filter Log
                  <HiOutlineChevronDown className="ms-2" />
                </Button>
                <Button
                  type="button"
                  className=" px-2 py-1  workspace-dropdown-button   border-0"
                  style={{
                    fontSize: "14px",
                    color: "#00854d",
                  }}
                >
                  <RxAvatar className="me-2 mt-1" />
                  Person
                </Button>
              </span>
              <span>
                <Button className="p-1 me-1 workspace_menuBtn bgHover ">
                  <BiRefresh className="fs-4" />
                </Button>
                <Button className="p-1 workspace_menuBtn bgHover ">
                  <PiMicrosoftExcelLogoLight className="fs-5  " />
                </Button>
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center ps-3 pe-5 mt-4  fs_14">
              <span className="d-flex align-items-center">
                <AiOutlineClockCircle className="me-1" /> 6h
              </span>
              <span>
                <span className="nav-avatar rounded-circle align-self-center px-1 border-0 me-2">
                  UH
                </span>
                Item
              </span>
              <span className="d-flex align-items-center">
                <FiPlusCircle className=" me-1" /> Created
              </span>
              <span>
                Group: <span style={{ color: "#579BFC" }}>Group Title</span>
              </span>
            </div>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default OffcanvasComponent;

const calculateTimeDifference = (updatedAt) => {
  const currentTime = new Date();
  const updatedTime = new Date(updatedAt);
  const difference = currentTime - updatedTime;

  // Convert difference to appropriate format
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "Just now";
  }
};
