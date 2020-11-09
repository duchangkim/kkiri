import Router from "koa-router";
import * as albumCtrl from "./album.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const albums = new Router();
albums.get('/', albumCtrl.list);
albums.post("/fileupload", albumCtrl.fileupload);

const album = new Router();
album.get('/', albumCtrl.read);
album.delete('/', checkLoggedIn, albumCtrl.remove);
album.patch('/', albumCtrl.update);

albums.use('/:id', albumCtrl.checkObjectId, album.routes());

export default albums;
