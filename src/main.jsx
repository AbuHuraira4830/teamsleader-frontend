import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { KanbanContext } from "./contexts/KanbanContext.jsx";
import { ChatsContext } from "./contexts/ChatsContext.jsx";
import { ProposalsContext } from "./contexts/ProposalsContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ProposalsContext>
    <ChatsContext>
      <KanbanContext>
        <ContextProvider>
          <App />
        </ContextProvider>
      </KanbanContext>
    </ChatsContext>
  </ProposalsContext>
);
