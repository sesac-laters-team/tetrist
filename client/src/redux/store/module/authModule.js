import axios from 'axios';

// Action Types
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';

// Initial State
const initialState = {
  userData: null,
  isLoggedIn: false,  // 로그인 상태 추가
  error: null
};

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      };
      case LOGIN_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          isLoggedIn: true,  // 로그인 성공 시 true로 설정
          error: null
        };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
      case LOGOUT:
        return {
          ...state,
          userData: null,
          isLoggedIn: false,  // 로그아웃 시 false로 설정
        };
    default:
      return state;
  }
}


// Action Creators
export const registerUser = (email, password, nickname) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api-server/auth/register', { email, password, nickname });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    // 에러 응답의 구조에 따라 수정
    dispatch({ type: REGISTER_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api-server/auth/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    // 에러 응답의 구조에 따라 수정
    dispatch({ type: LOGIN_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};

export const logoutUser = () => {
  return { type: LOGOUT };
};
