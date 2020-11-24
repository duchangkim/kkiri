import client from './client';

export const emailLogin = ({ email, password }) =>
  client.post('/api/_auth/login', { email, password });

export const sendEmailAuthenticationCode = (email) =>
  client.post('/api/_auth/sendemail', { email });

export const register = ({
  email,
  emailAuthenticationCode,
  password,
  name,
  birthday,
  hp,
}) =>
  client.post('/api/_auth/register', {
    email,
    emailAuthenticationCode,
    password,
    name,
    birthday,
    hp,
  });
