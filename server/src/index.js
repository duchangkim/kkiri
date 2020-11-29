import dotenv from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "koa-cors";
import koaBody from "koa-body";

import http from "http";
import socketIO from "socket.io";

import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import Room from "./models/room";

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
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();
const socketRouter = new Router();

// Socket.io app 인스턴스 생성
app.server = http.createServer(app.callback());
app.io = socketIO(app.server, {});

app.io
  .use((socket, next) => {
    let error = null;

    try {
      let ctx = app.createContext(socket.request, new http.OutgoingMessage());
      socket.cookies = ctx.cookies;
    } catch (err) {
      error = err;
      console.log(error);
    }
    return next(error);
  })
  .on("connection", function (socket) {
    const token = socket.cookies.get("access_token");
    if (!token) return; // 토큰이 없음

    console.log(`컨넥션 했습니다 누가? ${socket.id}`);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (app.io.sockets.adapter.rooms.has(decoded.coupleShareCode)) {
      console.log(
        `방 만드셨나요? / ${decoded.coupleShareCode} / ${decoded._id}`
      );
      socket.join(decoded.coupleShareCode);
    } else {
      const createRoomId = decoded.coupleShareCode;
      socket.join(createRoomId);
    }
    // 방 퇴장
    socket.on("disconnect", () => {
      console.log(`나감`);
    });

    // 방 입장
    socket.on("joinRoom", (coupleShareCode) => {
      console.log(`아이디뭐여 / ${socket.id}`);
      console.log(`방 입장 이벤트 받음 / ${coupleShareCode}`);
    });

    // 메시지 전송
    socket.on("send message", async (messageObj) => {
      console.log(`센드 메시지 몇번인데?`);
      console.log(`${socket.id}`);
      app.io.to(messageObj.coupleShareCode).emit("message", messageObj);

      try {
        const room = await Room.findCoupleCode(messageObj.coupleShareCode);
        // console.log(room);
        await room.pushMessageData(messageObj);
        room.save();
      } catch (e) {
        console.log(e);
      }
    });

    // 알림에 쓰일것
    socket.on("new message", (coupleId) => {
      console.log("뉴 메시지 입니다");
      app.io.to(decoded.coupleShareCode).emit("notification", coupleId);
    });
  });

// 라우터 설정
router.use("/api", api.routes()); // api 라우트 적용
router.use("/", socketRouter.routes());
// 라우터 적용 전에 bodyParser 적용
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 소켓 적용, app.listen 오버라이드
app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};

// PORT 가 지정되어있지 않다면 4000 을 사용
const port = SERVER_PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port chat: ${port}`);
});
