import client from "./client";
import qs from 'qs';

export const uploadFile = ({ filename }) =>
    client.post('/api/albums', { filename });

export const readFile = (id, idx) => client.get(`/api/albums/${id}/${idx}`);

export const listAlbums = () => {
    return client.get(`/api/albums`);
}