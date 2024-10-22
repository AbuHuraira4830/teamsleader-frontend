// import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import {
//   Bold,
//   Code,
//   Italic,
//   Strikethrough,
//   Underline,
// } from "@ckeditor/ckeditor5-basic-styles";

// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import List from "@ckeditor/ckeditor5-list/src/list";
// import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import {
//   Table,
//   TableToolbar,
//   TableCellProperties,
//   TableProperties,
//   TableColumnResize,
// } from "@ckeditor/ckeditor5-table";
// import Image from "@ckeditor/ckeditor5-image/src/image";
// import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
// import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
// import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
// import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
// import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
// import BalloonToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar";
// import { Mention } from "@ckeditor/ckeditor5-mention";
// import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
// import Indent from "@ckeditor/ckeditor5-indent/src/indent";
// import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
// import Font from "@ckeditor/ckeditor5-font/src/font";
// import { Link } from "@ckeditor/ckeditor5-link";
// import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
// import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
// import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
// import { SelectAll } from "@ckeditor/ckeditor5-select-all";
// import FindAndReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace";
// // import { DocumentOutline } from '@ckeditor/ckeditor5-document-outline'; // Corrected import

// export default class ClassicEditor extends ClassicEditorBase {}
// ClassicEditor.builtinPlugins = [
//   Essentials,
//   // DocumentOutline,
//   Paragraph,
//   Bold,
//   Italic,
//   Underline,
//   Alignment,
//   List,
//   TodoList,
//   Table,
//   TableToolbar,
//   Heading,
//   Image,
//   ImageToolbar,
//   ImageCaption,
//   ImageStyle,
//   ImageResize,
//   ImageUpload,
//   SimpleUploadAdapter,
//   MediaEmbed,
//   BalloonToolbar,
//   Mention,
//   CodeBlock,
//   Indent,
//   Code,
//   Strikethrough,
//   BlockQuote,
//   Font,
//   Link,
//   Clipboard,
//   Highlight,
//   PageBreak,
//   TableColumnResize,
//   TableCellProperties,
//   TableProperties,
//   FindAndReplace,
//   SelectAll,
//   // StyleButton,
// ];

// ClassicEditor.defaultConfig = {
//   toolbar: {
//     items: [
//       "addDropdown",
//       "|",
//       "undo",
//       "redo",
//       "|",
//       "heading",
//       "|",
//       "alignment",
//       "numberedList",
//       "bulletedList",
//       "todoList",
//       "|",
//       "insertTable",
//       "fontSize",
//       "fontFamily",

//       "highlight",
//       "|",
//       "styleButton",
//       "pageBreak",
//       "|",
//       "imageUpload",
//       "mediaEmbed",
//       "|",
//       "findAndReplace",
//       "selectAll",
//       "shareButton",
//       // "videoUpload",
//     ],
//   },
//   // documentOutline: {
//   //   container: document.querySelector(".document-outline-container"),
//   // },
//   // documentOutline: {
//   //   container: document.querySelector(".document-outline-container"),
//   // },
//   table: {
//     contentToolbar: [
//       "tableColumn",
//       "tableRow",
//       "mergeTableCells",
//       "|",
//       "tableCellProperties",
//       "tableProperties",
//     ],
//   },
//   image: {
//     styles: ["alignLeft", "alignCenter", "alignRight"],
//     toolbar: [
//       "imageStyle:alignLeft",
//       "imageStyle:alignCenter",
//       "imageStyle:alignRight",
//       "|",
//       "imageTextAlternative",
//       "actionDropdown",
//     ],
//   },
//   mention: {
//     // Configuration options
//     feeds: [
//       {
//         marker: "@",
//         feed: ["@Alice", "@Bob", "@Charlie"],
//         // Additional configuration
//       },
//     ],
//   },
//   mediaEmbed: {
//     url: "https://www.youtube.com/watch?v=H08tGjXNHO4",
//     previewsInData: true,
//   },
//   balloonToolbar: [
//     "bDropdown1",
//     "actionDropdown",
//     "|",
//     "bold",
//     "italic",
//     "underline",
//     "strikeThrough",
//     "|",
//     "heading",
//     "|",
//     "alignment",
//     "fontColor",
//     "fontBackgroundColor",
//     "|",
//     "codeBlock",
//     "link",
//     // Add other toolbar items as needed
//   ],
// };

import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import List from "@ckeditor/ckeditor5-list/src/list";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import {
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
  TableColumnResize,
} from "@ckeditor/ckeditor5-table";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import BalloonToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import Font from "@ckeditor/ckeditor5-font/src/font"; // Font plugin for font family and size
import { Link } from "@ckeditor/ckeditor5-link";
import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import FindAndReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Alignment,
  List,
  TodoList,
  Table,
  TableToolbar,
  Heading,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageUpload,
  SimpleUploadAdapter,
  MediaEmbed,
  BalloonToolbar,
  Mention,
  CodeBlock,
  Indent,
  Code,
  Strikethrough,
  BlockQuote,
  Font, // Ensure Font plugin is added
  Link,
  Clipboard,
  Highlight,
  PageBreak,
  TableColumnResize,
  TableCellProperties,
  TableProperties,
  FindAndReplace,
  SelectAll,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "alignment",
      "numberedList",
      "bulletedList",
      "todoList",
      "|",
      "insertTable",
      "fontSize",
      "fontFamily", // Ensure fontFamily is added to toolbar
      "highlight",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "imageUpload",
      "mediaEmbed",
      "styleButton",
      "|",
      "findAndReplace",
      "selectAll",
      "shareButton",
    ],
  },
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif",
      "'Lato', sans-serif",
      "'Acme', sans-serif",
      "'Futura', sans-serif",
    ],
    supportAllValues: true, // Enable custom font family values
  },
  // fontSize: {
  //   options: ["tiny", "small", "default", "big", "huge"],
  // },
  fontSize: {
    options: [
      "12px",
      "14px",
      "16px",
      "18px",
      "20px",
      "22px",
      "24px",
      "26px",
      "28px",
      "30px",
    ],
    supportAllValues: true, // Enables custom font sizes
  },

  balloonToolbar: [
    "fontFamily", // Added Font family in balloon toolbar for selected text
    "fontSize", // Optional: Font size in the balloon toolbar
    "bold",
    "italic",
    "underline",
    "|",
    "heading",
    "|",
    "alignment",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "link",
  ],
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  image: {
    styles: ["alignLeft", "alignCenter", "alignRight"],
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "imageTextAlternative",
    ],
  },
  mention: {
    feeds: [
      {
        marker: "@",
        feed: ["@Alice", "@Bob", "@Charlie"],
      },
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

export function parseEditorData(htmlString) {
  // Create a new DOM parser
  const parser = new DOMParser();

  // Parse the HTML string into a document
  const doc = parser.parseFromString(htmlString, "text/html");

  // Initialize an array to store objects
  const elementsArray = [];

  // Iterate over each child node
  doc.body.childNodes.forEach((node) => {
    // For each node, create an object with its tag and content
    let elementObj = {
      tag: node.nodeName.toLowerCase(),
      content: node.textContent.trim(), // Get text content and remove unnecessary spaces
      html: node.outerHTML.trim(), // Optional: get full HTML if needed
    };

    elementsArray.push(elementObj);
  });

  return elementsArray;
}
