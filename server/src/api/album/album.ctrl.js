import Album from '../../models/album';
import Joi from '@hapi/joi';
import fs from 'fs';
import promisePipe from 'promisepipe';
import path from 'path';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;


export const checkObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; 
    return;
  }
  try {
    const album = await Album.findById(id);
    if(!album){
      ctx.status = 404;
      return;
    }
    ctx.state.album = album;
    return next()
  }catch(e){
    ctx.throw(500, e);
  }
};
// 파일 업로드
export const fileupload = async ctx => {
  const schema = Joi.object().keys({
    filename: Joi.array(),
    coupleShareCode: Joi.string(),
  });
  // console.log("사진저장" + coupleShareCode)
  console.dir(ctx.state.member)
  // console.dir(ctx.state.member.userCode)

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
    const coupleShareCode = ctx.state.member.userCode; //로그인 정보에서 가져옴
    console.log(coupleShareCode);
    const check = await Album.findOne({ coupleShareCode: `${coupleShareCode }`});
    if(check) {
      Album.update(
        {coupleShareCode: `${coupleShareCode }`},
      )
    }
    const album = new Album({
      filename,
      coupleShareCode
    });
    await album.save();
    console.log(album);
  }catch(e){
    ctx.throw(500, e)
  }
}

// 모든 파일 조회
export const list = async ctx => {
  const {member} = ctx.state
  const coupleShareCode = member.userCode;
  console.dir(member);
  console.log(member.userCode)
  console.log("파일조회" + coupleShareCode)

  try{
    const albums = await Album.findByCoupleShareCode(coupleShareCode).sort({_id: -1}).exec();
    ctx.body = albums;
  }catch(e) {
    ctx.throw(500, e);
  }
}

// 특정 파일 조회
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const album = await Album.findById(id).exec();
    if(!album) {
      ctx.status = 404;
      return;
    }
    ctx.body = album;
  }catch(e) {
    ctx.throw(500, e);
  }
}

// 파일 업데이트(좋아요)
export const update = async ctx => {
  const {id} = ctx.params;
  try {
    const album = await Album.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if(!album) {
      ctx.status = 404;
      return;
    }
    ctx.body = album;
  }catch(e) {
    ctx.throw(500, e);
    ctx.body = "업뎃안댐"
  }
}

// 파일 삭제
export const remove = async ctx => {
  const {id} = ctx.params;
  try{
    console.log('삭제ㅇㅇㅇㅇㅇㅇ')
    await Album.findByIdAndRemove(id).exec();
    ctx.status = 204; // 성공했지만 응답할 데이터 없음
  }catch(e){
    ctx.throw(500, e);
  }
}
