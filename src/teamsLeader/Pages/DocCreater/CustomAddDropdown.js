import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import DropdownView from "@ckeditor/ckeditor5-ui/src/dropdown/dropdownview";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class CustomAddDropdown extends Plugin {
  init() {
    const editor = this.editor;

    // Create the "+ Add" button
    editor.ui.componentFactory.add("customAddDropdown", (locale) => {
      const dropdownView = new DropdownView(locale);
      const addButton = new ButtonView(locale);

      addButton.set({
        label: "+ Add",
        tooltip: true,
        withText: true, // Display text along with the icon
      });

      dropdownView.buttonView = addButton;

      // Define the dropdown options
      const addItems = [
        { label: "Heading", command: "heading" },
        { label: "Add Image", command: "imageUpload" },
        { label: "Add Table", command: "insertTable" },
        { label: "Ordered List", command: "numberedList" },
        { label: "Checkbox List", command: "todoList" },
      ];

      addItems.forEach((item) => {
        const itemButton = new ButtonView(locale);
        itemButton.set({ label: item.label, withText: true });

        itemButton.on("execute", () => {
          editor.execute(item.commCustomAddDropdownand);
          dropdownView.isOpen = false; // Close the dropdown after selection
        });

        dropdownView.panelView.children.add(itemButton);
      });

      // Add the button click listener
      dropdownView.on("change:isOpen", (evt, propertyName) => {
        const isOpen = dropdownView.isOpen;
        if (isOpen) {
          dropdownView.buttonView.focus();
        }
      });

      return dropdownView;
    });
  }
}
