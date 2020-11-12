import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

// 액션타입 정의
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGISTER"
);
const [
  REGISTERCODE,
  REGISTERCODE_SUCCESS,
  REGISTERCODE_FAILURE,
] = createRequestActionTypes("auth/REGISTERCODE");
const [
  REGISTEREMAIl,
  REGISTEREMAIl_SUCCESS,
  REGISTEREMAIl_FAILURE,
] = createRequestActionTypes("auth/REGISTEREMAIl");
const [
  REGISTERCOUPLE,
  REGISTERCOUPLE_SUCCESS,
  REGISTERCOUPLE_FAILURE,
] = createRequestActionTypes("auth/REGISTERCOUPLE");
const [
  CREATECOUPLESET,
  CREATECOUPLESET_SUCCESS,
  CREATECOUPLESET_FAILURE,
] = createRequestActionTypes("auth/CREATECOUPLESET");

const [FINDID, FINDID_SUCCESS, FINDID_FAILURE] = createRequestActionTypes(
  "auth/FINDID"
);
const [FINDPW, FINDPW_SUCCESS, FINDPW_FAILURE] = createRequestActionTypes(
  "auth/FINDPW"
);

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

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));
export const register = createAction(
  REGISTER,
  ({ email, password, birthday, name, hp }) => ({
    email,
    password,
    birthday,
    name,
    hp,
  })
);
export const registercode = createAction(REGISTERCODE, (emailcode) => ({
  emailcode,
}));
export const registeremail = createAction(REGISTEREMAIl, (email) => ({
  email,
}));
//커플 코드 입력 페이지
export const registercouple = createAction(
  REGISTERCOUPLE,
  (couplecode) => couplecode
);
export const createCoupleSet = createAction(CREATECOUPLESET, (_id) => ({_id}));

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

// saga함수
const loginSaga = createRequestSaga(LOGIN, authAPI.localLogin);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const registerCodeSaga = createRequestSaga(REGISTERCODE, authAPI.registercode);
const registerEmailSaga = createRequestSaga(
  REGISTEREMAIl,
  authAPI.registeremail
);
const registercoupleSaga = createRequestSaga(
  REGISTERCOUPLE,
  authAPI.registercouple
);
const createCoupleSetSaga = createRequestSaga(
  CREATECOUPLESET,
  authAPI.createCoupleSet
);

const findidSaga = createRequestSaga(FINDID, authAPI.findid);
const findpwSaga = createRequestSaga(FINDPW, authAPI.findpw);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(REGISTERCODE, registerCodeSaga);
  yield takeLatest(REGISTEREMAIl, registerEmailSaga);
  yield takeLatest(REGISTERCOUPLE, registercoupleSaga);
  yield takeLatest(CREATECOUPLESET, createCoupleSetSaga);
  yield takeLatest(FINDID, findidSaga);
  yield takeLatest(FINDPW, findpwSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// 초기값
const initialState = {
  register: {
    email: "",
    password: "",
    passwordConfirm: "",
    birthday: "",
    name: "",
    hp: "",
    isSuccess: false,
  },
  registeremail: {
    isSuccess: false,
    email: "",
  },
  registercode: {
    isSuccess: false,
  },
  registercouple: {
    isSuccess: false,
    couplecode: "",
    error: null,
  },
  login: {
    email: "",
    password: "",
  },
  createCoupleSet: {
    id: "",
  },
  findid: {
    birthday: "",
    name: "",
    hp: "",
    isSuccess: false,
    findEmail:"",
  },
  findpw: {
    birthday: "",
    email: "",
    hp: "",
    isSuccess: false,
  },
};

// 리듀서
const auth = handleActions(
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
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
      register: {
        isSuccess: true,
      },
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTEREMAIl_SUCCESS]: (state, { payload: auth }) => {
      console.log("~~~~~~~~~~~~~~!@#!@#!@#!#!@#");
      console.log(auth);
      console.log("~~~~~~~~~~~~~~!@#!@#!@#!#!@#");
      return {
        ...state,
        authError: null,
        registeremail: {
          isSuccess: true,
          email: auth.email,
        },
        register: {
          email: auth.email,
          password: "",
          passwordConfirm: "",
          birthday: "",
          name: "",
          hp: "",
          isSuccess: true,
        },
      };
    },
    [REGISTEREMAIl_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTERCODE_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      registercode: {
        isSuccess: true,
      },
    }),
    [REGISTERCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTERCOUPLE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTERCOUPLE_SUCCESS]: (state, { payload: otherMember }) => {
      console.log(otherMember);
      return {
        ...state,
        authError: null,
        registercouple: {
          otherMember,
          isSuccess: true,
        },
      };
    },
    [CREATECOUPLESET_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [CREATECOUPLESET_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [FINDID_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      authError: null,
      auth,
      findid: {
        isSuccess: true,
        findEmail: result.findEmail,
      },
    }),
    [FINDID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [FINDPW_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
      findpw: {
        isSuccess: true,
      },
    }),
    [FINDPW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
