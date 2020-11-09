import Joi from 'joi';
import Calendar from '../../models/calendar';

// 캘린더(필터) CRUD
export const createCalendars = async (ctx) => {
  console.log('create cal call');
  const { coupleShareCode } = ctx.state.member; //로그인 정보에서 가져옴
  const validateCalendar = Joi.object().keys({
    name: Joi.string().required(),
    color: Joi.string().max(7).required(),
    bgColor: Joi.string().max(7).required(),
  });
  const result = validateCalendar.validate(ctx.request.body);

  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, color, bgColor } = ctx.request.body; //파라메다

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.createCalendarData('calendars', {
      name,
      color,
      bgColor,
      dragBgColor: bgColor,
      borderColor: bgColor,
    });

    await calendar.save(); //저⭐장

    ctx.body = result.map((calendar) => ({
      ...calendar,
      id: calendar.id.toString(),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getCalendarsList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const calendars = calendar.calendarData.calendars;

    console.log('``````````````요기가 캘린더리스트');
    console.log(
      calendars.map((calendar) => ({
        ...calendar,
        id: calendar.id.toString(),
      }))
    );
    ctx.body = calendars.map((calendar) => ({
      ...calendar,
      id: calendar.id.toString(),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// ---------------------------------------
export const getCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { calendarsId } = ctx.params;
  const numberCalendarsId = parseInt(calendarsId);

  if (isNaN(numberCalendarsId)) {
    console.log('숫자를 달라..');
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const findResult = await calendar.getCaledarDataByTargetId(
      'calendars',
      numberCalendarsId
    );

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
    console.log('숫자를 달라..');
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.deleteCalendarDataByTargetId(
      'calendars',
      numberCalendarsId
    );

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 캘린더 필터 수정
export const modifyCalendars = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { calendarsId } = ctx.params;
  const numberCalendarsId = Number(calendarsId);

  if (isNaN(numberCalendarsId)) {
    console.log('숫자를 달라..');
    ctx.status = 409;
    return;
  }
  const validateCalendar = Joi.object().keys({
    name: Joi.string(),
    color: Joi.string().max(7),
    bgColor: Joi.string().max(7),
    id: Joi.string(),
  });
  const result = validateCalendar.validate(ctx.request.body);

  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, color, bgColor } = ctx.request.body;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const currentCalendars = await calendar.calendarData.calendars.find(
      (calendar) => calendar.id === numberCalendarsId
    );

    if (!currentCalendars) {
      ctx.status = 409;
      return;
    }

    const modifiedCalendars = {
      id: currentCalendars.id,
      name: name ? name : currentCalendars.name,
      color: color ? color : currentCalendars.color,
      bgColor: bgColor ? bgColor : currentCalendars.bgColor,
      dragBgColor: bgColor ? bgColor : currentCalendars.dragBgColor,
      borderColor: bgColor ? bgColor : currentCalendars.borderColor,
    };

    const result = await calendar.modifyCalendarDataByTargetId(
      'calendars',
      numberCalendarsId,
      modifiedCalendars
    );

    await calendar.save();

    ctx.body = result.map((calendar) => ({
      ...calendar,
      id: calendar.id.toString(),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
