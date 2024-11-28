import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  createDropdown,
  addListToDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
// import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import { renderToStaticMarkup } from "react-dom/server";
import { View, ButtonView, InputTextView } from "@ckeditor/ckeditor5-ui";

// // Import icons from react-icons
// import {
//   BsTextParagraph,
//   BsTypeH1,
//   BsTypeH2,
//   BsTypeH3,
//   BsListUl,
//   BsCheckSquare,
//   BsTable,
//   BsImage,
//   BsCameraVideo,
// } from "react-icons/bs";
// import { PiTextTBold } from "react-icons/pi";
import {
  BsThreeDots,
  BsThreeDotsVertical,
  BsFileEarmarkText,
  BsListOl,
  BsQuote,
  BsCode,
} from "react-icons/bs";

import {
  BsBorderAll,
  BsFillPlusSquareFill,
  BsFillDashSquareFill,
} from "react-icons/bs";
import { ToolbarView } from "@ckeditor/ckeditor5-ui";

// Create a custom table dropdown
export function CustomTableDropdown(editor) {
  editor.ui.componentFactory.add("tableDropdown", (locale) => {
    const dropdownView = createDropdown(locale);

    dropdownView.buttonView.set({
      label: "Table",
      tooltip: true,
      withText: true,
    });

    const buttonOptions = [
      {
        label: "Insert Row Above",
        command: "tableInsertRowAbove",
        icon: <BsFillPlusSquareFill style={{ fontSize: "10px" }} />,
      },
      {
        label: "Insert Row Below",
        command: "tableInsertRowBelow",
        icon: <BsFillDashSquareFill style={{ fontSize: "10px" }} />,
      },
      {
        label: "Insert Column Left",
        command: "tableInsertColumnLeft",
        icon: <BsFillPlusSquareFill style={{ fontSize: "10px" }} />,
      },
      {
        label: "Insert Column Right",
        command: "tableInsertColumnRight",
        icon: <BsFillDashSquareFill style={{ fontSize: "10px" }} />,
      },
      {
        label: "Delete Table",
        command: "deleteTable",
        icon: <BsBorderAll style={{ fontSize: "10px" }} />,
      },
    ];

    const items = new Collection();

    buttonOptions.forEach((option) => {
      items.add({
        type: "button",
        model: new Model({
          withText: true,
          label: option.label,
          command: option.command,
          icon: renderToStaticMarkup(option.icon),
        }),
      });
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const { command } = eventInfo.source;
      if (command) {
        editor.execute(command);
      }
    });

    return dropdownView;
  });
}

// // Main dropdown function with icons
// export function AddDropdown(editor) {
//   editor.ui.componentFactory.add("addDropdown", (locale) => {
//     const dropdownView = createDropdown(locale);

//     dropdownView.buttonView.set({
//       label: "+ Add",
//       tooltip: true,
//       withText: true,
//     });

//     // Define button options with labels, CKEditor commands, and icons
//     const buttonOptions = [
//       {
//         label: "\u00A0\u00A0Normal Text",
//         command: "paragraph",
//         icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Large Title",
//         command: "heading",
//         options: { level: 1 },
//         icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Medium Title",
//         command: "heading",
//         options: { level: 2 },
//         icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Small Title",
//         command: "heading",
//         options: { level: 3 },
//         icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Bulleted List",
//         command: "bulletedList",
//         icon: <BsListUl style={{ fontSize: "10px" }} />,
//       },
//       // {
//       //   label: "\u00A0\u00A0Ordered List",
//       //   command: "numberedList", // Command for ordered list
//       //   icon: <BsListOl style={{ fontSize: "10px" }} />, // Icon for ordered list
//       // },
//       {
//         label: "\u00A0\u00A0Checklist",
//         command: "todoList",
//         icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Table",
//         command: "insertTable",
//         icon: <BsTable style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Image",
//         command: "imageUpload",
//         icon: <BsImage style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Video",
//         command: "mediaEmbed",
//         icon: <BsCameraVideo style={{ fontSize: "10px" }} />,
//       },
//     ];

//     const items = new Collection();

