import { combineReducers } from "redux";
import authReducer from "./module/authModule";
import { waiting } from "./module/waiting";
import { gameRoom } from "./module/gameRoom";

export default combineReducers({
    auth: authReducer,
    waiting: waiting,
    gameRoom: gameRoom,
});
