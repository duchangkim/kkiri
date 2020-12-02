import Member from '../../models/member';

export const removeMember = async (ctx) => {
  const { email } = ctx.params;
  try {
    const result = await Member.findOneAndRemove({ email: `${email}` });

    ctx.body = result;
    ctx.status = 204; // 성공했지만 응답할 데이터 없음
  } catch (e) {
    ctx.throw(500, e);
  }
};
