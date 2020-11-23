import Router from "koa-router";
import * as backgroundSettingCtrl from "./backgroundsetting.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const backgroundsetting = new Router();
backgroundsetting.get("/", backgroundSettingCtrl.list);
backgroundsetting.post("/fileupload", backgroundSettingCtrl.fileupload);
backgroundsetting.get(
  "/:idx",
  backgroundSettingCtrl.getBackgroundSettingById,
  backgroundSettingCtrl.read
);

export default backgroundsetting;
