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
// localhost:4000/api/albums/fileupload
export const fileupload = async ctx => {
  const schema = Joi.object().keys({
    coupleShareCode: Joi.string(),
    filename: Joi.array(),
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
    // const writeStream = fs.createWriteStream(path.join('./server/src/api/album/uploads/', savefile));
    const writeStream = fs.createWriteStream(path.join('./src/components/Album/uploads/', savefile));

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

    const like = false;
    const today = new Date();
    const publishedDate = today.toLocaleString();
    const filename = uploadfile.name;
    const coupleShareCode = ctx.state.member.userCode; //로그인 정보에서 가져옴
    const idx = 0;
    const check = await Album.findOne({ coupleShareCode: `${coupleShareCode }`});
    if(check !== null) {
      let idx = check.fileData.files.length;
      if(idx === check.fileData.files.idx) {
        while(true) {
          idx++;
          return idx;
        }
      }
      check.fileData.files.push({
        idx,
        filename,
        like,
        publishedDate
      })
      check.save();
    }else {
      console.log('checkkkkkkkkk' + check);
      const album = new Album({
        coupleShareCode,
        fileData : {
          files : {
            idx,
            filename,
            like,
            publishedDate
          },
        }
      });
      console.log("filefefefbname" + filename);
      await album.save();
      console.log('새로운 album 추가');
      console.log(album);
    }
  }catch(e){
    ctx.throw(500, e)
  }
}

// 모든 파일 조회
// localhost:4000/api/albums/
export const list = async ctx => {
  const {member} = ctx.state
  const coupleShareCode = member.userCode;
  console.dir(member);
  console.log(member.userCode)
  console.log("파일조회323232323" + coupleShareCode)
  console.log(coupleShareCode);

  try{
    const albums = await Album.findOne({ coupleShareCode: `${coupleShareCode }`}).sort({_id: -1}).exec();
    ctx.body = albums;
  }catch(e) {
    ctx.throw(500, e);
  }
}

// 특정 파일 조회
// localhost:4000/api/albums/5fa8cddb476a282bc082996b/0
export const read = async ctx => {
  const { id, idx } = ctx.params;
  try {
    const album = await Album.findById(id);
    if(!album) {
      ctx.status = 404;
      return;
    }
    ctx.body = album.fileData.files[idx];
  }catch(e) {
    ctx.throw(500, e);
  }
}

// 파일 업데이트(좋아요)
export const update = async ctx => {
  const {id} = ctx.params;
  try {
    const album = await Album.findByIdAndUpdate(id, ctx.request.body
    , {
      new: true,
    }).exec();
    if(!album) {
      ctx.status = 404;
      return;
    }
    console.log('좋아연~');
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
