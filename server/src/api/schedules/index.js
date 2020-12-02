import Router from 'koa-router';
import * as schedulesCtrl from './schedules.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const schedules = new Router();
// 스케쥴 생성
schedules.post('/', checkLoggedIn, schedulesCtrl.createSchedule);
// 스케쥴 리스트 조회
schedules.get('/', checkLoggedIn, schedulesCtrl.getSchduleList);
// 스케쥴 조회
schedules.get('/:scheduleId', checkLoggedIn, schedulesCtrl.getSchdule);
// 스케쥴 삭제
schedules.del('/:scheduleId', checkLoggedIn, schedulesCtrl.deleteSchedule);
// 스케쥴 수정
schedules.put('/:scheduleId', checkLoggedIn, schedulesCtrl.modifySchedule);
// 디데이 리스트 조회
export default schedules;
