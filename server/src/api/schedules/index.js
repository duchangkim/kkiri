import Router from "koa-router";
import * as schedulesCtrl from "./schedules.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const schedules = new Router();
// 스케쥴 생성
schedules.post("/", checkLoggedIn, schedulesCtrl.createSchedules);
// 스케쥴 리스트 조회
schedules.get("/", checkLoggedIn, schedulesCtrl.getSchdulesList);
// 스케쥴 조회
schedules.get("/:schedulesId", checkLoggedIn, schedulesCtrl.getSchdules);
// 스케쥴 삭제
// 스케쥴 수정

export default schedules;
