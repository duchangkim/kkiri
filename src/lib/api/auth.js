import client from "./client";

export const localLogin = ({ email, password }) =>
  client.post("/api/auth/login", { email, password });

export const register = ({ email, emailcode, password, birthday, name, hp }) => {
  console.log("dudusiaduiasduiosaudosaujdoijas")
  return client.post("/api/auth/register", {
    email,
    emailcode,
    password,
    birthday,
    name,
    hp,
  });
};
//{ email } >> { email: email }
export const registeremail = ({ email }) =>
  client.post("/api/auth/registeremail", { email });

export const findid = ({ name, birthday, hp }) =>
  client.post("/api/auth/findid", { name, birthday, hp });

export const findpw = ({ email, birthday, hp }) =>
  client.post("/api/auth/findpw", { email, birthday, hp });

export const registercouple = (couplecode) =>
  client.get(`/api/code/${couplecode}`);

export const createCoupleSet = (_id) => {
  console.log(_id);
  return client.post(`/api/code/create`, _id);
};

export const findresult = () => client.get("/api/auth/findresult");

export const check = () => client.get("/api/auth/check");

export const logout = () => client.get("/api/auth/logout");
