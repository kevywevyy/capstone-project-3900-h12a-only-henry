import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Router from "./router";
import GlobalStyle from "./styles/global.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
