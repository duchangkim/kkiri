import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import member, { memberSaga } from "./member";
import tuiCalendar from "./tuiCalendar";
import schedule, { scheduleSaga } from "./schedule";
import calendar, { calendarSaga } from "./calendar";

const rootReducer = combineReducers({
  auth,
  member,
  tuiCalendar,
  schedule,
  calendar,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga(), scheduleSaga(), calendarSaga()]);
}

export default rootReducer;
