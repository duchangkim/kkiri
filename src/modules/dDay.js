import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dDayAPI from '../lib/api/dDay';
import { takeLatest } from 'redux-saga/effects';

// 초기 상태 정의
const initialState = {
  dDays: [],
  dDayError: null,
};

// 액션 타입 정의
const [
  GET_DDAY_LIST,
  GET_DDAY_LIST_SUCCESS,
  GET_DDAY_LIST_FAILURE,
] = createRequestActionTypes('dday/GET_DDAY_LIST');

// 액션 생성함수 정의
export const getDdayList = createAction(GET_DDAY_LIST);

// 리듀서 (액션을 발생시키는 함수)
const dDay = handleActions(
  {
    [GET_DDAY_LIST_SUCCESS]: (state, { payload: dDays }) => ({
      ...state,
      dDays,
      dDayError: null,
    }),
    [GET_DDAY_LIST_FAILURE]: (state, { payload: dDayError }) => ({
      ...state,
      dDays: [],
      dDayError,
    }),
  },
  initialState
);

// 사가함수, 미들웨어 정의
const getDdayListSaga = createRequestSaga(GET_DDAY_LIST, dDayAPI.getDdayList);

export function* dDaySaga() {
  yield takeLatest(GET_DDAY_LIST, getDdayListSaga);
}
export default dDay;
