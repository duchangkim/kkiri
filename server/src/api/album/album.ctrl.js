import Album from '../../models/album';
import Joi from '@hapi/joi';
import fs from 'fs';
import promisePipe from 'promisepipe';
import path from 'path';

// 파일 업로드
export const fileupload = async ctx => {
  const schema = Joi.object().keys({
    filename: Joi.string(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    console.log('errer : ' + result.error)
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  
  try {
    const uploadfile = ctx.request.files.files;
    const savefile = `${Date.now()}#${uploadfile.name}`;
    const readStream = fs.createReadStream(uploadfile.path);
    const writeStream = fs.createWriteStream(path.join('./server/src/api/album/uploads/', savefile));

    await promisePipe (
      readStream .on (' err' , () => {
        throw new Error ({
          error : "File Read Error"
        });
      }),
      writeStream .on (' err ', () => {
        throw new Error ({
          error : "Write Error"
        });
      })
    )

    ctx.body = {
      message: "file upload success"
    }
    const filename = uploadfile.name;
    const album = new Album({
      filename,
    });
    await album.save();
    console.log(album);
  }catch(e){
    ctx.throw(500, e)
  }
}

// 파일 삭제
export const filedel = async ctx => {
  const {id} = ctx.params;
  try{
    console.log('삭제ㅇㅇㅇㅇㅇㅇ')
    await Album.findByIdAndRemove(id).exec();
    ctx.status = 204;
  }catch(e){
    ctx.throw(500, e);
  }
}