//     buttonOptions.forEach((option) => {
//       items.add({
//         type: "button",
//         model: new Model({
//           withText: true,
//           label: option.label,
//           command: option.command,
//           icon: renderToStaticMarkup(option.icon),
//           options: option.options || {},
//         }),
//       });
//     });

//     addListToDropdown(dropdownView, items);

//     dropdownView.on("execute", (eventInfo) => {
//       const { command, options } = eventInfo.source;
//       if (command) {
//         editor.execute(command, options);
//       }
//     });

//     return dropdownView;
//   });
// }

// export function AddDropdown(editor) {
//   editor.ui.componentFactory.add("addDropdown", (locale) => {
//     const dropdownView = createDropdown(locale);

//     dropdownView.buttonView.set({
//       label: "+ Add",
//       tooltip: true,
//       withText: true,
//     });

//     const buttonOptions = [
//       {
//         label: "\u00A0\u00A0Normal Text",
//         command: "paragraph",
//         icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
//         placeholderText: "Type normal text here...",
//       },
//       {
//         label: "\u00A0\u00A0Large Title",
//         command: "heading",
//         options: { level: 1 },
//         icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type large title here...",
//       },
//       {
//         label: "\u00A0\u00A0Medium Title",
//         command: "heading",
//         options: { level: 2 },
//         icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type medium title here...",
//       },
//       {
//         label: "\u00A0\u00A0Small Title",
//         command: "heading",
//         options: { level: 3 },
//         icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type small title here...",
//       },
//       {
//         label: "\u00A0\u00A0Bulleted List",
//         command: "bulletedList",
//         icon: <BsListUl style={{ fontSize: "10px" }} />,
//         placeholderText: "Add bullet points...",
//       },
//       {
//         label: "\u00A0\u00A0Checklist",
//         command: "todoList",
//         icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
//         placeholderText: "Add checklist items...",
//       },
//       {
//         label: "\u00A0\u00A0Table",
//         command: "insertTable",
//         icon: <BsTable style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Image",
//         command: "imageUpload",
//         icon: <BsImage style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Video",
//         command: "mediaEmbed",
//         icon: <BsCameraVideo style={{ fontSize: "10px" }} />,
//       },
//     ];

//     const items = new Collection();

//     buttonOptions.forEach((option) => {
//       items.add({
//         type: "button",
//         model: new Model({
//           withText: true,
//           label: option.label,
//           command: option.command,
//           icon: renderToStaticMarkup(option.icon),
//           options: option.options || {},
//           placeholderText: option.placeholderText || "", // Add placeholderText to each option
//         }),
//       });
//     });

//     addListToDropdown(dropdownView, items);

//     dropdownView.on("execute", (eventInfo) => {
//       const { command, options, placeholderText } = eventInfo.source;

//       if (command) {
//         editor.model.change((writer) => {
//           // Insert at the end of the editor content
//           const root = editor.model.document.getRoot();
//           const endPosition = writer.createPositionAt(root, "end");
//           const newElement = writer.createElement(command, options);

//           writer.insertText(placeholderText, newElement); // Add placeholder text
//           writer.insert(newElement, endPosition);
//           writer.setSelection(newElement, "in"); // Focus on new element

//           // Optional: Add CSS to make placeholder styling visible until edited
//           newElement.getCustomProperty = () => ({ isPlaceholder: true });
//         });
//       }
//     });

//     return dropdownView;
//   });
// }
// export function AddDropdown(editor) {

//   editor.ui.componentFactory.add("addDropdown", (locale) => {
//     const dropdownView = createDropdown(locale);

//     dropdownView.buttonView.set({
//       label: "+ Add",
//       tooltip: true,
//       withText: true,
//     });

