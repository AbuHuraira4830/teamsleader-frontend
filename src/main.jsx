import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import AppWrapper from "./App"; // Ensure this points to the correct file

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { KanbanContext } from "./contexts/KanbanContext.jsx";
import { ChatsContext } from "./contexts/ChatsContext.jsx";
import { UsersContext } from "./contexts/UsersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UsersContext>
    <ChatsContext>
      <KanbanContext>
        <ContextProvider>
          <AppWrapper />
        </ContextProvider>
      </KanbanContext>
    </ChatsContext>
  </UsersContext>
);
