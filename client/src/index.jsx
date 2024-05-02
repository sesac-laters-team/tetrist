// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import store from "./redux/store"; // 스토어 파일의 경로
import { Provider } from "react-redux"; // react-redux에서 가져옴

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
