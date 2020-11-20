import client from "./client";

export const changepassword = ({ password, findEmail }) =>
  client.post("/api/setup/changepassword", { password, findEmail });
