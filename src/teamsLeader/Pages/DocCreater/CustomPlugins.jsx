import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  createDropdown,
  addListToDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import { PiTextTBold } from "react-icons/pi";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { renderToStaticMarkup } from "react-dom/server";

// const CustomPlugins = () => {};


export function AddDropdown(editor) {
  editor.ui.componentFactory.add("addDropdown", (locale) => {
    const dropdownView = createDropdown(locale);

    dropdownView.buttonView.set({
      label: "+  Add",
      tooltip: true,
      withText: true,
    });

    const buttonOptions = [
      { id: "paragraph", label: "Paragraph" },
      { label: "Heading 2" },
      { label: "Bulleted list" },
      { label: "Checklist" },
      { label: "Table" },
      { label: "Image", file: null }, // Optional initial file data (if available)
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
        case "Heading 2":
          editor.execute("heading", { level: 2 });
          break;
        case "Bulleted list":
          editor.execute("bulletedList");
          break;
        case "Checklist":
          editor.execute("todoList");
          break;
        case "Table":
          editor.execute("insertTable");
          break;
        case "Image":
          editor.execute("insertImage");
          break;
        // Add more cases as needed
      }
    });

    return dropdownView;
  });
}
// export function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//     return {
//       upload: () => {
//         return loader.file.then((file) => {
//           return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => {
//               const base64 = reader.result;
//               resolve({ default: base64 });
//             };
//             reader.onerror = reject;
//             reader.readAsDataURL(file);
//           });
//         });
//       },
//     };
//   };
// }

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
