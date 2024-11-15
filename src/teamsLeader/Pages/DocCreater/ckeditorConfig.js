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
  // StyleButton,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "addDropdown",
      "|",
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
      "fontFamily",

      "highlight",
      "|",
      "styleButton",
      "pageBreak",
      "|",
      "imageUpload",
      "mediaEmbed",
      "|",
      "findAndReplace",
      "selectAll",
      "shareButton",
      // "videoUpload",
    ],
  },
  // documentOutline: {
  //   container: document.querySelector(".document-outline-container"),
  // },

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
      "actionDropdown",
    ],
  },
  mention: {
    // Configuration options
    feeds: [
      {
        marker: "@",
        feed: ["@Alice", "@Bob", "@Charlie"],
        // Additional configuration
      },
    ],
  },
  mediaEmbed: {
    url: "https://www.youtube.com/watch?v=H08tGjXNHO4",
    // previewsInData: true,
  },
  balloonToolbar: [
    "bDropdown1",
    "actionDropdown",
    "|",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "|",
    "heading",
    "|",
    "alignment",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "codeBlock",
    "link",
    // Add other toolbar items as needed
  ],
};
