import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as weatherAPI from "../lib/api/weather";
import { takeLatest, all } from "redux-saga/effects";

const initialState = {
  myWeather: null,
  yourWeather: null,
  weatherError: null,
};

// 액션 타입 정의
const [
  GET_MY_WEATHER,
  GET_MY_WEATHER_SUCCESS,
  GET_MY_WEATHER_FAILURE,
] = createRequestActionTypes("weather/GET_MY_WEATHER");
const [
  GET_YOUR_WEATHER,
  GET_YOUR_WEATHER_SUCCESS,
  GET_YOUR_WEATHER_FAILURE,
] = createRequestActionTypes("weather/GET_YOUR_WEATHER");

// 액션 생성함수
export const getMyWeather = createAction(
  GET_MY_WEATHER,
  (position) => position
);
export const getYourWeather = createAction(
  GET_YOUR_WEATHER,
  (position) => position
);

// 리듀서
const weather = handleActions(
  {
    [GET_MY_WEATHER_SUCCESS]: (state, { payload: myWeather }) => {
      console.log(myWeather);
      return {
        ...state,
        myWeather,
        weatherError: null,
      };
    },
    [GET_MY_WEATHER_FAILURE]: (state, { payload: weatherError }) => ({
      ...state,
      myWeather: null,
      weatherError,
    }),
    [GET_YOUR_WEATHER_SUCCESS]: (state, { payload: yourWeather }) => ({
      ...state,
      yourWeather,
      weatherError: null,
    }),
    [GET_YOUR_WEATHER_FAILURE]: (state, { payload: weatherError }) => ({
      ...state,
      weather: null,
      weatherError,
    }),
  },
  initialState
);

// 사가 미들웨어
const getMyWeatherSaga = createRequestSaga(
  GET_MY_WEATHER,
  weatherAPI.getWeather
);
const getYourWeatherSaga = createRequestSaga(
  GET_YOUR_WEATHER,
  weatherAPI.getWeather
);

export function* weatherSaga() {
  yield takeLatest(GET_MY_WEATHER, getMyWeatherSaga);
  yield takeLatest(GET_YOUR_WEATHER, getYourWeatherSaga);
}

export default weather;
