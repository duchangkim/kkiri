import Router from "koa-router";
import * as welcomeCtrl from "./welcome.ctrl";

// localhost:4000/api/auth
const auth = new Router();

auth.get("/", welcomeCtrl.welcome);

export default auth;
