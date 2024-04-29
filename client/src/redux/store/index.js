import { combineReducers } from "redux";
import authReducer from "./module/authModule";
import { waiting } from "./module/waiting";

export default combineReducers({
    auth: authReducer,
    waiting: waiting
});
