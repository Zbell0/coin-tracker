import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = ReactDOM.createRoot(container);
root.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
);
