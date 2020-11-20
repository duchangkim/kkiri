import Member from '../../models/member';

export const removeMember = async (ctx) => {
  console.log("여디ㅣ잉니;ㅇㅁ나ㅓ임나ㅓ이ㅏㅁ너ㅏ이ㅓㅁ");
  const { email } = ctx.params;
  console.log(`email :  ${email}`);
  console.log('계정 타ㅣㄹ퇴요청받음')
  try {
    await Member.findByEmail(email).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};