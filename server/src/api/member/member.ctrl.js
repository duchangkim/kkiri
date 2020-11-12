import Member from '../../models/member';

export const getMyCouple = async (ctx) => {
  const { coupleId } = ctx.state.member;

  try {
    const member = await Member.findById({ _id: coupleId });

    ctx.body = member.serialize();
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
