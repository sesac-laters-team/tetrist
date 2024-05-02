import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import store from "./redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
