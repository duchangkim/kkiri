import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";

// localhost:4000/api/auth
const auth = new Router();

auth.post("/register", authCtrl.register);
auth.post("/login", authCtrl.login);
auth.get("/check", authCtrl.check);
auth.get("/logout", authCtrl.logout);

export default auth;
