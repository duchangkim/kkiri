import { createAction, handleActions } from 'redux-actions';
import io from 'socket.io-client';

// 상태 초기값
const initialState = {
  socket: null,
  socketError: null,
};

// 액션 타입 정의
const CONNECTION_SOCKET = 'socket/CONNECTION_SOCKET';

// 액션 생성함수 정의
export const connectionSocket = createAction(
  CONNECTION_SOCKET,
  (coupleShareCode) => coupleShareCode
);

// 리듀서
const socket = handleActions(
  {
    [CONNECTION_SOCKET]: (state, { payload: coupleShareCode }) => {
      return {
        ...state,
        socket: io.connect('/').emit('joinRoom', coupleShareCode),
      };
    },
  },
  initialState
);

export default socket;
