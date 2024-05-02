// store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // named export로 가져오기
import rootReducer from "./store/index";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
