import client from './client';

export const uploadFile = ({ filename }) =>
  client.post('/api/albums', { filename });

export const readFile = (idx) => client.get(`/api/albums/${idx}`);

export const listAlbums = () => {
  return client.get(`/api/albums`);
};

export const removeFile = (idx) => client.delete(`/api/albums/${idx}`);

export const editFile = (keyid) => client.patch(`/api/albums/${keyid}`);
