import Router from 'koa-router';
import calendars from './calendars';
import auth from './auth';
import code from './code';
import schedules from './schedules';
import albums from './album';
import chat from './chat';
import dDay from './dday';
import member from './member';

const api = new Router();
api.use('/auth', auth.routes());
api.use('/code', code.routes());
api.use('/calendars', calendars.routes());
api.use('/schedules', schedules.routes());
api.use('/albums', albums.routes());
api.use('/chat', chat.routes());
api.use('/dday', dDay.routes());
api.use('/member', member.routes());

export default api;
