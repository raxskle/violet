import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@arco-design/web-react/dist/css/arco.css";
import "./index.css";
// import "./assets/scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
