import { createAction, handleActions } from "redux-actions";

const start = new Date();

// 상태 초기값
const initialState = {
  currentRange: {
    year: start.getFullYear(),
    month: start.getMonth() + 1, //월은 0부터 시작한다...
    isToday: true,
  },
  calendarDataFormPopup: {
    type: "",
    isOpen: false,
  },
};

// 액션타입 정의
const RENDER_CALENDAR = "tuiCalendar/RENDER_CALENDAR";
const MOVE_TO_NEXT_RANGE = "tuiCalendar/MOVE_TO_NEXT_RANGE";
const MOVE_TO_PREV_RANGE = "tuiCalendar/MOVE_TO_PREV_RANGE";
const MOVE_TO_TODAY = "tuiCalendar/MOVE_TO_TODAY";
const TOGGLE_POPUP = "tuiCalendar/TOGGLE_POPUP";
const CHANGE_TYPE = "tuiCalendar/CHANGE_TYPE";

// 액션 생성함수
export const renderCalendar = createAction(RENDER_CALENDAR, (date) => date);
export const moveToNextRange = createAction(
  MOVE_TO_NEXT_RANGE,
  (currentCalendar) => currentCalendar
);
// 이친구랑 같은 뜻
// export const moveToNextRange = (currentCalendar) => ({
//   type: MOVE_TO_NEXT_RANGE,
//   payload: currentCalendar,
// });
export const moveToPrevRange = createAction(
  MOVE_TO_PREV_RANGE,
  (currentCalendar) => currentCalendar
);
export const moveToToday = createAction(
  MOVE_TO_TODAY,
  (currentCalendar) => currentCalendar
);
export const togglePopup = createAction(TOGGLE_POPUP);
export const changeType = createAction(CHANGE_TYPE, (type) => type);
// 리듀서
const calendar = handleActions(
  {
    [RENDER_CALENDAR]: (state, { payload: date }) => ({
      ...state,
      currentRange: {
        ...state.currentRange,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        isToday:
          start.getFullYear() === date.getFullYear() &&
          start.getMonth() === date.getMonth()
            ? true
            : false,
      },
    }),
    [MOVE_TO_NEXT_RANGE]: (state, { payload: currentCalendar }) => {
      // console.log(state);
      // console.log(currentCalendar);
      // console.log("is in?");
      currentCalendar.calendarInst.next();
      const nextDate = currentCalendar.calendarInst.getDate()._date;
      console.dir(start);
      console.dir(nextDate);
      return {
        ...state,
        currentRange: {
          year: nextDate.getFullYear(),
          month: nextDate.getMonth() + 1,
          isToday:
            start.getFullYear() === nextDate.getFullYear() &&
            start.getMonth() === nextDate.getMonth()
              ? true
              : false,
        },
      };
    },
    [MOVE_TO_PREV_RANGE]: (state, { payload: currentCalendar }) => {
      currentCalendar.calendarInst.prev();
      const prevDate = currentCalendar.calendarInst.getDate()._date;
      return {
        ...state,
        currentRange: {
          year: prevDate.getFullYear(),
          month: prevDate.getMonth() + 1,
          isToday:
            start.getFullYear() === prevDate.getFullYear() &&
            start.getMonth() === prevDate.getMonth()
              ? true
              : false,
        },
      };
    },
    [MOVE_TO_TODAY]: (state, { payload: currentCalendar }) => {
      currentCalendar.calendarInst.today();
      return {
        ...state,
        currentRange: {
          year: start.getFullYear(),
          month: start.getMonth() + 1,
          isToday: true,
        },
      };
    },
    [TOGGLE_POPUP]: (state) => ({
      ...state,
      calendarDataFormPopup: {
        ...state.calendarDataFormPopup,
        isOpen: !state.calendarDataFormPopup.isOpen,
      },
    }),
    [CHANGE_TYPE]: (state, { payload: type }) => {
      console.log(type);
      return {
        ...state,
        calendarDataFormPopup: {
          ...state.calendarDataFormPopup,
          type: type,
        },
      };
    },
  },
  initialState
);

export default calendar;
