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
// loginUser 액션 수정
export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api-server/auth/login",
            {
                email,
                password,
            }
        );

        if (response.data.result) {
            // 서버에서 받은 userId와 email만 저장
            const userData = {
                userId: response.data.userId,
                email: response.data.email,
            };
            dispatch({ type: LOGIN_SUCCESS, payload: userData });

            // 로컬 스토리지에 필요한 정보 저장
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(userData));
            console.log("성공");
        } else {
            return Promise.reject(response.data.msg); // 오류 메시지 반환
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response
                ? error.response.data
                : "Login failed: Network error",
        });
        return Promise.reject(error);
    }
};

// loginUserFromLocalStorage 액션 수정
export const loginUserFromLocalStorage = (user) => ({
    type: LOGIN_SUCCESS,
    payload: {
        userId: user.userId,
        email: user.email,
    },
});

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
