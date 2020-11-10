import Member from "../../models/member";

export const findid = async (ctx) => {
  const { birthday, name, hp} = ctx.request.body;

  console.log(`${birthday}, ${name}, ${hp}`);
  if (!birthday || !name || !hp) {
    ctx.status = 401;
    return;
  }
  try {
    const member = await Member.findByMemberInfo(birthday, name, hp);
    console.log("---------아이디 찾기기기기기기기---------");
    const serializedMember = member.serialize();
    // ctx.state.member = serializedMember;

    ctx.body = serializedMember;
    console.log("아이디 찾는 서버");
    console.log(ctx.body.email);
    const findEmail = ctx.body.email;
    ctx.body = { message: 'success' , findEmail};
  } catch (e) {
    ctx.throw(500, e);
  }
};
