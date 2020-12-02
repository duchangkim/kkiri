import dotenv from 'dotenv';
import Joi from '@hapi/joi';
import Member from '../../models/member';
import nodeMailer from 'nodemailer';
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
    from: 'Kkiri 서비스',
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

const getRandomNumber = () => {
  let number = '';
  let random = 0;
  for (let i = 0; i < 6; i++) {
    random = Math.trunc(Math.random() * (9 - 0) + 0);
    number += random;
  }

  return number;
};

const contents = (randomNumber) => {
  return `인증 칸에 아래의 숫자를 입력해주세요. \n ${randomNumber}`;
};

export const sendEmailAuthenticationCode = async (ctx) => {
  const requestData = Joi.object().keys({
    email: Joi.string().email().min(3).max(100).required(),
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

    const randomNumber = getRandomNumber();

    const mailOption = mailOpt(result.value.email, contents(randomNumber));
    sendMail(mailOption);
    ctx.body = { emailAuthenticationCode: randomNumber };
  } catch (e) {
    ctx.throw(500, e);
  }
};
