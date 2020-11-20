import Joi from "@hapi/joi";
import fs from "fs";
import BackgroundSetting from "../../models/member";
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
    const backgroundsetting = await BackgroundSetting.findById(id);
    if (!backgroundsetting) {
      ctx.status = 404;
      return;
    }
    ctx.state.backgroundsetting = backgroundsetting;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 파일 업로드
// localhost:4000/api/backgroundimages/fileupload
export const fileupload = async (ctx) => {
  const schema = Joi.object().keys({
    _id: Joi.string(),
    filename: Joi.array(),
  });
  // console.log("배경화면 저장" + _id)
  console.dir(ctx.state.member);

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log("error : " + result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const uploadfile = ctx.request.files.files;
    const savefile = `${uploadfile.name}`;
    const settingStream = fs.createSettingStream(path.join("./public/uploads/", savefile));

    await promisePipe(
      settingStream.on(" err ", () => {
        throw new Error({
          error: "setting Error",
        });
      })
    );

    ctx.body = {
      message: "backgroundSettingImg file upload success",
    };
    const today = new Date();
    const keyid = Math.floor(Number(today) / 1000);
    const publishedDate = today.toLocaleString();
    const filename = uploadfile.name;
    const coupleShareCode = ctx.state.member.coupleShareCode; //로그인 정보에서 가져옴
    console.log("mememmmmmmmmmmm" + ctx.state.member.coupleShareCode);
    const check = await BackgroundSetting.findOne({ coupleShareCode: `${coupleShareCode}` });
    if (check != null) {
      let idx = check.mainSetting.default.coupleBackground.length;
      if (idx === check.mainSetting.default.coupleBackground.idx) {
        while (true) {
          idx++;
          return idx;
        }
      }
      check.mainSetting.default.coupleBackground.push({
        filename,
      });
      check.save();
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getBackgroundSettingById = async (ctx, next) => {
  console.log(ctx.params);
  const coupleShareCode = ctx.state.member.coupleShareCode;
  try {
    const backgroundsetting = await BackgroundSetting.findOne({
      coupleShareCode: `${coupleShareCode}`,
    });
    if (!backgroundsetting) {
      ctx.status = 404;
      return;
    }
    ctx.state.backgroundsetting = backgroundsetting;
    console.log("배경화면 이미지 세팅");
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
    const backgroundsetting = await BackgroundSetting.findOne({
      coupleShareCode: `${coupleShareCode}`,
    })
      .sort({ _id: -1 })
      .exec();
    ctx.body = backgroundsetting;
    console.log(backgroundsetting);
    console.log("안녕하세요~~");
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.backgroundsetting;
  console.log("readreadreadreadreadreadreadreadreadread");
  console.log(ctx.state.backgroundsetting);
};
