import Router from 'koa-router';
import * as memberCtrl from './member.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

// localhost:4000/api/member
const member = new Router();

// member _id로 멤버 찾기 (ctx.state.member에서 값 받아올거임)
member.get('/', checkLoggedIn, memberCtrl.getMember);

export default member;
