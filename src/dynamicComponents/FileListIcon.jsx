import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import {
  FaFileCircleQuestion,
  FaFileExcel,
  FaFileWord,
  FaFileZipper,
} from "react-icons/fa6";

export const FileListIcon = ({ file }) => {
  // console.log({ file });
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    return (
      <div style={{ width: "90px", height: "90px" }}>
        <img
          src={file.url}
          alt=""
          className="rounded-2"
          style={{ maxWidth: "100%", height: "100%" }}
        />
      </div>
    );
  } else if (fileType.startsWith("video/")) {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#A358DF" }}
      >
        {/* <img src={IMAGES.VIDEO} alt="Uploaded file" /> */}
        <FaVideo className="fs-3 text-white" />
      </span>
    );
  } else if (
    fileType === "text/plain" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#2368C4" }}
      >
        {/* <img src={IMAGES.WORD} alt="Uploaded file" /> */}
        <FaFileWord className="fs-3 text-white" />
      </span>
    );
  } else if (
    fileType === "application/vnd.ms-excel" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#237F4C" }}
      >
        {/* <img src={IMAGES.EXCEL} alt="Uploaded file" /> */}
        <FaFileExcel className="fs-3 text-white" />
      </span>
    );
  } else if (fileType === "application/pdf") {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#FA0F00" }}
      >
        {/* <img src={IMAGES.PDF} alt="Uploaded file" /> */}
        <BsFileEarmarkPdfFill className="fs-3 text-white" />
      </span>
    );
  } else if (
    fileType === "application/zip " ||
    "application/x-rar-compressed"
  ) {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#FFCC00" }}
      >
        {/* <img src={IMAGES.ZIP} alt="Uploaded file" /> */}
        <FaFileZipper className="fs-3 text-white" />
      </span>
    );
  } else if (fileType === "") {
    return (
      <span
        className="uploading_fileIcon_padding rounded-2 justify-content-center centerIt"
        style={{ backgroundColor: "#5559DF" }}
      >
        <FaFileCircleQuestion className="fs-3 text-white" />

        {/* <img src={IMAGES.UNKNOWN} alt="Uploaded file" /> */}
      </span>
    );
  } else {
    return;
  }
};
