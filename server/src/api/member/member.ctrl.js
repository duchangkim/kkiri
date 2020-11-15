import Member from '../../models/member';
import Calendar from '../../models/calendar';

export const getMyCouple = async (ctx) => {
  const { coupleId } = ctx.params;

  console.log('여기 이거밑에꺼가 커플아이디여');
  console.log(coupleId);

  try {
    const member = await Member.findById({ _id: coupleId });

    ctx.body = await member.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const insertPosition = async (ctx) => {
  console.log('insertPosition() call');
  const { _id } = ctx.state.member;
  const { latitude, longitude } = ctx.request.body;

  console.log(ctx.request.body);
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
  // console.log('insertGetTogetherDate() call');
  const { _id, coupleId, coupleShareCode } = ctx.state.member;
  const { getTogetherDate } = ctx.request.body;
  const getTogetherDateObj = new Date(getTogetherDate);
  // console.log(ctx.request.body);
  // console.log(getTogetherDate);
  const getTogetherDday = {
    id: 'l',
    calendarId: 'dday',
    title: '우리 사귄지',
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
