import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "./utils/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
