import Member from "../../models/member";

export const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  console.log(`${email}, ${password}`);
  if (!email || !password) {
    //비인증 401(unauthenticated)
    ctx.status = 401;
    return;
  }
  try {
    const member = await Member.findByEmail(email);
    if (!member) {
      ctx.status = 401;
      return;
    }
    const valid = await member.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }

    const serializedMember = member.serialize();
    // ctx.state.member = serializedMember;

    ctx.body = serializedMember;
    const token = member.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
  // console.log("---------로그인-----------");
  // console.dir(ctx.state);
};

export const check = async (ctx) => {
  // console.log(ctx.state);
  // 로그인 상태 확인
  console.log('check')
  const { member } = ctx.state;
  if (!member) {
    ctx.status = 401;
    return;
  }
  ctx.body = member;
};

export const logout = async (ctx) => {
  ctx.cookies.set("access_token");
  ctx.status = 204;
};

export const search_id = async (ctx) => {};
