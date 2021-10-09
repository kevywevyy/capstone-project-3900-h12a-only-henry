import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import GlobalStyle from "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
