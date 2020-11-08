import { createAction, handleActions } from "redux-actions";

const MOVE_TO_NEXT_RANGE = "MOVE_TO_NEXT_RANGE";
const MOVE_TO_PREV_RANGE = "MOVE_TO_PREV_RANGE";
const MOVE_TO_TODAY = "MOVE_TO_TODAY";

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

const start = new Date();
const initialState = {
  year: start.getFullYear(),
  month: start.getMonth() + 1, //월은 0부터 시작한다...
  isToday: true,
};

const calendar = handleActions(
  {
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
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        isToday:
          start.getFullYear() === nextDate.getFullYear() &&
          start.getMonth() === nextDate.getMonth()
            ? true
            : false,
      };
    },
    [MOVE_TO_PREV_RANGE]: (state, { payload: currentCalendar }) => {
      currentCalendar.calendarInst.prev();
      const prevDate = currentCalendar.calendarInst.getDate()._date;
      return {
        ...state,
        year: prevDate.getFullYear(),
        month: prevDate.getMonth() + 1,
        isToday:
          start.getFullYear() === prevDate.getFullYear() &&
          start.getMonth() === prevDate.getMonth()
            ? true
            : false,
      };
    },
    [MOVE_TO_TODAY]: (state, { payload: currentCalendar }) => {
      currentCalendar.calendarInst.today();
      return {
        ...state,
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        isToday: true,
      };
    },
  },
  initialState
);

export default calendar;
