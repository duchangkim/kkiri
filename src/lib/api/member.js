import client from "./client";

export const getMyCouple = ({ coupleId }) =>
  client.get(`/api/member/${coupleId}`);

export const insertPosition = (_position) => {
  console.log(_position);
  return client.put("/api/member/position", _position);
};

export const insertGetTogetherDate = (getTogetherDate) => {
  return client.put("/api/member/togetherdate", getTogetherDate);
};
