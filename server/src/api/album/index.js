import Router from "koa-router";
import * as albumCtrl from './album.ctrl';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
    },
  filename: (req, file, cb) => {

    cb(null, Data.now() + '-' + file.originalname)
  }
});

let upload = multer({
  storage: storage
});

const album = new Router();
album.post('/fileupload', albumCtrl.fileupload, upload.single('fileImg'));

export default album;
