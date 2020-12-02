import Router from 'koa-router';
import * as backgroundSettingCtrl from './backgroundsetting.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const backgroundsetting = new Router();
backgroundsetting.get('/', checkLoggedIn, backgroundSettingCtrl.list);
backgroundsetting.post(
  '/fileupload',
  checkLoggedIn,
  backgroundSettingCtrl.fileupload
);
backgroundsetting.get(
  '/:idx',
  checkLoggedIn,
  backgroundSettingCtrl.getBackgroundSettingById,
  backgroundSettingCtrl.read
);

export default backgroundsetting;
