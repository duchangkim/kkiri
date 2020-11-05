//put 은 dispatch와 같음 call은 함수를 실행시켜준다 (call은 동기실행 fork는 비동기)
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

// type을 받아서 type_SUCCESS type_FAILURE 만들어서 type과 배열로 반환함
export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

// type은 액션타입 request는 api호출 함수 (axios)
export default function createRequestSaga(type, request) {
  console.log("tlqkf!!@#!@#!@#!@#!@#!@#!@#");
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));

    try {
      // request는 api 호출함수,
      const response = yield call(request, action.payload);
      console.log(response);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
