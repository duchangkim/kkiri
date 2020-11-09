import Router from "koa-router";
import calendars from "./calendars";
import auth from "./auth";
import code from "./code";
import schedules from "./schedules";
<<<<<<< HEAD
import album from "./album";
import chat from "./chat";
=======
import albums from './album';
>>>>>>> d1860e5fe5bf713f81a860751457df4ad40f8603

const api = new Router();
api.use("/auth", auth.routes());
api.use("/code", code.routes());
api.use("/calendars", calendars.routes());
api.use("/schedules", schedules.routes());
<<<<<<< HEAD
api.use("/album", album.routes());
api.use("/chat", chat.routes());
=======
api.use('/albums', albums.routes());
>>>>>>> d1860e5fe5bf713f81a860751457df4ad40f8603

export default api;
