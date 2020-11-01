import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import tuiCalendar from "./tuiCalendar";
import auth, { authSaga } from "./auth";
import member, { memberSaga } from "./member";

const rootReducer = combineReducers({
  tuiCalendar,
  auth,
  member,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga()]);
}

export default rootReducer;
