import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  coupleShareCode: {
    type: String,
  },
  sender: {
    type: String,
  },
  name: {
    type: String,
  },
  sendDate: {
    type: Date,
  },
  text: {
    type: String,
  },
});

const Message = mongoose.model('messages', MessageSchema);

const RoomSchema = new Schema({
  // 커플 연결 성공시 주어지는 코드 - 채팅방룸id 캘린더 앨범 아이디로 사용
  coupleShareCode: {
    type: Number,
  },
  // 주인들_id
  owner: {
    type: Array,
  },
  chattingData: [MessageSchema],
});

RoomSchema.statics.findCoupleCode = async function (code) {
  return await this.findOne({
    coupleShareCode: code,
  });
};

RoomSchema.methods.pushMessageData = async function (chattingData) {
  await this.chattingData.push(chattingData);
};

//스키마에 serialize()라는 메소드 추가
RoomSchema.methods.serialize = function () {
  // JSON으로 뿌려줄 정보들을 골라서 뿌려주세요 싹다 뿌릴 필요는 없음.
  const data = this.toJSON(); //this는 스키마를 가리킴 그걸 JSON형식으로 만들고
  return data; // 리턴해줌
};

RoomSchema.methods.getSortedMessageList = async function (page) {
  const messagePerPage = 9;
  const totalMessage = this.chattingData.length; //23
  // 3 * 10 > 23
  if (page * messagePerPage > totalMessage) {
  }

  const sortedMessageList = await this.chattingData.sort((a, b) => {
    const aDate = new Date(a.sendDate);
    const bDate = new Date(b.sendDate);

    return bDate - aDate;
  });

  return sortedMessageList
    .slice(page * messagePerPage, page * messagePerPage + messagePerPage - 1)
    .sort((a, b) => {
      const aDate = new Date(a.sendDate);
      const bDate = new Date(b.sendDate);

      return aDate - bDate;
    });
};

RoomSchema.methods.insertMessageList = async function (newMessageList) {
  await newMessageList.map((newMessage) =>
    this.chattingData.push(
      new Message({
        coupleShareCode: newMessage.coupleShareCode,
        name: newMessage.name,
        sendDate: newMessage.sendDate,
        sender: newMessage.sender,
        text: newMessage.text,
      })
    )
  );
};

const Room = mongoose.model('Room', RoomSchema);
export default Room;
