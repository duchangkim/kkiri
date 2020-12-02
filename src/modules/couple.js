import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as memberAPI from "../lib/api/member";
import { takeLatest } from "redux-saga/effects";

// 초기상태 정의
const initialState = {
  couple: null,
  coupleError: null,
};

// 액션 타입 정의
const [
  GET_COUPLE,
  GET_COUPLE_SUCCESS,
  GET_COUPLE_FAILURE,
] = createRequestActionTypes("couple/GET_COUPLE");

// 액션 생성함수
export const getCouple = createAction(GET_COUPLE, (coupleId) => ({ coupleId }));
// console.log(getCouple(12312312));

// 리듀서
const couple = handleActions(
  {
    [GET_COUPLE_SUCCESS]: (state, { payload: couple }) => ({
      ...state,
      couple,
      coupleError: null,
    }),
    [GET_COUPLE_FAILURE]: (state, { payload: coupleError }) => ({
      ...state,
      couple: null,
      coupleError,
    }),
  },
  initialState
);

// 사가 미들웨어
const getCoupleSaga = createRequestSaga(GET_COUPLE, memberAPI.getMyCouple);

export function* coupleSaga() {
  yield takeLatest(GET_COUPLE, getCoupleSaga);
}

export default couple;
