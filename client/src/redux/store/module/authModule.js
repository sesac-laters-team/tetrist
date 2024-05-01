import axios from "axios";

// Action Types
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAIL = "auth/REGISTER_FAIL";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";
const LOGOUT = "auth/LOGOUT";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAIL = "auth/LOGOUT_FAIL";

// Initial State
const initialState = {
    userData: null,
    error: null,
};

// Reducer
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                error: null,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                userData: null,
            };
        default:
            return state;
    }
}

// Action Creators
export const registerUser = (email, password, nickname) => async (dispatch) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api-server/auth/register",
            { email, password, nickname }
        );
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        alert(response.data.msg);
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api-server/auth/login",
            { email, password }
        );
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        alert(response.data.msg);
        if (response.data.result) {
            localStorage.setItem("user", JSON.stringify({ email, password }));
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        // 서버에 로그아웃 요청
        await axios.get("http://localhost:8080/api-server/auth/logout");
        // 로컬 스토리지에서 isLoggedIn 및 user 정보 제거
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        // 로그아웃 성공 액션 디스패치
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        // 로그아웃 실패 액션 디스패치
        console.error("Logout failed:", error);
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response ? error.response.data : "Unknown Error",
        });
    }
};
