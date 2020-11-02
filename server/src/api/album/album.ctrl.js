import Album from '../../models/album';
import Joi from '@hapi/joi';


export const fileupload = async ctx => {
  console.log('~~~~~~')
  const schema = Joi.object().keys({
    fileImg: Joi.string(),
    txt: Joi.string(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    console.log('!!!!!!!!?')
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { fileImg, txt } = ctx.request.body;
  console.log(ctx.body.fileImg);
  try {
    const album = new Album({
      fileImg,
      txt
    });

    console.log('du기~~~~');
    await album.save();
      ctx.body = {
        message: "success upload!"
      }
    }catch(e){
    ctx.throw(500, e);
  }
}