//     const buttonOptions = [
//       {
//         label: "\u00A0\u00A0Normal Text",
//         command: "paragraph",
//         icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
//         placeholderText: "Type normal text here...",
//       },
//       {
//         label: "\u00A0\u00A0Large Title",
//         command: "heading",
//         options: { level: 1 },
//         icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type large title here...",
//       },
//       {
//         label: "\u00A0\u00A0Medium Title",
//         command: "heading",
//         options: { level: 2 },
//         icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type medium title here...",
//       },
//       {
//         label: "\u00A0\u00A0Small Title",
//         command: "heading",
//         options: { level: 3 },
//         icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
//         placeholderText: "Type small title here...",
//       },
//       {
//         label: "\u00A0\u00A0Bulleted List",
//         command: "bulletedList",
//         icon: <BsListUl style={{ fontSize: "10px" }} />,
//         placeholderText: "Add bullet points...",
//       },
//       {
//         label: "\u00A0\u00A0Checklist",
//         command: "todoList",
//         icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
//         placeholderText: "Add checklist items...",
//       },
//       {
//         label: "\u00A0\u00A0Table",
//         command: "insertTable",
//         icon: <BsTable style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Image",
//         command: "imageUpload",
//         icon: <BsImage style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Video",
//         command: "mediaEmbed",
//         icon: <BsCameraVideo style={{ fontSize: "10px" }} />,
//       },
//     ];

//     const items = new Collection();

//     buttonOptions.forEach((option) => {
//       items.add({
//         type: "button",
//         model: new Model({
//           withText: true,
//           label: option.label,
//           command: option.command,
//           icon: renderToStaticMarkup(option.icon),
//           options: option.options || {},
//           placeholderText: option.placeholderText || "",
//         }),
//       });
//     });

//     addListToDropdown(dropdownView, items);

//     dropdownView.on("execute", (eventInfo) => {
//       const { command, options, placeholderText } = eventInfo.source;

//       if (command) {
//         editor.model.change((writer) => {
//           const root = editor.model.document.getRoot();

//           // Check if the command is allowed at the root level
//           if (editor.model.schema.checkChild(root, command)) {
//             const endPosition = writer.createPositionAt(root, "end");
//             const newElement = writer.createElement(command, options);

//             writer.insert(newElement, endPosition);

//             // Add placeholder text if allowed
//             if (
//               placeholderText &&
//               editor.model.schema.checkChild(newElement, "$text")
//             ) {
//               writer.insertText(
//                 placeholderText,
//                 { placeholder: true, color: "#a0a0a0" },
//                 newElement
//               );
//             }

//             writer.setSelection(newElement, 0);
//           } else {
//             console.error(
//               `Cannot insert element of type "${command}" at the root.`
//             );
//           }
//         });
//       }
//     });

//     return dropdownView;
//   });
// }

// export function AddDropdown(editor) {
//   editor.ui.componentFactory.add("addDropdown", (locale) => {
//     const dropdownView = createDropdown(locale);

//     dropdownView.buttonView.set({
//       label: "+ Add",
//       tooltip: true,
//       withText: true,
//     });

//     const buttonOptions = [
//       {
//         label: "\u00A0\u00A0Normal Text",
//         command: () => editor.execute("paragraph"),
//         icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Large Title",
//         command: () => editor.execute("heading", { options: { level: 1 } }),
//         icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Medium Title",
//         command: () => editor.execute("heading", { options: { level: 2 } }),
//         icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Small Title",
//         command: () => editor.execute("heading", { options: { level: 3 } }),
//         icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Bulleted List",
//         command: () => editor.execute("bulletedList"),
//         icon: <BsListUl style={{ fontSize: "10px" }} />,
//         placeholderText: "Add bullet points...",
//       },
//       {
//         label: "\u00A0\u00A0Checklist",
//         command: () => editor.execute("todoList"),
//         icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
//         placeholderText: "Add checklist items...",
//       },
//       {
//         label: "\u00A0\u00A0Table",
//         command: () => editor.execute("insertTable"),
//         icon: <BsTable style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Image",
//         command: "imageUpload",
//         icon: <BsImage style={{ fontSize: "10px" }} />,
//       },
//       {
//         label: "\u00A0\u00A0Video",
//         command: "mediaEmbed",
//         icon: <BsCameraVideo style={{ fontSize: "10px" }} />,
//       },
//     ];

//     const items = new Collection();

//     buttonOptions.forEach((option) => {
//       items.add({
//         type: "button",
//         model: new Model({
//           withText: true,
//           label: option.label,
//           icon: renderToStaticMarkup(option.icon),
//           command: option.command,
//         }),
//       });
//     });

//     addListToDropdown(dropdownView, items);

//     dropdownView.on("execute", (eventInfo) => {
//       const { command } = eventInfo.source;

