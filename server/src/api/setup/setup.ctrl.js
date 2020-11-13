import Joi from '@hapi/joi';
import Member from '../../models/member';

export const changepassword = async (ctx) => {
  const schema = Joi.object().keys({
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  console.log(ctx.request.body);
  if (result.error) {
    console.log(result);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  console.log(result);
  const { password, findEmail } = ctx.request.body;
  console.log(ctx.request.body);
  console.log(`params : ${password}, ${findEmail}`);

  try {
    const member = Member.findEmail;
  
    await member.encryptPassword(password);
    await member.save();
    
    ctx.body = member.serialize(); //직렬화해서 비밀번호를 제외한 JSON data 뿌려줌

    const token = member.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
