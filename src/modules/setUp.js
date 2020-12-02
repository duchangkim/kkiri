import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as setUpAPI from '../lib/api/setUp';

// 액션타입 정의
const CHANGE_FIELD = 'setup/CHANGE_FIELD';
const INITIALIZE_FORM = 'setup/INITIALIZE_FORM';

const [
  CHANGEPASSWORD,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE,
] = createRequestActionTypes('setup/CHANGEPASSWORD');

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
  ({ findEmail, password }) => {
    console.log(findEmail);
    return {
      findEmail,
      password,
    };
  }
);
const changepasswordSaga = createRequestSaga(
  CHANGEPASSWORD,
  setUpAPI.changepassword
);

export function* setupSaga() {
  yield takeLatest(CHANGEPASSWORD, changepasswordSaga);
}

const initialState = {
  changepassword: {
    password: '',
    passwordConfirm: '',
    findEmail: '',
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
    [CHANGEPASSWORD_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      authError: null,
      setUp,
      changepassword: {
        isSuccess: true,
        findEmail: result.findEmail,
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
