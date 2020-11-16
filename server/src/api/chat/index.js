import Router from "koa-router";
import * as chatCtrl from "./chat.ctrl";

// localhost:4000/api/chat
const chat = new Router();

chat.post("/", chatCtrl.saveMessage);
chat.get("/", chatCtrl.getMessageList);
chat.get("/list/:limit", chatCtrl.messageList);
chat.post('/list', chatCtrl.insertMessageList);

export default chat;
