import Router from "koa-router";
import * as albumCtrl from './album.ctrl';
import koaBody from 'koa-body'; // koa-body 불러오기

const album = new Router();
album.post('/fileupload', koaBody({multipart: true}), albumCtrl.fileupload);

export default album;
