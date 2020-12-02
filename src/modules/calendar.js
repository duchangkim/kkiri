import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as calendarAPI from '../lib/api/calendar';
import { takeLatest, all } from 'redux-saga/effects';

// 초기 상태 정의
const initialState = {
  calendars: [],
  calendarsError: null,
  calendarForm: {
    name: '',
    color: '',
    bgColor: '',
    id: '',
  },
};

// 액션 타입 정의
const CHANGE_FILED = 'calendar/CHANGE_FILED';
const INITIALIZE_FORM = 'calendar/INITIALIZE_FORM';
const [
  CREATE_CALENDAR,
  CREATE_CALENDAR_SUCCESS,
  CREATE_CALENDAR_FAILURE,
] = createRequestActionTypes('calendar/CREATE_CALENDAR');
const [
  GET_CALENDAR_LIST,
  GET_CALENDAR_LIST_SUCCESS,
  GET_CALENDAR_LIST_FAILURE,
] = createRequestActionTypes('calendar/GET_CALENDAR_LIST');
const [
  MODIFY_CALENDAR,
  MODIFY_CALENDAR_SUCCESS,
  MODIFY_CALENDAR_FAILURE,
] = createRequestActionTypes('calendar/MODIFY_CALENDAR');
const [
  DELETE_CALENDAR,
  DELETE_CALENDAR_SUCCESS,
  DELETE_CALENDAR_FAILURE,
] = createRequestActionTypes('calendar/DELETE_CALENDAR');
const SET_FIELD = 'calendar/SET_FIELD';

// 액션 생성함수 정의
export const changeField = createAction(CHANGE_FILED, ({ name, value }) => ({
  name,
  value,
}));
export const setField = createAction(SET_FIELD, (calendar) => calendar);
export const initializeForm = createAction(INITIALIZE_FORM);
export const createCalendar = createAction(
  CREATE_CALENDAR,
  ({ name, color, bgColor }) => ({
    name,
    color,
    bgColor,
  })
);
export const getCalendarList = createAction(GET_CALENDAR_LIST);
export const modifyCalendar = createAction(
  MODIFY_CALENDAR,
  (calendar) => calendar
);
export const deleteCalendar = createAction(
  DELETE_CALENDAR,
  (calendarId) => calendarId
);

// 리듀서 (액션을 발생시키는 함수)
const calendar = handleActions(
  {
    [CHANGE_FILED]: (state, { payload: form }) => ({
      ...state,
      calendarForm: {
        ...state.calendarForm,
        [form.name]: form.value,
      },
    }),
    [SET_FIELD]: (state, { payload: calendar }) => ({
      ...state,
      calendarForm: {
        name: calendar.name,
        color: calendar.color,
        bgColor: calendar.bgColor,
        id: calendar.id,
      },
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      calendarsError: null,
      calendarForm: initialState.calendarForm,
    }),
    [CREATE_CALENDAR_SUCCESS]: (state, { payload: calendars }) => ({
      ...state,
      calendars,
      calendarsError: null,
    }),
    [CREATE_CALENDAR_FAILURE]: (state, { payload: error }) => ({
      ...state,
      calendars: [],
      calendarsError: error,
    }),
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
    [MODIFY_CALENDAR_SUCCESS]: (state, { payload: calendars }) => {
      return {
        ...state,
        calendars,
        calendarsError: null,
      };
    },
    [MODIFY_CALENDAR_FAILURE]: (state, { payload: error }) => ({
      ...state,
      calendars: [],
      calendarsError: error,
    }),
    [DELETE_CALENDAR_SUCCESS]: (state, { payload: calendars }) => ({
      ...state,
      calendars,
      calendarsError: null,
    }),
    [DELETE_CALENDAR_FAILURE]: (state, { payload: error }) => ({
      ...state,
      calendars: [],
      calendarsError: error,
    }),
  },
  initialState
);

// 사가함수, 미들웨어 정의
const createCalendarSaga = createRequestSaga(
  CREATE_CALENDAR,
  calendarAPI.createCalendar
);
const getCalendarListSaga = createRequestSaga(
  GET_CALENDAR_LIST,
  calendarAPI.getCalendarList
);
const modifyCalendarSaga = createRequestSaga(
  MODIFY_CALENDAR,
  calendarAPI.modifyCalendar
);
const deleteCalendarSaga = createRequestSaga(
  DELETE_CALENDAR,
  calendarAPI.deleteCalendar
);

export function* calendarSaga() {
  yield all([
    takeLatest(CREATE_CALENDAR, createCalendarSaga),
    takeLatest(GET_CALENDAR_LIST, getCalendarListSaga),
    takeLatest(MODIFY_CALENDAR, modifyCalendarSaga),
    takeLatest(DELETE_CALENDAR, deleteCalendarSaga),
  ]);
}

export default calendar;
