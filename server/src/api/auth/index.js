import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";
import * as emailCtrl from "./email.ctrl";
import * as findCtrl from "./find.ctrl";

// localhost:4000/api/auth
const auth = new Router();

auth.post("/login", authCtrl.login);
auth.post("/sendemail", emailCtrl.sendEmailAuthenticationCode);
auth.post("/register", authCtrl.register);
auth.get("/logout", authCtrl.logout);
auth.get("/check", authCtrl.check);

//아이디 찾기
auth.post("/findid", findCtrl.findid);
auth.post("/findpw", findCtrl.findpw);

export default auth;
