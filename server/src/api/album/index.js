import Router from "koa-router";
import * as albumCtrl from "./album.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const albums = new Router();
albums.get('/', albumCtrl.list);
albums.post("/fileupload", albumCtrl.fileupload);
albums.get('/:idx', albumCtrl.getAlbumById ,albumCtrl.read);

const album = new Router();
album.delete('/', checkLoggedIn, albumCtrl.remove);
album.patch('/:idx', albumCtrl.checkObjectId, albumCtrl.update);

albums.use('/:id',album.routes());

export default albums;
