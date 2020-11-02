import { createAction, handleActions } from "redux-actions";
import { call, takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

//  액션 타입 정의
const TEMP_SET_MEMBER = "member/TEMP_SET_MEMBER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "member/CHECK"
);
const LOGOUT = "member/LOGOUT";

// 액션 생성함수
export const tempSetMember = createAction(TEMP_SET_MEMBER, (member) => member);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

// saga
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkFailureSaga = () => {
  try {
    localStorage.removeItem("member");
  } catch (e) {
    console.log("localStorage error!");
  }
};
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem("member");
  } catch (e) {
    console.log(e);
  }
}
export function* memberSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
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
  },
  initialState
);

export default member;
