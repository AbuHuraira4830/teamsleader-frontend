// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// // Define the type of draggable item
// const ItemTypes = {
//   TASK: "task",
// };

// // Task component (droppable, but dragging through the icon)
// const Task = ({ task, index, moveTask }) => {
//   // Use useDrop hook to handle dropping over another task
//   const [, drop] = useDrop({
//     accept: ItemTypes.TASK,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveTask(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   return (
//     <div
//       ref={drop} // Drop target
//       style={{
//         padding: "10px",
//         margin: "5px 0",
//         backgroundColor: "#f4f4f4",
//         border: "1px solid #ddd",
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//       }}
//     >
//       <DragIcon index={index} moveTask={moveTask} />
//       <span>{task.text}</span>
//     </div>
//   );
// };

// // DragIcon component (draggable icon)
// const DragIcon = ({ index, moveTask }) => {
//   // Use useDrag hook to make the icon draggable
//   const [, drag] = useDrag({
//     type: ItemTypes.TASK,
//     item: { index },
//   });

//   return (
//     <span
//       ref={drag} // Draggable icon
//       style={{
//         cursor: "grab",
//         fontWeight: "bold",
//         color: "blue",
//       }}
//     >
//       ICON
//     </span>
//   );
// };

// // Main ReactDND component
// const ReactDND = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, text: "Learn JSX" },
//     { id: 2, text: "Learn React DnD" },
//     { id: 3, text: "Build a project" },
//   ]);

//   // Function to move task from one index to another
//   const moveTask = (fromIndex, toIndex) => {
//     const updatedTasks = [...tasks];
//     const [movedTask] = updatedTasks.splice(fromIndex, 1);
//     updatedTasks.splice(toIndex, 0, movedTask);
//     setTasks(updatedTasks);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ width: "300px", margin: "0 auto", paddingTop: "50px" }}>
//         <h2 style={{ textAlign: "center" }}>Task Reordering</h2>
//         {tasks.map((task, index) => (
//           <Task key={task.id} index={index} task={task} moveTask={moveTask} />
//         ))}
//       </div>
//     </DndProvider>
//   );
// };

// export default ReactDND;
import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "./ckeditorConfig";

const HoverIconPlugin = (editor) => {
  editor.model.schema.extend("paragraph", { allowAttributes: "hover" });

  editor.conversion.for("upcast").elementToAttribute({
    view: {
      name: "p",
      key: "hover",
    },
    model: (viewElement, modelWriter) => {
      return modelWriter.createAttributeElement("paragraph", { hover: true });
    },
  });

  editor.conversion.for("downcast").attributeToElement({
    model: "hover",
    view: (modelAttributeValue, modelWriter) => {
      return modelWriter.createContainerElement("span", {
        class: "hover-icon",
      });
    },
  });
};

const ReactDND = () => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(
    "<p>Item 1</p><p>Item 2</p><p>Item 3</p>"
  );

  return (
    <div className="App">
      <h2>CKEditor with Hover Icon Example</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        config={{
          plugins: [HoverIconPlugin],
          toolbar: ["undo", "redo", "bold", "italic"],
        }}
      />
      <style jsx>{`
        .hover-icon {
          display: none;
          position: absolute;
          left: -25px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
        }

        p:hover .hover-icon {
          display: inline; /* Show icon on hover */
        }

        p {
          position: relative; /* Required for absolute positioning of the icon */
          padding-left: 30px; /* Space for the icon */
        }
      `}</style>
    </div>
  );
};

export default ReactDND;
