import Router from "koa-router";
import * as albumCtrl from "./album.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const album = new Router();

album.post("/fileupload", checkLoggedIn, albumCtrl.fileupload);
album.delete("/filedel/:id", checkLoggedIn, albumCtrl.filedel);

export default album;
