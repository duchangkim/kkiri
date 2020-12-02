import Joi from '@hapi/joi';
import Member from '../../models/member';

export const changepassword = async (ctx) => {
  const schema = Joi.object().keys({
    password: Joi.string().required(),
    findEmail: Joi.string().allow(''),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { password, findEmail } = ctx.request.body;

  try {
    const member = await Member.findOne({ email: findEmail });

    await member.encryptPassword(password);
    await member.save();
    ctx.body = member.serialize(); //직렬화해서 비밀번호를 제외한 JSON data 뿌려줌
    ctx.body = { message: 'success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};
