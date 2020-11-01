import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import member, { memberSaga } from "./member";
import tuiCalendar from "./tuiCalendar";
import schedule, { scheduleSaga } from "./schedule";

const rootReducer = combineReducers({
  auth,
  member,
  tuiCalendar,
  schedule,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga(), scheduleSaga()]);
}

export default rootReducer;
