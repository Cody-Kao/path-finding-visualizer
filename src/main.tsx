import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PathFindContextProvider from "./Context/PathFindContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PathFindContextProvider>
      <App />
    </PathFindContextProvider>
  </React.StrictMode>,
);
