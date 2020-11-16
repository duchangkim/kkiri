import dotenv from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import mongoose from "mongoose";
import cors from "koa-cors";
import koaBody from "koa-body";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";

import socket from "socket.io";
import http from "http";
import Room from "./models/room";
dotenv.config();

const { SERVER_PORT, MONGO_URI } = process.env;
const { MONGODB_URI, MONGODB_USER, MONGODB_PASS } = process.env;
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
    console.log("????????????~");
    console.error(e);
  });

const app = new Koa();

// const dir1 = path.resolve( __dirname, '../../src/auploads/');
// app.use(serve(dir1));
app.use(koaBody({ multipart: true }));
app.use(cors());
const router = new Router();

router.use("/api", api.routes());
app.use(bodyparser());
app.use(jwtMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = socket(server);
io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", async (body) => {
    io.emit("message", body);
    console.log(body);
    const msg = await Room.findCoupleCode(body.coupleShareCode);
    console.log(msg + "메세지");
    msg.chattingData.push({
      sender: body.id,
      text: body.body,
      sendDate: new Date(),
    });
    msg.save();
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`server is running on port chat: ${SERVER_PORT}`);
});
