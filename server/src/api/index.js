import Router from "koa-router";
import calendar from "./calendar";
import auth from "./auth";
import code from "./code";

const api = new Router();
api.use("/calendar", calendar.routes());
api.use("/auth", auth.routes());
api.use("/code", code.routes());

export default api;
