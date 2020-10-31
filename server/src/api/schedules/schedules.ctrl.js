import Joi from "joi";
import Calendar from "../../models/calendar";

// 스케쥴 CRUD
export const createSchedules = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const validateSchedule = Joi.object().keys({
    category: Joi.string(),
    isVisible: Joi.boolean().required(),
    title: Joi.string().required(),
    calendarId: Joi.number().required(),
    body: Joi.string().required(),
    location: Joi.string(),
    start: Joi.date().required(),
    end: Joi.date().required(),
  });
  const result = validateSchedule.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    calendarId,
    category,
    isVisible,
    title,
    body,
    location,
    start,
    end,
  } = ctx.request.body;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const newSchedules = {
      calendarId,
      id:
        calendar.calendarData.schedules[
          calendar.calendarData.schedules.length - 1
        ].id + 1 || 0,
      category,
      isVisible,
      title,
      body,
      location,
      start,
      end,
    };

    await calendar.createSchedules(newSchedules);
    await calendar.save();

    ctx.body = calendar.calendarData.schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchdulesList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const schedules = calendar.calendarData.schedules;

    ctx.body = schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchdules = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { schedulesId } = ctx.params;
  //Number("123원") > NaN, parseInt("123원") > 123
  const numberSchedulesId = parseInt(schedulesId);

  if (isNaN(numberSchedulesId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const schedules = calendar.calendarData.schedules;
    const findResult = schedules.find((item) => item.id === numberSchedulesId);

    if (!findResult) {
      ctx.status = 409;
      return;
    }

    ctx.body = findResult;
  } catch (e) {
    ctx.throw(500, e);
  }
};
