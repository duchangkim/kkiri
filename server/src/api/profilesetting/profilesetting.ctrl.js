import Joi from '@hapi/joi';
import fs from 'fs';
import Member from '../../models/member';
import promisePipe from 'promisepipe';
import path from 'path';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

// 아이디 체크
export const checkObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const profilesetting = await Member.findById(id);
    if (!profilesetting) {
      ctx.status = 404;
      return;
    }
    ctx.state.profilesetting = profilesetting;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 파일 업로드
// localhost:4000/api/profilesetting/fileupload
export const fileupload = async (ctx) => {
  const schema = Joi.object().keys({
    _id: Joi.string(),
    filename: Joi.array(),
  });
  const mem = ctx.state.member;

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log('error : ' + result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const rd = Math.floor(Math.random() * 99999999);
    const uploadfile = ctx.request.files.files; // 리액트에서 보낸 파일이름
    const savefile = `${uploadfile.name}`; // 저장하는이름
    const renamefile = rd + '.' + savefile.split('.').pop().toLowerCase();

    const readStream = fs.createReadStream(uploadfile.path);
    const writeStream = fs.createWriteStream(
      path.join(`./public/uploads/${mem.coupleShareCode}/`, renamefile)
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
      message: 'profilesetting file upload success',
    };

    const filename = uploadfile.name;
    console.log(filename + ' : filename입니다.');

    const check = await Member.findOne({
      _id: `${mem._id}`,
    });

    await check.setProfileImg(renamefile);
    await check.save();

    const otherCheck = await Member.findById(mem.coupleId);
    await otherCheck.setCoupleProfileImg(renamefile);
    await otherCheck.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getprofilesettingById = async (ctx, next) => {
  const coupleShareCode = ctx.state.member.coupleShareCode;
  try {
    const profilesetting = await Member.findOne({
      coupleShareCode: `${coupleShareCode}`,
    });
    if (!profilesetting) {
      ctx.status = 404;
      return;
    }
    ctx.state.profilesetting = profilesetting;
    console.log('프로필 이미지 세팅');
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 모든 파일 조회
export const list = async (ctx) => {
  const { member } = ctx.state;
  const coupleShareCode = member.coupleShareCode;

  try {
    const profilesetting = await Member.findOne({
      coupleShareCode: `${coupleShareCode}`,
    })
      .sort({ _id: -1 })
      .exec();
    ctx.body = profilesetting;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.profilesetting;
};
