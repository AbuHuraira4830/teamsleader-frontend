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

// Import icons from react-icons
import {
  BsTextParagraph,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsListUl,
  BsCheckSquare,
  BsTable,
  BsImage,
  BsCameraVideo,
} from "react-icons/bs";
import { PiTextTBold } from "react-icons/pi";
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
        command: "paragraph",
        icon: <BsTextParagraph style={{ fontSize: "10px" }} />,
        placeholderText: "Type normal text here...",
      },
      {
        label: "\u00A0\u00A0Large Title",
        command: "heading",
        options: { level: 1 },
        icon: <BsTypeH1 style={{ fontSize: "10px" }} />,
        placeholderText: "Type large title here...",
      },
      {
        label: "\u00A0\u00A0Medium Title",
        command: "heading",
        options: { level: 2 },
        icon: <BsTypeH2 style={{ fontSize: "10px" }} />,
        placeholderText: "Type medium title here...",
      },
      {
        label: "\u00A0\u00A0Small Title",
        command: "heading",
        options: { level: 3 },
        icon: <BsTypeH3 style={{ fontSize: "10px" }} />,
        placeholderText: "Type small title here...",
      },
      {
        label: "\u00A0\u00A0Bulleted List",
        command: "bulletedList",
        icon: <BsListUl style={{ fontSize: "10px" }} />,
        placeholderText: "Add bullet points...",
      },
      {
        label: "\u00A0\u00A0Checklist",
        command: "todoList",
        icon: <BsCheckSquare style={{ fontSize: "10px" }} />,
        placeholderText: "Add checklist items...",
      },
      {
        label: "\u00A0\u00A0Table",
        command: "insertTable",
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
          command: option.command,
          icon: renderToStaticMarkup(option.icon),
          options: option.options || {},
          placeholderText: option.placeholderText || "",
        }),
      });
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const { command, options, placeholderText } = eventInfo.source;

      if (command) {
        editor.model.change((writer) => {
          const root = editor.model.document.getRoot();

          // Check if the command is allowed at the root level
          if (editor.model.schema.checkChild(root, command)) {
            const endPosition = writer.createPositionAt(root, "end");

            let newElement;

            if (command === "heading" && options && options.level) {
              // Handle heading levels (h1, h2, h3)
              newElement = writer.createElement("heading", {
                level: options.level,
              });
            } else {
              // Handle other commands
              newElement = writer.createElement(command, options);
            }

            writer.insert(newElement, endPosition);

            // Add placeholder text if allowed
            if (
              placeholderText &&
              editor.model.schema.checkChild(newElement, "$text")
            ) {
              writer.insertText(
                placeholderText,
                { placeholder: true, color: "#a0a0a0" },
                newElement
              );
            }

            writer.setSelection(newElement, 0);
          } else {
            console.error(
              `Cannot insert element of type "${command}" at the root.`
            );
          }
        });
      }
    });

    return dropdownView;
  });
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
