import Room from "../../models/room";

// 서버에 데이터를 보낼 양식
export const saveMessage = async (ctx) => {
  const { text } = ctx.request.body;
  const { coupleShareCode, _id } = ctx.state.member;

  try {
    const room = await Room.findCoupleCode(coupleShareCode);

    if (!room) {
      //이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다. 409
      ctx.status = 409;
      return;
    }

    // console.log(ctx.request.body);

    ctx.body = room.pushMessageData({
      sender: _id,
      text,
      sendDate: new Date(),
    });
    await room.save();
    ctx.body = room.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 서버에서 받을 양식
export const getMessageList = async (ctx) => {
  const { member } = ctx.state;
  const copleShareCode = member.coupleShareCode;
  const room = await Room.findCoupleCode(copleShareCode);

  if (!room) {
    ctx.status = 409;
    return;
  }

  // console.log(room);
  const chattingData = room.chattingData;
  ctx.body = chattingData;
};

// 보이는 개수 제한
// chat.get("/list/:limit", chatCtrl.messageList);
export const messageList = async (ctx) => {
  const { member } = ctx.state;
  const { limit } = ctx.params;
  console.log(limit);
  // console.log(member);
  // console.log(member.coupleShareCode);
  try {
    const room = await Room.findCoupleCode(Number(member.coupleShareCode));
    // console.log(room);
    const messageList = await room.getSortedMessageList(limit);

    // console.log('asdfasdfasdfasdfad');
    // console.log(messageList);

    ctx.body = messageList;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const insertMessageList = async (ctx) => {
  console.log("여기가 인서트메시지리스트 입니다. 환영합니다.");
  const { member } = ctx.state;
  const newMessageList = ctx.request.body;
  console.log(newMessageList);
  console.log(Array.isArray(newMessageList));

  try {
    const room = await Room.findCoupleCode(member.coupleShareCode);
    await room.insertMessageList(newMessageList);
    await room.save();

    ctx.body = true;
  } catch (e) {
    ctx.throw(500, e);
  }
};
