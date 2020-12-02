import Router from "koa-router";
import * as ddayCtrl from "./dday.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

// localhost:4000/api/dday
const dday = new Router();

// 디데이 리스트 조회
dday.get("/", checkLoggedIn, ddayCtrl.getDdayList);

export default dday;
