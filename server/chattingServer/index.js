import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import socket from "socket.io";
import Koa from "koa";

dotenv.config();

const { CHATTING_PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((e) => {
    console.log("????????????~");
    console.error(e);
  });

const app = new Koa();
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});

server.listen(CHATTING_PORT, () => {
  console.log(`server is running on port chat: ${CHATTING_PORT}`);
});
