import client from './client';

export const getMyCouple = () => client.get('/api/member');

export const insertPosition = (_position) => {
  console.log(_position);
  return client.put('/api/member/position', _position);
};

export const insertGetTogetherDate = (getTogetherDate) => {
  return client.put('/api/member/togetherdate', getTogetherDate);
};
