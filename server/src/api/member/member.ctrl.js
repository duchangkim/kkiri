import Member from '../../models/member';

export const getMember = async (ctx) => {
  const { coupleId } = ctx.state.member;

  try {
    const member = await Member.findById({ _id: coupleId });

    ctx.body = member.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
