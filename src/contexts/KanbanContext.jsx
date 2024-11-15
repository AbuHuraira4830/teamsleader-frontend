import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../assets/images/Images";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import VideoFileOutlinedIcon from "@mui/icons-material/VideoFileOutlined";
// import cloudinary from "cloudinary";

// const initialData = {
//   tasks: {
//     "task-1": {
//       id: "task-1",
//       title: "Task 1",
//       peopleId: "people-111",
//       note: "something",
//       budget: "23",
//       files:[]
//     },
//   },
//   columns: {
//     "column-1": {
//       id: "column-1",
//       title: "No Started",
//       taskIds: ["task-1"],
//       backgroundColor: "lightgray",
//     },
//   },
//   columnOrder: ["column-1"],
// };
export const plainOptions = [
  "Due Date",
  "Timeline",
  "Owner",
  "List",
  "Status",
  "Notes",
  "Budget",
  "Files",
];

export const defaultCheckedList = ["Due Date"];


// cloudinary.config({
//   cloud_name: "dlse7qi1k",
//   api_key: "962245691256958",
//   api_secret: "HwJ0_FkShdkfRddLYeY7TLr8GBg",
// });

// const uploadToCloudinary = async (file) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       { public_id: `your_desired_public_id_${Date.now()}` },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary:", error);
//           reject(error);
//         } else {
//           console.log("Upload successful:", result);
//           resolve(result);
//         }
//       }
//     );
//   });
// };


