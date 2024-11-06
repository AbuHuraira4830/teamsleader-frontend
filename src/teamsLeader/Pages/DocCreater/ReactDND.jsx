import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the type of draggable item
const ItemTypes = {
  TASK: "task",
};

// Task component (draggable and droppable)
const Task = ({ task, index, moveTask }) => {
  // Use useDrag hook to make the task draggable
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index },
  });

  // Use useDrop hook to handle dropping over another task
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))} // Connect drag and drop
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "#f4f4f4",
        border: "1px solid #ddd",
        cursor: "move",
      }}
    >
      {task.text}
    </div>
  );
};

// Main ReactDND component
const ReactDND = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn JSX" },
    { id: 2, text: "Learn React DnD" },
    { id: 3, text: "Build a project" },
  ]);

  // Function to move task from one index to another
  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ width: "300px", margin: "0 auto", paddingTop: "50px" }}>
        <h2 style={{ textAlign: "center" }}>Task Reordering</h2>
        {tasks.map((task, index) => (
          <Task key={task.id} index={index} task={task} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

export default ReactDND;
