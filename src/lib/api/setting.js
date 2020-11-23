import client from "./client";

export const readSetting = (email) => {
    console.log('removePost 응답바ㅡㅇ듬');
    return client.delete(`/api/setting/${email}`);   
}

export const removeMember = (email) => client.delete(`/api/setting/${email}`);
console.log('sadasdsadndskgfndkslfklsdmflksdkmljlsedfcjfv');