import Router from 'koa-router';
import * as albumCtrl from './album.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const albums = new Router();
albums.get('/', albumCtrl.list);
albums.post('/fileupload', albumCtrl.fileupload);
albums.get('/:idx', albumCtrl.getAlbumById, albumCtrl.read);
albums.delete('/:idx', checkLoggedIn, albumCtrl.remove);
albums.patch('/:keyid', albumCtrl.update);

export default albums;
