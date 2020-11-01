import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import calendar from "./calendar";
import auth, { authSaga } from "./auth";
import member, { memberSaga } from "./member";

const rootReducer = combineReducers({
  calendar,
  auth,
  member,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga()]);
}

export default rootReducer;
