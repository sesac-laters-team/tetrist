// 리듀서 결합용
import { combineReducers } from "redux";
import auth from "./authReducer";

const rootReducer = combineReducers({ auth });

export default rootReducer;
