import axios from 'axios';

// Action Types
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const UPDATE_NICKNAME_SUCCESS = 'auth/UPDATE_NICKNAME_SUCCESS';
const UPDATE_NICKNAME_FAIL = 'auth/UPDATE_NICKNAME_FAIL';
const UPDATE_PASSWORD_SUCCESS = 'auth/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'auth/UPDATE_PASSWORD_FAIL';
const DELETE_USER_SUCCESS = 'auth/DELETE_USER_SUCCESS';
const DELETE_USER_FAIL = 'auth/DELETE_USER_FAIL';
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
        isLoggedIn: true,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
        error: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_NICKNAME_SUCCESS:
      return {
        ...state,
        userData: { ...state.userData, nickname: action.payload.nickname },
        error: null
      };
    case UPDATE_NICKNAME_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_PASSWORD_SUCCESS:
      // 비밀번호 변경 시 유저 데이터는 유지, 에러 상태만 관리
      return {
        ...state,
        error: null
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_USER_SUCCESS:
      // 회원 탈퇴 성공 시 모든 사용자 데이터 초기화
      return {
        ...initialState
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}



// Action Creators
//회원가입
export const registerUser = (email, password, nickname) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api-server/auth/register', { email, password, nickname });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    // 에러 응답의 구조에 따라 수정
    dispatch({ type: REGISTER_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};
//로그인
export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api-server/auth/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    // 에러 응답의 구조에 따라 수정
    dispatch({ type: LOGIN_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};
//로그아웃
export const logoutUser = () => async dispatch => {
  try {
    // 서버에 로그아웃 요청
    await axios.get('http://localhost:8080/api-server/auth/logout');
    
    // 로컬 스토리지에서 isLoggedIn 및 user 정보 제거
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    // 로그아웃 성공 액션 디스패치
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    // 로그아웃 실패 액션 디스패치
    console.error('Logout failed:', error);
    dispatch({ type: LOGOUT_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};

//닉네임 변경 

export const updateNickname = (nickname) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userData.user_id; // 현재 로그인된 유저 ID
    const response = await axios.patch(`http://localhost:8080/api-server/auth/mypage/changeNickname`, { nickname }, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}` // Token 인증 방식 예시
      }
    });
    dispatch({ type: UPDATE_NICKNAME_SUCCESS, payload: { userId, nickname } });
  } catch (error) {
    dispatch({ type: UPDATE_NICKNAME_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};

//비밀번호 변경 

export const updatePassword = (password) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userData.user_id;
    const response = await axios.patch(`http://localhost:8080/api-server/auth/mypage/changePassword`, { password }, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`
      }
    });
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: { userId } });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};

//회원 탈퇴

export const deleteUser = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userData.user_id;
    await axios.delete(`http://localhost:8080/api-server/auth/mypage/delete`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`
      }
    });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    dispatch({ type: DELETE_USER_SUCCESS });
    
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.response ? error.response.data : "Unknown Error" });
  }
};