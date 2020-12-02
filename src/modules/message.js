import { createAction, handleActions } from "redux-actions";

// 상태 초기값
const initialState = {
  messages: [],
  messagesError: null,
};

// 액션 타입 정의
const INITIALIZE = "message/INITIALIZE";
const SET_MESSAGES = "message/SET_MESSAGES";

// 액션 생성함수 정의
export const setMessages = createAction(SET_MESSAGES, (message) => message);
export const initialize = createAction(INITIALIZE);

// 리듀서
const message = handleActions(
  {
    [INITIALIZE]: (state) => ({
      ...state,
      messages: [],
    }),
    [SET_MESSAGES]: (state, { payload: message }) => {
      console.log(message);

      if (Array.isArray(message)) {
        return {
          ...state,
          messages: [...state.messages, ...message]
            .filter((item, index) => {
              return (
                [...state.messages, ...message].findIndex((item2, index2) => {
                  return (
                    new Date(item.sendDate).getTime() ===
                    new Date(item2.sendDate).getTime()
                  );
                }) === index
              );
            })
            .sort((a, b) => {
              const aDate = new Date(a.sendDate);
              const bDate = new Date(b.sendDate);
              return aDate - bDate;
            }),
        };
      }

      return {
        ...state,
        messages: state.messages.concat(message),
      };
    },
  },
  initialState
);

export default message;
