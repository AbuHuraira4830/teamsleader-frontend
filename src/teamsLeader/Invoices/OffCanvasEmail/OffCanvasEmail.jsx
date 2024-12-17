import React, { useState, useRef, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import {
  AiOutlineClose,
  AiOutlinePaperClip,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import EmailInput from "./EmailInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import { FaRegFilePdf } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OffCanvasEmail = ({ show, handleClose, pdfUrl }) => {
  console.log("pdfUrlEnter", pdfUrl);
  const [editorContent, setEditorContent] = useState("");
  const [mentionMenuVisible, setMentionMenuVisible] = useState(false); // Mention menu visibility
  const [mentionSource, setMentionSource] = useState(null);

  const [toEmails, setToEmails] = useState([]);
  const [ccEmails, setCcEmails] = useState(["usmanshan2710@gmail.com"]);
  const [subject, setSubject] = useState(
    "Invoice 2024-002 from Inverex Solutions"
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [message, setMessage] = useState(`hello message here
`);
  const contentEditable = useRef(null); // Ref for ContentEditable component

  const quillRef = useRef(null); // Create a ref using useRef

  // Function to handle sending email (placeholder)

  // Function to handle deleting an email tag (placeholder)
  const handleDeleteTag = (setEmail) => {
    setEmail(""); // Clear the email for now
  };

  const emailInputClass =
    "flex items-center text-sm p-2 bg-gray-100 border border-gray-300 rounded-md";

  const applyFormat = (format) => {
    const quillEditor = quillRef.current.getEditor();
    const currentFormat = quillEditor.getFormat();
    quillEditor.format(format, !currentFormat[format]);
  };

  // Include only the formats you need
  const modules = {
    toolbar: {
      container: "#toolbar-bottom",
    },
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  const handleContentChange = (content) => {
    setEditorContent(content);
    if (content.endsWith("@")) {
      setMentionMenuVisible(true);
    } else {
      setMentionMenuVisible(false);
    }
    setMentionSource("editor");
  };
  const handleDownloadPdf = () => {
    fetch(`${pdfUrl}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a new URL for the blob object
        const downloadUrl = window.URL.createObjectURL(blob);

        // Create a link and set the URL and download attributes
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "invoice.pdf";

        // Append to the body, click it to trigger download and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // To release the object URL, call revokeObjectURL (optional, for memory management)
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((e) => {
        console.error("Error downloading PDF:", e);
      });
  };
  const handleSend = async () => {
    const emailData = {
      to: toEmails, // Assuming toEmails is an array of email addresses
      cc: ccEmails, // Assuming ccEmails is an array of email addresses
      subject: subject,
      message: message,
      pdfUrl: pdfUrl, // Ensure this is the URL to the PDF you intend to send
    };
    console.log(emailData);

    try {
      const response = await fetch("http://localhost:8888/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        setSnackbar({
          open: true,
          message: `Invoice Sent Successfuly`,
          severity: "success",
        });
      } else {
        const error = await response.text();
        setSnackbar({
          open: true,
          message: `Failed to send invoice. Please try again.`,
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbar({
        open: true,
        message: `Failed to send invoice. Please try again.`,
        severity: "error",
      });
    }
  };

  return (
    <div className={`relative ${show ? "block" : "hidden"}`}>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="w-50 "
      >
        <Offcanvas.Header className="bg-white border-b border-gray-200 px-5 py-3">
          <h5 className="text-lg font-semibold">Send Invoice</h5>
          <button
            onClick={handleClose}
            className="text-xl rounded-full text-gray-400 hover:bg-gray-100 p-2"
          >
            <AiOutlineClose />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-5 py-4 bg-white">
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="text-gray-700">To</span>

              <EmailInput
                emails={toEmails}
                setEmails={setToEmails}
                placeholder="To"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Cc</span>

              <EmailInput
                emails={ccEmails}
                setEmails={setCcEmails}
                placeholder="Cc"
              />
            </label>
            <label>
              <span className="text-gray-700">Subject</span>

              <input
                className="mt-1 p-2 w-full text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#00854d]  focus:ring-1 focus:ring-[#00854d]"
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              {/* className="p-2 w-full text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-36" */}
            </label>

            {/* Message */}
            <label className="block">
              <span className="text-gray-700">Message</span>

              <div className="mt-2">
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
                    // events: {
                    //   'image.uploaded': (e, editor, response) => {
                    //     response = JSON.parse(response);
                    //     const fileDetails = {
                    //       url: response.link,
                    //       name: response.name,
                    //       type: response.type,
                    //     };
                    //     setAttachedFiles(prevFiles => [...prevFiles, fileDetails]);
                    //   }
                    // }
                  }}
                  model={editorContent}
                  onModelChange={handleContentChange}
                />
              </div>
            </label>

            {/* =====================PDF Generated File====================== */}
            {pdfUrl && (
              <div className="flex justify-between items-center p-2 bg-white border border-gray-300 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FaRegFilePdf className="h-5 w-5  text-[#C74343]" />
                  <button
                    onClick={handleDownloadPdf}
                    className=" hover:underline focus:underline pl-2 text-[#aea3b8] text-xs"
                    type="button"
                  >
                    INVOICE.pdf
                  </button>
                </div>

                <button
                  // onClick={() => setPdfUrl("")}
                  className="hover:bg-gray-100 p-1 rounded-full"
                >
                  <IoMdClose className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            )}

            <div className="flex justify-end items-center pt-4">
              <button
                className="px-6 py-2 bg-[#00854d] hover:bg-[#006837] text-white font-semibold rounded-md"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OffCanvasEmail;
