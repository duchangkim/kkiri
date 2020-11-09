import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as scheduleAPI from "../lib/api/schedule";
import { takeLatest, all } from "redux-saga/effects";

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
const [
  DELETE_SCHEDULE,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAILURE,
] = createRequestActionTypes("schedule/DELETE_SCHEDULE");
const [
  MODIFY_SCHEDULE,
  MODIFY_SCHEDULE_SUCCESS,
  MODIFY_SCHEDULE_FAILURE,
] = createRequestActionTypes("schedule/MODIFY_SCHEDULE");

// action생성함수
export const getScheduleList = createAction(GET_SCHEDULE_LIST);
export const createSchedule = createAction(CREATE_SCHEDULE);
export const deleteSchedule = createAction(DELETE_SCHEDULE);
export const modifySchedule = createAction(
  MODIFY_SCHEDULE,
  (schedule) => schedule
);
console.dir(modifySchedule());
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
// getScheduleListSaga는 제네레이터 함수를 리턴받음
const createScheduleSaga = createRequestSaga(
  CREATE_SCHEDULE,
  scheduleAPI.createSchedule
);
const deleteScheduleSaga = createRequestSaga(
  DELETE_SCHEDULE,
  scheduleAPI.deleteSchedule
);
const modifyScheduleSaga = createRequestSaga(
  MODIFY_SCHEDULE,
  scheduleAPI.modifySchedule
);
export function* scheduleSaga() {
  // takeLatest > 같은 종류의 액션이 여러번 요청되어도 마지막 액션 요청에 대해서만 동작을 실행한다(두번세번 들어가는거 방지) -dispatch한다-
  yield all([
    takeLatest(GET_SCHEDULE_LIST, getScheduleListSaga),
    // getScheduleListSaga.next(GET_SCHEDULE_LIST)
    takeLatest(CREATE_SCHEDULE, createScheduleSaga),
    takeLatest(DELETE_SCHEDULE, deleteScheduleSaga),
    takeLatest(MODIFY_SCHEDULE, modifyScheduleSaga),
  ]);
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
    [DELETE_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => ({
      ...state,
      schedules,
      scheduleError: null,
    }),
    [DELETE_SCHEDULE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      schedules: null,
      scheduleError: error,
    }),
    [MODIFY_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => ({
      ...state,
      schedules,
      scheduleError: null,
    }),
    [MODIFY_SCHEDULE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      schedules: null,
      scheduleError: error,
    }),
  },
  initialState
);

export default schedule;
