import Router from "koa-router";
import * as codeCtrl from "./code.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";
import checkMatchedCouple from "../../lib/checkMatchedCouple";

// localhost:4000/api/code
const code = new Router();

// code.get("/", codeCtrl.list);

code.get("/:code", checkLoggedIn, codeCtrl.checkCode);
code.post(
  "/create",
  checkLoggedIn, // 로그인 했나?
  checkMatchedCouple, // 솔로냐?
  codeCtrl.createCoupleSet // 그럼 맹글어줘
);
/*
  고유의 코드는 둘다 줌
  한명만 입력하면 동시에 연결됨.
  연결된 회원은 개인 고유 코드는 사라지고 둘만 가지고 있는 코드가 발급됨
  회원가입 - 코드발급 - 코드 입력 --> 상대방이 있으면 --> 연결 성공 (채팅방, 캘린더, 앨범 스키마 만들어서 _id를 코드로 저장시켜줌)
                        ㅣ
                        ㅣ
                        ㄴ 상대방이 없으면 --> 연결 실패 ()
  코드 입력 v
  코드 입력 성공 v
  커플 고유 코드 발급 v
  이제서야 메인으로 갈 수 있음
*/

export default code;
