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
import { postAPI } from "../../../helpers/apis";
import { IoIosArrowBack } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Tooltip } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { uploadImagesAndCalculateRealTimePercentage } from "../../chats/script";
import { Button, notification } from "antd";
import DocInfoContainer from "./DocInfoContainer";
import { PiDotsSixVerticalBold } from "react-icons/pi";

const ckEditor = ({ doc }) => {
  const {
    showDocSidebar,
    setShowDocSidebar,
    selectedDocument,
    selectedWorkspace,
    setAllDocuments,
    isToggleFontFamily,
    isToggleFontSize,
    setIsToggleFontSize,
  } = useStateContext();
  const [shareModal, setShareModal] = useState(false);
  const [editorData, setEditorData] = useState(
    doc.data ? doc.data : "<h1><strong>My New Doc</strong></h1>"
  );
  const [headings, setHeadings] = useState([]);
  const [showHeadings, setShowHeadings] = useState(true);
  const editorRef = useRef(null);
  const dropAreaRef = useRef();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const [titleText, setTitleText] = useState(
    selectedDocument?.titleText || "New Doc"
  );
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

          if (headingText) {
            // Only include headings with non-empty text
            const headingId = `heading-${idCounter++}`;
            const headingLevel = parseInt(
              value.name.replace("heading", ""),
              10
            );

            headings.push({
              text: headingText,
              id: headingId,
              level: headingLevel,
            });
            writer.setAttribute("id", headingId, value);
          }
        }
      }
    });

    return headings;
  };

  const updateHeadings = () => {
    if (editorRef.current) {
      const newHeadings = getHeadings(editorRef.current);

      setHeadings(newHeadings);
    }
  };

  const handleOutlineClick = (id) => {
    const headingElement = document.querySelector(`#${id}`);
    const editorEditableDiv = document.querySelector(".ck-editor__editable");

    if (headingElement && editorEditableDiv) {
      const offsetTop =
        headingElement.getBoundingClientRect().top +
        editorEditableDiv.scrollTop -
        editorEditableDiv.getBoundingClientRect().top;

      editorEditableDiv.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
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
  const updateDoc = (data) => {
    postAPI("/api/doc/update", {
      workspaceID: selectedWorkspace._id,
      name: selectedDocument.name,
      docID: selectedDocument._id,
      data: data,
      shadow: selectedDocument.shadow,
      bgColor: selectedDocument.bgColor,
      width: selectedDocument.width,
      fontSize: selectedDocument.fontSize,
      fontFamily: selectedDocument.fontFamily,
      applyFontSizeToSelectedText: isToggleFontSize, // Add this line
      applyFontFamilyToSelectedText: isToggleFontFamily, // Add this line
      headers: {
        coverImage: selectedDocument.headers.coverImage || false,
        coverImageDetails: {
          url:
            selectedDocument.headers.coverImageDetails?.url ||
            uploadedFiles[0]?.url,
          name:
            selectedDocument.headers.coverImageDetails?.name ||
            uploadedFiles[0]?.name,
          size:
            selectedDocument.headers.coverImageDetails?.size ||
            uploadedFiles[0]?.size,
        },
        title: selectedDocument.headers.title || false,
        titleText: titleText,
        tableOfContent: selectedDocument.headers.tableOfContent || false,
        docInfo: selectedDocument.headers.docInfo || false,
      },
    })
      .then((res) => {
        setAllDocuments(res.data.workspace.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditorChange = (data) => {
    setEditorData(data);
    updateDoc(data);
  };

  const applyStyle = () => {
    const ckContent = document.querySelector(".ck-editor__editable");
    const ckEditorMain = document.querySelector(".ck-editor__main");

    if (ckContent) {
      // Apply styles to headings
      if (!isToggleFontFamily) {
        const headings = ckContent.querySelectorAll(
          "h1, h2, h3, p, span, strong, small,ol,ul,li,a"
        );
        headings.forEach((heading) => {
          heading.style.setProperty(
            "font-family",
            selectedDocument.fontFamily === "monospace"
              ? "'Space Mono', monospace"
              : selectedDocument.fontFamily === "'Source Serif 4', serif"
              ? "'Source Serif 4', serif"
              : ""
            // "important"
          );
        });
      }

      if (selectedDocument.width === "32px 170px 0px 170px") {
        // Create or select the mainDiv
        let mainDiv = ckContent.querySelector(".custom-main-div");
        if (!mainDiv) {
          mainDiv = document.createElement("div");
          mainDiv.className = "custom-main-div";
          mainDiv.style.width = "850px";
          mainDiv.style.margin = "0 auto";
          mainDiv.style.backgroundColor = selectedDocument.bgColor;
          mainDiv.style.padding = "20px"; // Optional padding for spacing
          mainDiv.style.boxSizing = "border-box"; // Ensure padding doesn't affect width
          mainDiv.style.borderRadius = "10px";
          mainDiv.style.boxShadow = "rgb(209 202 202 / 20%) 0px 2px 8px 5px";

          // Move all child elements of ckContent into mainDiv
          while (ckContent.firstChild) {
            mainDiv.appendChild(ckContent.firstChild);
          }

          // Append the mainDiv back into ckContent
          ckContent.appendChild(mainDiv);
        }

        // Set the background color of ckContent to white
        ckContent.style.backgroundColor = "white";
      } else {
        ckContent.style.backgroundColor = selectedDocument.bgColor;
      }

      if (editorRef.current) {
        const editor = editorRef.current;
        editor.editing.view.change((writer) => {
          const editableElement = editor.editing.view.document.getRoot();
          writer.setStyle(
            "background-color",
            selectedDocument.width === "32px 170px 0px 170px"
              ? "white"
              : selectedDocument.bgColor,
            editableElement
          );
        });
      }
    }

    if (ckEditorMain) {
      ckEditorMain.style.fontSize = selectedDocument.fontSize;
      ckEditorMain.style.padding = selectedDocument.width;
      ckEditorMain.style.backgroundColor =
        selectedDocument.width === "32px 170px 0px 170px"
          ? "white"
          : selectedDocument.bgColor;
      ckContent.style.backgroundColor =
        selectedDocument.width === "32px 170px 0px 170px"
          ? "white"
          : selectedDocument.bgColor;
    }
  };

  useEffect(() => {
    applyStyle();
  }, [selectedDocument]);
  const [isMonospace, setIsMonospace] = useState(false);
  const [bannerImage, setBannerImage] = useState();

  const [api, contextHolder] = notification.useNotification();
  const notificationKey = "uploadNotification"; // Unique key for the notification

  const openNotification = () => {
    api.open({
      key: notificationKey,
      message: "Uploading 1 file",
      description: `Upload Progress: ${uploadingProgress}%`,
      duration: 0, // Keep the notification open indefinitely
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    if (uploadingProgress > 0 && uploadingProgress < 100) {
      // Close the previous notification and open a new one with the updated progress
      api.destroy(notificationKey);
      openNotification();
    }
    if (uploadingProgress === 100) {
      // Close the notification when upload is complete
      api.destroy(notificationKey);
      api.success({
        message: "Uploaded 1 file",
        description: `The banner image was successfully uploaded.`,
        placement: "bottomRight",
      });
    }
  }, [uploadingProgress]); // Re-run this effect when uploadingProgress changes
  useEffect(() => {
    if (uploadingProgress === 100) {
      updateDoc();
    }
  }, [uploadedFiles]);
  const [toastId, setToastId] = useState(null);
  useEffect(() => {
    if (uploadingProgress === 100 && toastId) {
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    }
  }, [uploadingProgress, toastId]);
  const handleFileChange = (e) => {
    const newFilesArray = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...newFilesArray]);
    // success();

    // Initialize formData for multiple files
    const formData = new FormData();

    newFilesArray.forEach((file, index) => {
      formData.append(`fileBase64[${index}]`, file);
    });

    uploadImagesAndCalculateRealTimePercentage(
      formData,
      uploadingProgress,
      setUploadingProgress,
      setSelectedFiles,
      setUploadedFiles
    );

    openNotification(); // Open the notification when upload starts

    const interval = setInterval(() => {
      setUploadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop when progress reaches 100%
          return prevProgress;
        }
        return prevProgress + 10; // Increment the progress by 10 for demonstration
      });
    }, 1000); // Update progress every second (simulated)
  };
  const calculateMarginTop = ({ title, coverImage, docInfo }) => {
    let marginTop = 50; // Default value when none are true

    if (title) marginTop += 70; // 50px base + 70px for title
    if (coverImage) marginTop += 284; // Add 284px for coverImage
    if (docInfo) marginTop += 100; // Add 100px for docInfo
    return `${marginTop}px`;
  };
  useEffect(() => {
    const dropArea = dropAreaRef.current;

    let draggedElement = null; // Track the dragged element
    let initialY = 0; // Initial Y position of the dragged element

    // Function to start dragging
    // const handleDragStart = (event, element) => {
    //   draggedElement = element; // Save the reference to the dragged element
    //   initialY = event.clientY; // Store the initial Y position
    //   event.dataTransfer.effectAllowed = "move"; // Set the effect to "move"
    //   element.classList.add("dragging"); // Add visual feedback (optional)
    // };

    // Function to handle the drag event
    const handleDrag = (event) => {
      if (!draggedElement) return;

      // Calculate how far the element has been dragged
      const deltaY = event.clientY - initialY;
      initialY = event.clientY; // Update the Y position

      // Move the element by updating its transform property
      draggedElement.style.transform = `translateY(${deltaY}px)`;

      // Find the corresponding icon and move it with the element
      const icon = document.querySelector(".icon-class");
      if (icon) {
        icon.style.transform = `translateY(${deltaY}px)`; // Move the icon as well
      }
    };

    // Function to handle the end of the drag event
    const handleDragEnd = (event) => {
      if (draggedElement) {
        draggedElement.style.transform = ""; // Reset the transform property
        draggedElement.classList.remove("dragging"); // Remove visual feedback (optional)
      }

      draggedElement = null; // Clear the dragged element reference
      initialY = 0; // Reset Y tracking
    };

    // Add drag event listeners to the drop area
    dropArea.addEventListener("dragover", (event) => {
      event.preventDefault(); // Allow the drop
      dropArea.classList.add("drag-over"); // Add visual feedback (optional)
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("drag-over"); // Remove visual feedback (optional)
    });

    dropArea.addEventListener("drop", (event) => {
      event.preventDefault();
      dropArea.classList.remove("drag-over"); // Remove visual feedback (optional)

      // Handle the final placement of the dragged element
      const draggedElementId = event.dataTransfer.getData("text/plain");
      const element = document.getElementById(draggedElementId);
      if (element) {
        dropArea.appendChild(element); // Append the element to its new location
      }
    });

    // Cleanup the event listeners on unmount
    return () => {
      dropArea.removeEventListener("dragover", handleDrag);
      dropArea.removeEventListener("dragleave", handleDrag);
      dropArea.removeEventListener("drop", handleDragEnd);
    };
  }, []);

  const [hoveredElement, setHoveredElement] = useState(null);
  console.log({ hoveredElement });
  const updateHoverEffect = (editor) => {
    const editableElement = editor.editing.view.getDomRoot();

    const handleMouseMove = (event) => {
      const target = event.target;

      if (
        [
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "P",
          "IMG",
          "SPAN",
          "STRONG",
        ].includes(target.tagName)
      ) {
        const rect = target.getBoundingClientRect();

        // Check if mouse is within the element or within 50px to the left of it
        if (
          event.clientX >= rect.left - 50 &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          setHoveredElement(target); // Set the hovered element if within 50px to the left
        } else {
          setHoveredElement(null); // Clear the hover effect when outside the hover zone
        }
      }
    };

    if (editableElement) {
      editableElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (editableElement) {
        editableElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  };

  return (
    <div className="docCreator h-full flex flex-col">
      <style jsx>
        {`
          .ck-editor__top {
            height: 50px !important;
            display: flex !important;
            align-items: center !important;
            position: fixed !important;
          }
          .ck-sticky-panel__content {
            border: 0 !important;
          }
          .ck-editor {
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .ck-editor__main {
            padding: 0px !important;
            padding-left: ${showHeadings ? "220px" : "100px"} !important;
            margin-top: ${calculateMarginTop({
              title: selectedDocument?.headers?.title,
              coverImage: selectedDocument?.headers?.coverImage,
              docInfo: selectedDocument?.headers?.docInfo,
            })};

            height: 100% !important;
            transition: padding-left 0.3s ease-in-out;
          }
          .ck-editor__editable {
            height: calc(100% - 70px) !important;
            padding-top: 50px !important;
            border: 0 !important;
            overflow-y: auto !important; /* Ensure it can scroll */
            // padding-left: 100px !important;
            // padding-right: 100px !important;
          }
          .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
            box-shadow: none !important;
          }
          .ck.ck-editor__editable {
            scrollbar-width: thin;
            scrollbar-color: #c2c2c2 #f9f9f9;
          }
          .ck.ck-editor__editable::-webkit-scrollbar {
            width: 8px !important;
          }

          .document-outline-container {
            position: absolute;
            top: 90px;
            width: ${showHeadings ? "220px" : "50px"}; /* Adjust width */
            transition: width 0.5s ease-in-out; /* Smooth transition for width */
            opacity: ${showHeadings ? "1" : "0"}; /* Fade in/out effect */
            transition: opacity 0.5s ease-in-out, width 0.5s ease-in-out; /* Transition for opacity and width */
          }
          .ck-content ul,
          .ck-content ol {
            margin-left: 20px !important;
          }
          .drag-over {
            background-color: #f0f0f0; // Highlight the drop area
            border-color: #66afe9; // Change border color on hover
          }
        `}
      </style>
      <div ref={dropAreaRef}>
        <CKEditor
          ref={editorRef}
          editor={ClassicEditor}
          config={{
            toolbar: {
              container: "#toolbar-container",
            },
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
            updateHoverEffect(editor); // Ensure hover effect is set after editor is ready
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            applyStyle();
            handleEditorChange(data);
          }}
          onFocus={applyStyle}
        />

        {/* Conditionally render the hover icon before the hovered element */}
        {hoveredElement && (
          <Tooltip title="Drag to reorder">
            <div
              // draggable="true"
              // onDragStart={(e) => handleDragStart(e, hoveredElement)} // Start dragging the element
              // onDrag={(e) => handleDrag(e)} // Update position during drag
              // onDragEnd={(e) => handleDragEnd(e)} // Handle drop/end of drag
              style={{
                position: "absolute", // Ensure the icon is absolutely positioned
                left: `200px`, // Position to the left of the element
                top: `${
                  hoveredElement.getBoundingClientRect().top +
                  window.scrollY -
                  43
                }px`,
                display: "flex",
                alignItems: "center",
                color: "black",
                cursor: "grab", // Make the cursor indicate draggable behavior
              }}
            >
              <PiDotsSixVerticalBold
                className="font-bold text-xl"
                fontSize="large"
                style={{
                  cursor: "grab", // Set cursor for drag interaction
                }}
              />
            </div>
          </Tooltip>
        )}
      </div>

      {selectedDocument?.headers?.tableOfContent && (
        <Tooltip
          title={showHeadings ? "Hide Doc's Outline" : "Show Doc's Outline"}
        >
          <button
            onClick={() => setShowHeadings(!showHeadings)}
            className="mb-4 ml-4"
            style={{
              position: "absolute",
              top:
                selectedDocument?.headers?.title &&
                selectedDocument?.headers?.coverImage &&
                selectedDocument?.headers?.docInfo
                  ? "360px" // title, coverImage, and docInfo are all true
                  : selectedDocument?.headers?.title &&
                    selectedDocument?.headers?.coverImage &&
                    !selectedDocument?.headers?.docInfo
                  ? "360px" // title and coverImage are true, but docInfo is false
                  : selectedDocument?.headers?.title &&
                    !selectedDocument?.headers?.coverImage &&
                    selectedDocument?.headers?.docInfo
                  ? "90px" // title and docInfo are true, but coverImage is false
                  : !selectedDocument?.headers?.title &&
                    selectedDocument?.headers?.coverImage &&
                    selectedDocument?.headers?.docInfo
                  ? "360px" // coverImage and docInfo are true, but title is false
                  : selectedDocument?.headers?.title &&
                    !selectedDocument?.headers?.coverImage &&
                    !selectedDocument?.headers?.docInfo
                  ? "120px" // only title is true
                  : !selectedDocument?.headers?.title &&
                    selectedDocument?.headers?.coverImage &&
                    !selectedDocument?.headers?.docInfo
                  ? "360px" // only coverImage is true
                  : !selectedDocument?.headers?.title &&
                    !selectedDocument?.headers?.coverImage &&
                    selectedDocument?.headers?.docInfo
                  ? "90px" // only docInfo is true
                  : "90px", // none of title, coverImage, or docInfo are true
              zIndex: "1",
            }}
          >
            {showHeadings ? (
              <IoIosArrowBack className="text-xl" />
            ) : (
              <RxHamburgerMenu className="text-xl" />
            )}
          </button>
        </Tooltip>
      )}
      {selectedDocument?.headers?.coverImage && (
        <div
          className="relative h-[300px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              selectedDocument?.headers?.coverImageDetails?.url ||
              uploadedFiles?.length > 0
                ? "none"
                : `url("https://microfrontends.monday.com/Docs/latest/static/media/CoverPhotoDocHan.fcb218f6.png")`,
            position: "absolute",
            top: "50px",
          }}
        >
          {selectedDocument?.headers?.coverImageDetails?.url ||
          uploadedFiles?.length > 0 ? (
            // If a file is uploaded, display it
            <div className="relative group h-full w-full">
              <img
                src={
                  selectedDocument?.headers?.coverImageDetails?.url ||
                  uploadedFiles[0]?.url
                }
                alt="Banner"
                className="w-full h-full object-cover"
              />

              {/* Overlay with upload button on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300">
                <input
                  id="fileInputBanner"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  className="w-44 h-10 bg-gray-100 text-black cursor-pointer py-2 px-4 rounded z-20" // Ensure it's visible on top
                  onClick={() =>
                    document.getElementById("fileInputBanner").click()
                  }
                >
                  Change Banner
                </button>
              </div>
            </div>
          ) : (
            // If no file is uploaded, show the Upload Banner button
            <>
              <input
                id="fileInputBanner"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                className="absolute w-44 h-10 inset-0 m-auto bg-gray-100 text-black cursor-pointer py-2 px-4 rounded"
                onClick={() =>
                  document.getElementById("fileInputBanner").click()
                }
              >
                Upload Banner
              </button>
            </>
          )}
        </div>
      )}
      {selectedDocument?.headers?.title && (
        <div
          className={`absolute w-full h-20 flex items-center justify-center`}
          style={{
            top: selectedDocument?.headers?.coverImage ? "350px" : "50px",
            background: selectedDocument.bgColor,
            paddingLeft: showHeadings ? "180px" : "100px",
          }}
        >
          <input
            type="text"
            className="w-full mx-5  h-3/4 px-2 outline-none  rounded-lg hover:border hover:border-gray-200 font-bold text-4xl"
            value={selectedDocument?.headers?.titleText || titleText}
            onChange={(e) => {
              setTitleText(e.target.value);
              updateDoc();
            }}
            style={{
              background: selectedDocument.bgColor,
            }}
            id="title-container"
            // onBlur={() => {
            //   // Set background to transparent when input loses focus
            //   document.getElementById("title-container").style.background =
            //     selectedDocument.bgColor;
            // }}
            // onFocus={() => {
            //   // Set background back to the document's background color when focusing again
            //   document.getElementById("title-container").style.background =
            //     "white";
            // }}
          />
        </div>
      )}
      {selectedDocument?.headers?.docInfo && (
        <DocInfoContainer
          showHeadings={showHeadings}
          backgroundColor={selectedDocument?.bgColor}
          createdDate={selectedDocument.createdAt}
          updatedDate={selectedDocument.updatedAt}
          owner={selectedDocument.ownerDetails}
          headersObj={selectedDocument?.headers}
        />
      )}

      <div
        className={`document-outline-container px-4 mt-2 ${
          showHeadings ? "w-48" : "w-10"
        }`}
        style={{
          position: "absolute",
          top: selectedDocument?.headers?.coverImage ? "380px" : "120px",
        }}
      >
        {contextHolder}

        {selectedDocument?.headers?.tableOfContent && showHeadings && (
          <ul>
            {headings.map((heading, index) => (
              <li key={index} className="mb-3 mr-2 text-left truncate">
                {heading.text.length > 15 ? (
                  <Tooltip title={heading.text}>
                    <button
                      onClick={() => handleOutlineClick(heading.id)}
                      className={`text-left ${
                        heading.level === 1
                          ? "text-[#3c4043]"
                          : heading.level === 2
                          ? "text-[#444746] pl-5"
                          : "text-[#444746] pl-10"
                      }`}
                    >
                      {heading.text.slice(0, 15)}...
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    onClick={() => handleOutlineClick(heading.id)}
                    className={`text-left ${
                      heading.level === 1
                        ? "text-[#3c4043]"
                        : heading.level === 2
                        ? "text-[#444746] pl-5"
                        : "text-[#444746] pl-10"
                    }`}
                  >
                    {heading.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <DocSidebar
        onClose={onClose}
        sidebar={showDocSidebar}
        doc={doc}
        applyStyle={applyStyle}
        headersImageURL={uploadedFiles[0]}
      />
      <ShareModal handleClose={hideModal} show={shareModal} />
      <ToastContainer />
    </div>
  );
};

export default ckEditor;
