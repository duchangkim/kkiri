import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as calendarAPI from "../lib/api/calendar";
import { takeLatest, all } from "redux-saga/effects";

// 초기 상태 정의
const initialState = {
  calendars: [],
  calendarsError: null,
};

// 액션 타입 정의
const [
  GET_CALENDAR_LIST,
  GET_CALENDAR_LIST_SUCCESS,
  GET_CALENDAR_LIST_FAILURE,
] = createRequestActionTypes("schedule/GET_CALENDAR_LIST");

// 액션 생성함수 정의
export const getCalendarList = createAction(GET_CALENDAR_LIST);

// 리듀서 (액션을 발생시키는 함수)
const calendar = handleActions(
  {
    [GET_CALENDAR_LIST_SUCCESS]: (state, { payload: calendars }) => ({
      ...state,
      calendars,
      calendarsError: null,
    }),
    [GET_CALENDAR_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      calendars: [],
      calendarsError: error,
    }),
  },
  initialState
);

// 사가함수, 미들웨어 정의
const getCalendarListSaga = createRequestSaga(
  GET_CALENDAR_LIST,
  calendarAPI.getCalendarList
);

export function* calendarSaga() {
  yield all([takeLatest(GET_CALENDAR_LIST, getCalendarListSaga)]);
}

export default calendar;
