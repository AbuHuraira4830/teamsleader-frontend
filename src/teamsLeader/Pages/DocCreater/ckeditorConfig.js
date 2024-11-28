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
import Font from "@ckeditor/ckeditor5-font/src/font";
import { Link } from "@ckeditor/ckeditor5-link";
import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import FindAndReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace";
import { createDropdown } from "@ckeditor/ckeditor5-ui/src/dropdown/utils"; // Utility to create dropdown
import InsertDropdown from "./plugins/InsertDropdown";

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
  Font,
  Link,
  Clipboard,
  Highlight,
  PageBreak,
  TableColumnResize,
  TableCellProperties,
  TableProperties,
  FindAndReplace,
  SelectAll,
  InsertDropdown,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      // "insertDropdown",
      // "insertTableButton",
      // "insertHeading2Button",
      // "insertUnorderedListButton",
      // "insertImageButton",
      "addDropdown", // Custom dropdown here
      "undo",
      "redo",
      // "tableDropdown",
      "|",
      // "heading",
      // "|",
      "alignment",
      "numberedList",
      // "bulletedList",
      // "todoList",
      // "|",
      // "insertTable",
      "fontSizeControl",
      "fontFamily",
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
    supportAllValues: true,
  },
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
    supportAllValues: true,
  },
  // balloonToolbar: [
  //   "fontFamily",
  //   "fontSize",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "|",
  //   "heading",
  //   "|",
  //   "alignment",
  //   "fontColor",
  //   "fontBackgroundColor",
  //   "|",
  //   "link",
  // ],
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
    providers: [
      {
        // Support for YouTube, Vimeo, etc.
        name: "customProvider",
        url: (url) => {
          if (url.match(/youtube\.com|vimeo\.com/)) {
            return url;
          }
          return null;
        },
      },
    ],
  },
};

export function parseEditorData(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elementsArray = [];

  doc.body.childNodes.forEach((node) => {
    const elementObj = {
      tag: node.nodeName.toLowerCase(),
      content: node.textContent.trim(),
      html: node.outerHTML.trim(),
    };
    elementsArray.push(elementObj);
  });

  return elementsArray;
}
