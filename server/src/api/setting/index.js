import Router from "koa-router";
import * as settingCtrl from "./setting.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

// localhost:4000/api/auth
const setting = new Router();

setting.delete("/:email", checkLoggedIn, settingCtrl.removeMember);

export default setting;
