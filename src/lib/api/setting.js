import client from './client';

export const readSetting = (email) => {
  return client.get(`/api/setting/${email}`);
};

export const removeMember = (email) => client.delete(`/api/setting/${email}`);
