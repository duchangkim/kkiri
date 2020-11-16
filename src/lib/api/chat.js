import client from "./client";

export const getMessageList = ({ limit }) => client.get(`/api/chat/list/${limit}`);
