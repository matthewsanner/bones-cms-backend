import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "@fontsource/roboto/300.css"; // Roboto font weight 300
import "@fontsource/roboto/400.css"; // Roboto font weight 400
import "@fontsource/roboto/500.css"; // Roboto font weight 500
import "@fontsource/roboto/700.css"; // Roboto font weight 700
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
