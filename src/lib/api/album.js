import client from "./client";

export const uploadFile = ({ filename }) =>
    client.post('/api/albums', { filename });

export const readFile = (id, idx) => client.get(`/api/albums/${id}/${idx}`);


export const listAlbums = () => {
    console.log('api/albums 응답바ㅡㅇ듬');
    return client.get(`/api/albums`);   
}