const StateContext = createContext();
export const KanbanContext = ({ children }) => {
   const [modalShow, setModalShow] = React.useState({
     modalActive: false,
     file: {},
   });
   const renderFileIcon = (file) => {
     if (!file) {
       return "";
     }
     console.log({ tesdt: file });
     const fileType = file.type;

     if (fileType.startsWith("image/")) {
       return (
         <img src={file.url} alt="Uploaded file" className="w-full h-full" />
       );
     } else if (fileType.startsWith("video/")) {
       return (
         <video autoPlay style={{ height: "inherit" }}>
           <source src={file.url} type={fileType} />
           Your browser does not support the video tag.
         </video>
         // <VideoFileOutlinedIcon />
       );
     } else if (
       fileType === "text/plain" ||
       fileType ===
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
       fileType === "application/msword"
     ) {
       return (
         <span
           className="justify-content-center centerIt"
           style={{ backgroundColor: "#2368C4", color: "white" }}
         >
           W
         </span>
       );
     } else if (
       fileType === "application/vnd.ms-excel" ||
       fileType ===
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     ) {
       return (
         <span
           className="justify-content-center centerIt"
           style={{ backgroundColor: "#237F4C", color: "white" }}
         >
           X
         </span>
       );
     } else if (fileType === "application/pdf") {
       return (
         // <embed
         //   onClick={() => setModalShow({ modalActive: true, file })}
         //   src={file.url}
         //   type="application/pdf"
         //   width="100%"
         //   height="100%"
         //   style={{
         //     height: "-webkit-fill-available",
         //   }}
         // />
         <span
           onClick={() => setModalShow({ modalActive: true, file })}
           className="justify-content-center centerIt text-white text-[10px]"
           style={{ backgroundColor: "#FA0F00" }}
         >
           PDF
         </span>
         // <DocViewer
         //   className="mx-4"
         //   pluginRenderers={DocViewerRenderers}
         //   documents={documents}
         // />
       );
     } else if (
       fileType === "application/zip " ||
       "application/x-rar-compressed"
     ) {
       const documents = [{ uri: file.url }];
       return (
         <span
           className="justify-content-center centerIt"
           style={{ backgroundColor: "#FFCC00", color: "white" }}
         >
           ZIP
           {/* <GiZipper className="fs-1 " /> */}
         </span>
       );
     } else {
       return (
         <span
           className="justify-content-center centerIt"
           style={{ backgroundColor: "#5559DF", color: "white" }}
         >
           <AiOutlineFile className="fs-1 " />
         </span>
       );
     }
   };
   const FileAltIcons = (file) => {
     const fileType = file?.type;

     if (fileType?.startsWith("image/")) {
       return <img src={IMAGES.IMAGE} alt="Uploaded file" />;
     } else if (fileType?.startsWith("video/")) {
       return <img src={IMAGES.VIDEO} alt="Uploaded file" />;
     } else if (
       fileType === "text/plain" ||
       fileType ===
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
       fileType === "application/msword"
     ) {
       return <img src={IMAGES.WORD} alt="Uploaded file" />;
     } else if (
       fileType === "application/vnd.ms-excel" ||
       fileType ===
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     ) {
       return <img src={IMAGES.EXCEL} alt="Uploaded file" />;
     } else if (fileType === "application/pdf") {
       return <img src={IMAGES.PDF} alt="Uploaded file" />;
     } else if (
       fileType === "application/zip " ||
       "application/x-rar-compressed"
     ) {
       return <img src={IMAGES.ZIP} alt="Uploaded file" />;
     }
     // else {
     //   return <img src={IMAGES.UNKNOWN} alt="Uploaded file" />;
     // }
   };
  const [data, setData] = useState({
    tasks: new Map(),
    columns: new Map(),
    columnOrder: [],
  });
  const [isStatusPopover, setIsStatusPopover] = useState(false);
  const [isStatusPopoverAnchorEl, setIsStatusPopoverAnchorEl] = useState(false);

  // edit project's single task
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [openTaskId, setOpenTaskId] = useState("");
  const [openColumn, setOpenColumn] = useState("");
  const [isEditData, setIsEditData] = useState(false);
  const [isDataGet, setIsDataGet] = useState(false);
  // in edit task modal
  const [editorContent, setEditorContent] = useState("");
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  // for file upload
  const breakpoint = [
    true,
    "sm-down",
    "md-down",
    "lg-down",
    "xl-down",
    "xxl-down",
  ];
  const [fullscreen, setFullscreen] = useState(true);
  const [fileView, setFileView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [currentlyUploadedFiles, setCurrentlyUploadedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
 
  const uniqueId = uuidv4();

  const defaultState = {
    replyText: "",
    replyGif: "",
    fileData: {},
    id: uniqueId,
  };
  const [replyInput, setReplyInput] = useState(defaultState);
  const [replyFilePreview, setReplyFilePreview] = useState({
    replyModalActive: false,
  });
  const [isTriggerFiles, setIsTriggerFiles] = useState(false)
   const [currentItemIndex, setCurrentItemIndex] = useState(0)
  return (
    <StateContext.Provider
      value={{
        data,
        setData,
        isStatusPopover,
        setIsStatusPopover,
        isStatusPopoverAnchorEl,
        setIsStatusPopoverAnchorEl,
        isEditTaskModalOpen,
        setIsEditTaskModalOpen,
        openTaskId,
        setOpenTaskId,
        isEditData,
        setIsEditData,
        openColumn,
        setOpenColumn,
        isDataGet,
        setIsDataGet,
        editorContent,
        setEditorContent,
        checkedList,
        setCheckedList,
        fileView,
        setFileView,
        searchQuery,
        setSearchQuery,
        uploading,
        setUploading,
        uploadCount,
        setUploadCount,
        currentlyUploadedFiles,
        setCurrentlyUploadedFiles,
        uploadedFiles,
        setUploadedFiles,
        modalShow,
        setModalShow,
        breakpoint,
        fullscreen,
        setFullscreen,
        renderFileIcon,
        replyFilePreview,
        setReplyFilePreview,
        replyInput,
        setReplyInput,
        FileAltIcons,
        isTriggerFiles,
        setIsTriggerFiles,
        currentItemIndex,
        setCurrentItemIndex,
        // uploadToCloudinary,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useKanbanContext = () => useContext(StateContext);
