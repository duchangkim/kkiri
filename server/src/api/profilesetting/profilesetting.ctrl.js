import Joi from "@hapi/joi";
import fs from "fs";
import Member from "../../models/member";
import promisePipe from "promisepipe";
import path from "path";
import mongoose from "mongoose";

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
  console.log("안녕하세요 파일업로드중입니다");
  // console.log(ctx.request.files.files.name);
  const schema = Joi.object().keys({
    _id: Joi.string(),
    filename: Joi.array(),
  });
  // console.log("배경화면 저장" + _id)
  console.dir(ctx.state.member);
  const mem = ctx.state.member;
  console.log(mem + " : ctx.state.member");
  console.log(mem._id + "멤버안에 있는 id 값 호출");

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log("error : " + result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const rd = Math.floor(Math.random() * 99999999);
    const uploadfile = ctx.request.files.files; // 리액트에서 보낸 파일이름
    const savefile = `${uploadfile.name}`; // 저장하는이름
    const renamefile = rd + "." + savefile.split(".").pop().toLowerCase();
    console.log(savefile + " : 파일이름 나오나요?");
    console.log(`./public/uploads/${mem.coupleShareCode}/` + " : 쉐어코드");

    const readStream = fs.createReadStream(uploadfile.path);
    const writeStream = fs.createWriteStream(
      path.join(`./public/uploads/${mem.coupleShareCode}/`, renamefile)
    );

    await promisePipe(
      readStream.on(" err", () => {
        throw new Error({
          error: "File Read Error",
        });
      }),
      writeStream.on(" err ", () => {
        throw new Error({
          error: "Write Error",
        });
      })
    );

    ctx.body = {
      message: "profilesetting file upload success",
    };

    console.log("여기까지 잘 들어가지니?");
    const filename = uploadfile.name;
    console.log(filename + " : filename입니다.");

    const check = await Member.findOne({
      _id: `${mem._id}`,
    });
    console.log(check + "\n ㄴ check=await Member.fineOne({_id:`${_id}`입니다");
    console.log(check.mainSetting + " : check.mainsetting입니다.");
    console.log(check + "Member호출");

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
  console.log(ctx.params);
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
    console.log("프로필 이미지 세팅");
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 모든 파일 조회
export const list = async (ctx) => {
  const { member } = ctx.state;
  const coupleShareCode = member.coupleShareCode;
  console.dir(member);
  console.log(coupleShareCode);

  try {
    const profilesetting = await Member.findOne({
      coupleShareCode: `${coupleShareCode}`,
    })
      .sort({ _id: -1 })
      .exec();
    ctx.body = profilesetting;
    console.log(profilesetting);
    console.log("안녕하세요~~");
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.profilesetting;
  console.log("readreadreadreadreadreadreadreadreadread");
  console.log(ctx.state.profilesetting);
};
