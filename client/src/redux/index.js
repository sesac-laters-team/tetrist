//store/index.js (일반적인 구성)
import { combineReducers } from "redux";

import authReducer from "./module/authModule"; // 경로는 실제 위치에 따라 변경
import { waiting } from "./module/waiting"; // 경로는 실제 위치에 따라 변경

const rootReducer = combineReducers({
    auth: authReducer,
    waiting: waiting,
});

export default rootReducer;
