import Router from 'koa-router';
import * as profileSettingCtrl from './profilesetting.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const profilesetting = new Router();
profilesetting.get('/', checkLoggedIn, profileSettingCtrl.list);
profilesetting.post(
  '/fileupload',
  checkLoggedIn,
  profileSettingCtrl.fileupload
);
profilesetting.get(
  '/:idx',
  checkLoggedIn,
  profileSettingCtrl.getprofilesettingById,
  profileSettingCtrl.read
);

export default profilesetting;