//       if (command === "imageUpload") {
//         handleImageUpload(editor);
//       } else if (command === "mediaEmbed") {
//         handleVideoEmbed(editor);
//       }
//     });

//     return dropdownView;
//   });
// }
export function AddDropdown(editor) {
  editor.ui.componentFactory.add("addDropdown", (locale) => {
    const dropdownView = createDropdown(locale);

    dropdownView.buttonView.set({
      label: "+ Add",
      tooltip: true,
      withText: true,
    });

    const buttonOptions = [
      {
        label: "\u00A0\u00A0Normal Text",
        command: () => editor.execute("paragraph"),
        icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
        placeholderText: "Type normal text here...",
      },
      {
        label: "\u00A0\u00A0Large Title",
        command: () => editor.execute("heading", { options: { level: 1 } }),
        icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
        placeholderText: "Type large title here...",
      },
      {
        label: "\u00A0\u00A0Medium Title",
        command: () => editor.execute("heading", { options: { level: 2 } }),
        icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
        placeholderText: "Type medium title here...",
      },
      {
        label: "\u00A0\u00A0Small Title",
        command: () => editor.execute("heading", { options: { level: 3 } }),
        icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
        placeholderText: "Type small title here...",
      },
      {
        label: "\u00A0\u00A0Bulleted List",
        command: () => editor.execute("bulletedList"),
        icon: <BsListUl style={{ fontSize: "10px" }} />,
        placeholderText: "Add bullet points...",
      },
      {
        label: "\u00A0\u00A0Checklist",
        command: () => editor.execute("todoList"),
        icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
        placeholderText: "Add checklist items...",
      },
      {
        label: "\u00A0\u00A0Table",
        command: () => editor.execute("insertTable"),
        icon: <BsTable style={{ fontSize: "10px" }} />,
      },
      {
        label: "\u00A0\u00A0Image",
        command: "imageUpload",
        icon: <BsImage style={{ fontSize: "10px" }} />,
      },
      {
        label: "\u00A0\u00A0Video",
        command: "mediaEmbed",
        icon: <BsCameraVideo style={{ fontSize: "10px" }} />,
      },
    ];

    const items = new Collection();

    buttonOptions.forEach((option) => {
      items.add({
        type: "button",
        model: new Model({
          withText: true,
          label: option.label,
          icon: renderToStaticMarkup(option.icon),
          command: option.command,
          placeholderText: option.placeholderText || "",
        }),
      });
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const { command } = eventInfo.source;
      // Handle dynamic commands
      if (typeof command === "function") {
        command();
      } else if (command === "imageUpload") {
        handleImageUpload(editor);
      } else if (command === "mediaEmbed") {
        handleVideoEmbed(editor);
      }
    });

    return dropdownView;
  });
}

// Fix for handling image uploads
// function handleImageUpload(editor) {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";

//   input.addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const imageUrl = e.target.result;

//         editor.model.change((writer) => {
//           // Check if the schema allows inserting images
//           if (
//             !editor.model.schema.checkChild(
//               editor.model.document.selection.focus.parent,
//               "image"
//             )
//           ) {
//             console.error(
//               "The editor does not support images at this position."
//             );
//             return;
//           }

//           const imageElement = writer.createElement("image", {
//             src: imageUrl,
//           });

//           editor.model.insertContent(imageElement);
//         });
//       };

//       reader.readAsDataURL(file);
//     }
//   });

//   input.click();
// }
// function handleImageUpload(editor) {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";

//   input.addEventListener("change", async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileName = file.name;
//       console.log("File selected:", { fileName });

//       try {
//         const apiKey = "5c23ee874fb2988c39ae9bb09ae0ad49";
//         const formData = new FormData();
//         formData.append("image", file);

//         // Upload the image to ImgBB
//         const response = await fetch(
//           `https://api.imgbb.com/1/upload?key=${apiKey}`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const result = await response.json();
//           const imageUrl = result.data.url; // Get the direct URL of the uploaded image
//           console.log("Image URL:", imageUrl);

//           // Insert the image into the editor
//           editor.model.change((writer) => {
//             const selection = editor.model.document.selection;

