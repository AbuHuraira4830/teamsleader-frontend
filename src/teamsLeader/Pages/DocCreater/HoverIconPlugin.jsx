// HoverIconPlugin.js
export default function HoverIconPlugin(editor) {
  editor.on("instanceReady", () => {
    const editableElement = editor.editing.view.document.getRoot();

    editableElement.on("mouseenter", (evt) => {
      const target = evt.data.target;
      if (target.is("p")) {
        // Check if it's a paragraph
        target.addClass("hover-icon");
      }
    });

    editableElement.on("mouseleave", (evt) => {
      const target = evt.data.target;
      if (target.is("p")) {
        target.removeClass("hover-icon");
      }
    });
  });
}
