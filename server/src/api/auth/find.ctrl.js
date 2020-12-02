import Member from '../../models/member';

export const findid = async (ctx) => {
  const { birthday, name, hp } = ctx.request.body;

  if (!birthday || !name || !hp) {
    ctx.status = 401;
    return;
  }
  try {
    const member = await Member.findByMemberInfo(birthday, name, hp);
    const serializedMember = member.serialize();

    ctx.body = serializedMember;
    const findEmail = ctx.body.email;
    ctx.body = { message: 'success', findEmail };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const findpw = async (ctx) => {
  const { birthday, email, hp } = ctx.request.body;

  if (!birthday || !email || !hp) {
    ctx.status = 401;
    return;
  }
  try {
    const member = await Member.findBypasswordInfo(birthday, email, hp);
    const serializedMember = member.serialize();
    ctx.body = serializedMember;

    const findEmail = ctx.body.email;
    ctx.body = { message: 'success', findEmail };
  } catch (e) {
    ctx.throw(500, e);
  }
};
