import client from './client';

export const emailLogin = ({ email, password }) =>
  client.post('/api/auth/login', { email, password });

export const sendEmailAuthenticationCode = (email) =>
  client.post('/api/auth/sendemail', { email });

export const register = ({
  email,
  emailAuthenticationCode,
  password,
  name,
  birthday,
  hp,
}) =>
  client.post('/api/auth/register', {
    email,
    emailAuthenticationCode,
    password,
    name,
    birthday,
    hp,
  });

export const findOtherMember = (otherUserCode) =>
  client.get(`/api/code/${otherUserCode}`);

export const createCoupleSet = (_id) =>
  client.post('/api/code/create', { _id });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.get('/api/auth/logout');

export const findid = ({ name, birthday, hp }) =>
  client.post('/api/auth/findid', { name, birthday, hp });

export const findpw = ({ email, birthday, hp }) =>
  client.post('/api/auth/findpw', { email, birthday, hp });
