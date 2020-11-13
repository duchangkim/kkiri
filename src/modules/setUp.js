import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as setUpAPI from '../lib/api/setUp';

// 액션타입 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [
  CHANGEPASSWORD,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE,
] = createRequestActionTypes('auth/CHANGEPASSWORD');

// 액션 생성함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const changepassword = createAction(
  CHANGEPASSWORD,
  (password) => password,
);

const changepasswordSaga = createRequestSaga(
  CHANGEPASSWORD,
  setUpAPI.changepassword
);

export function* authSaga() {
  yield takeLatest(CHANGEPASSWORD, changepasswordSaga);
}

const initialState = {
  changepassword: {
    password: '',
    passwordConfirm: '',
    isSuccess: false,
  },
};

// 리듀서
const setUp = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [CHANGEPASSWORD_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
      changepassword: {
        isSuccess: true,
      },
    }),
    [CHANGEPASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default setUp;
