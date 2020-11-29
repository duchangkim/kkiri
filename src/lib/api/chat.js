import client from "./client";

export const getMessageList = ({ limit }) =>
  client.get(`/api/chat/list/${limit}`);
export const insertMessageList = (messageList) =>
  client.post("/api/chat/list", messageList);
