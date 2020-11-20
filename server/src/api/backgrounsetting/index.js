import Router from "koa-router";
import * as backgroundSettingCtrl from "./backgroundsetting.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const backgroundsettings = new Router();
backgroundsettings.get("/", backgroundSettingCtrl.list);
backgroundsettings.post("/fileupload", backgroundSettingCtrl.fileupload);
backgroundsettings.get(
  "/:idx",
  backgroundSettingCtrl.getBackgroundSettingById,
  backgroundSettingCtrl.read
);

export default backgroundsettings;
