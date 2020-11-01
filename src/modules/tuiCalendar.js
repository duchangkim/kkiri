const MOVE_TO_NEXT_RANGE = "MOVE_TO_NEXT_RANGE";
const MOVE_TO_PREV_RANGE = "MOVE_TO_PREV_RANGE";
const MOVE_TO_TODAY = "MOVE_TO_TODAY";

export const moveToNextRange = (currentCalendar) => ({
  type: MOVE_TO_NEXT_RANGE,
  currentCalendar,
});
export const moveToPrevRange = (currentCalendar) => ({
  type: MOVE_TO_PREV_RANGE,
  currentCalendar,
});
export const moveToToday = (currentCalendar) => ({
  type: MOVE_TO_TODAY,
  currentCalendar,
});

const start = new Date();
const initialState = {
  year: start.getFullYear(),
  month: start.getMonth() + 1, //월은 0부터 시작한다...
  isToday: true,
};

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case MOVE_TO_NEXT_RANGE:
      action.currentCalendar.calendarInst.next();
      const nextDate = action.currentCalendar.calendarInst.getDate()._date;
      console.dir(start);
      console.dir(nextDate);
      return {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        isToday:
          start.getFullYear() === nextDate.getFullYear() &&
          start.getMonth() === nextDate.getMonth()
            ? true
            : false,
      };
    case MOVE_TO_PREV_RANGE:
      action.currentCalendar.calendarInst.prev();
      const prevDate = action.currentCalendar.calendarInst.getDate()._date;
      return {
        year: prevDate.getFullYear(),
        month: prevDate.getMonth() + 1,
        isToday:
          start.getFullYear() === prevDate.getFullYear() &&
          start.getMonth() === prevDate.getMonth()
            ? true
            : false,
      };
    case MOVE_TO_TODAY:
      action.currentCalendar.calendarInst.today();
      return {
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        isToday: true,
      };
    default:
      return state;
  }
}
