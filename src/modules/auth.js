import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
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
  connection: {
    otherUserCode: '',
  },
  findid: {
    birthday: '',
    name: '',
    hp: '',
    isSuccess: false,
    findEmail: '',
  },
  findpw: {
    birthday: '',
    email: '',
    hp: '',
    isSuccess: false,
    findEmail: '',
  },
  auth: null,
  authError: null,
  emailAuthentication: null,
  emailAuthenticationError: null,
  otherMember: null,
  otherMemberError: null,
};

// 액션 타입 정의
const INITIALIZE_ALL = 'auth/INITIALIZE_ALL';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const SUPER_INITIALIZE = 'auth/SUPER_INITIALIZE';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
const [
  SEND_EMAIL_AUTHENTICATION_CODE,
  SEND_EMAIL_AUTHENTICATION_CODE_SUCCESS,
  SEND_EMAIL_AUTHENTICATION_CODE_FAILURE,
] = createRequestActionTypes('auth/SEND_EMAIL_AUTHENTICATION_CODE');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);
const [
  FIND_OTHER_MEMBER,
  FIND_OTHER_MEMBER_SUCCESS,
  FIND_OTHER_MEMBER_FAILURE,
] = createRequestActionTypes('auth/FIND_OTHER_MEMBER');
const [
  CREATE_COUPLE_SET1,
  CREATE_COUPLE_SET1_SUCCESS,
  CREATE_COUPLE_SET1_FAILURE,
] = createRequestActionTypes('auth/CREATE_COUPLE_SET');
const [FINDID, FINDID_SUCCESS, FINDID_FAILURE] = createRequestActionTypes(
  'auth/FINDID'
);
const [FINDPW, FINDPW_SUCCESS, FINDPW_FAILURE] = createRequestActionTypes(
  'auth/FINDPW'
);

// 액션 생성함수 정의
export const initializeAll = createAction(INITIALIZE_ALL);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const superInitialize = createAction(SUPER_INITIALIZE);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);
export const login = createAction(LOGIN, (form) => form);
export const sendEmailAuthenticationCode = createAction(
  SEND_EMAIL_AUTHENTICATION_CODE,
  (email) => email
  //{ payload: "41@a.com" }
);
export const register = createAction(REGISTER, (form) => form);
export const findOtherMember = createAction(
  FIND_OTHER_MEMBER,
  (otherUserCode) => otherUserCode
);
export const createCoupleSet = createAction(CREATE_COUPLE_SET1, (_id) => _id);
export const findid = createAction(FINDID, ({ birthday, name, hp }) => ({
  birthday,
  name,
  hp,
}));
export const findpw = createAction(FINDPW, ({ birthday, email, hp }) => ({
  birthday,
  email,
  hp,
}));

// 리듀서 (액션을 발생시키는 함수)
const auth = handleActions(
  {
    [INITIALIZE_ALL]: (state) => ({
      ...state,
      auth: null,
      authError: null,
      emailAuthentication: null,
      emailAuthenticationError: null,
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [SUPER_INITIALIZE]: (state) => ({
      ...state,
      auth: null,
      authError: null,
      emailAuthentication: null,
      emailAuthenticationError: null,
      otherMember: null,
      otherMemberError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
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
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [FIND_OTHER_MEMBER_SUCCESS]: (state, { payload: otherMember }) => ({
      ...state,
      otherMember,
      otherMemberError: null,
    }),
    [FIND_OTHER_MEMBER_FAILURE]: (state, { payload: otherMemberError }) => ({
      ...state,
      otherMember: null,
      otherMemberError,
    }),
    [CREATE_COUPLE_SET1_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [CREATE_COUPLE_SET1_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [FINDID_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      authError: null,
      findid: {
        isSuccess: true,
        findEmail: result.findEmail,
      },
    }),
    [FINDID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [FINDPW_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      authError: null,
      findpw: {
        isSuccess: true,
        findEmail: result.findEmail,
      },
    }),
    [FINDPW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

// 사가함수, 미들웨어 정의
const loginSaga = createRequestSaga(LOGIN, authAPI.emailLogin);
const sendEmailAuthenticationCodeSaga = createRequestSaga(
  SEND_EMAIL_AUTHENTICATION_CODE,
  authAPI.sendEmailAuthenticationCode
);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const findOtherMemberSaga = createRequestSaga(
  FIND_OTHER_MEMBER,
  authAPI.findOtherMember
);
const createCoupleSetSaga = createRequestSaga(
  CREATE_COUPLE_SET1,
  authAPI.createCoupleSet
);
const findidSaga = createRequestSaga(FINDID, authAPI.findid);
const findpwSaga = createRequestSaga(FINDPW, authAPI.findpw);

export function* authSaga() {
  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(SEND_EMAIL_AUTHENTICATION_CODE, sendEmailAuthenticationCodeSaga),
    takeLatest(REGISTER, registerSaga),
    takeLatest(FIND_OTHER_MEMBER, findOtherMemberSaga),
    takeLatest(CREATE_COUPLE_SET1, createCoupleSetSaga),
    takeLatest(FINDID, findidSaga),
    takeLatest(FINDPW, findpwSaga),
  ]);
}

export default auth;
