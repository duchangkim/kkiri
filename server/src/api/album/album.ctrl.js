import Album from '../../models/album';
import Joi from '@hapi/joi';
import multer from 'koa-multer';

export const fileupload = async ctx => {
  // console.log('~~~~~~upload')
  const schema = Joi.object().keys({
    txt: Joi.string().required(),
    fileImg: Joi.string(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    console.log('!!!!!!!!?')
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
        cb(null, 'public');
    },
    filename: function(req, file, cb) {
        cb(null, '1103' + file.originalname);
        console.log("WErwrewrewrwer@")   
    }
  })

  const upload = multer({ storage: storage});

  const { txt } = ctx.request.body;
  const file = ctx.request.files;
  const fileImg = ctx.request.body.fileImg;
  console.log('file : ' + ctx.request.files);
  let files = [];
  for (let i = 0; i < file.length; i++) {
      files.push(fs.readFileSync(file[i].path));
      console.log("~~!!!~~~~~~~~ : " + file[i].path)
  }
  const album = new Album({
    txt,
    fileImg,
  });
      
      console.log('du기~~~~');
    try {
      await album.save(upload);
      console.log(album);
        ctx.body = {
          message: "success upload!"
        }
    }catch(e){
    ctx.throw(500, e);
  }
}