//             // Check if the schema supports images in the current position
//             if (
//               !editor.model.schema.checkChild(selection.focus.parent, "image")
//             ) {
//               console.error(
//                 "The editor does not support images at this position."
//               );
//               return;
//             }

//             // Create an image element with the retrieved URL
//             const imageElement = writer.createElement("image", {
//               src: imageUrl,
//             });

//             console.log("Inserting image:", imageElement);

//             // Insert the image at the current selection
//             editor.model.insertContent(imageElement, selection);
//           });
//         } else {
//           console.error("Image upload failed:", response);
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
//   });

//   input.click();
// }
function handleImageUpload(editor) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      console.log("File selected:", { fileName });

      try {
        const apiKey = "5c23ee874fb2988c39ae9bb09ae0ad49"; // Your API key
        const formData = new FormData();
        formData.append("image", file);

        // Upload the image to ImgBB
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          const imageUrl = result.data.url; // Get the direct URL of the uploaded image
          console.log("Image URL:", imageUrl);

          // Insert the image into the editor at the current selection
          editor.model.change((writer) => {
            const selection = editor.model.document.selection;
            console.log("Current selection parent:", selection.focus.parent);
            console.log(
              editor.model.schema.checkChild(selection.focus.parent, "image")
            );
            if (
              editor.model.schema.checkChild(selection.focus.parent, "image")
            ) {
              console.log(
                editor.model.schema.checkChild(selection.focus.parent, "image")
              );
              console.log("An image can be inserted here.");
            } else {
              console.log(
                editor.model.schema.checkChild(selection.focus.parent, "image")
              );
              console.log("An image cannot be inserted here.");
            }
            // Check if we can insert an image at the current selection
            // if (
            //   editor.model.schema.checkChild(selection.focus.parent, "image") ||
            //   editor.model.schema.checkChild(
            //     selection.focus.parent,
            //     "paragraph"
            //   )
            // ) {
            const imageElement = writer.createElement("image", {
              src: imageUrl,
            });
            console.log({ imageElement });
            editor.model.insertContent(imageElement, selection);
            // } else {
            //   console.error(
            //     "The editor does not support images at this position."
            //   );
            // }
          });
        } else {
          console.error("Image upload failed:", response);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  });

  input.click();
}
// function handleImageUpload(editor) {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";

//   input.addEventListener("change", async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         const base64String = reader.result; // The Base64 string of the image
//         console.log({ base64String });
//         // Insert the image into the editor
//         editor.model.change((writer) => {
//           const selection = editor.model.document.selection;

//           // Check if the schema supports images in the current position
//           // if (
//           //   !editor.model.schema.checkChild(selection.focus.parent, "image")
//           // ) {
//           //   console.error(
//           //     "The editor does not support images at this position."
//           //   );
//           //   return;
//           // }

//           // Create an image element with the Base64 URL
//           const imageElement = writer.createElement("image", {
//             src: base64String,
//           });

//           console.log("Inserting image:", imageElement);

//           // Insert the image at the current selection
//           editor.model.insertContent(imageElement, selection);
//         });
//       };

//       reader.onerror = (error) => {
//         console.error("Error reading file as Base64:", error);
//       };

//       // Read the file as a Base64 string
//       reader.readAsDataURL(file);
//     }
//   });

//   input.click();
// }

// Fix for handling video embeds
function handleVideoEmbed(editor) {
  const input = prompt("Enter the video URL:");

  // Ensure input exists and is a string
  if (!input || typeof input !== "string") {
    console.error("Invalid input: No URL provided or input is not a string.");
    alert("Please provide a valid video URL.");
    return;
  }

  const url = input.trim(); // Ensure the URL is trimmed

  if (url === "") {
    console.error("Empty URL provided after trimming.");
    alert("The URL cannot be empty.");
    return;
  }

  try {
    // Debugging step: Log the URL
    console.log("Embedding video with URL:", url);

    // Execute the embed command
    editor.execute("mediaEmbed", { source: url });

    console.log("Video successfully embedded:", url);
  } catch (error) {
    console.error("Error embedding video:", error);
    alert("Failed to embed video. Please check the URL and try again.");
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return {
      upload: () => {
        return loader.file.then((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result;
              resolve({ default: base64 });
            };
            reader.onerror = () =>
              reject("Error occurred while reading the file.");
            reader.readAsDataURL(file);
          });
        });
      },
    };
  };
}

