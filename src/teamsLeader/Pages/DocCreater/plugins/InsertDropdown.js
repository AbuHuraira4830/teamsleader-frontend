import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  createDropdown,
  addListToDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";

export default class InsertDropdown extends Plugin {
  init() {
    const editor = this.editor;

    // Log to confirm the plugin is initialized
    console.log("InsertDropdown plugin initialized.");

    // Add the dropdown to the editor UI
    editor.ui.componentFactory.add("insertDropdown", (locale) => {
      console.log("Dropdown factory invoked.");

      const dropdown = createDropdown(locale);

      // Configure the dropdown button
      dropdown.buttonView.set({
        label: "Insert",
        tooltip: true,
        withText: true,
      });

      // Define dropdown items
      const itemDefinitions = [
        { label: "Paragraph", command: "paragraph" },
        { label: "Heading 1", command: "heading", value: "heading1" },
        { label: "Heading 2", command: "heading", value: "heading2" },
        { label: "Heading 3", command: "heading", value: "heading3" },
        { label: "Ordered List", command: "numberedList" },
        { label: "Table", command: "insertTable" },
        { label: "Image", command: "imageUpload" },
        { label: "Video", command: "mediaEmbed" },
      ];

      // Create a Collection for dropdown items
      const items = new Collection();

      itemDefinitions.forEach((item) => {
        console.log(`Adding item: ${item.label}`); // Log each item being added

        items.add({
          type: "button",
          model: {
            label: item.label,
            withText: true,
            execute: () => {
              console.log(`Clicked on: ${item.label}`); // Log which item was clicked

              // Execute the corresponding command
              try {
                if (item.command === "heading") {
                  console.log(
                    `Executing heading command with value: ${item.value}`
                  );
                  editor.execute(item.command, { value: item.value });
                } else if (item.command === "insertTable") {
                  console.log(
                    "Executing table insertion with rows: 2, columns: 2"
                  );
                  editor.execute(item.command, { rows: 2, columns: 2 });
                } else {
                  console.log(`Executing command: ${item.command}`);
                  editor.execute(item.command);
                }

                // Ensure the editor focuses after command execution
                editor.editing.view.focus();
                console.log("Editor focused after command execution.");
              } catch (error) {
                console.error(
                  `Error executing command: ${item.command}, Error: ${error}`
                );
              }
            },
          },
        });
      });

      // Add items to the dropdown
      addListToDropdown(dropdown, items);
      console.log("Dropdown items added successfully.");

      return dropdown;
    });
  }
}
