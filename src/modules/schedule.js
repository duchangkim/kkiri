import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as scheduleAPI from "../lib/api/schedule";
import { takeLatest } from "redux-saga/effects";

// action type 정의
const [
  GET_SCHEDULE_LIST,
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_FAILURE,
] = createRequestActionTypes("schedule/GET_SCHEDULE_LIST");
const [
  CREATE_SCHEDULE,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAILURE,
] = createRequestActionTypes("schedule/CREATE_SCHEDULE");

// action생성함수
export const getScheduleList = createAction(GET_SCHEDULE_LIST);
export const createSchedule = createAction(CREATE_SCHEDULE);
/*
  {
    type: schedule/CREATE_SCHEDULE,
  }
*/

// saga생성
const getScheduleListSaga = createRequestSaga(
  GET_SCHEDULE_LIST,
  scheduleAPI.getScheduleList
);
const createScheduleSaga = createRequestSaga(
  CREATE_SCHEDULE,
  scheduleAPI.createSchedule
);
export function* scheduleSaga() {
  // takeLatest > 같은 종류의 액션이 여러번 요청되어도 마지막 액션 요청에 대해서만 동작을 실행한다(두번세번 들어가는거 방지) -dispatch한다-
  yield takeLatest(GET_SCHEDULE_LIST, getScheduleListSaga);
  yield takeLatest(CREATE_SCHEDULE, createScheduleSaga);
}

// 초기값
const initialState = {
  schedules: null,
  scheduleError: null,
};

const schedule = handleActions(
  {
    [CREATE_SCHEDULE]: (state) => ({
      ...state,
      schedules: null,
      scheduleError: null,
    }),
    [CREATE_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => ({
      ...state,
      schedules,
      scheduleError: null,
    }),
    [CREATE_SCHEDULE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      schedules: null,
      scheduleError: error,
    }),
    [GET_SCHEDULE_LIST_SUCCESS]: (state, { payload: schedules }) => ({
      ...state,
      schedules: schedules.map((schedule) => ({
        ...schedule,
        start: new Date(schedule.start),
        end: new Date(schedule.end),
      })),
      scheduleError: null,
    }),
    [GET_SCHEDULE_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      schedule: null,
      scheduleError: error,
    }),
  },
  initialState
);

export default schedule;
