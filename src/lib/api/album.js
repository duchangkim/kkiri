import client from "./client";

export const uploadFile = ({ filename }) =>
    client.post('/api/albums', { filename });

export const readFile = (idx) => client.get(`/api/albums/${idx}`);
console.log('111111111api/album->readfile');
console.log(readFile);


export const listAlbums = () => {
    console.log('api/albums 응답바ㅡㅇ듬');
    return client.get(`/api/albums`);   
}

export const removeFile = (idx) => client.delete(`/api/albums/${idx}`);
console.log('111111111api/album->removefile');

export const editFile = (keyid) => client.patch(`/api/albums/${keyid}`);
console.log('업데이트 요청전송');
