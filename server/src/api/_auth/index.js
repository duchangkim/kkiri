import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

// localhost:4000/api/_auth
const _auth = new Router();

_auth.post('/login', authCtrl.login);
_auth.post('/sendemail', authCtrl.sendEmailAuthenticationCode);
_auth.post('/register', authCtrl.register);

export default _auth;
