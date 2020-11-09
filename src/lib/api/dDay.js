import client from './client';

export const getDdayList = () => client.get('/api/dday');
