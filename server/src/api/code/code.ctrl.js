import createRandomCode from '../../lib/createRandomCode';
import Member from '../../models/member';
import Room from '../../models/room';
import Calendar from '../../models/calendar';
import Album from '../../models/album';
import fs from 'fs';

export const checkCode = async (ctx) => {
  const { code } = ctx.params;
  // console.log(code);

  try {
    const result = await Member.findUserCode(parseInt(code, 10));
    ctx.body = result.serialize();
  } catch (e) {
    // 상대방을 코드로 찾을 수 없음
    console.log(e);
    ctx.status = 401;
  }
};

//CoupleSet === chattingRoom, calendar, album
export const createCoupleSet = async (ctx) => {
  // console.log('call create couple set');
  // console.log('dsasdadsasdsadssdaadsadsadsads');
  // console.log(ctx.request.body);
  // console.log('dsasdadsasdsadssdaadsadsadsads');
  // 코드 등록을 시도한 사용자의 id와 member (커플1)firstMember
  const firstMemberId = ctx.state.member._id;
  // 코드 등록을 당한 사용자의 id와 member (커플2)secondMember
  const secondMemberId = ctx.request.body._id;
  // console.log(`1: ${firstMemberId}, 2: ${secondMemberId}`);
  if (!firstMemberId || !secondMemberId) {
    ctx.status = 401;
    return;
  }
  try {
    const firstMember = await Member.findById(firstMemberId);
    const secondMember = await Member.findById(secondMemberId);

    // 제공해야 할 것들
    const coupleShareCode = await createRandomCode();

    // 개인 고유 번호들은 이제 지워주기
    firstMember.deleteUserCode();
    secondMember.deleteUserCode();
    // 대신 커플 공유 코드 넣어주기
    firstMember.insertCoupleShareCode(coupleShareCode);
    secondMember.insertCoupleShareCode(coupleShareCode);
    // 서로 커플 id 등록해주기
    firstMember.insertCoupleId(secondMemberId);
    secondMember.insertCoupleId(firstMemberId);

    // room calendar album 만들어 준 다음 커플코드를 고유 아이디, owner 추가해주기
    const room = await new Room({
      coupleShareCode,
      owner: [firstMemberId, secondMemberId],
    });
    const calendar = await new Calendar({
      coupleShareCode,
      owner: [firstMemberId, secondMemberId],
    });
    const album = await new Album({
      coupleShareCode,
      owner: [firstMemberId, secondMemberId],
    });

    // 변경사항 저장
    await firstMember.save();
    await secondMember.save();
    await room.save();
    await calendar.save();
    await album.save();

    const dir = `./public/uploads/${coupleShareCode}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const token = firstMember.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    ctx.body = await firstMember.serialize();
  } catch (e) {
    ctx.throw(500, { message: e });
  }
};
