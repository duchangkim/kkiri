import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import member, { memberSaga } from "./member";
import tuiCalendar from "./tuiCalendar";
import schedule, { scheduleSaga } from "./schedule";
import album, { albumSaga } from './album';
import albums, { albumsSaga } from './albums';

const rootReducer = combineReducers({
  auth,
  member,
  tuiCalendar,
  schedule,
  album,
  albums,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga(), scheduleSaga(), albumSaga(), albumsSaga()]);
}

export default rootReducer;
