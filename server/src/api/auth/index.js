import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";
import * as emailCtrl from "./email.ctrl";

// localhost:4000/api/auth
const auth = new Router();

auth.post("/register", emailCtrl.register);
auth.post("/login", authCtrl.login);
auth.get("/check", authCtrl.check);
auth.get("/logout", authCtrl.logout);
// 코드 인증
auth.post("/registercode", emailCtrl.registercode);
//인증 메일 보내기
auth.post("/registeremail", emailCtrl.registeremail);
//아이디 찾기
auth.post("/findid", emailCtrl.findid);

export default auth;
