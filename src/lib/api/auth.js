import client from "./client";

export const localLogin = ({ email, password }) =>
  client.post("/api/auth/login", { email, password });

export const register = ({ email, password, birthday, name, hp }) => {
  return client.post("/api/auth/register", {
    email,
    password,
    birthday,
    name,
    hp,
  });
};
export const registeremail = ({ email }) =>
  client.post("/api/auth/registeremail", { email });

export const findid = ({ name, birthday, hp }) =>
  client.post("/api/auth/findid", { name, birthday, hp });

export const findpw = ({ name, birthday, hp }) =>
  client.post("/api/auth/findpw", { name, birthday, hp });

export const registercode = ({ emailcode }) =>
  client.post("/api/auth/registercode", { emailcode });

export const check = () => client.get("/api/auth/check");

export const logout = () => client.get("/api/auth/logout");
