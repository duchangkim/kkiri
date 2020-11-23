import Member from '../../models/member';

export const removeMember = async ctx => {
  console.log("여디ㅣ잉니;ㅇㅁ나ㅓ임나ㅓ이ㅏㅁ너ㅏ이ㅓㅁ");
  const { email } = ctx.params;
  console.log(`email :  ${email}`);
  console.log('계정 타ㅣㄹ퇴요청받음')
  try {
    const result = await Member.findOneAndRemove({ email: `${email }`});
    // const result = member.drop;

    ctx.body = result;
    console.log(result);
    ctx.status = 204; // 성공했지만 응답할 데이터 없음
  } catch (e) {
    ctx.throw(500, e);
  }
};