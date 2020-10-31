import Router from "koa-router";
import * as calendarCtrl from "./calendar.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

// localhost:4000/api/calendar
const calendar = new Router();

const calendars = new Router();
// 캘린더 생성 (일정 필터 > 여행, 기념일)
calendars.post("/", checkLoggedIn, calendarCtrl.createCalendars);
// 캘린더 리스트 조회
calendars.get("/", checkLoggedIn, calendarCtrl.getCalendarsList);
// 캘린더 조회
calendars.get("/:calendarsId", checkLoggedIn, calendarCtrl.getCalendars);
// 캘린더 삭제
calendars.delete("/:calendarsId", checkLoggedIn, calendarCtrl.deleteCalendars);
// 캘린더 수정
calendars.put("/:calendarsId", checkLoggedIn, calendarCtrl.modifyCalendars);

const schedules = new Router();
// 스케쥴 생성
schedules.post("/", checkLoggedIn, calendarCtrl.createSchedules);
// 스케쥴 리스트 조회
// 스케쥴 조회
// 스케쥴 삭제
// 스케쥴 수정

const dDay = new Router();
// 디데이 생성
// 디데이 리스트 조회
// 디데이 조회
// 디데이 삭제
// 디데이 수정

calendar.use("/calendars", calendars.routes());
calendar.use("/schedules", schedules.routes());
calendar.use("/d-day", dDay.routes());

export default calendar;
