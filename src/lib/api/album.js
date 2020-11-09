import client from "./client";
import qs from 'qs';

export const uploadFile = ({ filename }) =>
    client.post('/api/albums', { filename });

export const readFile = id => client.get(`/api/albums/${id}`);

export const listAlbums = ({ filename }) => {
    const queryString = qs.stringify({
        filename
    });
   
    return client.get(`/api/albums?${queryString}`);
}