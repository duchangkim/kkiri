import dotenv from 'dotenv';
import Joi from '@hapi/joi';
import Member from '../../models/member';
import nodeMailer from 'nodemailer';
import createRandomCode from '../../lib/createRandomCode';
dotenv.config();

const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;

// 메일 발송 서비스에 대한 환경 설정
const mailPoster = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});

const mailOpt = (email, contents) => {
  const mailOptions = {
    from: 'gyominis100@gmail.com',
    to: email,
    subject: 'kkiri 회원가입 인증코드',
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

//랜덤 번호 생성
var res_data = {};
const contents = () => {
  var number = '';
  var random = 0;
  for (let i = 0; i < 6; i++) {
    random = Math.trunc(Math.random() * (9 - 0) + 0);
    number += random;
  }
  res_data['secret'] = number;
  return '인증 칸에 아래의 숫자를 입력해주세요. \n ' + number;
};

export const registeremail = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(3).max(20).required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);

    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { email } = ctx.request.body;
  console.log(`params : ${email}`);
  try {
    const exists = await Member.findByEmail(email);
    if (exists) {
      ctx.status = 409;
      return;
    }

    console.log(result);
    console.log(result.value.email);

    const mailOption = mailOpt(result.value.email, contents());
    sendMail(mailOption);
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const register = async (ctx) => {
  const { email, emailcode, password, birthday, name, hp } = ctx.request.body;
  console.log(
    `params : ${email},${emailcode},${password}, ${birthday}, ${name},${hp}`
  );
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    emailcode: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    birthday: Joi.string().required(),
    hp: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  console.log(ctx.request.body);
  if (result.error) {
    console.log(result);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    console.log(emailcode);
    console.log(res_data.secret);
    if (emailcode) {
      if (emailcode !== res_data.secret) {
        console.log('코드 인증 실패');
      } else if (emailcode === res_data.secret) {
        console.log('코드 인증 성공');

        const userCode = await createRandomCode();
        console.log(userCode);
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

        ctx.body = member.serialize(); //직렬화해서 비밀번호를 제외한 JSON data 뿌려줌

        const token = member.generateToken();
        ctx.cookies.set('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        ctx.body = { message: "success", member };
      }
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
