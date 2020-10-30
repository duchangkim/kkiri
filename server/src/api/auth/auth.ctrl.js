import Joi from "@hapi/joi";
import Member from "../../models/member";
import createRandomCode from "../../lib/createRandomCode";

export const register = async (ctx) => {
  const { email, password, birthday, name } = ctx.request.body;
  console.log(`params : ${email}, ${password}, ${birthday}, ${name}`);

  try {
    const exists = await Member.findByEmail(email);
    if (exists) {
      //이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다. 409
      ctx.status = 409;
      return;
    }

    //회원 고유 code부여
    //await 하지 않으면 Promise를 리턴받음
    const userCode = await createRandomCode();

    const member = new Member({
      email,
      birthday,
      name,
      userCode,
    });

    await member.encryptPassword(password);
    await member.save();

    ctx.body = member.serialize(); //직렬화해서 비밀번호를 제외한 JSON data 뿌려줌
    const token = member.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx) => {
  const { email, password } = ctx.request.body;

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
  console.log("---------로그인-----------");
  console.dir(ctx.state);
};

export const check = async (ctx) => {
  console.log(ctx.state);
  // 로그인 상태 확인
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
