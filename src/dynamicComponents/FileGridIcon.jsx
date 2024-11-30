import { AiOutlineFile } from "react-icons/ai";
import {
  FaFileCircleQuestion,
  FaFileExcel,
  FaFileWord,
  FaFileZipper,
} from "react-icons/fa6";

export const FileGridIcon = ({ file }) => {
  if (!file) {
    return null; // Return null if the file doesn't exist
  }
  const fileType = file.type;

  if (fileType.startsWith("image/")) {
    return (
      <img
        src={file.url}
        alt="Uploaded file"
        style={{ maxWidth: "100%", height: "100%" }}
        className="whInherit"
      />
    );
  } else if (fileType.startsWith("video/")) {
    return (
      <video
        autoPlay
        muted
        className="whInherit"
        style={{ maxWidth: "100%", height: "100%" }}
      >
        <source src={file.url} type={fileType} />
        Your browser does not support the video tag.
      </video>
    );
  } else if (
    fileType === "text/plain" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return (
      <span
        className="justify-content-center centerIt whInherit"
        style={{ backgroundColor: "#2368C4", color: "white" }}
      >
        <FaFileWord className="fs-1 text-white" />
      </span>
    );
  } else if (
    fileType === "application/vnd.ms-excel" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return (
      <span
        className="justify-content-center centerIt whInherit"
        style={{ backgroundColor: "#237F4C", color: "white" }}
      >
        <FaFileExcel className="fs-1 text-white" />
      </span>
    );
  } else if (fileType === "application/pdf") {
    return (
      <embed
        onClick={() => setModalShow({ modalActive: true, file })}
        src={file.url}
        type="application/pdf"
        className="whInherit"
        width="100%"
        height="100%"
        style={{
          height: "-webkit-fill-available",
        }}
      />

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
        className="justify-content-center centerIt whInherit"
        style={{ backgroundColor: "#FFCC00", color: "white" }}
      >
        <FaFileZipper className="fs-1 text-white" />

        {/* <GiZipper className="fs-1 " /> */}
      </span>
    );
  } else if (fileType === "") {
    return (
      <span
        className="justify-content-center centerIt whInherit"
        style={{ backgroundColor: "#5559DF", color: "white" }}
      >
        <FaFileCircleQuestion className="fs-1 text-white" />
      </span>
    );
  } else {
    return;
  }
};
