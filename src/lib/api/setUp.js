import client from "./client";

export const changepassword = ({ password }) =>
  client.post("/api/setup/changepassword", { password });