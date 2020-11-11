import dotenv from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import mongoose from "mongoose";
import cors from "koa-cors";
import koaBody from "koa-body";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import serve from 'koa-static';
import path from 'path';

dotenv.config();

const { SERVER_PORT, MONGO_URI } = process.env;

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

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port: ${SERVER_PORT}`);
});
