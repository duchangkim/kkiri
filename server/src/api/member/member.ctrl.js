import Member from '../../models/member';
import Calendar from '../../models/calendar';

export const getMyCouple = async (ctx) => {
  const { coupleId } = ctx.params;

  try {
    const member = await Member.findById({ _id: coupleId });

    ctx.body = await member.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const insertPosition = async (ctx) => {
  const { _id } = ctx.state.member;
  const { latitude, longitude } = ctx.request.body;

  try {
    const member = await Member.findById({ _id });
    await member.insertPosition({
      latitude,
      longitude,
    });
    await member.save();

    ctx.body = await member.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const insertGetTogetherDate = async (ctx) => {
  const { _id, coupleId, coupleShareCode } = ctx.state.member;
  const { getTogetherDate } = ctx.request.body;
  const getTogetherDateObj = new Date(getTogetherDate);
  const getTogetherDday = {
    id: 'l',
    calendarId: 'dday',
    title: '우리 함께한지',
    isAllDay: true,
    start: getTogetherDateObj,
    end: getTogetherDateObj,
    category: 'allday',
    location: '너 마음속',
    raw: {
      class: 'public',
    },
    state: 'Free',
  };

  try {
    const member = await Member.findById(_id);
    const otherMember = await Member.findById(coupleId);

    member.insertGetTogetherDate(getTogetherDateObj);
    otherMember.insertGetTogetherDate(getTogetherDateObj);

    await member.save();
    await otherMember.save();

    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    calendar.insertGetTogetherDday(getTogetherDday);

    await calendar.save();

    ctx.body = await member.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
