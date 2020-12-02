import Calendar from "../../models/calendar";

export const getDdayList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const dDay = calendar.calendarData.schedules.filter(
      (calendar) => calendar.calendarId === "dday"
    );

    ctx.body = dDay;
  } catch (e) {
    ctx.throw(500, e);
  }
};
