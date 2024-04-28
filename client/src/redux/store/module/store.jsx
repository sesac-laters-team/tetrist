// store.jsx 파일

import { createStore, combineReducers } from 'redux';
import { roomReducer } from '../../reducers/roomReducer'; // 네임드 익스포트를 import합니다.

const rootReducer = combineReducers({
  room: roomReducer
});

const store = createStore(rootReducer);

export default store;
