import Router from 'koa-router';
import * as setupCtrl from './setup.ctrl';

// localhost:4000/api/auth
const auth = new Router();

auth.post('/changepassword', setupCtrl.changepassword);

export default auth;
