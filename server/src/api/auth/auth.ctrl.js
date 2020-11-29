import Joi from "@hapi/joi";
import Member from "../../models/member";
import createRandomCode from "../../lib/createRandomCode";

export const register = async (ctx) => {
  console.log("회원가입 불럿냐?");
  // console.log(ctx.request.body);

  const schema = Joi.object().keys({
    email: Joi.string().required(),
    emailAuthenticationCode: Joi.allow(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    birthday: Joi.string().required(),
    hp: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    // console.log(result);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { email, password, birthday, name, hp } = ctx.request.body;

  try {
    const userCode = await createRandomCode();
    const member = new Member({
      email,
      password,
      birthday,
      name,
      hp,
      userCode,
    });

    await member.encryptPassword(password);
    await member.save();

    ctx.body = member.serialize();

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
  console.log(`email : ${email} / password : ${password}`);

  if (!email || !password) {
    //비인증 401(unauthenticated)
    ctx.status = 401;
    return;
  }

  try {
    const member = await Member.findByEmail(email);
    // console.log(member);
    if (!member) {
      ctx.status = 401;
      ctx.body = { error: "not found email" };
      return;
    }
    const valid = await member.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      ctx.body = { error: "wrong password" };
      return;
    }

    const serializedMember = await member.serialize();

    ctx.body = serializedMember;

    const token = member.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const logout = (ctx) => {
  ctx.cookies.set("access_token");
  ctx.status = 204;
};

export const check = async (ctx) => {
  const { member } = ctx.state;
  console.log("이거불러라");
  // console.log(member);
  if (!member) {
    console.log("왜없냐");
  }
  if (!member) {
    ctx.status = 401;
    return;
  }
  const fromDBMember = await Member.findById(member._id);
  if (!fromDBMember) {
    ctx.status = 401;
    return;
  }
  ctx.body = await fromDBMember.serialize();

  const token = fromDBMember.generateToken();
  ctx.cookies.set("access_token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
};
