import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, Theme } from "./style";
import { Provider } from "react-redux";
import { Store } from "./features";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <ThemeProvider theme={Theme}>
    <GlobalStyles/>
      <App />
    </ThemeProvider>
  </Provider>

);
