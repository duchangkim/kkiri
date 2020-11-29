import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as settingAPI from "../lib/api/setting";
import { takeLatest } from "redux-saga/effects";

const [
  READ_SETTING,
  READ_SETTING_SUCCESS,
  READ_SETTING_FAILURE,
] = createRequestActionTypes("setting/READ_SETTING");
const UNLOAD_SETTING = "setting/UNLOAD_SETTING";

export const readSetting = createAction(READ_SETTING, (email) => email);
export const unloadSetting = createAction(UNLOAD_SETTING);

const readSettingSaga = createRequestSaga(READ_SETTING, settingAPI.readSetting);
export function* settingSaga() {
  yield takeLatest(READ_SETTING, readSettingSaga);
}

const initialState = {
  post: null,
  error: null,
};

const setting = handleActions(
  {
    [READ_SETTING_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_SETTING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_SETTING]: () => initialState,
  },
  initialState
);

export default setting;