export function baloonDropdown1(editor) {
  editor.ui.componentFactory.add("bDropdown1", (locale) => {
    const dropdownView = createDropdown(locale);
    const svgIcon = renderToStaticMarkup(<PiTextTBold />);
    dropdownView.buttonView.set({
      label: "",
      icon: svgIcon,
      tooltip: true,
      // withText: true,
    });

    const buttonOptions = [
      { label: "Paragraph" },
      { label: "Numbered list" },
      { label: "Bulleted list" },
      { label: "Check list" },
      { label: "Quote" },
      { label: "Code" }, // Optional initial file data (if available)
    ];

    const items = new Collection();

    buttonOptions.forEach((option) => {
      items.add({
        type: "button",
        model: new Model({
          withText: true,
          ...option,
        }),
      });
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const { label } = eventInfo.source;

      switch (label) {
        case "Paragraph":
          editor.execute("paragraph");
          break;
        case "Numbered list":
          editor.execute("numberedList");
          break;
        case "Bulleted list":
          editor.execute("bulletedList");
          break;
        case "Check list":
          editor.execute("todoList");
          break;
        case "Quote":
          editor.execute("blockQuote");
          break;
        case "Code":
          editor.execute("code");
          break;
        // Add more cases as needed
      }
    });

    return dropdownView;
  });
}

export function ActionDropdown(editor) {
  editor.ui.componentFactory.add("actionDropdown", (locale) => {
    const dropdownView = createDropdown(locale);
    const svgIcon = renderToStaticMarkup(<BsThreeDots />);
    dropdownView.buttonView.set({
      label: "",
      icon: svgIcon,
      tooltip: true,
    });

    const buttonOptions = [
      { label: "Copy" },
      { label: "Cut" },
      { label: "Delete" },
    ];

    const items = new Collection();

    buttonOptions.forEach((option) => {
      items.add({
        type: "button",
        model: new Model({
          withText: true,
          ...option,
        }),
      });
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const { label } = eventInfo.source;
      const selection = editor.model.document.selection;
      switch (label) {
        case "Copy":
          document.execCommand("copy");
          break;
        case "Cut":
          document.execCommand("cut");
          break;
        // case "Duplicate":
        //   break;
        case "Delete":
          editor.execute("delete");

          break;
      }
    });

    return dropdownView;
  });
}

// export function FontSizeControl(editor) {
//   editor.ui.componentFactory.add("fontSizeControl", (locale) => {
//     const toolbarView = new View(locale);
//     let fontSize = 16;

//     const minusButton = new ButtonView(locale);
//     minusButton.set({
//       label: "-",
//       withText: true,
//       class: "font-size-control-button",
//     });
//     minusButton.extendTemplate({
//       attributes: {
//         style: {
//           width: "30px",
//           height: "30px",
//           fontSize: "16px",
//         },
//       },
//     });

//     const inputField = new InputTextView(locale);
//     inputField.set({
//       value: fontSize.toString(),
//       class: "font-size-input",
//     });
//     inputField.extendTemplate({
//       attributes: {
//         style: {
//           width: "50px",
//           height: "30px",
//           textAlign: "center",
//           fontSize: "16px",
//         },
//       },
//     });

//     const plusButton = new ButtonView(locale);
//     plusButton.set({
//       label: "+",
//       withText: true,
//       class: "font-size-control-button",
//     });
//     plusButton.extendTemplate({
//       attributes: {
//         style: {
//           width: "30px",
//           height: "30px",
//           fontSize: "16px",
//         },
//       },
//     });

//     function applyStyle(size) {
//       console.log(`Applying font size: ${size}pt`);
//       editor.execute("fontSize", { value: size + "pt" });
//     }

//     minusButton.on("execute", () => {
//       if (fontSize > 8) {
//         fontSize -= 1;
//         inputField.value = fontSize.toString();
//         applyStyle(fontSize);
//       }
//     });

//     plusButton.on("execute", () => {
//       if (fontSize < 28) {
//         fontSize += 1;
//         inputField.value = fontSize.toString();
//         applyStyle(fontSize);
//       }
//     });

