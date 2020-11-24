import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as _authAPI from '../lib/api/_auth';
import { all, takeLatest } from 'redux-saga/effects';

// 초기 상태 정의
const initialState = {
  login: {
    email: '',
    password: '',
  },
  register: {
    email: '',
    emailAuthenticationCode: '',
    password: '',
    passwordConfirm: '',
    name: '',
    birthday: '',
    hp: '',
  },
  auth: null,
  authError: null,
  emailAuthentication: null,
  emailAuthenticationError: null,
};

// 액션 타입 정의
const INITALIZE_ALL = '_auth/INITALIZE_ALL';
const INITALIZE_FORM1 = '_auth/INITALIZE_FORM';
const CHANGE_FIELD1 = '_auth/CHANGE_FIELD';
const [LOGIN1, LOGIN1_SUCCESS, LOGIN1_FAILURE] = createRequestActionTypes(
  '_auth/LOGIN'
);
const [
  SEND_EMAIL_AUTHENTICATION_CODE,
  SEND_EMAIL_AUTHENTICATION_CODE_SUCCESS,
  SEND_EMAIL_AUTHENTICATION_CODE_FAILURE,
] = createRequestActionTypes('_auth/SEND_EMAIL_AUTHENTICATION_CODE');
const [
  REGISTER1,
  REGISTER1_SUCCESS,
  REGISTER1_FAILURE,
] = createRequestActionTypes('_auth/REGISTER');

// 액션 생성함수 정의
export const initalizeAll = createAction(INITALIZE_ALL);
export const initalizeFrom = createAction(INITALIZE_FORM1, (form) => form);
export const changeField = createAction(
  CHANGE_FIELD1,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);
export const login = createAction(LOGIN1, (form) => form);
export const sendEmailAuthenticationCode = createAction(
  SEND_EMAIL_AUTHENTICATION_CODE,
  (email) => email
  //{ payload: "41@a.com" }
);
export const register = createAction(REGISTER1, (form) => form);

// 리듀서 (액션을 발생시키는 함수)
const _auth = handleActions(
  {
    [INITALIZE_ALL]: (state) => ({
      ...state,
      auth: null,
      authError: null,
      emailAuthentication: null,
      emailAuthenticationError: null,
    }),
    [INITALIZE_FORM1]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [CHANGE_FIELD1]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [LOGIN1_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN1_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [SEND_EMAIL_AUTHENTICATION_CODE_SUCCESS]: (
      state,
      { payload: emailAuthentication }
    ) => ({
      ...state,
      emailAuthentication,
      emailAuthenticationError: null,
    }),
    [SEND_EMAIL_AUTHENTICATION_CODE_FAILURE]: (
      state,
      { payload: emailAuthenticationError }
    ) => ({
      ...state,
      emailAuthentication: null,
      emailAuthenticationError,
    }),
    [REGISTER1_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER1_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  initialState
);

// 사가함수, 미들웨어 정의
const loginSaga = createRequestSaga(LOGIN1, _authAPI.emailLogin);
const sendEmailAuthenticationCodeSaga = createRequestSaga(
  SEND_EMAIL_AUTHENTICATION_CODE,
  _authAPI.sendEmailAuthenticationCode
);
const registerSaga = createRequestSaga(REGISTER1, _authAPI.register);

export function* _authSaga() {
  yield all([
    takeLatest(LOGIN1, loginSaga),
    takeLatest(SEND_EMAIL_AUTHENTICATION_CODE, sendEmailAuthenticationCodeSaga),
    takeLatest(REGISTER1, registerSaga),
  ]);
}

export default _auth;
