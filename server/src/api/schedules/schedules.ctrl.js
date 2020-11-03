import Joi from "joi";
import Calendar from "../../models/calendar";

// 스케쥴 CRUD
export const createSchedule = async (ctx) => {
  console.log(ctx.request.body);
  const { coupleShareCode } = ctx.state.member;
  const validateSchedule = Joi.object().keys({
    calendarId: Joi.number().required(),
    category: Joi.string(),
    raw: Joi.object().required(),
    title: Joi.string().required(),
    location: Joi.string().allow(""),
    isAllDay: Joi.boolean(),
    state: Joi.string(),
    start: Joi.required(),
    end: Joi.required(),
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
    category,
    raw,
    title,
    location,
    start,
    end,
  } = ctx.request.body;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);

    const result = await calendar.createCalendarData("schedules", {
      calendarId,
      category,
      raw,
      title,
      location,
      start: new Date(start),
      end: new Date(end),
    });

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchduleList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;

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
  const numberScheduleId = parseInt(scheduleId);

  if (isNaN(numberScheduleId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.getCaledarDataByTargetId(
      "schedules",
      numberScheduleId
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
  const numberScheduleId = parseInt(scheduleId);

  if (isNaN(numberScheduleId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.deleteCalendarDataByTargetId(
      "schedules",
      numberScheduleId
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
  const numberScheduleId = parseInt(scheduleId);

  if (isNaN(numberScheduleId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  const {
    id,
    calendarId,
    category,
    raw,
    title,
    location,
    start,
    end,
    isAllDay,
    state,
  } = ctx.request.body;

  console.log(
    `${id},${calendarId}, ${category}, ${raw}, ${title}, ${location}, ${start}, ${end}, ${isAllDay}, ${state},`
  );

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const currentSchedule = await calendar.calendarData.schedules.find(
      (schedule) => schedule.id === numberScheduleId
    );

    if (!currentSchedule) {
      ctx.status = 409;
      return;
    }

    const modifiedSchedule = {
      id: currentSchedule.id,
      calendarId: calendarId ? calendarId : currentSchedule.calendarId,
      category: category ? category : currentSchedule.category,
      raw: raw ? raw : currentSchedule.raw,
      title: title ? title : currentSchedule.title,
      location: location ? location : currentSchedule.location,
      start: start ? start : currentSchedule.start,
      end: end ? end : currentSchedule.end,
    };
    const result = await calendar.modifyCalendarDataByTargetId(
      "schedules",
      numberScheduleId,
      modifiedSchedule
    );

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};
