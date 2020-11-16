import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as chatAPI from "../lib/api/chat";
import { takeLatest, all } from "redux-saga/effects";

// 상태 초기값
const initialState = {
  messageList: [],
  messageListError: null,
};

// 액션 타입 정의
const [GET_CHAT_LIST, GET_CHAT_LIST_SUCCESS, GET_CHAT_LIST_FAILURE] = createRequestActionTypes(
  "chat/GET_CHAT_LIST"
);

// 액션 생성함수 정의
export const getChatList = createAction(GET_CHAT_LIST, (limit) => ({ limit }));

// 리듀서
const chat = handleActions(
  {
    [GET_CHAT_LIST_SUCCESS]: (state, { payload: messageList }) => ({
      ...state,
      messageList,
      messageListError: null,
    }),
    [GET_CHAT_LIST_FAILURE]: (state, { payload: messageListError }) => ({
      ...state,
      messageList: null,
      messageListError,
    }),
  },
  initialState
);

// 사가함수
const getChatListSaga = createRequestSaga(GET_CHAT_LIST, chatAPI.getMessageList);

export function* chatSaga() {
  yield all([takeLatest(GET_CHAT_LIST, getChatListSaga)]);
}

export default chat;
