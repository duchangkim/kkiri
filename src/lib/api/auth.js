import client from "./client";

export const localLogin = ({ email, password }) =>
  client.post("/api/auth/login", { email, password });

export const check = () => client.get("/api/auth/check");

export const logout = () => client.get("/api/auth/logout");
