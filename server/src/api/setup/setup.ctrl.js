import Joi from '@hapi/joi';
import member from '../../../../src/modules/member';
import Member from '../../models/member';

export const changepassword = async (ctx) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  const schema = Joi.object().keys({
    password: Joi.string().required(),
    findEmail: Joi.string().allow(""),
  });
  console.log(ctx.request.body);
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log("비밀번호 찾기 에러러");
    console.log(result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  console.log(result);
  const { password,findEmail } = ctx.request.body;
  console.log("12345645456456456456465456456465")
  console.log(ctx.request.body);
  console.log("여기는 비밀번호 바꾸기")
  console.log(`456878798794546456 : ${password},${findEmail}`);

  try {
    const member = await Member.findOne({email:findEmail});

    await member.encryptPassword(password);
    await member.save();
    ctx.body = member.serialize(); //직렬화해서 비밀번호를 제외한 JSON data 뿌려줌
    console.log(member);
    ctx.body = { message: 'success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};