//     inputField.on("input", () => {
//       let inputValue = parseInt(inputField.element.value, 10);
//       if (inputValue < 8) {
//         inputField.element.value = "8";
//       } else if (inputValue > 28) {
//         inputField.element.value = "28";
//       }
//     });

//     inputField.on("blur", () => {
//       let inputValue = parseInt(inputField.element.value, 10);
//       if (isNaN(inputValue) || inputValue < 8 || inputValue > 28) {
//         inputValue = Math.min(Math.max(inputValue, 8), 28);
//       }
//       fontSize = inputValue;
//       inputField.value = fontSize.toString();
//       applyStyle(fontSize);
//     });

//     // Update font size input field based on selected text's font size
//     editor.model.document.selection.on("change:range", () => {
//       const selectedElement =
//         editor.model.document.selection.getSelectedElement();
//       let currentFontSize = 16; // Default font size if none is applied

//       if (selectedElement && selectedElement.hasAttribute("fontSize")) {
//         currentFontSize = parseInt(
//           selectedElement.getAttribute("fontSize"),
//           10
//         );
//       } else {
//         const fontSizeAttribute =
//           editor.model.document.selection.getAttribute("fontSize");
//         if (fontSizeAttribute) {
//           currentFontSize = parseInt(fontSizeAttribute, 10);
//         }
//       }

//       fontSize = currentFontSize;
//       inputField.value = fontSize.toString();
//     });

//     toolbarView.setTemplate({
//       tag: "div",
//       attributes: {
//         class: ["custom-style-toolbar"],
//         style: {
//           display: "flex",
//           alignItems: "center",
//           gap: "5px",
//         },
//       },
//       children: [minusButton, inputField, plusButton],
//     });

//     return toolbarView;
//   });
// }

export function FontSizeControl(editor) {
  editor.ui.componentFactory.add("fontSizeControl", (locale) => {
    const toolbarView = new View(locale);
    let fontSize = 16;

    const minusButton = new ButtonView(locale);
    minusButton.set({
      label: "-",
      withText: true,
      class: "font-size-control-button",
    });
    minusButton.extendTemplate({
      attributes: {
        style: {
          width: "30px",
          height: "30px",
          fontSize: "16px",
        },
      },
    });

    const inputField = new InputTextView(locale);
    inputField.set({
      value: fontSize.toString(),
      class: "font-size-input",
    });
    inputField.extendTemplate({
      attributes: {
        style: {
          width: "50px",
          height: "30px",
          textAlign: "center",
          fontSize: "16px",
        },
      },
    });

    const plusButton = new ButtonView(locale);
    plusButton.set({
      label: "+",
      withText: true,
      class: "font-size-control-button",
    });
    plusButton.extendTemplate({
      attributes: {
        style: {
          width: "30px",
          height: "30px",
          fontSize: "16px",
        },
      },
    });

    function applyStyle(size) {
      console.log(`Applying font size: ${size}pt`);
      editor.execute("fontSize", { value: size + "pt" });
    }

    minusButton.on("execute", () => {
      if (fontSize > 8) {
        fontSize -= 1;
        inputField.value = fontSize.toString();
        applyStyle(fontSize);
      }
    });

    plusButton.on("execute", () => {
      if (fontSize < 28) {
        fontSize += 1;
        inputField.value = fontSize.toString();
        applyStyle(fontSize);
      }
    });

    inputField.on("input", () => {
      let inputValue = parseInt(inputField.element.value, 10);
      if (inputValue < 8) {
        inputField.element.value = "8";
      } else if (inputValue > 28) {
        inputField.element.value = "28";
      }
    });

    inputField.on("blur", () => {
      let inputValue = parseInt(inputField.element.value, 10);
      if (isNaN(inputValue) || inputValue < 8 || inputValue > 28) {
        inputValue = Math.min(Math.max(inputValue, 8), 28);
      }
      fontSize = inputValue;
      inputField.value = fontSize.toString();
      applyStyle(fontSize);
    });

    // Function to update font size in the input field based on the element at the cursor
    function updateFontSizeFromElement() {
      const selection = editor.model.document.selection;
      const selectedElement = selection.getSelectedElement();
      let currentFontSize = 16; // Default font size if none is applied

      if (selectedElement && selectedElement.hasAttribute("fontSize")) {
        currentFontSize = parseInt(
          selectedElement.getAttribute("fontSize"),
          10
        );
      } else {
        const fontSizeAttribute = selection.getAttribute("fontSize");
        if (fontSizeAttribute) {
          currentFontSize = parseInt(fontSizeAttribute, 10);
        }
      }

      fontSize = currentFontSize;
      inputField.value = fontSize.toString();
    }

    // Listen to both range and attribute changes to update font size
    editor.model.document.selection.on(
      "change:range",
      updateFontSizeFromElement
    );
    editor.model.document.selection.on(
      "change:attribute",
      updateFontSizeFromElement
    );

    toolbarView.setTemplate({
      tag: "div",
      attributes: {
        class: ["custom-style-toolbar"],
        style: {
          display: "flex",
          alignItems: "center",
          gap: "5px",
        },
      },
      children: [minusButton, inputField, plusButton],
    });

    return toolbarView;
  });
}

