import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const MemberSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  hp: {
    type: String,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: "",
  },
  coupleId: {
    type: String,
    default: "",
  },
  userCode: {},
  coupleShareCode: {
    type: Number,
  },
  getTogetherDate: {
    type: Date,
    default: null,
  },
  position: {
    type: Object,
    default: {
      latitude: 37.499771,
      longitude: 127.035168,
    },
  },
  // 회원별 메인화면 설정
  mainSetting: {
    type: Object,
    default: {
      coupleBackground: "al2.png",
      coupleProfile1: "duli.png",
      coupleProfile2: "duli.png",
    },
  },
  // 간편로그인 회원정보
  kakao: {},
  google: {},
  facebook: {},
  naver: {},
});

MemberSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

MemberSchema.statics.findByMemberInfo = function (birthday, name, hp) {
  return this.findOne({ birthday: new Date(birthday), name, hp });
};
MemberSchema.statics.findBypasswordInfo = function (birthday, email, hp) {
  return this.findOne({ birthday: new Date(birthday), email, hp });
};

MemberSchema.statics.findUserCode = function (code) {
  return this.findOne({ userCode: code });
};

MemberSchema.statics.findCoupleCode = function (code) {
  return this.findOne({
    coupleShareCode: code,
  });
};

MemberSchema.statics.findByCoupleShareCode = function (code) {
  return this.findOne({
    coupleShareCode: code,
  });
};

// 비밀번호 암호화 메소드
MemberSchema.methods.encryptPassword = async function (password) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  this.hashedPassword = encryptedPassword;
};

// 암호화된 비밀번호와 전달받은 비밀번호가 맞는지 체크하는 메소드
MemberSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 커플 공동 코드 insert해주는 메소드
MemberSchema.methods.insertCoupleShareCode = function (code) {
  // console.log("이새기의 this는 혹시 아이디로 찾은 member객체?");
  // console.log(this);
  this.coupleShareCode = code;
};
MemberSchema.methods.setCoupleBackground = async function (image) {
  console.log("백그라운드 메소드 - 이미지 이름 호출 : " + image);
  this.mainSetting = {
    ...this.mainSetting,
    coupleBackground: image,
  };
};
MemberSchema.methods.setProfileImg = async function (image) {
  console.log("프로필 메소드 = 이미지 이름 호출 : " + image);
  this.mainSetting = {
    ...this.mainSetting,
    coupleProfile1: image,
  };
};
MemberSchema.methods.setCoupleProfileImg = async function (image) {
  console.log("프로필 메소드 = 이미지 이름 호출 : " + image);
  this.mainSetting = {
    ...this.mainSetting,
    coupleProfile2: image,
  };
};

MemberSchema.methods.insertCoupleId = function (coupleId) {
  this.coupleId = coupleId;
};

MemberSchema.methods.deleteUserCode = function () {
  this.userCode = null;
};

//스키마에 serialize()라는 메소드 추가
MemberSchema.methods.serialize = function () {
  // JSON으로 뿌려줄 정보들을 골라서 뿌려주세요 싹다 뿌릴 필요는 없음.
  console.log(this);
  const data = this.toJSON(); //this는 스키마를 가리킴 그걸 JSON형식으로 만들고
  delete data.hashedPassword; //비밀번호는 지우고
  return data; // 리턴해줌
};

// JWT Token생성 함수
MemberSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      hp: this.hp,
      birthday: this.birthday,
      userCode: this.userCode,
      coupleId: this.coupleId,
      coupleShareCode: this.coupleShareCode,
      getTogetherDate: this.getTogetherDate,
      position: this.position,
      mainSetting: this.mainSetting,
      kakao: this.kakao,
      google: this.google,
      facebook: this.facebook,
      naver: this.naver,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

MemberSchema.methods.insertPosition = function (position) {
  this.position = position;
};

MemberSchema.methods.insertGetTogetherDate = function (getTogetherDate) {
  if (!getTogetherDate instanceof Date) {
    this.getTogetherDate = new Date(getTogetherDate);
    return;
  }
  this.getTogetherDate = getTogetherDate;
};

const Member = mongoose.model("Member", MemberSchema);

export default Member;
