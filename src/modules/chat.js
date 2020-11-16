import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as chatAPI from "../lib/api/chat";
import { takeLatest, all } from "redux-saga/effects";

// 상태 초기값
const initialState = {
  messageList: [],
  messageListError: null,
  insertMessageListResult: false,
};

// 액션 타입 정의
const [GET_MESSAGE_LIST, GET_MESSAGE_LIST_SUCCESS, GET_MESSAGE_LIST_FAILURE] = createRequestActionTypes(
  "chat/GET_MESSAGE_LIST"
);
const [
  INSERT_MESSAGE_LIST, 
  INSERT_MESSAGE_LIST_SUCCESS, 
  INSERT_MESSAGE_LIST_FAILURE
] = createRequestActionTypes('chat/INSERT_MESSAGE_LIST');

// 액션 생성함수 정의
export const getMessageList = createAction(GET_MESSAGE_LIST, (limit) => ({ limit }));
export const insertMessageList = createAction(INSERT_MESSAGE_LIST, (messageList) => messageList)
console.log(insertMessageList([1, 2, 3]))

// 리듀서
const chat = handleActions(
  {
    [GET_MESSAGE_LIST_SUCCESS]: (state, { payload: messageList }) => ({
      ...state,
      messageList,
      messageListError: null,
    }),
    [GET_MESSAGE_LIST_FAILURE]: (state, { payload: messageListError }) => ({
      ...state,
      messageList: null,
      messageListError,
    }),
    [INSERT_MESSAGE_LIST_SUCCESS]: (state) => ({
      ...state,
      insertMessageListResult: true
    }),
    [INSERT_MESSAGE_LIST_FAILURE]: (state) => ({
      ...state,
      insertMessageListResult: false
    }),
  },
  initialState
);

// 사가함수
const getChatListSaga = createRequestSaga(GET_MESSAGE_LIST, chatAPI.getMessageList);
const insertMessageListSaga = createRequestSaga(INSERT_MESSAGE_LIST, chatAPI.insertMessageList)

export function* chatSaga() {
  yield all([
    takeLatest(GET_MESSAGE_LIST, getChatListSaga),
    takeLatest(INSERT_MESSAGE_LIST, insertMessageListSaga),
  ]);
}

export default chat;
