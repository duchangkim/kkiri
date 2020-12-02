import Router from "koa-router";
import * as profileSettingCtrl from "./profilesetting.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const profilesetting = new Router();
profilesetting.get("/", profileSettingCtrl.list);
profilesetting.post("/fileupload", profileSettingCtrl.fileupload);
profilesetting.get(
  "/:idx",
  profileSettingCtrl.getprofilesettingById,
  profileSettingCtrl.read
);

export default profilesetting;
