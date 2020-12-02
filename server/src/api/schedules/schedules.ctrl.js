import Joi from "joi";
import Calendar from "../../models/calendar";

// 스케쥴 CRUD
export const createSchedule = async (ctx) => {
  // console.log(ctx.request.body);
  const { coupleShareCode } = ctx.state.member;
  const validateSchedule = Joi.object().keys({
    calendarId: Joi.required(),
    title: Joi.string().required(),
    isAllDay: Joi.boolean(),
    start: Joi.required(),
    end: Joi.required(),
    category: Joi.string(),
    location: Joi.string().allow(""),
    raw: Joi.object().required(),
    state: Joi.string(),
  });
  const result = validateSchedule.validate(ctx.request.body);

  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    calendarId,
    title,
    isAllDay,
    start,
    end,
    category,
    location,
    raw,
    state,
  } = ctx.request.body;
  // console.log('123123123123123');
  // console.log(typeof calendarId);

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);

    const result = await calendar.createCalendarData("schedules", {
      calendarId,
      title,
      isAllDay,
      start: new Date(start),
      end: new Date(end),
      category,
      location,
      raw,
      state,
    });

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchduleList = async (ctx) => {
  // console.log('=========================');
  // console.log(ctx.state.member.coupleShareCode);
  // console.log(ctx.state.member);
  // console.log('=========================');

  const { coupleShareCode } = ctx.state.member;
  // console.log(coupleShareCode);

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const schedules = calendar.calendarData.schedules;

    ctx.body = schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchdule = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { scheduleId } = ctx.params;
  //Number("123원") > NaN, parseInt("123원") > 123

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.getCaledarDataByTargetId(
      "schedules",
      scheduleId
    );

    if (!result) {
      ctx.status = 409;
      return;
    }

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteSchedule = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { scheduleId } = ctx.params;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.deleteCalendarDataByTargetId(
      "schedules",
      scheduleId
    );

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const modifySchedule = async (ctx) => {
  console.log(ctx.request.body);
  const { coupleShareCode } = ctx.state.member;
  const { scheduleId } = ctx.params;
  const {
    calendarId,
    title,
    isAllDay,
    start,
    end,
    location,
    raw,
    state,
  } = ctx.request.body;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const currentSchedule = await calendar.calendarData.schedules.find(
      (schedule) => schedule.id === scheduleId
    );

    if (!currentSchedule) {
      ctx.status = 409;
      return;
    }

    const modifiedSchedule = {
      id: currentSchedule.id,
      calendarId: calendarId ? calendarId : currentSchedule.calendarId,
      category:
        isAllDay !== undefined
          ? isAllDay
            ? "allday"
            : "time"
          : currentSchedule.category,
      raw: raw ? raw : currentSchedule.raw,
      title: title ? title : currentSchedule.title,
      location: location ? location : currentSchedule.location,
      start: start ? start : currentSchedule.start,
      end: end ? end : currentSchedule.end,
      state: state ? state : currentSchedule.state,
    };
    const result = await calendar.modifyCalendarDataByTargetId(
      "schedules",
      scheduleId,
      modifiedSchedule
    );

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};
