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
    if (!album) {
      ctx.status = 404;
      return;
    }
    ctx.state.album = album;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
// 파일 업로드
// localhost:4000/api/albums/fileupload
export const fileupload = async (ctx) => {
  const schema = Joi.object().keys({
    coupleShareCode: Joi.string(),
    filename: Joi.array(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log('errer : ' + result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  try {
    const rd = Math.floor(Math.random() * 99999999);
    const uploadfile = ctx.request.files.files;
    const savefile = `${uploadfile.name}`;
    const renamefile = rd + '.' + savefile.split('.').pop().toLowerCase();
    const coupleShareCode = ctx.state.member.coupleShareCode; //로그인 정보에서 가져옴
    const readStream = fs.createReadStream(uploadfile.path);

    const writeStream = fs.createWriteStream(
      path.join(`./public/uploads/${coupleShareCode}`, renamefile)
    );

    await promisePipe(
      readStream.on(' err', () => {
        throw new Error({
          error: 'File Read Error',
        });
      }),
      writeStream.on(' err ', () => {
        throw new Error({
          error: 'Write Error',
        });
      })
    );
    ctx.body = {
      message: 'file upload success',
    };
    const like = false;
    const today = new Date();
    const keyid = Math.floor(Number(today) / 1000);
    const publishedDate = today.toLocaleString();
    const filename = rd + '.' + savefile.split('.').pop().toLowerCase();
    const check = await Album.findOne({
      coupleShareCode: `${coupleShareCode}`,
    });
    if (check !== null) {
      check.fileData.files.push({
        keyid,
        filename,
        like,
        publishedDate,
      });
      check.save();
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getAlbumById = async (ctx, next) => {
  const coupleShareCode = ctx.state.member.coupleShareCode;
  try {
    const album = await Album.findOne({
      coupleShareCode: `${coupleShareCode}`,
    });
    if (!album) {
      ctx.status = 404;
      return;
    }
    ctx.state.album = album;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 모든 파일 조회
// localhost:4000/api/albums/
export const list = async (ctx) => {
  const { member } = ctx.state;
  const coupleShareCode = member.coupleShareCode;

  try {
    const albums = await Album.findOne({
      coupleShareCode: `${coupleShareCode}`,
    }).exec();
    const result = albums.fileData.files.sort(function (a, b) {
      return a.keyid > b.keyid ? -1 : a.keyid < b.keyid ? 1 : 0;
    });
    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.album;
};

// 파일 업데이트(좋아요)
export const update = async (ctx) => {
  const keyid = ctx.params.keyid;
  const { member } = ctx.state;
  const coupleShareCode = member.coupleShareCode;
  try {
    const album = await Album.findOne({
      coupleShareCode: `${coupleShareCode}`,
    });

    const result = await album.changeFile(keyid);

    await album.save();
    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
    ctx.body = '업뎃안댐';
  }
};

// 파일 삭제
export const remove = async (ctx) => {
  const idx = ctx.params.idx;
  const { member } = ctx.state;
  const coupleShareCode = member.coupleShareCode;
  const idxx = Number(idx);

  try {
    const file = await Album.findOne({ coupleShareCode: `${coupleShareCode}` });
    const result = file.deleteFile('files', idxx);

    await file.save();
    ctx.body = result;
    ctx.status = 204; // 성공했지만 응답할 데이터 없음
  } catch (e) {
    ctx.throw(500, e);
  }
};
