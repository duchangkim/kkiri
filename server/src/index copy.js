import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import koaBody from 'koa-body';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

import socket from 'socket.io';
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

const server = http.createServer(app.callback());
const io = socket(server);
io.on('connection', (socket) => {
  socket.emit('your id', socket.id);
  // console.log(socket);
  console.log(`소켓 컨넥션 ${socket.id}`);
  // 방 나갈때
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId, () => {
      console.log('방 나감');
    });
  });
  // 방 들어올때
  socket.on('joinRoom', (roomId) => {
    console.log('방 입장 이벤트 받음');
    socket.join(roomId, () => {
      console.log(`${roomId}에 입장`);
    });
  });
  // 방에 있는 사용자들에게만 메시지보냄
  socket.on('send message', async (messageObj) => {
    io.to(messageObj.coupleShareCode).emit('message', messageObj);
  });

  socket.on('new message', () => {
    console.log('뉴 메시지 입니다');
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`server is running on port chat: ${SERVER_PORT}`);
});
