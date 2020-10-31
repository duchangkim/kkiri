import Joi from "joi";
import Calendar from "../../models/calendar";

// 캘린더(필터) CRUD
export const createCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member; //로그인 정보에서 가져옴
  const { name, textColor, backgroundColor } = ctx.request.body; //파라메다
  const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
  const calendars = calendar.calendarData.calendars;
  // console.log(Array.isArray(calendars)); true

  // 추가할 캘린더
  const newCalendars = {
    id: calendars[calendars.length - 1].id + 1,
    name,
    color: textColor,
    bgColor: backgroundColor,
    dragBgColor: backgroundColor,
    borderColor: backgroundColor,
  };
  calendars.push(newCalendars); //기존의 캘린더배열에 추가
  // console.log(calendars);
  calendar.save(); //저⭐장
  // ctx.body = calendar;
  ctx.body = { message: "success" };
};

export const getCalendarsList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const calendars = calendar.calendarData.calendars;
    ctx.body = calendars;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { calendarsId } = ctx.params;
  const numberCalendarsId = Number(calendarsId);
  // console.log(isNaN(Number(calendarsId)));
  if (isNaN(numberCalendarsId)) {
    console.log("숫자를 달라..");
    ctx.status = 409;
    return;
  }
  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const calendars = calendar.calendarData.calendars;
    const findResult = calendars.find((item) => item.id === numberCalendarsId);
    // console.log(findResult); //없으면 undefined
    if (!findResult) {
      ctx.status = 409;
      return;
    }
    ctx.body = findResult;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { calendarsId } = ctx.params;
  const numberCalendarsId = Number(calendarsId);
  if (isNaN(numberCalendarsId)) {
    console.log("숫자를 달라..");
    ctx.status = 409;
    return;
  }
  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const calendars = calendar.calendarData.calendars;
    // console.log(typeof calendars[1].id); //number
    // console.log(typeof calendarsId); //string
    const newCalendars = calendars.filter(
      (item) => item.id !== numberCalendarsId
    );

    await calendar.changeCalendars(newCalendars);
    await calendar.save();
    ctx.body = newCalendars;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const modifyCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { name, textColor, backgroundColor } = ctx.request.body;

  const { calendarsId } = ctx.params;
  const numberCalendarsId = Number(calendarsId);
  if (isNaN(numberCalendarsId)) {
    console.log("숫자를 달라..");
    ctx.status = 409;
    return;
  }
  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const calendars = calendar.calendarData.calendars;
    const findResult = calendars.find((item) => item.id === numberCalendarsId);
    // console.log(findResult); //없으면 undefined
    if (!findResult) {
      ctx.status = 409;
      return;
    }
    const modifyCalendars = {
      id: findResult.id,
      name: name ? name : findResult.name,
      color: textColor ? textColor : findResult.color,
      bgColor: backgroundColor ? backgroundColor : findResult.bgColor,
      dragBgColor: backgroundColor ? backgroundColor : findResult.dragBgColor,
      borderColor: backgroundColor ? backgroundColor : findResult.borderColor,
    };
    // console.log(findResult);
    const newCalendar = calendars.map((item) =>
      item.id === numberCalendarsId ? modifyCalendars : item
    );

    await calendar.changeCalendars(newCalendar);
    await calendar.save();
    ctx.body = newCalendar;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 스케쥴 CRUD
// {
//   calendarId: "1",
//   category: "time",
//   isVisible: true,
//   title: "Study",
//   id: "1",
//   body: "Test",
//   start,
//   end,
// },

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
