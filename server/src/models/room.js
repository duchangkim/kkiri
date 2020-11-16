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

RoomSchema.methods.getSortedMessageList = async function (limit) {
  const sortedMessageList = await this.chattingData.sort((a, b) => {
    const aDate = new Date(a.sendDate);
    const bDate = new Date(b.sendDate);

    return bDate - aDate;
  });
  const messagePerPage = 10;

  return sortedMessageList.slice(limit * messagePerPage, limit * messagePerPage + messagePerPage)
    .sort((a, b) => {
      const aDate = new Date(a.sendDate);
      const bDate = new Date(b.sendDate);
  
      return aDate - bDate;
    });
};

RoomSchema.methods.insertMessageList = async function (newMessageList) {
  await this.chattingData.push.apply(this.chattingData, newMessageList);
}

const Room = mongoose.model("Room", RoomSchema);
export default Room;
