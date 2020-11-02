import { createAction, handleActions } from "redux-actions";

//액션타입 정의
const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

//createAtcion(액션타입, payload생성함수)
export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);
/*
  startLoading(auth/LOGIN) 이걸 실행하면
  {
    type: "START_LOADING",
    payload: auth/LOGIN
  }
*/
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

//초기값 설정
const initialState = {};

//리듀서
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => {
      console.log(state);
      console.log(action);
      return {
        ...state,
        [action.payload]: true,
      };
    },
    [FINISH_LOADING]: (state, action) => {
      console.log(state);
      console.log(action);
      return {
        ...state,
        [action.payload]: false,
      };
    },
  },
  initialState
);

export default loading;

// const _loading = (state, action) => {
//   switch (action.type) {
//     case START_LOADING:
//       return {
//         ...state,
//         : true,
//       }
//     default:
//       return state;
//   }
// };
