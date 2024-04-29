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
        userData: null
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
    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
};

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api-server/auth/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

export const logoutUser = () => {
  return { type: LOGOUT };
};
