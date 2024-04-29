import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({ reducer: rootReducer });
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