export function InsertTableButton(editor) {
  editor.ui.componentFactory.add("insertTableButton", (locale) => {
    const button = new ButtonView(locale); // Correct way to create a button view

    button.set({
      label: "Insert Table",
      tooltip: true,
      withText: true,
    });

    // Add button click listener
    button.on("execute", () => {
      editor.execute("insertTable", {
        rows: 3, // Default number of rows
        columns: 3, // Default number of columns
      });
    });

    return button;
  });
}

export class InsertHeading2Button extends Plugin {
  init() {
    const editor = this.editor;

    // Add the button to insert custom heading 2
    editor.ui.componentFactory.add("insertHeading2Button", (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: "Insert Custom Heading 2",
        tooltip: true,
        withText: true,
      });

      button.on("execute", () => {
        editor.model.change((writer) => {
          // Create the 'heading2' element
          const heading2 = writer.createElement("heading2");

          // Set the class directly to the element
          writer.setAttribute("class", "custom-heading-2", heading2);

          // Insert the heading2 element at the end of the root
          const root = editor.model.document.getRoot();
          const endPosition = writer.createPositionAt(root, "end");
          writer.insert(heading2, endPosition);

          // Insert placeholder text inside the heading2 element
          const textNode = writer.createText("Write some text here");
          writer.insert(textNode, heading2);

          // Set the selection to the end of the newly inserted heading
          writer.setSelection(heading2, "end");
        });
      });

      return button;
    });
  }
}

export function InsertUnorderedListButton(editor) {
  console.log("Button function triggered");

  editor.ui.componentFactory.add("insertUnorderedListButton", (locale) => {
    const button = new ButtonView(locale); // Create a button view

    button.set({
      label: "Insert Unordered List",
      tooltip: true,
      withText: true,
    });

    // Add button click listener
    button.on("execute", () => {
      console.log("Bulleted list command triggered");
      // Execute the `bulletedList` command
      editor.execute("bulletedList");

      // Optionally, focus the editor after execution
      editor.editing.view.focus();
    });

    return button;
  });

  console.log("Button setup complete");
}

// export function InsertImageButton(editor) {
//   editor.ui.componentFactory.add("insertImageButton", (locale) => {
//     const button = new ButtonView(locale);

//     button.set({
//       label: "Insert Image",
//       tooltip: true,
//       withText: true,
//     });

//     button.on("execute", () => {
//       // Create a hidden file input element
//       const input = document.createElement("input");
//       input.type = "file";
//       input.accept = "image/*"; // Allow only image files

//       // Listen for file selection
//       input.addEventListener("change", (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           const reader = new FileReader();

//           // Read the file as a data URL
//           reader.onload = (e) => {
//             const imageUrl = e.target.result;

//             // Insert the image into the editor
//             editor.model.change((writer) => {
//               const imageElement = writer.createElement("image", {
//                 src: imageUrl, // Use the file's data URL
//               });

//               const insertPosition =
//                 editor.model.document.selection.getFirstPosition();
//               writer.insert(imageElement, insertPosition);
//             });

//             editor.editing.view.focus(); // Refocus the editor
//           };

//           reader.readAsDataURL(file); // Trigger file read
//         }
//       });

//       // Trigger the file input click
//       input.click();
//     });

//     return button;
//   });
// }
