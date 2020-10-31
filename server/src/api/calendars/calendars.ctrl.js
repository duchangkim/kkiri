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

  await calendars.push(newCalendars); //기존의 캘린더배열에 추가
  // console.log(calendars);
  await calendar.save(); //저⭐장

  ctx.body = calendars;
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
  const numberCalendarsId = parseInt(calendarsId);

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
    const result = await calendar.deleteCalendarData(
      "calendars",
      numberCalendarsId
    );

    await calendar.save();

    ctx.body = result;
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
