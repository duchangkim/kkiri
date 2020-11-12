import { createAction, handleActions } from 'redux-actions';
import { all, call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as memberAPI from '../lib/api/member';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

//  액션 타입 정의
const TEMP_SET_MEMBER = 'member/TEMP_SET_MEMBER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'member/CHECK'
);
const LOGOUT = 'member/LOGOUT';
const [
  INSERT_POSITION,
  INSERT_POSITION_SUCCESS,
  INSERT_POSITION_FAILURE,
] = createRequestActionTypes('member/INSERT_POSITION');

// 액션 생성함수
export const tempSetMember = createAction(TEMP_SET_MEMBER, (member) => member);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const insertPosition = createAction(
  INSERT_POSITION,
  (postition) => postition
);

// saga
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkFailureSaga = () => {
  try {
    localStorage.removeItem('member');
  } catch (e) {
    console.log('localStorage error!');
  }
};
const insertPositionSaga = createRequestSaga(
  INSERT_POSITION,
  memberAPI.insertPosition
);
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('member');
  } catch (e) {
    console.log(e);
  }
}
export function* memberSaga() {
  yield all([
    takeLatest(CHECK, checkSaga),
    takeLatest(CHECK_FAILURE, checkFailureSaga),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(INSERT_POSITION, insertPositionSaga),
  ]);
}

// 상태 초기값
const initialState = {
  member: null,
  checkError: null,
};

// 리듀서
const member = handleActions(
  {
    [TEMP_SET_MEMBER]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [CHECK_SUCCESS]: (state, { payload: member }) => ({
      ...state,
      member,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      member: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      member: null,
      checkError: null,
    }),
    [INSERT_POSITION_SUCCESS]: (state) => ({
      ...state,
    }),
    [INSERT_POSITION_FAILURE]: (state) => ({
      ...state,
    }),
  },
  initialState
);

export default member;
