import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";
import * as emailCtrl from "./email.ctrl";
import * as findCtrl from "./find.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

// localhost:4000/api/auth
const auth = new Router();

auth.post("/register", checkLoggedIn, emailCtrl.register);
auth.post("/login", authCtrl.login);
auth.get("/check", authCtrl.check);
auth.get("/logout", authCtrl.logout);
auth.post("/registeremail", emailCtrl.registeremail);
//아이디 찾기
auth.post("/findid", findCtrl.findid);
auth.post("/findpw", findCtrl.findpw);

export default auth;
