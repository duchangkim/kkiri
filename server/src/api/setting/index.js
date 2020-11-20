import Router from "koa-router";
import * as setttingCtrl from "./settting.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

// localhost:4000/api/auth
const auth = new Router();

auth.delete("/:email", checkLoggedIn, setttingCtrl.removeMember);

export default auth;
