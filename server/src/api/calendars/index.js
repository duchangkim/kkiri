import Router from 'koa-router';
import * as calendarsCtrl from './calendars.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

// localhost:4000/api/calendars
const calendars = new Router();
// 캘린더 생성 (일정 필터 > 여행, 기념일)
calendars.post('/', checkLoggedIn, calendarsCtrl.createCalendars);
// 캘린더 리스트 조회
calendars.get('/', checkLoggedIn, calendarsCtrl.getCalendarsList);
// 캘린더 조회
calendars.get('/:calendarsId', checkLoggedIn, calendarsCtrl.getCalendars);
// 캘린더 삭제
calendars.delete('/:calendarsId', checkLoggedIn, calendarsCtrl.deleteCalendars);
// 캘린더 수정
calendars.put('/:calendarsId', checkLoggedIn, calendarsCtrl.modifyCalendars);

export default calendars;
