import dotenv from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import mongoose from "mongoose";

import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";

dotenv.config();

const { SERVER_PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());
app.use(bodyparser());
app.use(jwtMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port: ${SERVER_PORT}`);
});
