import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
  // 커플 연결 성공시 주어지는 코드 - 채팅방룸id 캘린더 앨범 아이디로 사용
  coupleShareCode: {
    type: Number,
  },
  // 주인들_id
  owner: {
    type: Array,
  },
  chattingData: {
    type: Array,
  },
});

RoomSchema.statics.findCoupleCode = async function (code) {
  return await this.findOne({
    coupleShareCode: code,
  });
};

// common methods
/**
 * newData에 자동 증가하는 id값을 부여한다.
 * calendarData("calendars", "schedules", "dDay")에 id값 부여된 newData를 추가한 후 그 결과를 반환함.
 *
 * @method pushMessageData
 * @param {String} chattingData 추가할 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Object} newData 추가 하고자 하는 calendarData 요소
 * @return {Array} 추가된 calendarData 리스트를 반환함
 */

//  룸 코드를 받아야함
RoomSchema.methods.pushMessageData = async function (chattingData) {
  await this.chattingData.push(chattingData);
};

//스키마에 serialize()라는 메소드 추가
RoomSchema.methods.serialize = function () {
  // JSON으로 뿌려줄 정보들을 골라서 뿌려주세요 싹다 뿌릴 필요는 없음.
  console.log(this);
  const data = this.toJSON(); //this는 스키마를 가리킴 그걸 JSON형식으로 만들고
  return data; // 리턴해줌
};

const Room = mongoose.model("Room", RoomSchema);
export default Room;
