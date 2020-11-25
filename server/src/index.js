import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import koaBody from 'koa-body';
import api from './api';
import jwt from 'jsonwebtoken';
import jwtMiddleware from './lib/jwtMiddleware';

import socketIO from 'socket.io';
import http from 'http';
dotenv.config();

const { MONGODB_URI, MONGODB_USER, MONGODB_PASS, SERVER_PORT } = process.env;
const authData = {
  user: MONGODB_USER,
  pass: MONGODB_PASS,
  useNewUrlParser: true,
  useCreateIndex: true,
};
mongoose
  .connect(MONGODB_URI, authData)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((e) => {
    console.log('????????????~');
    console.error(e);
  });

const app = new Koa();

app.server = http.createServer(app.callback());
app.io = socketIO(app.server, {});

console.dir(app.io);

app.io
  .use((socket, next) => {
    let error = null;

    try {
      let ctx = app.createContext(socket.request, new http.OutgoingMessage());
      socket.cookies = ctx.cookies;
    } catch (e) {
      error = e;
      console.log(e);
    }
    return next(error);
  })
  .on('connection', (socket) => {
    console.log('소켓 커넥션');
    const token = socket.cookies.get('access_token');

    if (!token) return;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (app.io.socket.adapter.rooms.has(decoded.coupleShareCode)) {
      console.log(`${decoded.coupleShareCode} 로 방 입장!`);
      socket.join(decoded.coupleShareCode);
    } else {
      socket.join(decoded.coupleShareCode);
    }

    socket.on('send message', async (messageObj) => {
      app.io.to(messageObj.coupleShareCode).emit('message', messageObj);
    });

    socket.on('new message', () => {
      console.log('뉴 메시지 입니다');
    });
  });

// const dir1 = path.resolve( __dirname, '../../src/auploads/');
// app.use(serve(dir1));
app.use(koaBody({ multipart: true }));
app.use(cors());
const router = new Router();

router.use('/api', api.routes());
app.use(bodyparser());
app.use(jwtMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

// const server = http.createServer(app.callback());

app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};

app.listen(SERVER_PORT, () => {
  console.log(`server is running on port chat: ${SERVER_PORT}`);
});
