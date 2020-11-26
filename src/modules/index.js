import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import member, { memberSaga } from './member';
import tuiCalendar from './tuiCalendar';
import schedule, { scheduleSaga } from './schedule';
import calendar, { calendarSaga } from './calendar';
import album, { albumSaga } from './album';
import albums, { albumsSaga } from './albums';
import loading from './loading';
import dDay, { dDaySaga } from './dDay';
import couple, { coupleSaga } from './couple';
import weather, { weatherSaga } from './weather';
import setup, { setupSaga } from './setUp';
import setting, { settingSaga } from './setting';
import chat, { chatSaga } from './chat';
import socket from './socket'

const rootReducer = combineReducers({
  auth,
  member,
  tuiCalendar,
  schedule,
  loading,
  calendar,
  album,
  albums,
  dDay,
  couple,
  weather,
  setup,
  setting,
  chat,
  socket,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    memberSaga(),
    scheduleSaga(),
    calendarSaga(),
    albumSaga(),
    albumsSaga(),
    dDaySaga(),
    coupleSaga(),
    weatherSaga(),
    setupSaga(),
    chatSaga(),
    settingSaga(),
    // _authSaga(),
  ]);
}

export default rootReducer;
