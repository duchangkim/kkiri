import client from "./client";

export const changepassword = ({ password, findEmail }) =>
  client.post("/api/setup/changepassword", { password, findEmail });

  export const removePost  = id => client.delete(`/api/posts/${id}`); 