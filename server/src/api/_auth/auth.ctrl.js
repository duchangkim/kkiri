import dotenv from 'dotenv';
import Joi from '@hapi/joi';
import Member from '../../models/member';
import nodeMailer from 'nodemailer';
import createRandomCode from '../../lib/createRandomCode';
dotenv.config();

const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;
console.log(MAILER_EMAIL);
console.log(MAILER_PASSWORD);

// 메일 발송 서비스에 대한 환경 설정
const mailPoster = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gyominis100@gmail.com',
    pass: 'qw9712me12',
  },
});

const mailOpt = (email, contents) => {
  const mailOptions = {
    from: 'gyominis100@gmail.com',
    to: email,
    subject: 'kkiri 회원가입 인증번호입니다.',
    text: contents,
  };
  console.log(mailOptions);

  return mailOptions;
};
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log('에러 ' + error);
    } else {
      console.log('전송 완료 ' + info.response);
    }
  });
};

const res_data = {};
const contents = () => {
  let number = '';
  let random = 0;
  for (let i = 0; i < 6; i++) {
    random = Math.trunc(Math.random() * (9 - 0) + 0);
    number += random;
  }
  res_data['secret'] = number;
  return `인증 칸에 아래의 숫자를 입력해주세요. \n ${number}`;
};

export const sendEmailAuthenticationCode = async (ctx) => {
  // console.log('이메일 보내냐ㅕ?');
  // console.log(ctx.request.body);
  // console.log(ctx.request.body.email);
  const requestData = Joi.object().keys({
    email: Joi.string().email().min(3).max(20).required(),
  });
  const result = requestData.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);

    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { email } = ctx.request.body;
  try {
    const exists = await Member.findByEmail(email);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const mailOption = mailOpt(result.value.email, contents());
    sendMail(mailOption);
    ctx.body = { message: 'success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const register = async (ctx) => {
  console.log('회원가입 불럿냐?');
  console.log(ctx.request.body);

  const schema = Joi.object().keys({
    email: Joi.string().required(),
    emailAuthenticationCode: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    birthday: Joi.string().required(),
    hp: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    email,
    emailAuthenticationCode,
    password,
    birthday,
    name,
    hp,
  } = ctx.request.body;

  if (emailAuthenticationCode !== res_data.secret) {
    console.log('코드 인증 실패');
    ctx.status = 401;
  } else if (emailAuthenticationCode === res_data.secret) {
    console.log('코드 인증 성공');
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
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
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
    console.log(member);
    if (!member) {
      ctx.status = 401;
      ctx.body = { error: 'not found email' };
      return;
    }
    const valid = await member.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      ctx.body = { error: 'wrong password' };
      return;
    }

    const serializedMember = await member.serialize();

    ctx.body = serializedMember;

    const token = member.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
